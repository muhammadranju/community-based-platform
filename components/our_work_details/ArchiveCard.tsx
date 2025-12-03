import React from "react";
import { Heart, Image as ImageIcon, Video, FileText } from "lucide-react";
import { ArchiveItem } from "@/types/types";
import { Button } from "../ui/button";
import Link from "next/link";
// import { ArchiveItem } from "../types";
// import Button from "./Button";

interface ArchiveCardProps {
  item: ArchiveItem;
}

const ArchiveCard: React.FC<ArchiveCardProps> = ({ item }) => {
  return (
    <div className=" rounded-2xl overflow-hidden border border-emerald-900/80 flex flex-col h-full hover:shadow-lg transition-all duration-300 group">
      {/* Image Container */}
      <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button className="absolute top-3 right-3 p-2 bg-[#F2F6EF] backdrop-blur-sm rounded-full text-emerald-900 hover:text-brand-orange transition-colors shadow-sm">
          <Heart size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col bg-[#F2F6EF] rounded-t-2xl border-t border-emerald-900">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-secondary-color mb-1 ">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm font-light">{item.subtitle}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-6 border-b border-emerald-900 pb-4">
          <div className="flex items-center gap-1.5 text-xs text-emerald-900 font-medium">
            <ImageIcon size={16} strokeWidth={1.5} />
            <span>{item.stats.photos} Photos</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-900 font-medium">
            <Video size={16} strokeWidth={1.5} />
            <span>{item.stats.videos} Videos</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-900 font-medium">
            <FileText size={16} strokeWidth={1.5} />
            <span>{item.stats.pdfs} PDF</span>
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-auto">
          <Link href={"/our-work/our-work-details"}>
            <Button
              variant="outline"
              className="w-auto px-6 py-2 h-9 text-xs font-semibold hover:bg-amber-600 hover:text-white transition-colors rounded-full bg-transparent border-secondary-color text-emerald-900"
            >
              Open Folder
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArchiveCard;
