import { costumFormatDate } from "@/components/shared/DateTime";
import getUser from "@/components/shared/UserInfo";
import { authFetch } from "@/lib/authFetch";
import { YouTubeEmbed } from "@next/third-parties/google";
import parse from "html-react-parser";
import { Download } from "lucide-react";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import slugify from "slugify";
import { toast } from "sonner";
import { CommentData } from "./interface";

interface CommentDataWithPDF extends CommentData {
  pdfs?: string[];
}

import dynamic from "next/dynamic";
const PdfPreview = dynamic(() => import("./PdfPreview"), { ssr: false });

export const SingleCommentItem = ({
  comment,
}: {
  comment: CommentDataWithPDF;
}) => {
  const [likeCount, setLikeCount] = useState<any>(comment.likes);
  const [likes, setLikes] = useState(likeCount.length);

  // ... (existing helper functions)

  const user = getUser();

  const handleLike = async () => {
    try {
      const response = await authFetch(`/comments/like/${comment._id}`, {
        method: "PATCH",
        auth: true,
      });

      if (!response.ok) {
        throw new Error("Failed to like comment");
      }

      const data = await response.json();

      if (data.success) {
        // Check if user is in the likes array (liked) or not (unliked)
        const isLiked = data.data.likes.some((like: any) => like === user._id);

        if (isLiked) {
          toast.success("Comment liked!");
          setLikeCount(data.data.likes);
          setLikes(data.data.likes.length);
        } else {
          setLikeCount(data.data.likes);
          setLikes(data.data.likes.length);
        }
      }
    } catch (error: any) {
      toast.error("Failed to update like");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl">
      <div className="shrink-0 md:w-48 ">
        <div className="border border-emerald-900 rounded-xl p-4 flex flex-row md:flex-col items-center  gap-3 md:gap-4 bg-white h-full md:h-auto">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${comment?.owner?.image}`}
            alt={comment?.owner?.name}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-sm"
          />

          <div className="flex flex-col items-start">
            <h3 className="font-bold text-emerald-900 text-sm md:text-base">
              {comment?.owner?.name}
            </h3>
            <p className="text-xs text-emerald-900 mt-0.5">
              <span className="font-black">Joined:</span>{" "}
              {costumFormatDate(comment?.owner?.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="grow min-w-0">
        <div className="mb-1 flex flex-col">
          <span className="text-emerald-900 lowercase font-medium text-sm md:text-base">
            @
            {slugify(comment?.owner?.name || "anonymous", {
              remove: /[^a-zA-Z0-9]/g,
              lower: true,
            })}
          </span>
          <span className="text-xs text-emerald-900 ">
            {costumFormatDate(comment.createdAt)}
          </span>
        </div>
        {comment.title && (
          <h4 className="font-bold text-emerald-900 text-base md:text-lg mb-2">
            {comment.title}
          </h4>
        )}
        <div className="text-emerald-900 text-sm md:text-base leading-relaxed mb-4 wrap-break-word break-all max-w-full overflow-hidden [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_a]:text-blue-600 [&_a]:underline [&_img]:max-w-full [&_img]:h-auto">
          {parse(comment.comment)}
        </div>
        {comment.image && comment.image.length > 0 && (
          <div
            className={`mb-4 grid gap-4  ${
              comment.image.length === 1
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : comment.image.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3"
            }`}
          >
            {comment.image.map((image, idx) => {
              return (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden aspect-4/3 sm:aspect-square relative shadow-xl"
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
                    alt="Attachment"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 rounded-2xl "
                  />
                </div>
              );
            })}
          </div>
        )}

        {comment.videos && comment.videos.length > 0 && (
          <div
            className={`mb-4 grid gap-4 ${
              comment.videos.length === 1
                ? "grid-cols-1 max-w-lg"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {comment.videos.map((video, idx) => (
              <div
                key={idx}
                className="w-full rounded-2xl overflow-hidden shadow-lg"
              >
                <YouTubeEmbed
                  videoid={video}
                  params="controls=0"
                  style="border-radius: 16px; width: 100%; aspect-ratio: 16/9;"
                />
              </div>
            ))}
          </div>
        )}

        {/* PDF Attachments */}
        {comment.pdfs && comment.pdfs.length > 0 && (
          <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comment.pdfs.map((pdf, idx) => {
              const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${pdf}`;
              const pdfName = pdf.split("/").pop() || "Document.pdf";
              return (
                <div
                  key={idx}
                  className="flex flex-col border border-emerald-900/10 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all group"
                >
                  {/* PDF Preview Area */}
                  <div className="relative aspect-3/4 overflow-hidden bg-gray-50 flex items-center justify-center border-b">
                    <PdfPreview url={fullUrl} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
                  </div>

                  {/* PDF Info & Actions */}
                  <div className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <img
                        src="/bg/pdf-icon.png"
                        className="w-6 h-6 shrink-0"
                        alt="PDF"
                      />
                      <span
                        className="text-xs font-bold text-emerald-900 truncate flex-1"
                        title={pdfName}
                      >
                        {pdfName.replace(/-\d+\.pdf$/, "").replace(/_/g, " ")}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-emerald-900 text-white text-[10px] font-bold py-2 rounded-xl text-center hover:bg-emerald-800 transition-colors"
                      >
                        View
                      </a>
                      <a
                        href={fullUrl}
                        download
                        className="flex-1 border-2 border-emerald-900/10 text-emerald-900 text-[10px] font-bold py-2 rounded-xl text-center hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1"
                      >
                        <Download size={12} /> Download
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 ">
            <span
              className="flex items-center gap-1  rounded-md w-fit cursor-pointer "
              onClick={handleLike}
            >
              <AiFillLike
                size={25}
                className="text-gray-500 hover:text-blue-900 transition-colors duration-300"
              />
            </span>
            <span className="text-emerald-900">
              {likes} {likes === 1 ? "like" : "likes"}
            </span>
          </button>
          {/* | */}
          <button className="flex items-center gap-1 sr-only">
            <span className="flex items-center gap-1  rounded-md w-fit cursor-pointer">
              <FaCommentDots size={25} className="text-gray-500" />
            </span>
            <span className="text-emerald-900">50 comments</span>
          </button>
        </div>
      </div>
    </div>
  );
};
