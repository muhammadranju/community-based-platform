import React from "react";
import { PlayCircle } from "lucide-react";
import { VideoData } from "./MainContent";
// import { VideoData } from "../types";

interface RelatedVideoListProps {
  videos: VideoData[];
  onVideoSelect: (index: number) => void;
  currentIndex: number;
}

export const RelatedVideoList: React.FC<RelatedVideoListProps> = ({
  videos,
  onVideoSelect,
  currentIndex,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-4 scrollbar-thin lg:max-h-[calc(100vh-140px)]">
        {videos.map((video, idx) => (
          <div
            key={video.id}
            onClick={() => onVideoSelect(idx)}
            className={`group relative flex cursor-pointer gap-3 rounded-xl p-2 transition-all hover:bg-white hover:shadow-md border ${
              idx === currentIndex
                ? "bg-white shadow-md border-lime-500"
                : "border-transparent hover:border-gray-100"
            }`}
          >
            {/* Thumbnail */}
            <div className="relative h-20 w-36 md:h-24 md:w-40 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>

              <span className="absolute bottom-1 right-1 rounded bg-emerald-900 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                Play
              </span>

              {/* Hover Play Icon */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                  idx === currentIndex
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              >
                <PlayCircle className="h-8 w-8 text-white drop-shadow-lg" />
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-col py-1 justify-center">
              <h4 className="line-clamp-2 text-sm font-bold text-emerald-900 leading-snug group-hover:text-brand-green transition-colors">
                {video.title} {videos.length > 1 && `(Part ${idx + 1})`}
              </h4>
              <p className="mt-1 text-xs font-semibold text-gray-500">
                {video.author}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
