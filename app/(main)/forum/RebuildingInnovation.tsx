import React from "react";

// --- Types ---
interface StatData {
  posts: number;
  views: string;
  lastUpdated: string;
  updatedBy?: string;
}

interface TopicData {
  id: string;
  title: string;
  description: string;
  stats: StatData;
}

interface SectionData {
  title: string;
  theme: "gold" | "orange";
  items: TopicData[];
}

// --- Icons ---

// The geometric knot icon for the "Rebuilding" section
const KnotIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 10v4m4-10v4m6 6v4m-4-10h4m-10 6h4m0-4h-4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// The scale/balance icon for the "Materials" section
const ScaleIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 3v18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M6 8h12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M6 8v6a3 3 0 006 0" stroke="currentColor" strokeWidth="2" />
    <path d="M18 8v6a3 3 0 01-6 0" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// --- Internal Components ---

const StatItem = ({
  label,
  value,
  subValue,
  align = "left",
}: {
  label: string;
  value: string | number;
  subValue?: string;
  align?: "left" | "right";
}) => (
  <div
    className={`flex flex-col ${
      align === "right" ? "items-end text-right" : "items-start text-left"
    }`}
  >
    <span className="text-[10px] sm:text-[11px] font-bold text-gray-800 uppercase tracking-wide mb-1">
      {label}
    </span>
    <span className="text-xs sm:text-sm text-gray-500 font-medium">
      {value}
    </span>
    {subValue && (
      <span className="text-[10px] text-gray-400 mt-0.5">{subValue}</span>
    )}
  </div>
);

