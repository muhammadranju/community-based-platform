"use client";
import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { authFetch } from "@/lib/authFetch";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
}) as any;

// Category options - you can later replace value with actual DB IDs
const forumCategories = [
  { label: "General Discussion", value: "general" },
  { label: "Questions & Help", value: "questions" },
  { label: "Announcements", value: "announcements" },
  { label: "Ideas & Suggestions", value: "ideas" },
  { label: "Showcase", value: "showcase" },
  { label: "Off-Topic", value: "offtopic" },
] as const;

type CategoryValue = (typeof forumCategories)[number]["value"];

interface ForumFormData {
  _id?: string;
  title: string;
  description: string;
  category: CategoryValue | "";
}

export const CreateForumPostPage: React.FC = () => {
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
      const data = await response.json();
      setForumsCategories(data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchForumsCategories();
  }, []);

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
    <div className="w-full mx-auto">
      <title>Upload Forum Dashboard - African Traditional Architecture</title>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-teal-900 mb-1">
          Create Forum Post
        </h1>
        <p className="text-gray-600">
          Share your thoughts, ask questions, or start a discussion
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
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
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
          >
            <option value="" disabled>
              Choose a category
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
              className="h-64 mb-12" // Add margin-bottom to make space for the toolbar and ensure content area is visible
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
    </div>
  );
};

export default CreateForumPostPage;
