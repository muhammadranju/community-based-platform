import { LucideIcon } from "lucide-react";

export interface StepData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface SectionData {
  title: string;
  buttonText: string;
  steps: StepData[];
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  country: string;
  createdAt: string;
  shortDescription: string;
  slug?: string;
  region?: string;
  coverImage?: string;
  images?: string[];
  medias?: string[];
  pdfs?: string[];
}

export interface ArchiveItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  coverImage: string;
  images?: string[];
  region?: string;
  medias?: string[];
  pdfs?: string[];
}

export interface StepItem {
  id: number;
  text: string;
  boldPrefix?: string; // For parts like "Timber branches:"
}

export interface GuideSectionData {
  id: string; // e.g., "A", "B"
  title: string;
  steps: StepItem[];
}
