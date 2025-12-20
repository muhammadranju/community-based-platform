import React, { useState } from "react";
import { StepList } from "./StepList";
import { GuideSectionData } from "@/types/types";
import { ChevronDown } from "lucide-react";

interface SectionCardProps {
  data: GuideSectionData;
}

export const SectionCard: React.FC<SectionCardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col mb-8 md:mb-12">
      {/* Header with Title and Dashed Line */}
      <div className="mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between group md:cursor-default"
        >
          <h2 className="text-xl md:text-2xl font-bold text-emerald-900 mb-3 text-left">
            {data.id}. {data.title}
          </h2>
          <ChevronDown
            className={`w-6 h-6 text-emerald-900 transition-transform duration-300 md:hidden ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div className="w-full border-b-2 border-dotted border-emerald-900/30"></div>
      </div>

      {/* Content - Hidden on mobile unless open, always visible on desktop */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden md:block ${
          isOpen
            ? "max-h-[1000px] opacity-100"
            : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
        }`}
      >
        <StepList steps={data.steps} />
      </div>
    </div>
  );
};
