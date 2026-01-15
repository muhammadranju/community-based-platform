"use client";
import { authFetch } from "@/lib/authFetch";
import { Send } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import { toast } from "sonner";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
}) as any;

interface ForumFormData {
  _id?: string;
  title: string;
  description: string;
  category: string;
}

interface ForumUploadFormProps {
  onSuccess?: () => void;
  className?: string;
  defaultCategorySlug?: string;
}

export const ForumUploadForm: React.FC<ForumUploadFormProps> = ({
  onSuccess,
  className,
  defaultCategorySlug,
}) => {
  const [formData, setFormData] = useState<ForumFormData>({
    title: "",
    description: "",
    category: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [forumsCategories, setForumsCategories] = useState<any[]>([]);

  // Handle standard input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Rich Text Editor changes
  const handleDescriptionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(), // will now contain HTML
      category: formData.category,
    };

    try {
      const response = await authFetch("/forums", {
        method: "POST",
        auth: true,
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        toast.error("Failed to create forum post");
      }
      if (response.ok) {
        toast.success("Forum post created successfully");
        setFormData({ title: "", description: "", category: "" });
        if (onSuccess) onSuccess();
      }
      const data = await response.json();

      setIsLoading(false);
    } catch (error) {
      console.error("Error creating forum post:", error);
      toast.error("Failed to create forum post");
      setIsLoading(false);
    }
  };

  const fetchForumsCategories = async () => {
    try {
      const response = await authFetch("/forums-category/category", {
        method: "GET",
        auth: true,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const result = await response.json();
      const categories = result?.data || [];
      setForumsCategories(categories);

      // Pre-select category if defaultCategorySlug is provided
      if (defaultCategorySlug) {
        const matchedCategory = categories.find((cat: any) => {
          // Assuming the category object has a 'slug' or we match by modifying title
          // The API response structure needs to be checked, but typically strictly comparing slug is best.
          // Fallback to title comparison if slug property isn't apparent or known yet.
          // Using strict equality on slug if available, otherwise trying title match (basic slugify)
          return (
            cat.slug === defaultCategorySlug ||
            cat.title.toLowerCase().replace(/ /g, "-") === defaultCategorySlug
          );
        });

        if (matchedCategory) {
          setFormData((prev) => ({ ...prev, category: matchedCategory._id }));
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchForumsCategories();
  }, [defaultCategorySlug]);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-8 bg-white ${
        className || "rounded-2xl shadow-lg p-8 border border-gray-100"
      }`}
    >
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-emerald-900 mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter your title"
          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg"
        />
        <p className="text-xs text-gray-500 mt-2">
          Example: "New Project Ideas for Community Development"
        </p>
      </div>

      {/* Category Dropdown */}
      <div>
        <label className="block text-sm font-semibold text-emerald-900 mb-2">
          Discussions Topic <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          required
          value={formData.category}
          onChange={handleChange}
          className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
        >
          <option value="" disabled>
            Choose a Discussions Topic
          </option>
          {forumsCategories?.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      {/* Description (Rich Text Editor) */}
      <div>
        <label className="block text-sm font-semibold text-emerald-900 mb-2">
          Description <span className="text-red-500">*</span>
        </label>

        <div className="rounded-xl overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-emerald-500 bg-white">
          <ReactQuill
            theme="snow"
            value={formData.description}
            onChange={handleDescriptionChange}
            modules={quillModules}
            formats={quillFormats}
            className="h-64 mb-12"
            placeholder="Write a detailed post..."
          />
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Write a detailed post. Rich text formatting is supported.
        </p>
      </div>

      {/* Submit Button */}
      <div className="pt-6 flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-3 lg:px-36 px-12 py-4 bg-amber-600 text-white font-bold rounded-full hover:bg-amber-700 transition shadow-lg text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={22} />
          {isLoading ? "Creating..." : "Create Forum"}
        </button>
      </div>
    </form>
  );
};
