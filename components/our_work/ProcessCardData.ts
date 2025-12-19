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
    link: "/our-work/east-african-architecture",
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
    link: "/our-work/central-african-architecture",
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
    link: "/our-work/west-african-architecture",
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
    link: "/our-work/south-african-architecture",
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
    link: "/our-work/north-african-architecture",
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
    link: "/our-work/african-architecture-globally",
  },
];

export const POPULAR_CONTENT: ContentItem[] = [
  {
    id: "p1",
    title: "Swahili Architecture",
    description:
      "Graceful arches, carved doors, and coral stone define Swahili architecture—a style born of African, Arab, Persian, and Indian influences. Journey",
    location: "Kenya",
    date: "July 7, 2025",
  },
  {
    id: "p2",
    title: "Fort Jesus",
    description:
      "Standing sentinel over Mombasa's harbor, Fort Jesus narrates a tale of conquest, trade, and resistance. Dive into its 16th-century Portuguese",
    location: "Kenya",
    date: "July 7, 2025",
  },
  {
    id: "p3",
    title: "Takwa Ruins",
    description:
      "On Lamu's Shela Island, the Takwa Ruins tell of a vanished Swahili town. Walk amidst hauntingly quiet mosques and stone",
    location: "Kenya",
    date: "July 7, 2025",
  },
  {
    id: "p4",
    title: "Gede Ruins",
    description:
      "Hidden in Kenya's coastal forest, the Gede Ruins whisper stories of a vanished Swahili city. Walk through coral-stone houses, intricate",
    location: "Kenya",
    date: "July 7, 2025",
  },
  {
    id: "p5",
    title: "Siyu Fort",
    description:
      "Tucked away on Lamu Island, Siyu Fort stands as a symbol of local resistance against foreign domination. Unveil its coral-rag",
    location: "Kenya",
    date: "July 7, 2025",
  },
  {
    id: "p6",
    title: "Mnarani Ruins",
    description:
      "Perched above the Kilifi Creek in Kenya, Mnarani Ruins reveal traces of a coastal civilization shaped by trade and Islam.",
    location: "Kenya",
    date: "July 7, 2025",
  },
  {
    id: "p7",
    title: "Tubali: Hausa Architecture",
    description:
      "Step into Tubali, the earth-built houses of the Hausa people in Nigeria. Admire intricate plaster patterns, vibrant color washes, and",
    location: "Kenya",
    date: "July 7, 2025",
  },
  {
    id: "p8",
    title: "Mbari Houses",
    description:
      "Among the Igbo people of Nigeria, Mbari houses are vibrant temples of art and spirituality. Step inside these sacred spaces,",
    location: "Kenya",
    date: "July 7, 2025",
  },
  {
    id: "p9",
    title: "Kano City: Mud Architecture",
    description:
      "In the heart of northern Nigeria, Kano's ancient mud architecture stands resilient and beautiful. Explore how the city's earth-built walls,",
    location: "Kenya",
    date: "July 7, 2025",
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
  "French Southern and Antarctic Lands",
];

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: "a1",
    title: "Manyatta",
    subtitle: "Maasai Traditional home",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Placeholder
    stats: { photos: 6, videos: 6, pdfs: 6 },
  },
  {
    id: "a2",
    title: "Manyatta",
    subtitle: "Maasai Traditional home",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Placeholder
    stats: { photos: 6, videos: 6, pdfs: 6 },
  },
  {
    id: "a3",
    title: "Manyatta",
    subtitle: "Maasai Traditional home",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Placeholder
    stats: { photos: 6, videos: 6, pdfs: 6 },
  },
  {
    id: "a4",
    title: "Manyatta",
    subtitle: "Maasai Traditional home",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Placeholder
    stats: { photos: 6, videos: 6, pdfs: 6 },
  },
  {
    id: "a5",
    title: "Manyatta",
    subtitle: "Maasai Traditional home",
    image:
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Placeholder
    stats: { photos: 6, videos: 6, pdfs: 6 },
  },
  {
    id: "a6",
    title: "Manyatta",
    subtitle: "Maasai Traditional home",
    image:
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Placeholder
    stats: { photos: 6, videos: 6, pdfs: 6 },
  },
];
