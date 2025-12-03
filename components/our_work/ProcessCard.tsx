import { SectionData } from "@/types/types";
import React from "react";
import SharedButton from "../shared/SharedButton";
import TimelineStep from "./TimelineStep";

interface ProcessCardProps {
  data: SectionData;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ data }) => {
  return (
    <div className="bg-accent-bg rounded-[2.5rem] p-6 md:p-10  w-full h-full flex flex-col">
      {/* Header of the Card */}
      <div className="flex  md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <h2 className="text-xl md:text-3xl font-bold text-primary-color  tracking-tight">
          {data.title}
        </h2>

        <SharedButton>{data.buttonText}</SharedButton>
      </div>

      {/* Timeline Steps */}
      <div className="flex-1 ">
        {data.steps.map((step, index) => (
          <TimelineStep
            key={step.id}
            step={step}
            isLast={index === data.steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ProcessCard;
