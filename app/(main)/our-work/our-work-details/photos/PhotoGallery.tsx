"use client";
import React, { useEffect, useState } from "react";
import { ImageCard } from "./ImageCard";
import { GalleryItem } from "./PhotoHeader";
import { useSearchParams } from "next/navigation";
import { authFetch } from "@/lib/authFetch";
const LAYOUT_PATTERNS = [
  {
    spanClass: "col-span-12 lg:col-span-7",
    heightClass: "h-[300px] md:h-[450px] lg:h-[550px]",
  },
  {
    spanClass: "col-span-12 lg:col-span-5",
    heightClass: "h-[300px] md:h-[450px] lg:h-[550px]",
  },
  {
    spanClass: "col-span-12 lg:col-span-5",
    heightClass: "h-[300px] md:h-[450px] lg:h-[550px]",
  },
  {
    spanClass: "col-span-12 lg:col-span-7",
    heightClass: "h-[300px] md:h-[450px] lg:h-[550px]",
  },
  {
    spanClass: "col-span-12",
    heightClass: "h-[250px] md:h-[400px] lg:h-[500px]",
  },
];

export const Gallery: React.FC = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  const fetchItems = async () => {
    if (!slug) return;
    try {
      const response = await authFetch(`/contents/${slug}`);
      const data = await response.json();
      const contentData = data?.data?.result;

      if (contentData && contentData.images) {
        const mappedItems: GalleryItem[] = contentData.images.map(
          (imgUrl: string, index: number) => {
            const layout = LAYOUT_PATTERNS[index % LAYOUT_PATTERNS.length];
            return {
              id: `${index}`,
              src: `${process.env.NEXT_PUBLIC_API_URL}/${imgUrl}`,
              alt: contentData.title || "Gallery Image",
              spanClass: layout.spanClass,
              heightClass: layout.heightClass,
            };
          }
        );
        setGalleryItems(mappedItems);
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [slug]);

  if (!galleryItems.length) {
    return <div className="text-center py-10">Loading gallery...</div>;
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {galleryItems.map((item) => (
        <div key={item.id} className={item.spanClass}>
          <ImageCard item={item} />
        </div>
      ))}
    </div>
  );
};
