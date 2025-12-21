"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

interface CategoryCardProps {
  title: string;
  backgroundColor: string;
  icon: string;
  slug: string;
}
export default function OurWorkCategoryCard({
  title,
  backgroundColor,
  icon,
  slug,
}: CategoryCardProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isHovered, setIsHovered] = useState(false);

  const search = searchParams.get("region");
  const fullSlug = `/our-work${slug}`;
  const fullSearchSlug = `/our-work/${search}`;

  // Hide the card if the current page matches the category slug
  const regionParam = searchParams.get("region");
  const isCurrentCategory =
    (pathname && pathname.includes(slug)) ||
    (regionParam &&
      (regionParam === slug ||
        regionParam.includes(slug) ||
        slug.includes(regionParam)));

  if (isCurrentCategory) {
    return null;
  }

  return (
    <Link href={fullSlug} className="w-full">
      <div
        className="rounded-2xl px-2 py-4  flex flex-row md:flex-col items-center gap-4 w-full md:w-48 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 h-full border border-transparent"
        style={{
          backgroundColor: isHovered ? "#ffffff" : backgroundColor,
          color: isHovered ? backgroundColor : "#ffffff",
          borderColor: isHovered ? backgroundColor : "transparent",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Icon Circle Background */}
        <div
          className="w-12 h-12 p-3 md:w-20 md:h-20 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300"
          style={{
            backgroundColor: isHovered ? backgroundColor : "#ffffff",
          }}
        >
          <img
            src={icon}
            alt=""
            className="w-6 h-6 md:w-20 md:h-20 object-contain transition-all duration-300"
            style={{
              filter: isHovered ? "brightness(0) invert(1)" : "none",
            }}
          />
        </div>

        {/* Title */}
        <h3 className="text-left md:text-center font-semibold text-sm md:text-lg leading-tight whitespace-pre-line lg:ml-2 -ml-2">
          {title}
        </h3>
      </div>
    </Link>
  );
}
