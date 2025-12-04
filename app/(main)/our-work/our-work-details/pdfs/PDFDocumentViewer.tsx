import React from "react";
import { Home } from "lucide-react";
import { CURRENT_DOCUMENT } from "./page";

export const PDFDocumentViewer: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-[2.5rem] shadow-inner p-8 md:p-12 relative overflow-hidden">
      {/* Background gradient/shadow effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200/50 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 text-gray-600">
          <Home className="w-5 h-5 text-gray-500" />
          <span className="text-sm md:text-base font-medium text-gray-700 tracking-wide">
            {CURRENT_DOCUMENT.companyName}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-[#063f2e] mb-10 leading-tight max-w-2xl">
          {CURRENT_DOCUMENT.title}
        </h1>

        {/* Image Container */}
        <div className="flex-grow w-full rounded-[2rem] overflow-hidden shadow-2xl relative group">
          <img
            src={CURRENT_DOCUMENT.coverImage}
            alt="Document Cover"
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
          {/* Overlay gradient at bottom of image for text readability if needed, though design is clean */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Footer inside preview */}
        <div className="flex items-center justify-between mt-8">
          {/* Horizontal Divider Line */}
          <div className="h-px bg-gray-400 w-1/3 md:w-1/2" />

          {/* Pagination Pill */}
          <div className="bg-white/80 backdrop-blur-sm border border-gray-300 px-6 py-2 rounded-full text-[#113e33] font-semibold text-sm shadow-sm z-20 mx-auto -mt-0">
            {CURRENT_DOCUMENT.currentPage} of {CURRENT_DOCUMENT.totalPages}
          </div>

          {/* Website Link */}
          <span className="text-red-400 font-medium text-sm md:text-base w-1/3 md:w-1/2 text-right">
            {CURRENT_DOCUMENT.website}
          </span>
        </div>
      </div>
    </div>
  );
};
