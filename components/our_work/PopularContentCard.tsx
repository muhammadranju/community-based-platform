import { ContentItem } from "@/types/types";
import parse from "html-react-parser";
import { Calendar, ChartColumnStacked } from "lucide-react";
import Link from "next/link";
import React from "react";
import { costumFormatDate } from "../shared/DateTime";
import { Button } from "../ui/button";
import { compile } from "html-to-text";

interface PopularContentCardProps {
  item: ContentItem;
}

const PopularContentCard: React.FC<PopularContentCardProps> = ({ item }) => {
  const options = {
    wordwrap: 130,
    // ...
  };

  const compiledConvert = compile(options); // options passed here
  return (
    <div className="bg-[#F2F6EF] border border-lime-500 rounded-2xl p-6 flex flex-col h-full hover:shadow-md hover:bg-white hover:border-white transition-colors duration-400">
      <div className="flex-1 mb-6">
        <h3 className="text-xl font-bold text-emerald-900 mb-3 tracking-tight overflow-hidden">
          {item?.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed font-light">
          <p className="prose prose-lg md:prose-2xl prose-headings:text-emerald-900 prose-p:text-gray-600 prose-a:text-orange-600 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:p-4 prose-blockquote:not-italic prose-blockquote:rounded-lg prose-img:rounded-2xl prose-strong:text-emerald-800 max-w-full wrap-break-word">
            {compiledConvert(
              item?.shortDescription?.length > 220
                ? item?.shortDescription?.slice(0, 220) + "..."
                : item?.shortDescription,
            )}
          </p>
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-lime-500 w-full mb-4" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 md:gap-4 text-xs font-medium text-gray-700">
          <div className="flex items-center gap-1.5">
            <div className="bg-emerald-900 rounded-full p-1 shrink-0">
              <ChartColumnStacked
                size={12}
                className="text-white text-lg"
                strokeWidth={3}
              />
            </div>
            <span className="capitalize">{item?.category || "unknown"}</span>
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
        <Link href={`/blogs/${item.slug}`}>
          <Button className="text-xs px-4 py-3 h-auto font-medium shrink-0 rounded-full bg-transparent border border-secondary-color text-emerald-900 hover:bg-amber-600 hover:text-white transition-colors duration-200">
            Read Post
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PopularContentCard;
