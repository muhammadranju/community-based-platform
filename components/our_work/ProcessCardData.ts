import { ArchiveItem, ContentItem, SectionData } from "@/types/types";
import {
  User,
  FolderOpen,
  UploadCloud,
  FileText,
  ListChecks,
  Search,
  Bookmark,
  CheckSquare,
  MessageCircle,
} from "lucide-react";

export const CONTRIBUTE_DATA: SectionData = {
  title: "Contribute To The Archive",
  buttonText: "Create Account",
  steps: [
    {
      id: "c1",
      title: "Create Account",
      description: "Sign up with your Gmail account or email address",
      icon: User,
    },
    {
      id: "c2",
      title: "Navigate to Regional Folders",
      description:
        "Select the appropriate regional folder, and country for your content",
      icon: FolderOpen,
    },
    {
      id: "c3",
      title: "Upload Your Content",
      description: "Share images, videos and pdf documents of your content",
      icon: UploadCloud,
    },
    {
      id: "c4",
      title: "Name Files Properly",
      description:
        "Include a brief description, country and community/tribe name in all file names. Example - Mijikenda Indigenous Architecture from Kenya",
      icon: FileText,
    },
    {
      id: "c5",
      title: "Submit Your Content",
      description: "Hit the submit button and you are all good to go",
      icon: ListChecks,
    },
  ],
};

export const EXPLORE_DATA: SectionData = {
  title: "Explore The Archive",
  buttonText: "Explore Archive",
  steps: [
    {
      id: "e1",
      title: "Search",
      description: "Use the search tool to find specific content",
      icon: Search,
    },
    {
      id: "e2",
      title: "Folders",
      description: "Navigate to Regional Folders to explore content",
      icon: FolderOpen,
    },
    {
      id: "e3",
      title: "Save Content",
      description: "Favorite and save the content you like",
      icon: Bookmark,
    },
    {
      id: "e4",
      title: "Vote",
      description: "Up-vote your favorite content",
      icon: CheckSquare,
    },
    {
      id: "e5",
      title: "Comment",
      description: "Leave a thoughtful comment",
      icon: MessageCircle,
    },
  ],
};

export const ARCHIVE_DATA = [
  {
    id: 1,
    title: "East African Architecture",
    backgroundColor: "bg-[#D33733]",
    image: "/bg/Vector.png",
    icon: "/bg/pattern_bg.png",
    description:
      "Kenya, Tanzania, Uganda, Ethiopia, Somalia, Burundi, Rwanda, Djibouti, Comoros, Eritrea, Seychelles, Mauritius, South Sudan, Reunion, Mayotte, French Southernn and Antarctic Lands",
    borderColor: "border-[#D33733]",
    link: "east-african-architecture",
  },
  {
    id: 2,
    title: "Central African Architecture",
    backgroundColor: "bg-[#27662B]",
    image: "/bg/Vector_2.png",
    icon: "/bg/pattern_bg_2.png",
    description:
      "Cameroon, Equatorial Guinea, Gabon, Congo, Chad, Central African Republic, Congo - the Democratic Republic, São Tomé and Príncipe",
    borderColor: "border-[#27662B]",
    link: "central-african-architecture",
  },
  {
    id: 3,
    title: "West African Architecture",
    backgroundColor: "bg-[#254D82]",
    image: "/bg/Vector_3.jpg",
    icon: "/bg/pattern_bg_3.png",
    description:
      "Nigeria, Niger, Burkina Faso, Benin, Liberia, Ghana, The Gambia, Mali, Côte d'Ivoire, Senegal, Guinea, Togo, Sierra Leone, Guinea-Bissau, Mauritania, Cabot Verde, Saint-Helena, Ascension and Tristan da Cunha",
    borderColor: "border-[#254D82]",
    link: "west-african-architecture",
  },
  {
    id: 4,
    title: "South African Architecture",
    backgroundColor: "bg-[#D8B139]",
    icon: "/bg/pattern_bg_4.png",
    image: "/bg/Vector_4.jpg",
    description:
      "South Africa, Botswana, Namibia, Lesotho, Eswatini, Zimbabwe, Zambia, Mozambique, Angola, Malawi, Madagascar",
    borderColor: "border-[#D8B139]",
    link: "south-african-architecture",
  },
  {
    id: 5,
    title: "North African Architecture",
    backgroundColor: "bg-[#FB8E39]",
    image: "/bg/Vector_5.jpg",
    icon: "/bg/pattern_bg_5.png",
    description:
      "Algeria, Egypt, Libyan Arab Jamahiriya, Morocco, Tunisia, Western Sahara, Sudan.",
    borderColor: "border-[#FB8E39]",
    link: "north-african-architecture",
  },
  {
    id: 6,
    title: "African Architecture Globally",
    backgroundColor: "bg-[#6C2D62]",
    image: "/bg/Vector_6.jpg",
    icon: "/bg/pattern_bg_6.png",
    description:
      "Showcase how African Traditional Architecture has influenced spaces globally, and far beyond the continent, not only through the African diaspora",
    borderColor: "border-[#6C2D62]",
    link: "global-african-architecture",
  },
];

export const POPULAR_CONTENT: ContentItem[] = [
  {
    id: "p1",
    title: "Swahili Architecture",
    description:
      "Graceful arches, carved doors, and coral stone define Swahili architecture—a style born of African, Arab, Persian, and Indian influences. Journey",
    country: "Kenya",
    createdAt: "July 7, 2025",
    shortDescription: ":",
  },
  {
    id: "p2",
    title: "Fort Jesus",
    description:
      "Standing sentinel over Mombasa's harbor, Fort Jesus narrates a tale of conquest, trade, and resistance. Dive into its 16th-century Portuguese",
    country: "Kenya",
    createdAt: "July 7, 2025",
    shortDescription: "",
  },
];

export const COUNTRIES = [
  "Kenya",
  "Tanzania",
  "Uganda",
  "Ethiopia",
  "Somalia",
  "Burundi",
  "Rwanda",
  "Djibouti",
  "Comoros",
  "Eritrea",
  "Seychelles",
  "Mauritius",
  "South Sudan",
  "Réunion",
  "Mayotte",
];

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: "a1",
    title: "Manyatta",
    shortDescription: "Maasai Traditional home",
    coverImage: "/bg/folder-img-1.png",
    images: [
      "/bg/folder-img-1.png",
      "/bg/folder-img-2.png",
      "/bg/folder-img-1.png",
      "/bg/folder-img-2.png",
    ],
    medias: [
      "/bg/folder-img-1.png",
      "/bg/folder-img-2.png",
      "/bg/folder-img-1.png",
      "/bg/folder-img-2.png",
    ],
    pdfs: [
      "/bg/folder-img-1.png",
      "/bg/folder-img-2.png",
      "/bg/folder-img-1.png",
      "/bg/folder-img-2.png",
    ],
    slug: "manyatta",
  },
];
