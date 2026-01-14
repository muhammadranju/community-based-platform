import apiFetch from "@/lib/api";
import React, { useEffect, useRef, useState } from "react";
import { Story } from "../home/OurBlogSection";
import { Spinner } from "../ui/spinner";
import PopularContentCard from "./PopularContentCard";

const PopularContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Story[]>([]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; // Approx card width
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getBlogs = async () => {
    setLoading(true);

    const blogs = await apiFetch("/blogs");
    const blogsData = blogs?.data?.data;

    setBlogs(blogsData);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(false);
    getBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-36 text-4xl font-bold text-orange-900 ">
        <Spinner className="ml-2 size-20 text-orange-900" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl md:text-5xl font-bold text-emerald-900  mb-10 tracking-tight">
        Popular Content
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.map((item: any) => (
          <PopularContentCard key={item._id || item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PopularContent;
