"use client";
import { ForumUploadForm } from "@/components/forums/ForumUploadForm";
import React from "react";

export const CreateForumPostPage: React.FC = () => {
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

      <ForumUploadForm />
    </div>
  );
};

export default CreateForumPostPage;
