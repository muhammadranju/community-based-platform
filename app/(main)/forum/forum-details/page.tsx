"use client";
import {
  ArrowRight,
  Bird,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Infinity,
  MessageSquare,
  Search,
  User,
} from "lucide-react";
import Link from "next/link";
import { HeaderSection } from "../ForumHeaderSection";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ForumBanner } from "../ForumBanner";

// --- Types ---
interface DiscussionData {
  id: number;
  title: string;
  description: string;
  posts: string;
  views: string;
  lastUpdated: string;
  updatedBy?: string;
  variant: "blue" | "green";
  iconType: "intro" | "bird";
  link?: string;
}

// --- Mock Data ---
const discussions: DiscussionData[] = [
  {
    id: 2,
    title: "General Discussion on African Indigenous Architecture",
    description:
      "Talk about the big picture. Ideas, opinions, questions, and trends related to traditional architecture across the continent.",
    posts: "59",
    views: "1,441",
    lastUpdated: "Yesterday at 2:02 PM",
    variant: "green",
    iconType: "bird",
    link: "/forum/forum-details/2",
  },
  {
    id: 3,
    title: "Pre-colonial African Architecture",
    description:
      "Explore and talk about architectural practices before colonial influence - the purest form of Indigenous knowledge.",
    posts: "59",
    views: "1,441",
    lastUpdated: "Yesterday at 2:02 PM",
    variant: "green",
    iconType: "bird",
    link: "/forum/forum-details/3",
  },
  {
    id: 4,
    title: "Architecture of African Kingdoms & Empires",
    description:
      "Discuss ancient cities like Benin, Lalibela, Timbuktu, and others that showcased architectural brilliance.",
    posts: "59",
    views: "1,441",
    lastUpdated: "Yesterday at 2:02 PM",
    variant: "green",
    iconType: "bird",
    link: "/forum/forum-details/4",
  },
  {
    id: 5,
    title: "Colonial Impact on Indigenous Building Practices",
    description:
      "Unpack how colonization disrupted, erased, or transformed African architectural traditions.",
    posts: "59",
    views: "1,441",
    lastUpdated: "Yesterday at 2:02 PM",
    variant: "green",
    iconType: "bird",
  },
  {
    id: 6,
    title: "Oral Histories & Storytelling Traditions",
    description:
      "Share or document stories passed down about homes, sacred spaces, and village structures.",
    posts: "59",
    views: "1,441",
    lastUpdated: "Yesterday at 2:02 PM",
    variant: "green",
    iconType: "bird",
  },
];

