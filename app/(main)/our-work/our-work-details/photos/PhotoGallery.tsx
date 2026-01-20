"use client";
import { authFetch } from "@/lib/authFetch";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ImageCard } from "./ImageCard";
import { GalleryItem } from "./PhotoHeader";
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
          },
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
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {galleryItems.map((item) => (
          <div key={item.id} className={item.spanClass}>
            <ImageCard item={item} onClick={() => setSelectedImage(item.src)} />
          </div>
        ))}
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
          >
            <X size={32} />
          </button>

          <div
            className="relative max-w-full max-h-full rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full screen preview"
              className="max-w-full max-h-[85vh] object-contain rounded-lg bg-white"
            />
          </div>
        </div>
      )}
    </>
  );
};
