"use client";

import BlogComments from "@/components/blogs/BlogComments";
import { Spinner } from "@/components/ui/spinner";
import apiFetch from "@/lib/api";
import { format } from "date-fns";
import DOMPurify from "isomorphic-dompurify";
import { Calendar, Heart, Share2, Tag, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// --- Types ---
interface Author {
  _id: string;
  name: string;
  image: string;
  email: string;
}

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  image: string;
  author: Author;
  category: string;
  tags: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export default function SingleBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false); // Local state for like interaction
  const [likeCount, setLikeCount] = useState(0); // Mock like count if not in API

  const getSingleBlog = async () => {
    try {
      setLoading(true);
      // Fetch Blog Details
      const blogRes = await apiFetch(`/blogs/${id}`);

      const blog = await blogRes?.data?.data?.result;
      const comments = await blogRes?.data?.data?.commentsByBlog;
      console.log(blog);
      if (blogRes.success) {
        setBlog(blog);
        setComments(comments);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      toast.error("Failed to load blog post");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleBlog();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    toast.success(isLiked ? "Like removed" : "You liked this post!");
    // TODO: Integrate with actual Like API if available.
    // e.g., await authFetch("/likes", { method: "POST", body: ... })
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog?.title,
          text: blog?.description?.substring(0, 100),
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-neutral-50">
        <Spinner className="size-16 text-emerald-900" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-50 gap-4">
        <h1 className="text-3xl font-bold text-emerald-900">
          Blog Post Not Found
        </h1>
        <p className="text-gray-600">
          The article you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  const cleanDate = blog?.createdAt
    ? format(new Date(blog.createdAt), "MMMM dd, yyyy")
    : "";

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full items-center overflow-hidden">
        {/* Background Image with Parallax-like fixity or just generic cover */}
        <div className="absolute inset-0">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${blog?.image}`}
            alt={blog.title}
            // fill
            className="object-cover w-full h-full object-center"
            // priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-emerald-950/90 via-emerald-950/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 lg:p-20 text-white max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-orange-600/90 backdrop-blur-sm text-sm font-semibold uppercase tracking-wider text-white border border-orange-500/30">
              {blog.category || "General"}
            </span>
            <span className="flex items-center gap-2 text-sm md:text-base font-medium text-emerald-100 bg-emerald-900/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-emerald-500/20">
              <Calendar className="w-4 h-4" />
              {cleanDate}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 max-w-4xl drop-shadow-lg">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-2 pr-6 rounded-full border border-white/20">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-500">
                {blog.author?.image ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${blog.author.image}`}
                    alt={blog.author.name}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-800 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-emerald-200 uppercase tracking-widest font-semibold">
                  Written by
                </span>
                <span className="text-sm font-bold text-white">
                  {blog.author?.name || "Unknown Author"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 lg:p-16 mb-12">
          {/* Interaction Bar - Sticky or Just Top */}
          <div className="flex justify-between items-center border-b border-gray-100 pb-8 mb-10">
            <div className="flex items-center gap-2">
              {blog.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 rounded-lg text-sm font-medium"
                >
                  <Tag className="w-3.5 h-3.5" />
                  {tag.replace(/,/g, "")}{" "}
                  {/* Clean up potential commas in tag strings */}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isLiked
                    ? "bg-red-50 text-red-500 shadow-inner"
                    : "bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500"
                }`}
                aria-label="Like post"
              >
                <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 rounded-full bg-gray-50 text-emerald-900 hover:bg-emerald-900 hover:text-white transition-all duration-300"
                aria-label="Share post"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div
            className="prose prose-lg md:prose-2xl prose-headings:text-emerald-900 prose-p:text-gray-600 prose-a:text-orange-600 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:p-4 prose-blockquote:not-italic prose-blockquote:rounded-lg prose-img:rounded-2xl prose-strong:text-emerald-800 max-w-none overflow-hidden max-w-[60ch]"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog.description),
            }}
          />
        </div>

        {/* Comments Section */}
        <div className="mb-20">
          <BlogComments
            comments={comments}
            contentData={{ _id: blog._id }} // Only pass necessary ID
            onCommentAdded={getSingleBlog}
          />
        </div>
      </div>
    </div>
  );
}
