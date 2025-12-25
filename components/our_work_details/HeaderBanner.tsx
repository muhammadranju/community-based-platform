"use client";

import { Search } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import OurWorkCategoryCard from "./OurWorkCategoryCard";

const categories = [
  {
    id: 1,
    title: "East African Traditional Architecture",
    subtitle: "East African Architecture",
    backgroundColor: "#B20500",
    icon: "/Icons/Vector-1.png",
    slug: "/east-african-architecture",
    key: "east",
  },
  {
    id: 2,
    title: "Central African Traditional Architecture",
    subtitle: "Central African Architecture",
    backgroundColor: "#37893C",
    icon: "/Icons/Vector-2.png",
    slug: "/central-african-architecture",
    key: "central",
  },
  {
    id: 3,
    title: "West African Traditional Architecture",
    subtitle: "West African Architecture",
    backgroundColor: "#063391",
    icon: "/Icons/Vector-3.png",
    slug: "/west-african-architecture",
    key: "west",
  },
  {
    id: 4,
    title: "South African Traditional Architecture",
    subtitle: "South African Architecture",
    backgroundColor: "#C89D1F",
    icon: "/Icons/Vector-4.png",
    slug: "/south-african-architecture",
    key: "south",
  },
  {
    id: 5,
    title: "North African Traditional Architecture",
    subtitle: "North African Architecture",
    backgroundColor: "#E26513",
    icon: "/Icons/Vector-5.png",
    slug: "/north-african-architecture",
    key: "north",
  },
  {
    id: 6,
    title: "Global African Traditional Architecture",
    subtitle: "Global African Architecture",
    backgroundColor: "#6C0544",
    icon: "/Icons/Vector-6.png",
    slug: "/global-african-architecture",
    key: "global",
  },
];

const bgImagesAndFrames: Record<string, { bg: string; frame: string }> = {
  east: {
    bg: "/bg/bg-1.jpg",
    frame: "/Frame/Frame-1.png",
  },
  central: {
    bg: "/bg/bg-2.jpg",
    frame: "/Frame/Frame-2.png",
  },
  west: {
    bg: "/bg/bg-3.jpg",
    frame: "/Frame/Frame-3.png",
  },
  south: {
    bg: "/bg/bg-4.jpg",
    frame: "/Frame/Frame-4.png",
  },
  north: {
    bg: "/bg/bg-5.jpg",
    frame: "/Frame/Frame-5.png",
  },
  global: {
    bg: "/bg/bg-6.jpg",
    frame: "/Frame/Frame-6.png",
  },
};

function HeaderBanner() {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region");

  // Find the active category based on the current URL or search param
  const activeCategory =
    categories.find((cat) => {
      // Check if pathname matches
      if (pathname?.includes(cat.slug)) return true;
      // Check if search param matches
      if (regionParam && cat.slug.includes(regionParam)) return true;
      return false;
    }) || categories[0];

  const { bg, frame } = bgImagesAndFrames[activeCategory.key];

  return (
    <>
      <div
        className={`rounded-3xl p-8 md:p-12 lg:p-24 bg-cover bg-center transition-all duration-500`}
        style={{ backgroundImage: `url('${bg}')` }}
      >
        <div className="mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-5">
            {/* Icon Circle */}
            <div className="shrink-0">
              <div className="w-24 h-24 md:w-56 md:h-44 rounded-full flex items-center justify-center">
                <img src={frame} className="w-full h-full" alt="" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-white text-center md:text-left">
              <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-6 whitespace-pre-line">
                {activeCategory.title}
              </h1>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5 lg:w-7 lg:h-7" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Explore our digital archive by searching for your favorite Indigenous architecture here"
                  className="lg:w-[650px] w-full pl-12 pr-6 py-2 md:py-3 rounded-full bg-black/20 border border-white border-opacity-60 text-white placeholder-white focus:outline-none focus:border-white focus:bg-opacity-70 transition text-sm md:text-base placeholder:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-16 lg:ml- ">
        <div
          className="grid grid-cols-2 gap-4 md:gap-8 lg:gap-60  
                  md:grid-cols-3 lg:grid-cols-6 lg:max-w-6xl md:max-w-5xl md:mx-auto w-full"
        >
          <Suspense fallback={null}>
            {categories.map((category) => (
              <OurWorkCategoryCard
                key={category.id}
                title={category.subtitle}
                backgroundColor={category.backgroundColor}
                icon={category.icon}
                slug={category.slug}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default HeaderBanner;
