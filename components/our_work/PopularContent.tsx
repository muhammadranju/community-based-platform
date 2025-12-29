import React, { useEffect, useState } from "react";
import PopularContentCard from "./PopularContentCard";
import { POPULAR_CONTENT } from "./ProcessCardData";
import { authFetch } from "@/lib/authFetch";

const PopularContent: React.FC = () => {
  const [popularContent, setPopularContent] = useState(POPULAR_CONTENT);

  const getPopularContent = async () => {
    const response = await authFetch("/contents?limit=9", {
      method: "GET",
      auth: false,
    });
    const data = await response.json();
    setPopularContent(data?.data);
  };

  useEffect(() => {
    getPopularContent();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-5xl font-bold text-emerald-900  mb-10 tracking-tight">
        Popular Content
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularContent?.map((item) => (
          <PopularContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PopularContent;
