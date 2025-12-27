"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final payload matching your Postman JSON
    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category, // string value now (you can map to ID later)
    };

    console.log("Forum Post Submitted:", payload);
    alert("Check console → Ready to send to /forums API!");

    // Later: replace with fetch/axios call
    // fetch(`${baseUrl}/forums`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload),
    // });
  };

  return (
    <div className="w-full  mx-auto ">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-emerald-900 mb-2">
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
            <option value="">Choose a category</option>
            {forumCategories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-emerald-900 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={10}
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter your description"
            className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none font-medium"
          />
          <p className="text-xs text-gray-500 mt-2">
            Write a detailed post. Markdown is supported.
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-6 flex justify-center">
          <button
            type="submit"
            className="flex items-center gap-3 px-36 py-4 bg-emerald-900 text-white font-bold rounded-xl hover:bg-emerald-800 transition shadow-lg text-lg cursor-pointer"
          >
            <Send size={22} />
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateForumPostPage;