const StatBlock = ({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) => (
  <div
    className={`flex flex-col justify-center px-4 md:px-6 ${
      !isLast ? "border-r border-gray-200 hidden md:flex" : ""
    }`}
  >
    <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
      {label}
    </span>
    <span className="text-xs md:text-sm font-semibold text-gray-700 truncate max-w-[120px]">
      {value}
    </span>
  </div>
);

// Mobile specific stat block to handle layout differently on small screens
const MobileStatRow = ({
  posts,
  views,
  lastUpdated,
  updatedBy,
}: {
  posts: string;
  views: string;
  lastUpdated: string;
  updatedBy?: string;
}) => (
  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-4 md:hidden text-xs text-gray-500 border-t border-gray-100 pt-3 w-full">
    <div className="flex items-center gap-1">
      <MessageSquare className="w-3 h-3" />
      <span className="font-medium">{posts} Posts</span>
    </div>
    <div className="flex items-center gap-1">
      <Eye className="w-3 h-3" />
      <span className="font-medium">{views} Views</span>
    </div>
    <div className="flex items-center gap-1 w-full sm:w-auto">
      <Clock className="w-3 h-3" />
      <span className="truncate">Updated: {lastUpdated}</span>
    </div>
    {updatedBy && (
      <div className="flex items-center gap-1 w-full sm:w-auto">
        <User className="w-3 h-3" />
        <span className="truncate">By: {updatedBy}</span>
      </div>
    )}
  </div>
);

/**
 * ForumCard Component
 * Main component for displaying a discussion topic
 */
const ForumCard = ({ data }: { data: DiscussionData }) => {
  const isBlue = data.variant === "blue";

  // Styles based on variant
  const containerBorder = isBlue
    ? "border-blue-700/50"
    : "border-emerald-700/50";
  const containerHover = isBlue
    ? "hover:border-blue-300"
    : "hover:border-emerald-300";
  const iconBg = isBlue
    ? "bg-white border-6 border-blue-900 p-2"
    : "bg-white border-6 border-emerald-700 p-2";
  const iconColor = isBlue ? "text-blue-900" : "text-emerald-700";
  const titleColor = isBlue ? "text-blue-900" : "text-emerald-700";

  return (
    <div
      className={`group relative bg-white rounded-2xl border ${containerBorder} ${containerHover} transition-all duration-200 shadow-sm p-5 md:p-6 mb-4`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        {/* Icon Section */}
        <div className="flex-shrink-0">
          <div
            className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center ${iconBg}`}
          >
            {data.iconType === "intro" ? (
              <img src="/Icons/Introductions.png" alt="" />
            ) : (
              <img src="/Icons/Cultural.png" alt="" />
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow min-w-0 pr-4">
          <Link href={data.link || "#"}>
            <h3
              className={`text-lg md:text-xl font-bold ${titleColor} mb-2 leading-tight`}
            >
              {data.title}
            </h3>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            {data.description}
          </p>

          {/* Mobile Stats (Visible only on mobile) */}
          <MobileStatRow
            posts={data.posts}
            views={data.views}
            lastUpdated={data.lastUpdated}
            updatedBy={data.updatedBy}
          />
        </div>

        {/* Desktop Stats Section (Hidden on mobile, Flex on md) */}
        <div className="hidden md:flex items-center flex-shrink-0 border-l border-gray-200 pl-2 h-full min-h-[60px]">
          <StatBlock label="POSTS" value={data.posts} />
          <StatBlock label="VIEWS" value={data.views} />
          <div className="flex flex-col justify-center px-6">
            <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
              LAST UPDATED
            </span>
            <span className="text-xs md:text-sm font-semibold text-gray-700 mb-1">
              {data.lastUpdated}
            </span>
            {data.updatedBy && (
              <span className="text-[10px] text-green-700 font-medium">
                {data.updatedBy}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function page() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 lg:px-0">
      {/* Top Hero Image - Using a landscape placeholder that mimics the aerial village view */}
      <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden mb-12 shadow-sm">
        <img
          src="/bg/Rectangle8.png"
          alt="Aerial view of African village architecture"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content Section */}
      <Button
        onClick={() => router.back()}
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-color text-white hover:bg-green-900 transition-colors shadow-sm mb-5"
      >
        <ChevronLeft size={20} />
      </Button>
      {/* Content Section */}
      <HeaderSection
        title="Cultural & Historical Discussions"
        description="General Discussion on African Indigenous Architecture"
      />
      <ForumBanner />
      <div className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-color tracking-tight leading-tight">
              Ask a question/Start <br className="hidden md:block" /> a New
              Discussions
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-80 md:w-96 group  rounded-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-orange-400" />
              </div>

              <Input
                placeholder="Search Forum"
                className="w-full pl-10 pr-12 py-6 rounded-lg border bg-accent-bg border-emerald-900 text-sm placeholder-gray-500 transition-all"
              />
              <Button className="absolute inset-y-[7px] right-1 px-3  bg-amber-700 hover:bg-amber-600 text-white rounded-md flex items-center justify-center transition-colors">
                <ArrowRight className="h-4 w-4 " />
              </Button>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button className="flex-1 sm:flex-none px-6 py-6 bg-transparent rounded-full border border-amber-600 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors">
                Topics
              </Button>
              <Button className="flex-1 sm:flex-none px-6 py-6 bg-transparent rounded-full border border-amber-600 text-sm font-semibold text-gray-700 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                Posts
              </Button>
            </div>
          </div>
        </div>

        {/* Discussions List */}
        <div className="space-y-8">
          {/* Section 2: Cultural & Historical */}
          <div className="space-y-6">
            <div className="space-y-4">
              {discussions
                .filter((d) => d.variant === "green")
                .map((discussion) => (
                  <ForumCard key={discussion.id} data={discussion} />
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Pagination />
      </div>
    </div>
  );
}

const Pagination = () => {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-primary-color transition-colors">
        <ChevronLeft size={20} />
      </button>

      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-highlight bg-lime-50 text-primary font-medium flex items-center justify-center">
        1
      </button>
      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 text-gray-500 font-medium flex items-center justify-center hover:bg-gray-50">
        2
      </button>
      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 text-gray-500 font-medium flex items-center justify-center hover:bg-gray-50">
        3
      </button>
      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 text-gray-500 font-medium flex items-center justify-center hover:bg-gray-50">
        4
      </button>

      <div className="text-gray-400 font-bold px-1 text-lg">...</div>

      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 text-gray-500 font-medium flex items-center justify-center hover:bg-gray-50">
        21
      </button>

      <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-primary-color transition-colors">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