const TopicCard = ({
  item,
  theme,
}: {
  item: TopicData;
  theme: "gold" | "orange";
}) => {
  // Theme configuration
  const styles = {
    gold: {
      border: "border-[#E8DAB2]",
      iconBg: "bg-white",
      iconBorder: "border-[#D4AF37]",
      iconColor: "text-[#2C3E30]", // Dark greenish/black for the symbol itself
      ringColor: "ring-[#D4AF37]",
    },
    orange: {
      border: "border-[#F2D0B8]",
      iconBg: "bg-white",
      iconBorder: "border-[#E86C30]",
      iconColor: "text-[#E86C30]",
      ringColor: "ring-[#E86C30]",
    },
  };

  const currentStyle = styles[theme];

  return (
    <div
      className={`group relative bg-white rounded-2xl border ${currentStyle.border} p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row gap-6 items-start md:items-center`}
    >
      {/* Icon Area */}
      <div className="flex-shrink-0">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[3px] ${currentStyle.iconBorder} flex items-center justify-center ${currentStyle.iconBg}`}
        >
          {theme === "gold" ? (
            <KnotIcon
              className={`w-6 h-6 sm:w-7 sm:h-7 ${currentStyle.iconColor}`}
            />
          ) : (
            <ScaleIcon
              className={`w-6 h-6 sm:w-7 sm:h-7 ${currentStyle.iconColor}`}
            />
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow min-w-0 pr-4">
        <h3 className="text-[15px] sm:text-[17px] font-bold text-[#1B4D3E] mb-1 sm:mb-2 leading-tight group-hover:text-[#2C6E56] transition-colors">
          {item.title}
        </h3>
        <p className="text-[13px] sm:text-[14px] text-gray-500 leading-relaxed font-normal">
          {item.description}
        </p>
      </div>

      {/* Divider (Hidden on mobile, visible on md+) */}
      <div className="hidden md:block w-px h-16 bg-gray-200 mx-2 self-center"></div>

      {/* Stats Area */}
      {/* Mobile: Full width grid, Desktop: Fixed width flex */}
      <div className="w-full md:w-auto md:min-w-[280px] flex flex-row justify-between md:justify-start gap-4 md:gap-8 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 mt-2 md:mt-0">
        {/* Posts */}
        <div className="min-w-[40px]">
          <StatItem label="POSTS" value={item.stats.posts} />
        </div>

        {/* Views */}
        <div className="min-w-[40px]">
          <StatItem label="VIEWS" value={item.stats.views} />
        </div>

        {/* Last Updated */}
        <div className="flex-grow md:flex-grow-0 min-w-[100px]">
          <StatItem
            label="LAST UPDATED"
            value={item.stats.lastUpdated}
            subValue={item.stats.updatedBy}
          />
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({
  title,
  theme,
}: {
  title: string;
  theme: "gold" | "orange";
}) => {
  const textColors = {
    gold: "text-[#C59B26]", // Muted gold
    orange: "text-[#E86C30]", // Burnt orange
  };

  return (
    <h2
      className={`text-xl sm:text-2xl font-bold mb-6 ${textColors[theme]} tracking-tight`}
    >
      {title}
    </h2>
  );
};

// --- Main Application ---

const RebuildingInnovation: React.FC = () => {
  // Data definition matching the image
  const sections: SectionData[] = [
    {
      title: "Rebuilding & Innovation",
      theme: "gold",
      items: [
        {
          id: "1",
          title: "Rebuilding African Indigenous Architecture Today",
          description:
            "How are people restoring or reviving old architectural practices in the 21st century?",
          stats: {
            posts: 59,
            views: "1,441",
            lastUpdated: "Yesterday at 2:02 PM",
          },
        },
        {
          id: "2",
          title: "The Future of African Architecture",
          description:
            "Innovations, design philosophies, and emerging architects who are reshaping Africa's skyline with traditional roots.",
          stats: {
            posts: 59,
            views: "1,441",
            lastUpdated: "Yesterday at 2:02 PM",
          },
        },
        {
          id: "3",
          title: "Blending INDIGENOUS & Modern Techniques",
          description:
            "List architecture around the world that has been heavily inspired by African Indigenous Architecture. This is to help us understand how African Indigenous knowledge has influenced and shaped architecture worldwide.",
          stats: {
            posts: 59,
            views: "1,441",
            lastUpdated: "Yesterday at 2:02 PM",
          },
        },
        {
          id: "4",
          title: "Global architecture Inspired by African building designs",
          description:
            "Talk about the big picture. Ideas, opinions, questions, and trends related to traditional architecture across the continent.",
          stats: {
            posts: 59,
            views: "1,441",
            lastUpdated: "Yesterday at 2:02 PM",
          },
        },
        {
          id: "5",
          title: "Reviving Lost Techniques and Materials",
          description:
            "How do we decolonize our education system so that we start recognizing our indigenous African ways of building? How do we unlearn and relearn our indigenous ways of building?",
          stats: {
            posts: 59,
            views: "1,441",
            lastUpdated: "Yesterday at 2:02 PM",
          },
        },
      ],
    },

    {
      title: "Materials, Construction & Design",
      theme: "orange",
      items: [
        {
          id: "6",
          title: "Traditional Building Materials Across Africa",
          description:
            "Explore how different regions use local materials like bamboo, stone, mud, thatch, or animal hide to build Indigenous African homes.",
          stats: {
            posts: 59,
            views: "1,441",
            lastUpdated: "Yesterday at 2:02 PM",
            updatedBy: "icantcomeupwithausername",
          },
        },
        {
          id: "6",
          title: "Traditional Building Materials Across Africa",
          description:
            "Explore how different regions use local materials like bamboo, stone, mud, thatch, or animal hide to build Indigenous African homes.",
          stats: {
            posts: 59,
            views: "1,441",
            lastUpdated: "Yesterday at 2:02 PM",
            updatedBy: "icantcomeupwithausername",
          },
        },
        {
          id: "6",
          title: "Traditional Building Materials Across Africa",
          description:
            "Explore how different regions use local materials like bamboo, stone, mud, thatch, or animal hide to build Indigenous African homes.",
          stats: {
            posts: 59,
            views: "1,441",
            lastUpdated: "Yesterday at 2:02 PM",
            updatedBy: "icantcomeupwithausername",
          },
        },
        {
          id: "6",
          title: "Traditional Building Materials Across Africa",
          description:
            "Explore how different regions use local materials like bamboo, stone, mud, thatch, or animal hide to build Indigenous African homes.",
          stats: {
            posts: 59,
            views: "1,441",
            lastUpdated: "Yesterday at 2:02 PM",
            updatedBy: "icantcomeupwithausername",
          },
        },
      ],
    },
  ];

  return (
    <>
      <div className="space-y-12 lg:mb-12 mb-12">
        {/* Loop through sections */}
        {sections.map((section, idx) => (
          <div key={idx} className="w-full">
            <SectionHeader title={section.title} theme={section.theme} />

            <div className="space-y-4">
              {section.items.map((item) => (
                <TopicCard key={item.id} item={item} theme={section.theme} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RebuildingInnovation;
