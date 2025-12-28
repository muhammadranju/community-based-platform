import { authFetch } from "@/lib/authFetch";
import { format, parseISO } from "date-fns";
import {
  ArrowRight,
  Bold,
  ChevronLeft,
  ChevronRight,
  Copy,
  FileText,
  ImageIcon,
  Italic,
  LinkIcon,
  List,
  MessageCircle,
  Paperclip,
  PlayCircle,
  Smile,
  Underline,
  Video,
  X,
  Youtube,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { toast } from "sonner";
import getUser from "../shared/UserInfo";
import { Button } from "../ui/button";
import { costumFormatDate } from "../shared/DateTime";

// --- Types ---
interface User {
  name: string;
  image: string;
  createdAt: string;
  role: string;
  _id: string;
}

interface Attachment {
  type: "image" | "video" | "file";
  url?: string;
  thumbnail?: string;
  title?: string;
  meta?: string;
}

interface CommentData {
  _id: string;
  owner: User;
  comment: string;
  title?: string;
  content: string;
  likes: number;
  replies: number;
  createdAt: string;
  forum: string;
  image: string[];
  type: string;
  attachments?: Attachment[];
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const maxPagesToShow = 5;
  const pages: (number | string)[] = [];

  // Generate page numbers to display
  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <div
            key={`dots-${idx}`}
            className="text-gray-400 font-bold px-1 text-lg"
          >
            ...
          </div>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-medium flex items-center justify-center transition-colors ${
              currentPage === page
                ? "border border-emerald-900 bg-lime-50 text-emerald-900"
                : "border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

const FileCard = ({ file }: { file: Attachment }) => (
  <div className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col group cursor-pointer">
    <div className="h-48 overflow-hidden bg-gray-50 relative p-4 flex items-center justify-center border-b">
      <div className="bg-white shadow-sm border w-32 h-40 mx-auto p-2 text-[6px] text-gray-400 overflow-hidden leading-tight">
        <div className="w-full h-2 bg-gray-200 mb-2"></div>
        <div className="w-3/4 h-2 bg-gray-200 mb-2"></div>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="w-full h-1 bg-gray-100 mb-1"></div>
          ))}
      </div>
    </div>
    <div className="p-3 sm:p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
          <FileText size={24} />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm sm:text-base">
            {file.title}
          </h4>
          <p className="text-xs text-gray-500">{file.meta}</p>
        </div>
      </div>
      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight size={16} />
      </div>
    </div>
  </div>
);

const VideoCard = ({ video }: { video: Attachment }) => (
  <div className="relative rounded-2xl overflow-hidden group aspect-video bg-black">
    <img
      src={video.thumbnail}
      alt={video.title}
      className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity"
    />
    <div className="absolute top-3 left-3 flex items-center gap-2 text-white/90">
      <Youtube size={20} className="text-red-500 fill-current" />
      <span className="text-xs font-medium shadow-black drop-shadow-md">
        {video.title}
      </span>
    </div>
    <div className="absolute top-3 right-3 text-white/90">
      <div className="flex items-center gap-1 bg-black/50 px-2 py-1 rounded text-xs backdrop-blur-sm">
        <Copy size={12} />
        Copy link
      </div>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <PlayCircle
        size={64}
        className="text-white fill-white/20 drop-shadow-xl cursor-pointer hover:scale-110 transition-transform"
      />
    </div>
    <div className="absolute bottom-3 left-3">
      <div className="bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
        Watch on <Youtube size={14} />
      </div>
    </div>
  </div>
);

