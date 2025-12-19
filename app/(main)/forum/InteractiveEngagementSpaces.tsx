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
  theme: "purple" | "red";
  items: TopicData[];
}

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
  theme: "purple" | "red";
}) => {
  // Theme configuration
  const styles = {
    purple: {
      border: "border-[#6C0544] ",
      iconBg: "bg-white",
      iconBorder: "border-[#6C0544] p-2 ",
      iconColor: "text-[#6C0544]", // Dark greenish/black for the symbol itself
      ringColor: "ring-[#6C0544]",
    },
    red: {
      border: "border-[#B20500] ",
      iconBg: "bg-white",
      iconBorder: "border-[#B20500] p-2 ",
      iconColor: "text-[#B20500]",
      ringColor: "ring-[#B20500]",
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
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-6 ${currentStyle.iconBorder} flex items-center justify-center ${currentStyle.iconBg}`}
        >
          {theme === "purple" ? (
            <img src="/Icons/Interactive.png" alt="" />
          ) : (
            // <KnotIcon
            //   className={`w-6 h-6 sm:w-7 sm:h-7 ${currentStyle.iconColor}`}
            // />
            <img src="/Icons/Community.png" alt="" />
            // <ScaleIcon
            //   className={`w-6 h-6 sm:w-7 sm:h-7 ${currentStyle.iconColor}`}
            // />
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
  theme: "purple" | "red";
}) => {
  const textColors = {
    purple: "text-[#C59B26]", // Muted gold
    red: "text-[#E86C30]", // Burnt orange
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

const InteractiveEngagementSpaces: React.FC = () => {
  // Data definition matching the image
  const sections: SectionData[] = [
    {
      title: "Interactive & Engagement Spaces",
      theme: "purple",
      items: [
        {
          id: "1",
          title: "Q&A – Ask an Expert",
          description:
            "Need advice? Have a question? Tag an expert or crowdsource knowledge.",
          stats: {
            posts: 59,
            views: "1,441",
            lastUpdated: "Yesterday at 2:02 PM",
          },
        },
        {
          id: "2",
          title: "Workshops, Webinars & Learning Opportunities",
          description:
            "Promote events, training, conferences, or community-led build sessions.",
          stats: {
            posts: 59,
            views: "1,441",
            lastUpdated: "Yesterday at 2:02 PM",
          },
        },
        {
          id: "3",
          title: "Showcase Your Project, Research or Traditional Home",
          description:
            "Upload images, walk us through your construction, or share architectural case studies.",
          stats: {
            posts: 59,
            views: "1,441",
            lastUpdated: "Yesterday at 2:02 PM",
          },
        },
      ],
    },

    {
      title: "Community & Professional Networking",
      theme: "red",
      items: [
        {
          id: "6",
          title: "New and Prospective Homeowners Corner",
          description:
            "Planning to build a home inspired by African traditions? Ask questions, share progress, get help.",
          stats: {
            posts: 59,
            views: "1,441",
            lastUpdated: "Yesterday at 2:02 PM",
            updatedBy: "icantcomeupwithausername",
          },
        },
        {
          id: "6",
          title: "Professional Networking Hub",
          description:
            "Find collaborators, hire talent, or share your portfolio.",
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

export default InteractiveEngagementSpaces;
