import React from "react";
import { Heart, Share2 } from "lucide-react";

export const PromoCard: React.FC = () => {
  return (
    <div className="bg-primary-color rounded-2xl p-6 text-white flex flex-col justify-between h-auto min-h-[200px]">
      <div>
        <span className="bg-lime-500 text-primary-color text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide inline-block mb-4">
          Explore Content in the Archive
        </span>
        <h3 className="text-lg font-bold leading-tight mb-2">
          Manyatta - Indigenous home of the Maasai people in Kenya
        </h3>
      </div>

      <div className="flex gap-4 mt-6">
        <button className="flex items-center gap-2 text-sm font-medium hover:text-lime-400 transition-colors">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <Heart
              size={16}
              className="text-primary-color"
              fill="currentColor"
            />
          </div>
          Save
        </button>
        <button className="flex items-center gap-2 text-sm font-medium hover:text-lime-400 transition-colors">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <Share2 size={16} className="text-primary-color" />
          </div>
          Share
        </button>
      </div>
    </div>
  );
};
