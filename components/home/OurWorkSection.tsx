"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import HomeBadge from "./HomeBadge";

interface WorkItem {
  title: string;
  description: string;
  image: string;
  link: string;
  buttonText: string;
}

export default function OurWorkSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Approx card width
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const works: WorkItem[] = [
    {
      title: "African Traditional Architecture Digital Archive",
      description:
        "We are building a comprehensive database of Indigenous African architecture from pre-colonial Africa to date. Our goal is to preserve the knowledge, and inspire future generations to live sustainably. Anyone can upload photos and contribute towards the database.",
      image: "/bg/Rectangle1.png", // Placeholder for castle/hut
      link: "#",
      buttonText: "Read More",
    },
    {
      title: "African Traditional Decor & Interior Design",
      description:
        "If you desire to start building your dream home based on the foundation of our ancestors knowledge, but don't know where to start. We hope the design inspirations here will help you get started. We have a combination of paid and free resources based on the contributions of our experts.",
      image: "/bg/Rectangle2.png", // Vertical image
      link: "#",
      buttonText: "Join The Waiting List",
    },
    {
      title: "Database of African Builders, Architects & Designers",
      description:
        "This is a database of Indigenous African builders, designers and architects who are passionate about helping the community to build their homes. Our goal is to connect home owners to African professionals that specialize in preserving, and rebuilding indigenous African Architecture.",
      image: "/bg/Rectangle1.png", // Placeholder for village
      link: "#",
      buttonText: "Join Our Database",
    },
  ];

  return (
    <section className="relative py-12 lg:px-12 px-4 bg-accent-bg rounded-3xl overflow-hidden w-full ">
      {/* Background Decorative Element (Subtle Pattern) */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-100 pointer-events-none">
        <img src="/Frame/Frame-7.png" alt="" />
      </div>

      <div className="mb-10 relative z-20">
        <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6">
          Our Work
        </h2>
        <HomeBadge>BE PART OF THE CHANGE</HomeBadge>

        <div className="flex flex-col md:flex-row justify-between items-end gap-4 mt-4">
          <h3 className="text-3xl md:text-4xl font-bold text-emerald-900 leading-tight max-w-2xl">
            Learn about our key initiatives and resource hubs
          </h3>

          {/* Mobile Navigation Arrows */}
          <div className="flex gap-3 md:hidden">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-[#8B5E3C] flex items-center justify-center text-[#8B5E3C] hover:bg-[#8B5E3C] hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full bg-[#5D2E1E] flex items-center justify-center text-white hover:bg-[#4a2418] transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 no-scrollbar md:grid md:grid-cols-3 md:gap-6 md:pb-0 md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {works.map((work, index) => {
          // Logic for the staggered layout:
          // Mobile: Always Image Top (flex-col-reverse)
          // Desktop: Index 0 & 2 (Text Top -> flex-col), Index 1 (Image Top -> flex-col-reverse)
          const isMiddleCard = index === 1;
          const layoutClass = isMiddleCard
            ? "flex-col-reverse"
            : "flex-col-reverse md:flex-col";

          return (
            <div
              key={index}
              className="bg-white rounded-4xl p-5 shadow-sm flex flex-col h-full relative group transition-transform duration-300 hover:-translate-y-1 min-w-[85vw] md:min-w-0 snap-center"
            >
              {/* Content Wrapper */}
              <div className={`flex h-full ${layoutClass}`}>
                {/* Text Section */}
                <div
                  className={`flex flex-col ${
                    isMiddleCard ? "mt-6 pt-2" : "mb-6 md:mb-6 mt-6 md:mt-0"
                  }`}
                >
                  <h4 className="font-bold text-emerald-900 text-xl mb-4 leading-tight min-h-[3.5rem]">
                    {work.title}
                  </h4>
                  <p className="text-[0.95rem] text-gray-600 mb-6 leading-relaxed flex-grow">
                    {work.description}
                  </p>
                  <div>
                    <a
                      href={work.link}
                      className="inline-flex items-center justify-center text-emerald-900 font-semibold px-6 text-sm border border-orange-400 rounded-full py-2.5 hover:bg-orange-50 transition-colors duration-200"
                    >
                      {work.buttonText}
                    </a>
                  </div>
                </div>

                {/* Image Section */}
                <div
                  className={`relative w-full rounded-2xl overflow-hidden mt-auto ${
                    isMiddleCard ? "h-64" : "h-64"
                  }`}
                >
                  <img
                    src={work.image}
                    alt={work.title}
                    className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
