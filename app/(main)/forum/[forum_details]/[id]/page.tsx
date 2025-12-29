"use client";
import CustomBadge from "@/components/shared/SharedBadge";
import { CommentsSection } from "@/components/sub_our_work/Comments";
import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/authFetch";
import DOMPurify from "dompurify";
import { ChevronLeft, Heart, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { costumFormatDate } from "@/components/shared/DateTime";
import { Spinner } from "@/components/ui/spinner";

// --- Types ---

interface DiscussionPost {
  id: string;
  author: {
    name: string;
    joined: string;
    avatarUrl: string;
  };
  tag: string;
  title: string;
  intro: string[];
  questions: string[];
}

// --- Internal Components (Defined within App scope as requested) ---
// 1. Icon Wrapper for the Header Actions
const ActionButton = ({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors   ${
      active
        ? "text-green-700 bg-green-50 font-medium"
        : "text-gray-600 hover:text-green-800 hover:bg-gray-50"
    }`}
  >
    <div className="bg-emerald-900 rounded-full p-2">
      <Icon
        size={18}
        className={active ? "fill-current text-white" : " text-white"}
      />
    </div>
    <span className="text-xs sm:text-sm font-medium">{label}</span>
  </button>
);

// 2. The Header Component
const Header = ({ onClick }: { onClick: () => void }) => (
  <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6 mb-2">
    <div className="flex items-center gap-3">
      <Button
        onClick={onClick}
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-color text-white hover:bg-green-900 transition-colors shadow-sm"
      >
        <ChevronLeft size={20} />
      </Button>
      <h1 className="text-lg sm:text-xl font-bold text-[#064E3B] tracking-tight">
        Ask a question/Start a New Discussions
      </h1>
    </div>

    <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
      <ActionButton icon={ThumbsUp} label="Like" />
      <ActionButton icon={ThumbsDown} label="Dislike" />
      <ActionButton icon={Heart} label="Save" />
      <ActionButton icon={Share2} label="Share" />
    </div>
  </header>
);

// 3. User Avatar Card Component
const UserProfileCard = ({ author }: { author: any }) => (
  <div className="flex-shrink-0 bg-white border border-green-600 rounded-lg p-3 w-full sm:w-40 flex flex-col items-center text-center shadow-sm">
    <div className="relative w-16 h-16 mb-2">
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}${author?.image}`}
        alt={author?.name}
        className="w-full h-full object-cover rounded-full border-2 border-orange-200"
      />
      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
    </div>
    <div className="text-xs font-bold text-gray-800 truncate w-full">
      {author?.name}
    </div>
    <div className="text-[10px] text-gray-500 font-medium mt-0.5">
      {costumFormatDate(author?.createdAt)}
    </div>
  </div>
);

// --- Main App Component ---

export default function page() {
  // Static data matching the image exactly
  const router = useRouter();

  const { id } = useParams();

  const [forumData, setForumData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<any>([]);

  const getForumsById = async () => {
    const response = await authFetch(`/forums/${id}`, {
      method: "GET",
      auth: false,
    });
    const result = await response.json();

    setForumData(result?.data?.result);
    setComments(result?.data?.commentsByForum);
    setLoading(false);
  };

  useEffect(() => {
    getForumsById();
  }, []);

  const cleanHTML = useMemo(
    () =>
      DOMPurify.sanitize(forumData?.description, {
        ALLOWED_TAGS: [
          "p",
          "br",
          "strong",
          "em",
          "u",
          "h1",
          "h2",
          "h3",
          "ul",
          "ol",
          "li",
          "a",
        ],
        ALLOWED_ATTR: ["href", "target", "rel"],
      }),
    [forumData?.description]
  );

  if (loading) {
    return (
      <div>
        <p>
          Loading... <Spinner />
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800  selection:bg-green-100 lg:px-0 px-4">
      <div className="max-w-7xl mx-auto ">
        {/* Top Hero Image - Using a landscape placeholder that mimics the aerial village view */}
        <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden mb-12 shadow-sm">
          <img
            src="/bg/Rectangle22.png"
            alt="Aerial view of African village architecture"
            className="w-full h-full object-cover transform hover:scale-101 transition-transform duration-700"
          />
        </div>

        {/* Header Section */}
        <Header onClick={() => router.back()} />

        {/* Main Content Card */}
        <div className="border border-green-600/30 rounded-4xl overflow-hidden shadow-sm bg-white">
          {/* Hero Section (Light Green Top) */}
          <div className="bg-[#efffd6] p-4 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {/* Left: User Profile */}
              <UserProfileCard author={forumData?.owner} />

              {/* Right: Title & Badge */}
              <div className="flex-1 space-y-3 sm:space-y-4">
                <CustomBadge>
                  GENERAL DISCUSSION ON AFRICAN INDIGENOUS ARCHITECTURE
                </CustomBadge>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#064E3B] leading-tight">
                  {forumData?.title}
                </h2>
              </div>
            </div>
          </div>

          {/* Body Content Section */}
          <div className="p-6 sm:p-10 md:px-12 md:py-10">
            <div className="prose max-w-full prose-headings:mb-2 prose-p:mb-1 prose-ul:mt-1 prose-ul:mb-1 prose-li:my-0 prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose -ul:text-gray-700 dark:prose-ul:text-gray-300 prose-li:text-gray-600 dark:prose-li:text-gray-400 prose-img:rounded-lg">
              {/* {forumData?.description && parse(forumData?.description)} */}
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: cleanHTML }}
              />
            </div>
            {/* {console.log(forumData?.description)} */}
            {/* {parse((forumData?.description as string) || "", options)} */}
            {/* <div dangerouslySetInnerHTML={{ __html: cleanHtml }} /> */}
          </div>
        </div>
        <div className="my-10">
          <CommentsSection
            comments={comments}
            forumData={forumData}
            onCommentAdded={getForumsById}
          />
        </div>
      </div>
    </div>
  );
}
