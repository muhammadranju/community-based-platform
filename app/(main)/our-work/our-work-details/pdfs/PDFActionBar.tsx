import React from "react";
import { ThumbsUp, ThumbsDown, MessageCircle, Share2 } from "lucide-react";

export const PDFActionBar: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 w-full">
      {/* Left Actions */}
      <div className="flex items-center space-x-3">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-400 text-emerald-900 font-medium hover:bg-green-50 hover:border-emerald-900 transition-colors bg-white ">
          <ThumbsUp className="w-4 h-4 text-lime-500" />
          <span>Like</span>
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-400 text-gray-500 font-medium hover:bg-red-50 hover:border-red-400 transition-colors bg-white">
          <ThumbsDown className="w-4 h-4 text-red-500" />
          <span>Dislike</span>
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-400 text-gray-600 font-medium hover:bg-gray-100 transition-colors bg-white">
          <MessageCircle className="w-4 h-4 text-emerald-900" />
          <span>Comments</span>
        </button>
      </div>

      {/* Right Action */}
      <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#65a30d] text-emerald-900 font-semibold hover:bg-[#65a30d]/10 transition-colors bg-white shadow-sm">
        <Share2 className="w-4 h-4 text-lime-500" />
        <span>Share</span>
      </button>
    </div>
  );
};
