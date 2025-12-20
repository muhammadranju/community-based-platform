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
  iconType?:
    | "intro"
    | "bird"
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
        iconType: "intro",
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
        iconType: "bird",
      },
      {
        id: "ch-3",
        title: "Pre-colonial African Architecture",
        description:
          "Explore and talk about architectural practices before colonial influence - the purest form of Indigenous knowledge.",
        stats: {
          posts: "59",
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
        },
        link: "/forum/forum-details",
        iconType: "bird",
      },
      {
        id: "ch-4",
        title: "Architecture of African Kingdoms & Empires",
        description:
          "Discuss ancient cities like Benin, Lalibela, Timbuktu, and others that showcased architectural brilliance.",
        stats: {
          posts: "59",
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
        },
        iconType: "bird",
      },
      {
        id: "ch-5",
        title: "Colonial Impact on Indigenous Building Practices",
        description:
          "Unpack how colonization disrupted, erased, or transformed African architectural traditions.",
        stats: {
          posts: "59",
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
        },
        iconType: "bird",
      },
      {
        id: "ch-6",
        title: "Oral Histories & Storytelling Traditions",
        description:
          "Share or document stories passed down about homes, sacred spaces, and village structures.",
        stats: {
          posts: "59",
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
        },
        iconType: "bird",
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
      {
        id: "ri-2",
        title: "The Future of African Architecture",
        description:
          "Innovations, design philosophies, and emerging architects who are reshaping Africa's skyline with traditional roots.",
        stats: {
          posts: 59,
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
        },
        iconType: "rebuilding",
      },
      {
        id: "ri-3",
        title: "Blending INDIGENOUS & Modern Techniques",
        description:
          "List architecture around the world that has been heavily inspired by African Indigenous Architecture. This is to help us understand how African Indigenous knowledge has influenced and shaped architecture worldwide.",
        stats: {
          posts: 59,
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
        },
        iconType: "rebuilding",
      },
      {
        id: "ri-4",
        title: "Global architecture Inspired by African building designs",
        description:
          "Talk about the big picture. Ideas, opinions, questions, and trends related to traditional architecture across the continent.",
        stats: {
          posts: 59,
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
        },
        iconType: "rebuilding",
      },
      {
        id: "ri-5",
        title: "Reviving Lost Techniques and Materials",
        description:
          "How do we decolonize our education system so that we start recognizing our indigenous African ways of building? How do we unlearn and relearn our indigenous ways of building?",
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
      {
        id: "mc-2",
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
      {
        id: "mc-3",
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
      {
        id: "mc-4",
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
      {
        id: "ie-2",
        title: "Workshops, Webinars & Learning Opportunities",
        description:
          "Promote events, training, conferences, or community-led build sessions.",
        stats: {
          posts: 59,
          views: "1,441",
          lastUpdated: "Yesterday at 2:02 PM",
        },
        iconType: "interactive",
      },
      {
        id: "ie-3",
        title: "Showcase Your Project, Research or Traditional Home",
        description:
          "Upload images, walk us through your construction, or share architectural case studies.",
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
      {
        id: "cp-2",
        title: "Professional Networking Hub",
        description:
          "Find collaborators, hire talent, or share your portfolio.",
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
