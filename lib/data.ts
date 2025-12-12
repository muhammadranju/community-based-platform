import { GuideSectionData } from "@/types/types";

export const GUIDE_DATA: GuideSectionData[] = [
  {
    id: "A",
    title: "Site Selection",
    steps: [
      {
        id: 1,
        text: "The homestead (enkaji) is chosen by elders, typically on flat land with access to water and grazing areas.",
      },
      {
        id: 2,
        text: "A homestead may contain several houses built by women, arranged in a circular fence to protect against predators and thieves.",
      },
    ],
  },
  {
    id: "B",
    title: "Gathering Materials",
    steps: [
      {
        id: 1,
        boldPrefix: "Timber branches:",
        text: "Used to form the structure. Common sources include acacia or other local trees.",
      },
      {
        id: 2,
        boldPrefix: "Grass and thatch:",
        text: "For roofing.",
      },
      {
        id: 3,
        boldPrefix: "Cow dung and mud mixture:",
        text: "Used to plaster the walls and roof, acting as insulation and waterproofing.",
      },
      {
        id: 4,
        boldPrefix: "Ash or dry soil:",
        text: "Sometimes added for strengthening the plaster.",
      },
    ],
  },
  {
    id: "C",
    title: "Building the Framework",
    steps: [
      {
        id: 1,
        text: "Women build the house, starting by planting wooden poles in the ground to outline the oval or circular structure.",
      },
      {
        id: 2,
        text: "This mixture is pressed into the frame to form the walls, both inside and out.",
      },
      {
        id: 3,
        text: "Vines or strips of bark are used to bind and reinforce the frame.",
      },
    ],
  },
  {
    id: "D",
    title: "Wall Construction",
    steps: [
      {
        id: 1,
        text: "The framework is filled and coated with a thick mixture of mud, cow dung, and water.",
      },
      {
        id: 2,
        text: "This mixture is pressed into the frame to form the walls, both inside and out.",
      },
    ],
  },
  {
    id: "E",
    title: "Roof Construction",
    steps: [
      {
        id: 1,
        text: "A similar mud and dung mixture is applied over thatched grass or small branches to create a dome-like roof.",
      },
      {
        id: 2,
        text: "The roof is sloped to allow rainwater to run off.",
      },
    ],
  },
  {
    id: "F",
    title: "Wall Construction",
    steps: [
      {
        id: 1,
        text: "The framework is filled and coated with a thick mixture of mud, cow dung, and water.",
      },
      {
        id: 2,
        text: "This mixture is pressed into the frame to form the walls, both inside and out.",
      },
    ],
  },
  {
    id: "G",
    title: "Interior Design",
    steps: [
      {
        id: 1,
        text: "The house typically has one or two small rooms.",
      },
      {
        id: 2,
        text: "Interior walls or partitions are created with sticks and plaster.",
      },
      {
        id: 2, // Following the image numbering which had 1, 2, 2
        text: "There is a central hearth (fireplace) used for cooking and warmth.",
      },
    ],
  },
  {
    id: "H",
    title: "Final Touches",
    steps: [
      {
        id: 1,
        text: "Openings for a small door and tiny ventilation holes are made.",
      },
      {
        id: 2,
        text: "The entrance is usually very low, requiring people to crouch when entering.",
      },
      {
        id: 2, // Following image numbering
        text: "The entire home is continually maintained and re-plastered as needed, especially after rains.",
      },
    ],
  },
];

// --- Interfaces ---
export interface FloatingLabel {
  text: string;
  subText: string;
  positionClass: string; // Tailwind classes for positioning (e.g., "top-8 left-8")
}

export interface ArchitectureRegion {
  id: string;
  title: string;
  shortTitle: string; // For the card
  description: string;
  colorHex: string; // The main background color
  accentColorHex: string; // A slightly darker/lighter shade for accents if needed
  bgImage: string;
  mainImage: string;
  iconPath: string; // Path to the icon image
  labels: FloatingLabel[];
}

export const REGIONS: ArchitectureRegion[] = [
  {
    id: "east",
    title: "East African",
    shortTitle: "East African Architecture",
    description: "Explore the diverse structures of East Africa.",
    colorHex: "#B20500", // Red
    accentColorHex: "#8B0000",
    bgImage: "/bg/bg-1.jpg",
    mainImage: "/bg/east.png",
    iconPath: "East",
    labels: [
      {
        text: "Dorze Architecture",
        subText: "Ethiopia",
        positionClass: "top-1/3 left-8",
      },
      {
        text: "Guraghe Tukul",
        subText: "Ethiopia",
        positionClass: "top-12 right-12",
      },
    ],
  },
  {
    id: "central",
    title: "Central African",
    shortTitle: "Central African Architecture",
    description: "Discover the intricate earth architecture.",
    colorHex: "#37893C", // Green
    accentColorHex: "#1a5d1a",
    bgImage: "/bg/bg-2.jpg",
    mainImage: "/bg/central.png",
    iconPath: "Central",
    labels: [
      {
        text: "Mousgoum Architecture",
        subText: "Cameroon",
        positionClass: "top-10 left-10",
      },
      {
        text: "Bamum Architecture",
        subText: "Cameroon",
        positionClass: "bottom-20 right-10",
      },
    ],
  },
  {
    id: "west",
    title: "West African",
    shortTitle: "West African Architecture",
    description: "From the mud mosques of Mali to the Ashanti palaces.",
    colorHex: "#063391", // Blue
    accentColorHex: "#041E55",
    bgImage: "/bg/bg-3.jpg",
    mainImage: "/bg/west.png",
    iconPath: "West",
    labels: [
      {
        text: "Tiébélé Architecture",
        subText: "Burkina Faso",
        positionClass: "top-8 left-1/4",
      },
      {
        text: "Great Djenne Mosque",
        subText: "Mali",
        positionClass: "bottom-12 right-8",
      },
    ],
  },
  {
    id: "south",
    title: "South African",
    shortTitle: "South African Architecture",
    description: "Experience the unique designs of Southern Africa.",
    colorHex: "#C89D1F", // Yellow/Gold
    accentColorHex: "#9E7B15",
    bgImage: "/bg/bg-4.jpg",
    mainImage: "/bg/south.png",
    iconPath: "South",
    labels: [
      {
        text: "Eswatini Architecture",
        subText: "Eswatini",
        positionClass: "top-20 left-12",
      },
      {
        text: "Besakana Architecture",
        subText: "Madagascar",
        positionClass: "bottom-24 right-16",
      },
    ],
  },
  {
    id: "north",
    title: "North African",
    shortTitle: "North African Architecture",
    description: "The ancient medinas and desert fortresses.",
    colorHex: "#E26513", // Orange
    accentColorHex: "#A3460A",
    bgImage: "/bg/bg-5.jpg",
    mainImage: "/bg/north.png",
    iconPath: "North",
    labels: [
      {
        text: "Tamnit Palace",
        subText: "Adrar Algeria",
        positionClass: "top-16 left-16",
      },
      {
        text: "Berber Architecture",
        subText: "Algeria",
        positionClass: "bottom-32 right-8",
      },
    ],
  },
  {
    id: "global",
    title: "Global - African",
    shortTitle: "Global - African Architecture",
    description: "The influence of African architecture spreads globally.",
    colorHex: "#6C0544", // Purple
    accentColorHex: "#4A022E",
    bgImage: "/bg/bg-6.jpg",
    mainImage: "/bg/global.png",
    iconPath: "Global",
    labels: [
      {
        text: "Oyotunji African Village",
        subText: "South Carolina, USA",
        positionClass: "top-12 left-12",
      },
    ],
  },
];