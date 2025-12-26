export interface StatData {
  posts: number | string;
  views: string;
  lastUpdated: string;
  updatedBy?: string;
}

export interface TopicData {
  id: string | number;
  title: string;
  description: string;
  stats: StatData;
  link?: string;
  updatedAt?: string;
  iconType?:
    | "introductions"
    | "cultural"
    | "interactive"
    | "community"
    | "rebuilding"
    | "materials";
}

export interface SectionData {
  title?: string; // Optional because the first section in CulturalHistoricalDiscussions didn't have a title
  theme: "blue" | "green" | "purple" | "red" | "gold" | "orange";
  items: TopicData[];
}

export const forumSections: SectionData[] = [
  // --- Cultural & Historical Discussions (Part 1 - Blue) ---
  {
    title: "Introductions", // Added a title for consistency, though it might be rendered differently or hidden
    theme: "blue",
    items: [
      {
        id: "ch-1",
        title: "Introductions",
        description:
          "Share stories, ideas, pictures and anything related to topics Indigenous African Architecture.",
        stats: {
          posts: "59",
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
          updatedBy: "Historyenjoyer822",
        },
        link: "/forum/forum-details",
        iconType: "introductions",
      },
    ],
  },
  // --- Cultural & Historical Discussions (Part 2 - Green) ---
  {
    title: "Cultural & Historical Discussions",
    theme: "green",
    items: [
      {
        id: "ch-2",
        title: "General Discussion on African Indigenous Architecture",
        description:
          "Talk about the big picture. Ideas, opinions, questions, and trends related to traditional architecture across the continent.",
        stats: {
          posts: "59",
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
        },
        link: "/forum/forum-details",
        iconType: "cultural",
      },
    ],
  },
  // --- Rebuilding & Innovation (Gold) ---
  {
    title: "Rebuilding & Innovation",
    theme: "gold",
    items: [
      {
        id: "ri-1",
        title: "Rebuilding African Indigenous Architecture Today",
        description:
          "How are people restoring or reviving old architectural practices in the 21st century?",
        stats: {
          posts: 59,
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
        },
        iconType: "rebuilding",
      },
    ],
  },
  // --- Materials, Construction & Design (Orange) ---
  {
    title: "Materials, Construction & Design",
    theme: "orange",
    items: [
      {
        id: "mc-1",
        title: "Traditional Building Materials Across Africa",
        description:
          "Explore how different regions use local materials like bamboo, stone, mud, thatch, or animal hide to build Indigenous African homes.",
        stats: {
          posts: 59,
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
          updatedBy: "icantcomeupwithausername",
        },
        iconType: "materials",
      },
    ],
  },
  // --- Interactive & Engagement Spaces (Purple) ---
  {
    title: "Interactive & Engagement Spaces",
    theme: "purple",
    items: [
      {
        id: "ie-1",
        title: "Q&A – Ask an Expert",
        description:
          "Need advice? Have a question? Tag an expert or crowdsource knowledge.",
        stats: {
          posts: 59,
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
        },
        iconType: "interactive",
      },
    ],
  },
  // --- Community & Professional Networking (Red) ---
  {
    title: "Community & Professional Networking",
    theme: "red",
    items: [
      {
        id: "cp-1",
        title: "New and Prospective Homeowners Corner",
        description:
          "Planning to build a home inspired by African traditions? Ask questions, share progress, get help.",
        stats: {
          posts: 59,
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
          updatedBy: "icantcomeupwithausername",
        },
        iconType: "community",
      },
    ],
  },
];
