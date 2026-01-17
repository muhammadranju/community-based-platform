"use client";
import apiFetch from "@/lib/api";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CustomBadge from "../shared/SharedBadge";
import HeroBlogCardSkeleton from "../skeleton/HeroBlogCardSkeleton";

export interface Story {
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  _id: string;
  author: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  link: string;
}

export default function FeaturedStoriesSection() {
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

    const blogs = await apiFetch<any>("/blogs");
    const blogsData = blogs?.data?.data;

    setBlogs(blogsData);
    setLoading(false);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  console.log(blogs);
  return (
    <>
      <div className="flex justify-between items-end px-4 md:px-0 mb-10">
        <div>
          <CustomBadge>OUR BLOG</CustomBadge>
          <h2 className="text-2xl md:text-4xl font-bold text-emerald-900">
            Featured Stories / Articles
          </h2>
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="flex gap-3 md:hidden">
          <button
            onClick={() => scroll("left")}
            className="p-4 rounded-full border border-orange-900 hover:bg-orange-900 hover:text-white text-orange-900 cursor-pointer transition-colors"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-4 rounded-full border border-orange-900 hover:bg-orange-900 hover:text-white text-orange-900 cursor-pointer transition-colors"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-4 rounded-full border border-orange-900 hover:bg-orange-900 hover:text-white text-orange-900 cursor-pointer transition-colors"
            aria-label="Scroll left"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-4 rounded-full border border-orange-900 hover:bg-orange-900 hover:text-white text-orange-900 cursor-pointer transition-colors"
            aria-label="Scroll right"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-4 md:px-0 pb-4 no-scrollbar md:gap-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {loading ? (
          <HeroBlogCardSkeleton />
        ) : (
          blogs?.map((story, index) => (
            <div
              key={index}
              className="relative h-[500px] md:h-[650px] rounded-3xl overflow-hidden group cursor-pointer  lg:w-[500px] w-[400px]    snap-center shrink-0"
            >
              {/* 
              IMAGE LAYER 
              - Removed the solid background wrapper and opacity-50 to let the image shine naturally 
            */}
              <div className="absolute inset-0 bg-neutral-900">
                <img
                  width={500}
                  height={200}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${story.image}`}
                  alt={story?.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-orange-950 via-orange-950/60 to-transparent"></div>

              {/* CONTENT LAYER */}
              <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full z-10">
                <h3 className="text-2xl md:text-4xl font-bold mb-4 max-w-md leading-tight drop-shadow-sm">
                  {story?.title}
                </h3>

                <p className="overflow-x-hidden">
                  {story?.shortDescription?.length > 500
                    ? story?.shortDescription?.slice(0, 500) + "..."
                    : story?.shortDescription}
                  ...
                </p>
                <Link
                  href={`/blogs/${story?.slug}`}
                  className="inline-flex items-center px-8 py-3 mt-5 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-orange-950 transition-all text-sm font-bold uppercase tracking-wider"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
