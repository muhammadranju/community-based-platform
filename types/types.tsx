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
  location: string;
  date: string;
}

export interface ArchiveItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  stats: {
    photos: number;
    videos: number;
    pdfs: number;
  };
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
