"use client";
import React, { useState } from "react";
import { StepList } from "./StepList";
import { GuideSectionData } from "@/types/types";
import { ChevronDown } from "lucide-react";

interface SectionCardProps {
  data: GuideSectionData;
}

export const SectionCard: React.FC<SectionCardProps> = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col mb-4 md:mb-12">
      {/* Header - Clickable on mobile */}
      <div
        className="flex items-center justify-between cursor-pointer md:cursor-default mb-2 md:mb-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl md:text-2xl font-bold text-emerald-900">
          {data.id}. {data.title}
        </h2>
        <ChevronDown
          className={`w-6 h-6 text-emerald-900 md:hidden transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Desktop Separator - Only visible on desktop, under title */}
      <div className="hidden md:block w-full border-b-2 border-dotted border-emerald-900/30 mb-6"></div>

      {/* Content - Hidden on mobile if collapsed, always visible on desktop */}
      <div className={`${isExpanded ? "block" : "hidden"} md:block`}>
        <StepList steps={data.steps} />
      </div>

      {/* Mobile Separator - Visible at bottom of component on mobile */}
      <div className="md:hidden w-full border-b-2 border-dotted border-emerald-900/30 mt-4"></div>
    </div>
  );
};
