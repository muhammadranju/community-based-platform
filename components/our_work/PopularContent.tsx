import React from "react";
import PopularContentCard from "./PopularContentCard";
import { POPULAR_CONTENT } from "./ProcessCardData";

const PopularContent: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-5xl font-bold text-primary-color  mb-10 tracking-tight">
        Popular Content
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POPULAR_CONTENT.map((item) => (
          <PopularContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PopularContent;
