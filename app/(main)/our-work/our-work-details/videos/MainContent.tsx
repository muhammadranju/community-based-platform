import React from "react";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import CustomBadge from "@/components/shared/SharedBadge";
import { toast } from "sonner";

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
    <div className="mt-6 flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto">
      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center rounded-full border border-lime-500 bg-gray-50 p-1">
            <Button
              onClick={() => toast.success("Liked successfully!")}
              className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-emerald-900 transition hover:bg-white bg-white"
            >
              <ThumbsUp className="h-4 w-4 text-lime-500" />
              <span>Like</span>
            </Button>
            <div className="h-4 w-px bg-gray-300"></div>
            <Button
              onClick={() => toast.info("Disliked successfully!")}
              className="flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-emerald-900 transition hover:bg-white bg-white"
            >
              <ThumbsDown className="h-4 w-4 text-lime-500" />
              <span>Dislike</span>
            </Button>
          </div>

          <Button className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-emerald-900 transition hover:border-brand-lime hover:text-brand-lime hover:bg-brand-bg">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Comments</span>
          </Button>
        </div>

        <Button
          onClick={() => toast.success("Shared successfully!")}
          className="flex items-center gap-2 rounded-full border border-lime-500 bg-brand-bg px-5 py-2 text-sm font-semibold text-emerald-900 transition hover:bg-brand-lime  shadow-sm"
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </div>
    </div>
  );
};
