"use client";

import { Search } from "lucide-react";
import { Suspense, useState } from "react";
import OurWorkCategoryCard from "./OurWorkCategoryCard";
const categories = [
  {
    id: 1,
    title: "East African Architecture",
    backgroundColor: "#B20500",
    icon: "/Frame/Frame-1.png",
    slug: "/east-african-architecture",
  },
  {
    id: 2,
    title: "Central African\nArchitecturess",
    backgroundColor: "#37893C",
    icon: "/Frame/Frame-2-2.png",
    slug: "/central-african-architecture",
  },
  {
    id: 3,
    title: "West African\nArchitecture",
    backgroundColor: "#063391",
    icon: "/Frame/Frame-3.png",
    slug: "/west-african-architecture",
  },
  {
    id: 4,
    title: "South African\nArchitecture",
    backgroundColor: "#C89D1F",
    icon: "/Frame/Frame-4.png",
    slug: "/south-african-architecture",
  },
  {
    id: 5,
    title: "North African\nArchitecture",
    backgroundColor: "#E26513",
    icon: "/Frame/Frame-5.png",
    slug: "/north-african-architecture",
  },
  {
    id: 6,
    title: "Global - African\nArchitecture",
    backgroundColor: "#6C0544",
    icon: "/Frame/Frame-6.png",
    slug: "/global-african-architecture",
  },
];

function HeaderBanner() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <div className="bg-[url('/bg/our_work_bg_red.jpg')] rounded-3xl  p-8 md:p-12 lg:p-24">
        <div className="mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Icon Circle */}
            <div className="shrink-0">
              <div className="w-24 h-24 md:w-44 md:h-44 rounded-full flex items-center justify-center">
                <img
                  src="/Frame/Frame-1.png"
                  className="w-full h-full"
                  alt=""
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-white text-center md:text-left">
              <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold mb-6">
                East African Traditional Architecture
              </h1>

              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Explore our digital archive by searching for your favourite Indigenous architecture here"
                  className="lg:w-[650px] w-full pl-12 pr-6 py-3 md:py-4 rounded-full bg-black/20 border-2 border-red-300 border-opacity-60 text-white placeholder-red-100 focus:outline-none focus:border-white focus:bg-opacity-70 transition text-sm md:text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-16">
        <div
          className="grid grid-cols-2 gap-4 md:gap-8 
                  md:grid-cols-5 md:max-w-5xl md:mx-auto"
        >
          <Suspense fallback={null}>
            {categories.map((category) => (
              <OurWorkCategoryCard key={category.id} {...category} />
            ))}
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default HeaderBanner;
