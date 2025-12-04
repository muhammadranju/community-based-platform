import React from "react";
import { THUMBNAILS } from "./page";

export const PDFThumbnailStrip: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 h-full overflow-y-auto no-scrollbar py-2">
      {THUMBNAILS.map((thumb) => (
        <div
          key={thumb.id}
          className="relative group cursor-pointer transition-transform hover:scale-[1.02]"
        >
          {/* Badge */}
          <div
            className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md z-10 ${
              thumb.isActive
                ? "bg-[#113e33] text-white"
                : "bg-white text-gray-500 border border-gray-200"
            }`}
          >
            {thumb.pageNumber}
          </div>

          {/* Thumbnail Image */}
          <div
            className={`rounded-xl overflow-hidden shadow-sm bg-white p-2 ${
              thumb.isActive
                ? "ring-2 ring-[#113e33]"
                : "border border-transparent"
            }`}
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={thumb.image}
                alt={`Page ${thumb.pageNumber}`}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
              {/* Mock Text Lines for realistic doc look */}
              <div className="absolute inset-0 pointer-events-none p-2 flex flex-col gap-1 opacity-20">
                <div className="h-2 w-3/4 bg-black rounded-full mb-2"></div>
                <div className="h-1 w-full bg-black rounded-full"></div>
                <div className="h-1 w-5/6 bg-black rounded-full"></div>
                <div className="h-1 w-full bg-black rounded-full"></div>
              </div>
            </div>

            {/* Title overlay mock */}
            <div className="mt-2 px-1">
              <div className="h-2 w-2/3 bg-gray-200 rounded"></div>
              <div className="h-2 w-1/2 bg-gray-100 rounded mt-1"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
