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
