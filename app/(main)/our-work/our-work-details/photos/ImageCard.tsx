import React, { useState } from "react";
import { Heart, Share2 } from "lucide-react";
// import { GalleryItem } from '../types';
import { cn } from "@/lib/utils";
import { GalleryItem } from "./PhotoHeader";

interface ImageCardProps {
  item: GalleryItem;
}

export const ImageCard: React.FC<ImageCardProps> = ({ item }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative group w-full overflow-hidden rounded-2xl bg-gray-100",
        item.heightClass
      )}
    >
      {/* Background Image */}
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 ease-in-out",
          "group-hover:scale-105",
          isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
        )}
      />

      {/* Overlay controls - Top Left */}
      <div className="absolute top-4 left-4 flex gap-3 z-10">
        <OverlayButton icon={Heart} label="Save" />
        <OverlayButton icon={Share2} label="Share" />
      </div>

      {/* Gradient Overlay for text readability (optional, subtle) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

interface OverlayButtonProps {
  icon: React.ElementType;
  label: string;
}

const OverlayButton: React.FC<OverlayButtonProps> = ({ icon: Icon, label }) => {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-black/20 hover:bg-black/30 backdrop-blur-md rounded-full transition-all duration-200 border border-white/20 active:scale-95">
      <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
      <span className="text-[10px] md:text-xs font-medium text-white tracking-wide uppercase">
        {label}
      </span>
    </button>
  );
};
