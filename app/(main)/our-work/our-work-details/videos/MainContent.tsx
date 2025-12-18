import React from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import CustomBadge from "@/components/shared/SharedBadge";

interface MainContentProps {
  details: CurrentVideoDetails;
}
export interface VideoData {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  duration: string;
}

export interface LearningPoint {
  id: number;
  text: string;
}

export interface CurrentVideoDetails {
  title: string;
  description: string;
  learningPoints: LearningPoint[];
}

export const MainContent: React.FC<MainContentProps> = ({ details }) => {
  return (
    <div className="mt-6 flex flex-col gap-6 md:gap-8">
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center rounded-full border border-lime-500 bg-gray-50 p-1">
            <Button className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-emerald-900 transition hover:bg-white bg-white hover:shadow-sm">
              <ThumbsUp className="h-4 w-4 text-lime-500" />
              <span>Like</span>
            </Button>
            <div className="h-4 w-px bg-gray-300"></div>
            <Button className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-emerald-900 transition hover:bg-white bg-white hover:shadow-sm">
              <ThumbsDown className="h-4 w-4 text-lime-500" />
              <span>Like</span>
            </Button>
          </div>

          <Button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-emerald-900 transition hover:border-brand-lime hover:text-brand-lime hover:bg-brand-bg">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Comments</span>
          </Button>
        </div>

        <Button className="flex items-center gap-2 rounded-full border border-lime-500 bg-brand-bg px-5 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-brand-lime hover:text-white shadow-sm">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>

      {/* Title & Badge */}
      <div className="space-y-3">
        <CustomBadge>Learn More</CustomBadge>
        <h1 className="text-2xl font-bold text-emerald-900 leading-tight md:text-3xl lg:text-4xl">
          {details.title}
        </h1>
      </div>

      {/* Description */}
      <div className="text-base leading-relaxed text-slate-600 md:text-lg">
        {details.description}
      </div>

      {/* Learning Points */}
      <div className="mt-2 rounded-2xl bg-gray-50 p-5 md:p-8 border border-gray-100">
        <h3 className="mb-4 text-lg md:text-xl font-bold text-emerald-900 flex items-center gap-2">
          What you'll learn in this video:
        </h3>
        {/* Dashed Separator */}
        <div className="mb-6 w-full border-t-2 border-dashed border-brand-green/20"></div>

        <div className="space-y-6">
          {details.learningPoints.map((point) => (
            <div key={point.id} className="group flex items-start gap-4">
              <div className="flex h-8 w-8 shrink-0 bg-lime-500 items-center justify-center rounded-full bg-brand-lime text-sm font-bold text-white shadow-sm transition-transform group-hover:scale-110 group-hover:bg-lime-600">
                {point.id}
              </div>
              <p className="pt-0.5 text-base text-slate-700 font-medium group-hover:text-lime-600 transition-colors">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
