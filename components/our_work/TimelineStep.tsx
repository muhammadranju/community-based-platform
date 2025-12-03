import { StepData } from "@/types/types";
import React from "react";

interface TimelineStepProps {
  step: StepData;
  isLast: boolean;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ step, isLast }) => {
  const Icon = step.icon;

  return (
    <div className="flex gap-6 relative">
      {/* Icon Column */}
      <div className="flex flex-col items-center">
        {/* The Icon Circle */}
        <div className="w-12 h-12 rounded-full bg-accent-color flex items-center justify-center z-10 shrink-0 text-white shadow-sm border-2 border-brand-beige">
          <Icon size={20} strokeWidth={2.5} />
        </div>

        {/* The Vertical Dashed Line - Only show if not last */}
        {!isLast && (
          <div
            className="w-px h-full border-l-4 border-dashed border-gray-500 absolute top-12 left-6 -translate-x-1/2 -z-0"
            style={{ height: "calc(100% - 10px)" }}
          ></div>
        )}
      </div>

      {/* Content Column */}
      <div className="py-10 pt-1">
        <h3 className="text-xl font-bold text-primary-color mb-1 ">
          {step.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed border-b border-gray-300 pb-4">
          {step.description}
        </p>
      </div>
    </div>
  );
};

export default TimelineStep;
