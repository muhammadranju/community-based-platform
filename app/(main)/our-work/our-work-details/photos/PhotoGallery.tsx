"use client";
import { authFetch } from "@/lib/authFetch";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev === galleryItems.length - 1 ? 0 : prev + 1) : null,
    );
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) =>
      prev !== null ? (prev === 0 ? galleryItems.length - 1 : prev - 1) : null,
    );
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, galleryItems]); // Dependencies updated

  if (!galleryItems.length) {
    return <div className="text-center py-10">Loading gallery...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {galleryItems.map((item, index) => (
          <div key={item.id} className={item.spanClass}>
            <ImageCard item={item} onClick={() => setSelectedIndex(index)} />
          </div>
        ))}
      </div>

      {/* Full Screen Image Modal */}
      {selectedIndex !== null && galleryItems[selectedIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-60 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2"
          >
            <X size={32} />
          </button>

          {/* Navigation Buttons - Only show if more than 1 image */}
          {galleryItems.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-60 text-white/70 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-3 rounded-full hover:scale-110 active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-60 text-white/70 hover:text-white transition-all bg-white/10 hover:bg-white/20 p-3 rounded-full hover:scale-110 active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

          {/* Image Container */}
          <div
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryItems[selectedIndex].src}
              alt={galleryItems[selectedIndex].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl pointer-events-auto"
            />
          </div>
        </div>
      )}
    </>
  );
};
