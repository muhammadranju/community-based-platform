import { StepData } from "@/types/types";
import React from "react";
interface TimelineStepProps {
  step: StepData;
  isLast: boolean;
}
const TimelineStep: React.FC<TimelineStepProps> = ({ step, isLast }) => {
  const Icon = step.icon;
  return (
    <div className="flex gap-6 w-full">
      {/* Icon Column */}
      <div className="flex flex-col items-center relative">
        {/* The Icon Circle */}
        <div className="w-12 h-12 rounded-full bg-lime-500 flex items-center justify-center z-10 shrink-0 text-white shadow-sm border-2 border-brand-beige">
          <Icon size={20} strokeWidth={2.5} />
        </div>
        {/* The Vertical Dashed Line - Only show if not last */}
        {!isLast && (
          <div className="w-px flex-1 border-l-4 border-dashed border-gray-400"></div>
        )}
      </div>
      {/* Content Column */}
      <div
        className={`pt-6 flex-1 ${
          !isLast ? "pb-3 border-b border-gray-800" : "pb-3"
        }`}
      >
        <h3 className="text-xl font-bold text-emerald-900 mb-1">
          {step.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
};
export default TimelineStep;
