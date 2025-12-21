import React from "react";
import { THUMBNAILS } from "./PdfsPage";

export const PDFThumbnailStrip: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 h-full overflow-y-auto no-scrollbar py-2 px-2">
      {THUMBNAILS.map((thumb) => (
        <div
          key={thumb.id}
          className="relative group cursor-pointer transition-transform hover:scale-[1.02]"
        >
          {/* Badge */}
          <div
            className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md z-10 ${
              thumb.isActive
                ? "bg-emerald-900 text-white"
                : "bg-emerald-900 text-white border border-emerald-900"
            }`}
          >
            {thumb.pageNumber}
          </div>

          {/* Thumbnail Image */}
          <div
            className={`rounded-xl overflow-hidden shadow-sm  p-1 ${
              thumb.isActive
                ? "bg-lime-500/90"
                : "border hover:border-emerald-900"
            }`}
          >
            <div className="aspect-3/4 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={thumb.image}
                alt={`Page ${thumb.pageNumber}`}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
