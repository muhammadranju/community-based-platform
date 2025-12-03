import { StepItem } from "@/types/types";
import React from "react";
// import { StepItem } from "../types";

interface StepListProps {
  steps: StepItem[];
}

export const StepList: React.FC<StepListProps> = ({ steps }) => {
  return (
    <div className="flex flex-col space-y-5">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-row items-start gap-4">
          {/* Number Circle */}
          <div className="shrink-0">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-color text-white font-bold text-sm leading-none pt-0.5">
              {step.id}
            </div>
          </div>

          {/* Text Content */}
          <div className="text-primary-color text-[15px] leading-relaxed font-normal">
            {step.boldPrefix && (
              <span className="font-bold text-primary-color mr-1">
                {step.boldPrefix}
              </span>
            )}
            {step.text}
          </div>
        </div>
      ))}
    </div>
  );
};
