"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { authFetch } from "@/lib/authFetch";
import { Spinner } from "@/components/ui/spinner";
import { CommentsSection } from "@/components/sub_our_work/Comments";
import ForumDetailHeader from "@/components/forums/forum-single/ForumDetailHeader";
import ForumPostContent from "@/components/forums/forum-single/ForumPostContent";

export default function SingleForumPage() {
  const router = useRouter();
  const { id } = useParams();

  const [forumData, setForumData] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchForum = async () => {
    setLoading(true);
    try {
      const response = await authFetch(`/forums/${id}`, {
        method: "GET",
        auth: false,
      });
      const result = await response.json();
      setForumData(result?.data?.result);
      setComments(result?.data?.commentsByForum || []);
    } catch (error) {
      console.error("Error fetching forum:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchForum();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner className="size-10" />
        <span className="ml-3 text-lg">Loading discussion...</span>
      </div>
    );
  }

  if (!forumData) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-600">Discussion not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 selection:bg-green-100 lg:px-0 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Image */}
        <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden mb-12 shadow-sm">
          <img
            src="/bg/Rectangle22.png"
            alt="African village architecture"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Header with Actions */}
        <ForumDetailHeader onBack={() => router.back()} />

        {/* Main Post Content */}
        <ForumPostContent forumData={forumData} />

        {/* Comments Section */}
        <div className="my-12">
          <CommentsSection
            comments={comments}
            forumData={forumData}
            onCommentAdded={fetchForum}
          />
        </div>
      </div>
    </div>
  );
}
