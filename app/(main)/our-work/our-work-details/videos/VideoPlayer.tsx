import React, { useState } from "react";
import {
  Play,
  Pause,
  Volume2,
  Settings,
  RotateCcw,
  Maximize,
} from "lucide-react";
import { CurrentVideoDetails, VideoData } from "./MainContent";

// import { VideoData, CurrentVideoDetails } from "./types";

export const CURRENT_VIDEO: CurrentVideoDetails = {
  title: "The Lies About African Traditional Architecture",
  description:
    "For centuries, African vernacular architecture has been dismissed as primitive, temporary, or unsophisticated. In this video, we expose the colonial myths and academic biases that erased Indigenous African design from global architectural narratives. From the climate-smart homes of the Sahel to the complex city planning of Great Zimbabwe and the sustainable techniques of the Maasai, we uncover the truth about Africa's architectural genius.",
  learningPoints: [
    {
      id: 1,
      text: "How African Traditional Architecture was intentionally misrepresented",
    },
    {
      id: 2,
      text: "The environmental wisdom behind Indigenous building methods",
    },
    {
      id: 3,
      text: "The role of colonialism in erasing vernacular African architecture",
    },
    {
      id: 4,
      text: "Why it's time to decolonize architectural history and reclaim Indigenous knowledge",
    },
  ],
};

export const RELATED_VIDEOS: VideoData[] = Array(8)
  .fill(null)
  .map((_, i) => ({
    id: `vid-${i}`,
    title: "The Lies About African Traditional Architecture",
    author: "The Lies",
    duration: "20:20",
    thumbnail: `/bg/our-page-bg-2.png`, // Consistent seed for stable images
  }));

export const VideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(38);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl bg-black aspect-video shadow-lg ring-1 ring-black/5">
      {/* Main Video Image */}
      <img
        src="/bg/our-page-bg-11.png"
        alt="Video content"
        className="h-full w-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-80"
      />

      {/* Top Left Overlay: Time */}
      <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[10px] sm:text-xs font-medium text-white backdrop-blur-md border border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex space-x-0.5 items-end h-3">
            <span className="block h-2 w-0.5 animate-[pulse_1s_ease-in-out_infinite] bg-brand-lime"></span>
            <span className="block h-3 w-0.5 animate-[pulse_1.5s_ease-in-out_infinite] bg-brand-lime delay-75"></span>
            <span className="block h-2 w-0.5 animate-[pulse_1s_ease-in-out_infinite] bg-brand-lime delay-150"></span>
          </div>
          <span className="tracking-wide">13:12:11</span>
        </div>
      </div>

      {/* Top Right Overlay: Speed */}
      <div className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-[10px] sm:text-xs font-bold text-white backdrop-blur-md border border-white/10 hover:bg-white/30 cursor-pointer transition">
        1x
      </div>

      {/* Center Play Button */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-white/20"></div>
            <button
              onClick={togglePlay}
              className="pointer-events-auto flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/60 border border-white/10"
            >
              <Play fill="white" className="ml-1 h-8 w-8 md:h-10 md:w-10" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pb-5 pt-12 transition-opacity duration-300 opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
        <div className="flex flex-col gap-3">
          {/* Progress Bar Container */}
          <div
            className="relative group/slider cursor-pointer h-1.5 w-full bg-white/20 rounded-full hover:h-2 transition-all"
            onClick={(e) => {
              // Mock progress update
              e.stopPropagation();
            }}
          >
            {/* Progress Fill */}
            <div
              className="absolute h-full rounded-full bg-orange-500"
              style={{ width: `${progress}%` }}
            >
              {/* Thumb */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3.5 w-3.5 scale-100 sm:scale-0 rounded-full bg-white transition-transform group-hover/slider:scale-100 shadow-lg"></div>
            </div>
          </div>

          {/* Icons Row */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3 sm:gap-6">
              <button
                onClick={togglePlay}
                className="hover:text-brand-lime transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 fill-white" />
                ) : (
                  <Play className="h-5 w-5 fill-white" />
                )}
              </button>
              <button className="hover:text-brand-lime transition-colors hidden sm:block">
                <Volume2 className="h-5 w-5" />
              </button>
              <span className="text-xs sm:text-sm font-medium tabular-nums tracking-wide opacity-90">
                5:08 / 13:12
              </span>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">
              <button className="hover:text-brand-lime transition-colors hover:rotate-45 duration-300">
                <Settings className="h-5 w-5" />
              </button>
              <button className="hover:text-brand-lime transition-colors hover:-rotate-180 duration-500">
                <RotateCcw className="h-5 w-5" />
              </button>
              <button className="hover:text-brand-lime transition-colors">
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
