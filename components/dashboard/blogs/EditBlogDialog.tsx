"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { authFetch } from "@/lib/authFetch";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IBlog } from "@/types/types";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const categories = {
  introduction: "Introduction",
  cultural: "Cultural",
  rebuilding: "Rebuilding",
  materials: "Materials",
  interactive: "Interactive",
  community: "Community",
} as const;

interface EditBlogDialogProps {
  blog: IBlog | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function EditBlogDialog({
  blog,
  open,
  onOpenChange,
  onSuccess,
}: EditBlogDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  useEffect(() => {
    if (blog && open) {
      // Initialize form with blog data
      // Note: We might need to fetch full blog details if IBlog doesn't have everything
      // But assuming IBlog has what we need based on recent type updates.
      // If category/tags are missing in IBlog, simple initialization might fail to show them.
      // Ideally we should fetch the single blog here to be safe and get fresh data.
      fetchBlogDetails(blog.slug);
    } else {
      // Reset form when closed
      setFormData({
        title: "",
        description: "",
        category: "",
      });
      setTags([]);
      setCoverImage(null);
      setCoverPreview(null);
    }
  }, [blog, open]);

  const fetchBlogDetails = async (id: string) => {
    try {
      const res = await authFetch(`/blogs/${id}`, {
        method: "GET",
        auth: true,
      });
      const data = await res.json();
      if (data?.success) {
        const blog = data?.data?.result;
        console.log(blog);
        setFormData({
          title: blog?.title || "",
          description: blog?.description || "",
          category: blog?.category || "",
        });
        setTags(blog?.tags || []);
        if (blog?.image) {
          setCoverPreview(`${process.env.NEXT_PUBLIC_API_URL}${blog.image}`);
        }
      }
    } catch (error) {
      console.error("Failed to fetch blog details", error);
      toast.error("Failed to load blog details");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setCoverImage(null);
    setCoverPreview(null);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;

    // Validation: Title and Description are required. Category recommended.
    if (!formData.title || !formData.description) {
      toast.error("Title and Description are required");
      return;
    }

    setLoading(true);
    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    if (formData.category) submitData.append("category", formData.category);

    tags.forEach((tag) => {
      submitData.append("tags", tag);
    });

    if (coverImage) {
      submitData.append("image", coverImage);
    }

    try {
      const res = await authFetch(`/blogs/${blog._id}`, {
        method: "PATCH",
        body: submitData,
        auth: true,
      });

      const data = await res.json();

      if (data?.success) {
        toast.success("Blog updated successfully!");
        onSuccess();
        onOpenChange(false);
      } else {
        toast.error(data?.message || "Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teal-900">
            Edit Blog
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
                placeholder="Enter blog title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-colors"
                required
              >
                <option value="">Select category</option>
                {Object.entries(categories).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="w-full px-4 py-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-500 transition-colors flex flex-wrap gap-2 items-center min-h-[50px]">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="hover:text-teal-900 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="flex-1 bg-transparent border-none outline-none min-w-[120px]"
                placeholder={
                  tags.length === 0 ? "Type tag and press Enter" : ""
                }
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Press Enter to add a tag
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            {!coverPreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:bg-gray-50 transition-colors text-center cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <div className="bg-teal-50 p-3 rounded-full text-teal-600">
                    <Upload size={24} />
                  </div>
                  <p className="font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-gray-200 aspect-video w-full max-w-md">
                <img
                  src={coverPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm hover:bg-red-50 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Content
            </label>
            <div className="prose-editor">
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={handleDescriptionChange}
                className="h-[300px] mb-12"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 rounded-full bg-teal-900 text-white font-medium hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
