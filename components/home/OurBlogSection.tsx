"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import CustomBadge from "../shared/SharedBadge";

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
        "If you desire to start building your dream home based on the foundation of our ancestors knowledge, but don’t know where to start. We hope the design inspirations here will help you get started.",
      image: "/bg/Rectangle2.png",
      link: "/our-work",
    },
    {
      title: "Modern Safari Living Room Concepts",
      description:
        "Explore how to blend modern aesthetics with traditional safari elements. Create a space that feels both adventurous and comfortably luxurious.",
      image: "/bg/Rectangle3.png",
      link: "/our-work",
    },
    {
      title: "Clay & Earth: Sustainable Building",
      description:
        "Discover the ancient techniques of building with earth and clay, reimagined for contemporary sustainable living in urban environments.",
      image: "/bg/Rectangle4.png",
      link: "/our-work",
    },
    {
      title: "Textiles of the West Coast",
      description:
        "A deep dive into the patterns, fabrics, and weaving techniques that define the vibrant interior styles of West African coastal homes.",
      image: "/bg/Rectangle2.png",
      link: "/our-work",
    },
  ];

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
        {stories.map((story, index) => (
          <div
            key={index}
            className="relative h-[500px] md:h-[650px] rounded-3xl overflow-hidden group cursor-pointer min-w-[85vw] md:min-w-[45vw] lg:min-w-[40vw] snap-center shrink-0"
          >
            {/* 
              IMAGE LAYER 
              - Removed the solid background wrapper and opacity-50 to let the image shine naturally 
            */}
            <div className="absolute inset-0 bg-neutral-900">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${story.image}')` }}
              ></div>
            </div>

            {/* 
              GRADIENT OVERLAY FIX 
              - Changed 'inset-0' to 'bottom-0 h-3/4' so the gradient only covers the bottom 75% max.
              - The top of the image remains completely clear.
              - Changed colors to 'orange-950' (dark brown) to match the African decor aesthetic better than pure black.
            */}
            <div className="absolute bottom-0 left-0 w-full h-3/4 bg-gradient-to-t from-orange-950 via-orange-950/60 to-transparent"></div>

            {/* CONTENT LAYER */}
            <div className="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full z-10">
              <h3 className="text-2xl md:text-4xl font-bold mb-4 max-w-md leading-tight drop-shadow-sm">
                {story.title}
              </h3>
              <p className="text-base text-gray-200 mb-8 hidden md:block max-w-lg leading-relaxed">
                {story.description}
              </p>

              <a
                href={story.link}
                className="inline-flex items-center px-8 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-orange-950 transition-all text-sm font-bold uppercase tracking-wider"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
