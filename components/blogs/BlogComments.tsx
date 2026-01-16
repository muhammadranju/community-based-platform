"use client";

import getUser from "@/components/shared/UserInfo";
import { MessageCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CustomToolbarEditor from "@/components/our_work/single-our-work/CustomToolbarEditor";
import { SingleCommentItem } from "@/components/our_work/single-our-work/SingleCommentItem";
import { SongleOurWorkPagination } from "@/components/our_work/single-our-work/SongleOurWorkPagination";
import { CommentData } from "@/components/our_work/single-our-work/interface";
import { authFetch } from "@/lib/authFetch";

const BlogComments = ({
  comments,
  contentData,
  onCommentAdded,
  type = "blog",
}: {
  comments: CommentData[];
  contentData: any;
  onCommentAdded?: () => void;
  type?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editorKey, setEditorKey] = useState(0);

  const user = getUser();
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    comment: "",
    images: [],
    type: "blog",
    blog: "",
    videos: [],
    pdfs: [],
  });

  // Calculate pagination
  const totalPages = Math.ceil(comments?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedComments = comments?.slice(startIndex, endIndex);
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      document
        .getElementById("comments-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const maxSize = 2 * 1024 * 1024;
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        toast.error(
          `Image ${file.name} is larger than 2MB. Please upload a smaller image.`,
        );
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      return;
    }

    setFormData((prev: any) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));

    validFiles.forEach((file) => {
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

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const maxSize = 4 * 1024 * 1024;
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        toast.error(
          `PDF ${file.name} is larger than 4MB. Please upload a smaller PDF.`,
        );
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      return;
    }

    setFormData((prev: any) => ({
      ...prev,
      pdfs: [...prev.pdfs, ...validFiles],
    }));
  };

  const removePdf = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      pdfs: prev.pdfs.filter((_: any, i: number) => i !== index),
    }));
  };

  const handelSubmit = async () => {
    const strippedComment = formData.comment.replace(/<[^>]*>/g, "").trim();

    if (
      !strippedComment &&
      formData.images.length === 0 &&
      formData.pdfs.length === 0 &&
      formData.videos.length === 0
    ) {
      toast.error("Please add a comment, image, PDF, or video");
      return;
    }
    if (!user) {
      toast.error("Please login to comment");
      router.push(`/login?redirect=${pathname}`);
      return;
    }
    setIsLoading(true);
    const formDataToSubmit = new FormData();

    formData.videos.forEach((video: string) => {
      formDataToSubmit.append("videos", video);
    });

    formDataToSubmit.append("comment", formData.comment);
    formDataToSubmit.append("type", formData.type); // Explicitly set type to blogs
    formDataToSubmit.append("blog", contentData?._id);

    formData.images.forEach((file: File) => {
      formDataToSubmit.append("image", file);
    });
    formData.pdfs.forEach((file: File) => {
      formDataToSubmit.append("pdf", file);
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
      if (data.success) {
        toast.success("Comment posted successfully!");
      }

      if (onCommentAdded) {
        onCommentAdded();
      }

      setFormData({
        comment: "",
        images: [],
        type: type || "blog",
        blog: contentData?._id,
        videos: [],
        pdfs: [],
      });
      setImagePreviews([]);

      setCurrentPage(1);
      setEditorKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload content");
    } finally {
      setIsLoading(false);
    }
  };

  const handleYouTubeVideoChange = (videos: string[]) => {
    setFormData((prev: any) => ({
      ...prev,
      videos: videos,
    }));
  };

  useEffect(() => {
    setFormData((prev: any) => ({
      ...prev,
      content: contentData?._id,
    }));
  }, [contentData]);

  return (
    <div className="flex justify-center mb-10">
      <div
        id="comments-section"
        className="w-full border-2 border-emerald-900 rounded-3xl p-4 sm:p-8 md:p-12 shadow-sm relative overflow-visible"
      >
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle
              size={32}
              className="text-emerald-900"
              strokeWidth={2.5}
            />
            <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 tracking-tight">
              Comments
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-2 sr-only">
            {/* Hidden save info checkbox */}
          </div>
        </div>

        <CustomToolbarEditor
          key={editorKey}
          formData={formData}
          setFormData={setFormData}
          imagePreviews={imagePreviews}
          handelSubmit={handelSubmit}
          isLoading={isLoading}
          removeImage={removeImage}
          handleFileChange={handleFileChange}
          handleYouTubeVideoChange={handleYouTubeVideoChange}
          handlePdfChange={handlePdfChange}
          removePdf={removePdf}
        />

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

        <div className="space-y-10">
          {paginatedComments && paginatedComments.length > 0 ? (
            paginatedComments.map((comment) => (
              <SingleCommentItem key={comment._id} comment={comment as any} />
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

export default BlogComments;