const CommentItem = ({ comment }: { comment: CommentData }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="shrink-0 md:w-48 ">
        <div className="border border-emerald-900 rounded-xl p-4 flex flex-row md:flex-col items-center  gap-3 md:gap-4 bg-white h-full md:h-auto">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${comment.owner.image}`}
            alt={comment.owner.name}
            className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-sm"
          />

          <div className="flex flex-col items-center">
            <h3 className="font-bold text-emerald-900 text-sm md:text-base">
              {comment.owner.name}
            </h3>
            <p className="text-xs text-emerald-900 mt-0.5">
              <span className="font-medium">Joined:</span>{" "}
              {costumFormatDate(comment.owner.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-grow min-w-0">
        <div className="mb-1 flex flex-col">
          <span className="text-emerald-900 lowercase font-medium text-sm md:text-base">
            @
            {slugify(comment.owner?.name || "anonymous", {
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
        <p className="text-emerald-900 text-sm md:text-base leading-relaxed mb-4">
          {comment.comment}
        </p>
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
      </div>
    </div>
  );
};

export const ContentCommentsSection = ({
  comments,
  contentData,
  onCommentAdded,
}: {
  comments: CommentData[];
  contentData: any;
  onCommentAdded?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Adjust this value as needed

  const user = getUser();
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    comment: "",
    images: [],
    type: "contents",
    content: "",
  });

  // Calculate pagination
  const totalPages = Math.ceil(comments?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedComments = comments?.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to comments section
    setTimeout(() => {
      document
        .getElementById("comments-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setFormData((prev: any) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handelSubmit = async () => {
    if (!formData.comment && formData.images.length === 0) {
      toast.error("Please add a comment or an image");
      return;
    }
    if (!user) {
      toast.error("Please login to comment");
      router.push("/login");
      return;
    }
    setIsLoading(true);
    const formDataToSubmit = new FormData();

    formDataToSubmit.append("comment", formData.comment);
    formDataToSubmit.append("type", formData.type);
    formDataToSubmit.append("content", contentData?._id);

    formData.images.forEach((file: File) => {
      formDataToSubmit.append("image", file);
    });

    try {
      const response = await authFetch("/comments", {
        method: "POST",
        body: formDataToSubmit,
        auth: true,
      });

      if (!response.ok) {
        throw new Error("Failed to upload content");
      }

      const data = await response.json();
      console.log("Upload successful:", data);
      toast.success("Comment posted successfully!");

      if (onCommentAdded) {
        onCommentAdded();
      }

      setFormData({
        comment: "",
        images: [],
        type: "contents",
        content: contentData?._id,
      });
      setImagePreviews([]);

      // Reset to first page when new comment is added
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload content");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      content: contentData?._id,
    });
  }, [contentData]);

  return (
    <div className="flex justify-center mb-10">
      <div
        id="comments-section"
        className="w-full border-2 border-emerald-900 rounded-3xl p-4 sm:p-8 md:p-12 shadow-sm relative overflow-hidden"
      >
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle
              size={32}
              className="text-emerald-900"
              strokeWidth={2.5}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 tracking-tight">
              Comment
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-2 sr-only">
            <input
              type="checkbox"
              id="save-info"
              className="rounded border-gray-300 text-emerald-900 focus:ring-emerald-900 w-4 h-4"
            />
            <label
              htmlFor="save-info"
              className="text-sm text-emerald-900 font-medium"
            >
              Save my name email and website
            </label>
          </div>
        </div>

        {/* Input Area */}
        <div className="mb-12">
          <div className="border border-emerald-900 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-900/20 transition-all">
            <textarea
              className="w-full p-4 min-h-[140px] resize-none outline-none text-gray-700 placeholder:text-gray-400"
              placeholder="Write your message here"
              name="comment"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
            ></textarea>

            {/* Toolbar */}
            <div className="bg-white border-t border-emerald-900 p-3 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-500">
                <div className="flex items-center gap-2 sr-only">
                  <button className="hover:text-primary p-1">
                    <Bold size={16} />
                  </button>
                  <button className="hover:text-primary p-1">
                    <Italic size={16} />
                  </button>
                  <button className="hover:text-primary p-1">
                    <Underline size={16} />
                  </button>
                </div>
                <div className="w-px h-4 bg-gray-200 hidden sm:block sr-only"></div>
                <div className="flex items-center gap-2 sr-only">
                  <button className="hover:text-primary p-1">
                    <LinkIcon size={16} />
                  </button>
                  <button className="hover:text-primary p-1">
                    <ImageIcon size={16} />
                  </button>
                  <button className="hover:text-primary p-1">
                    <Video size={16} />
                  </button>
                </div>
                <div className="w-px h-4 bg-gray-200 hidden sm:block sr-only"></div>
                <div className="flex items-center gap-2 sr-only">
                  <button className="hover:text-primary p-1">
                    <Smile size={16} />
                  </button>
                  <button className="hover:text-primary p-1">
                    <List size={16} />
                  </button>
                </div>
                <div className="w-px h-4 bg-gray-200 hidden sm:block sr-only"></div>
                <label className="cursor-pointer hover:text-emerald-900 flex items-center gap-1 text-xs sm:text-sm font-medium transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Paperclip size={16} /> Attach Images
                </label>

                <input
                  type="text"
                  name="content"
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  value={contentData?._id}
                  id=""
                  className="hidden"
                />
              </div>

              {/* Previews */}
              {imagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-4 w-full">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative w-16 h-16 rounded-lg overflow-hidden border border-emerald-900/20 shadow-sm transition-transform hover:scale-105"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-bl-lg p-0.5 hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={handelSubmit}
                disabled={isLoading}
                className="w-full sm:w-auto bg-amber-600 hover:bg-amber-600/80 text-white font-medium px-6 py-2.5 rounded-full transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </div>

        {/* Comments Count & Pagination Top */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">
            {comments?.length || 0} Comments
          </h2>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>

        {/* Comments List */}
        <div className="space-y-10">
          {paginatedComments && paginatedComments.length > 0 ? (
            paginatedComments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))
          ) : (
            <div className="text-center py-20 bg-emerald-50/50 rounded-3xl border-2 border-dashed border-emerald-900/20">
              <MessageCircle
                size={48}
                className="mx-auto text-emerald-900/30 mb-4"
              />
              <p className="text-emerald-900 font-medium">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          )}
        </div>

        {/* Bottom Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center md:justify-end">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
