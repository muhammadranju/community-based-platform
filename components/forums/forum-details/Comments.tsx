import { authFetch } from "@/lib/authFetch";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import CustomToolbarEditor from "@/components/our_work/single-our-work/CustomToolbarEditor";
import { CommentData } from "@/components/our_work/single-our-work/interface";
import { SingleCommentItem } from "@/components/our_work/single-our-work/SingleCommentItem";
import { SongleOurWorkPagination } from "@/components/our_work/single-our-work/SongleOurWorkPagination";
import getUser from "@/components/shared/UserInfo";
import "react-quill-new/dist/quill.snow.css";

export const CommentsSection = ({
  comments,
  forumData,
  onCommentAdded,
}: {
  comments: CommentData[];
  forumData: any;
  onCommentAdded?: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const user = getUser();
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    comment: "",
    images: [],
    type: "forum",
    forum: "",
  });

  // Calculate pagination
  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedComments = comments.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      document
        .getElementById("forum-comments-section")
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
    formDataToSubmit.append("forum", forumData?._id);

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
        throw new Error("Failed to post comment");
      }

      const data = await response.json();
      toast.success("Comment posted successfully!");

      if (onCommentAdded) {
        onCommentAdded();
      }

      setFormData({
        comment: "",
        images: [],
        type: "forum",
        forum: forumData?._id,
      });
      setImagePreviews([]);

      // Reset to first page when new comment is added
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to post comment");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFormData({
      ...formData,
      forum: forumData?._id,
    });
  }, [forumData]);

  return (
    <div className="flex justify-center mb-10">
      <div
        id="forum-comments-section"
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
          <div className="flex items-center gap-2 mt-2">
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
        <CustomToolbarEditor
          formData={formData}
          setFormData={setFormData}
          imagePreviews={imagePreviews}
          handelSubmit={handelSubmit}
          isLoading={isLoading}
          removeImage={removeImage}
          handleFileChange={handleFileChange}
        />

        {/* Comments Count & Pagination Top */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">
            {comments?.length || 0} Comments
          </h2>
          {totalPages > 1 && (
            <SongleOurWorkPagination
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
              <SingleCommentItem key={comment._id} comment={comment} />
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
            <SongleOurWorkPagination
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
