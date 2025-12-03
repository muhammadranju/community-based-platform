import React from "react";
import { StepList } from "./StepList";
import { GuideSectionData } from "@/types/types";
// import { SectionData } from '../types';
// import { StepList } from './StepList';

interface SectionCardProps {
  data: GuideSectionData;
}

export const SectionCard: React.FC<SectionCardProps> = ({ data }) => {
  return (
    <div className="flex flex-col mb-8 md:mb-12">
      {/* Header with Title and Dashed Line */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-primary-color mb-3">
          {data.id}. {data.title}
        </h2>
        <div className="w-full border-b-2 border-dotted border-primary-color/30"></div>
      </div>

      {/* Content */}
      <StepList steps={data.steps} />
    </div>
  );
};
