"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import CustomBadge from "./HomeBadge";

interface Story {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function FeaturedStoriesSection() {
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

  const stories: Story[] = [
    {
      title: "African Traditional Decor & Interior Design",
      description:
        "If you desire to start building your dream home based on the foundation of our ancestors knowledge, but don’t know where to start. We hope the design inspirations here will help you get started. We have a combination of paid and free resources based on the contributions of our experts.",
      image: "/bg/Rectangle2.png",
      link: "#",
    },
    {
      title: "African Traditional Decor & Interior Design",
      description:
        "If you desire to start building your dream home based on the foundation of our ancestors knowledge, but don’t know where to start. We hope the design inspirations here will help you get started. We have a combination of paid and free resources based on the contributions of our experts.",
      image: "/bg/Rectangle3.png",
      link: "#",
    },
    {
      title: "African Traditional Decor & Interior Design",
      description:
        "If you desire to start building your dream home based on the foundation of our ancestors knowledge, but don’t know where to start. We hope the design inspirations here will help you get started. We have a combination of paid and free resources based on the contributions of our experts.",
      image: "/bg/Rectangle4.png",
      link: "#",
    },
  ];

  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="flex justify-between items-end mb-8 px-4 md:px-0">
        <div>
          <CustomBadge>OUR BLOG</CustomBadge>
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mt-4">
            Featured Stories / Articles
          </h2>
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="flex gap-3 md:hidden">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-amber-900 flex items-center justify-center text-amber-900 hover:bg-amber-800 hover:text-white transition-colors"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full bg-orange-900 flex items-center justify-center text-white hover:bg-orange-800 transition-colors"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-4 rounded-full border border-orange-900 hover:bg-gray-100 text-orange-900 cursor-pointer transition-colors"
            aria-label="Scroll left"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-4 rounded-full bg-orange-900 text-white hover:bg-orange-900/90 cursor-pointer transition-colors"
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
        {stories.map((story, index) => (
          <div
            key={index}
            className="relative h-[500px] md:h-[650px] rounded-3xl overflow-hidden group cursor-pointer min-w-[85vw] md:min-w-[45vw] lg:min-w-[40vw] snap-center shrink-0"
          >
            <div className="absolute inset-0 bg-orange-900">
              <div
                className="w-full h-full opacity-50 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${story.image}')` }}
              ></div>
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white w-full">
              <h3 className="text-2xl md:text-4xl font-bold mb-4 max-w-md leading-tight">
                {story.title}
              </h3>
              <p className="text-base text-gray-300 mb-6 hidden md:block">
                {story.description}
              </p>

              <Link
                href={story.link}
                className="inline-flex items-center px-8 py-3 rounded-full border border-white text-white hover:bg-white hover:text-orange-900 transition-colors text-sm font-bold uppercase tracking-wider"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
