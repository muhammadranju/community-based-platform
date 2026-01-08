import { ContentItem } from "@/types/types";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";
import { costumFormatDate } from "../shared/DateTime";
import { Button } from "../ui/button";

interface PopularContentCardProps {
  item: ContentItem;
}

const PopularContentCard: React.FC<PopularContentCardProps> = ({ item }) => {
  return (
    <div className="bg-[#F2F6EF] border border-lime-500 rounded-2xl p-6 flex flex-col h-full hover:shadow-md hover:bg-white hover:border-white transition-colors duration-400">
      <div className="flex-1 mb-6">
        <h3 className="text-xl font-bold text-emerald-900 mb-3 tracking-tight">
          {item?.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed font-light">
          {item.shortDescription?.length > 200
            ? item.shortDescription.substring(0, 200) + "..."
            : item.shortDescription}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-lime-500 w-full mb-4" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 md:gap-4 text-xs font-medium text-gray-700">
          <div className="flex items-center gap-1.5">
            <div className="bg-emerald-900 rounded-full p-1 shrink-0">
              <MapPin
                size={12}
                className="text-white text-lg"
                strokeWidth={3}
              />
            </div>
            <span className="capitalize">{item.country}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="bg-emerald-900 rounded-full p-1 shrink-0">
              <Calendar
                size={12}
                className="text-white text-lg"
                strokeWidth={3}
              />
            </div>
            <span className="whitespace-nowrap">
              {costumFormatDate(item?.createdAt)}
            </span>
          </div>
        </div>
        <Link href={`/our-work/${item.slug}?region=east-african-architecture`}>
          <Button className="text-xs px-4 py-3 h-auto font-medium shrink-0 rounded-full bg-transparent border border-secondary-color text-emerald-900 hover:bg-amber-600 hover:text-white transition-colors duration-200">
            Read Post
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PopularContentCard;
