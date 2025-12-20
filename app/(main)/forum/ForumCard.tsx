import { Clock, Eye, MessageSquare, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { TopicData } from "./forumData";

interface ForumCardProps {
  data: TopicData;
  theme: "blue" | "green" | "purple" | "red" | "gold" | "orange";
}

// Stats Block for Desktop
const StatBlock = ({
  label,
  value,
  isLast = false,
  colorClass,
}: {
  label: string;
  value: string | number;
  isLast?: boolean;
  colorClass: string;
}) => (
  <div
    className={`flex flex-col justify-center px-4 md:px-6 ${
      !isLast ? "border-r border-gray-200 hidden md:flex" : ""
    }`}
  >
    <span
      className={`text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-1 ${colorClass}`}
    >
      {label}
    </span>
    <span
      className={`text-xs md:text-sm font-semibold truncate max-w-[120px] text-gray-700`}
    >
      {value}
    </span>
  </div>
);

// Mobile Stats Row
const MobileStatRow = ({
  posts,
  views,
  lastUpdated,
  updatedBy,
}: {
  posts: string | number;
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
      <MessageSquare className="w-3 h-3" />
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

export const ForumCard: React.FC<ForumCardProps> = ({ data, theme }) => {
  // Theme Configuration
  const themeStyles = {
    blue: {
      border: "border-blue-700/50",
      hover: "hover:border-blue-300",
      iconBg: "bg-white border-blue-900 border-4",
      title: "text-blue-900",
      statLabel: "text-blue-900",
    },
    green: {
      border: "border-emerald-700/50",
      hover: "hover:border-emerald-300",
      iconBg: "bg-white border-emerald-700 border-4",
      title: "text-emerald-900",
      statLabel: "text-emerald-900",
    },
    purple: {
      border: "border-[#6C0544]",
      hover: "hover:border-purple-300",
      iconBg: "bg-white border-[#6C0544] border-4",
      title: "text-[#1B4D3E]",
      statLabel: "text-gray-800",
    },
    red: {
      border: "border-[#B20500]",
      hover: "hover:border-red-300",
      iconBg: "bg-white border-[#B20500] border-4",
      title: "text-[#1B4D3E]",
      statLabel: "text-gray-800",
    },
    gold: {
      border: "border-[#E8DAB2]",
      hover: "hover:border-[#D4AF37]",
      iconBg: "bg-white border-[#D4AF37] border-4",
      title: "text-[#1B4D3E]",
      statLabel: "text-gray-800",
    },
    orange: {
      border: "border-[#F2D0B8]",
      hover: "hover:border-[#E86C30]",
      iconBg: "bg-white border-[#E86C30] border-4",
      title: "text-[#1B4D3E]",
      statLabel: "text-gray-800",
    },
  };

  const currentStyle = themeStyles[theme];

  // Helper to get Icon
  const getIcon = () => {
    switch (data.iconType) {
      case "intro":
        return (
          <img
            src="/Icons/Introductions.png"
            alt="Intro"
            className="w-full h-full object-contain p-2"
          />
        );
      case "bird":
        return (
          <img
            src="/Icons/Cultural.png"
            alt="Cultural"
            className="w-full h-full object-contain p-2"
          />
        );
      case "interactive":
        return (
          <img
            src="/Icons/Interactive.png"
            alt="Interactive"
            className="w-full h-full object-contain p-2"
          />
        );
      case "community":
        return (
          <img
            src="/Icons/Community.png"
            alt="Community"
            className="w-full h-full object-contain p-2"
          />
        );
      case "rebuilding":
        return (
          <img
            src="/Icons/Rebuilding.png"
            alt="Rebuilding"
            className="w-full h-full object-contain p-2"
          />
        );
      case "materials":
        return (
          <img
            src="/Icons/Materials.png"
            alt="Materials"
            className="w-full h-full object-contain p-2"
          />
        );
      default:
        return <MessageSquare className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div
      className={`group relative bg-white rounded-2xl border ${currentStyle.border} ${currentStyle.hover} transition-all duration-200 shadow-sm p-5 md:p-6 mb-4`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        {/* Icon Section */}
        <div className="shrink-0">
          <div
            className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center ${currentStyle.iconBg}`}
          >
            {getIcon()}
          </div>
        </div>

        {/* Content Section */}
        <div className="grow min-w-0 pr-4">
          <Link href={data?.link || "#"}>
            <h3
              className={`text-lg md:text-xl font-bold ${currentStyle.title} mb-2 leading-tight group-hover:opacity-80 transition-opacity`}
            >
              {data.title}
            </h3>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            {data.description}
          </p>

          <MobileStatRow
            posts={data.stats.posts}
            views={data.stats.views}
            lastUpdated={data.stats.lastUpdated}
            updatedBy={data.stats.updatedBy}
          />
        </div>

        {/* Desktop Stats Section */}
        <div className="hidden md:flex items-center shrink-0 border-l border-gray-200 pl-2 h-full min-h-[60px]">
          <StatBlock
            label="POSTS"
            value={data.stats.posts}
            colorClass={currentStyle.statLabel}
          />
          <StatBlock
            label="VIEWS"
            value={data.stats.views}
            colorClass={currentStyle.statLabel}
          />
          <div className="flex flex-col justify-center px-6">
            <span
              className={`text-[10px] md:text-[11px] font-bold uppercase tracking-wider mb-1 ${currentStyle.statLabel}`}
            >
              LAST UPDATED
            </span>
            <span className="text-xs md:text-sm font-semibold text-gray-700 mb-1">
              {data.stats.lastUpdated}
            </span>
            {data.stats.updatedBy && (
              <span className="text-[10px] text-gray-500 font-medium">
                {data.stats.updatedBy}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
