import React from "react";
import { ImageCard } from "./ImageCard";
import { GalleryItem } from "./PhotoHeader";

const items: GalleryItem[] = [
  {
    id: "1",
    src: "https://picsum.photos/seed/maasai1/1200/900", // Landscape
    alt: "Traditional hut with person standing outside",
    spanClass: "col-span-12 lg:col-span-7",
    heightClass: "h-[300px] md:h-[450px] lg:h-[550px]",
  },
  {
    id: "2",
    src: "https://picsum.photos/seed/maasai_aerial/800/1000", // Portrait aerial
    alt: "Aerial view of village layout",
    spanClass: "col-span-12 lg:col-span-5",
    heightClass: "h-[300px] md:h-[450px] lg:h-[550px]",
  },
  {
    id: "3",
    src: "https://picsum.photos/seed/maasai_aerial2/800/1000", // Portrait aerial
    alt: "Aerial view of animal enclosure",
    spanClass: "col-span-12 lg:col-span-5",
    heightClass: "h-[300px] md:h-[450px] lg:h-[550px]",
  },
  {
    id: "4",
    src: "https://picsum.photos/seed/maasai_people/1200/1000", // Square-ish
    alt: "Group walking through village",
    spanClass: "col-span-12 lg:col-span-7",
    heightClass: "h-[300px] md:h-[450px] lg:h-[550px]",
  },
  {
    id: "5",
    src: "https://picsum.photos/seed/maasai_hut_panoramic/1600/900", // Wide
    alt: "Panoramic view of village huts",
    spanClass: "col-span-12",
    heightClass: "h-[250px] md:h-[400px] lg:h-[500px]",
  },
  {
    id: "5",
    src: "https://picsum.photos/seed/maasai_hut_panoramic/1600/900", // Wide
    alt: "Panoramic view of village huts",
    spanClass: "col-span-12 lg:col-span-5",
    heightClass: "h-[250px] md:h-[400px] lg:h-[500px]",
  },
  {
    id: "5",
    src: "https://picsum.photos/seed/maasai_hut_panoramic/1600/900", // Wide
    alt: "Panoramic view of village huts",
    spanClass: "col-span-12 lg:col-span-7",
    heightClass: "h-[250px] md:h-[400px] lg:h-[500px]",
  },
  {
    id: "5",
    src: "https://picsum.photos/seed/maasai_hut_panoramic/1600/900", // Wide
    alt: "Panoramic view of village huts",
    spanClass: "col-span-12 lg:col-span-7",
    heightClass: "h-[250px] md:h-[400px] lg:h-[500px]",
  },
  {
    id: "5",
    src: "https://picsum.photos/seed/maasai_hut_panoramic/1600/900", // Wide
    alt: "Panoramic view of village huts",
    spanClass: "col-span-12 lg:col-span-5",
    heightClass: "h-[250px] md:h-[400px] lg:h-[500px]",
  },
  {
    id: "5",
    src: "https://picsum.photos/seed/maasai_hut_panoramic/1600/900", // Wide
    alt: "Panoramic view of village huts",
    spanClass: "col-span-12",
    heightClass: "h-[250px] md:h-[400px] lg:h-[500px]",
  },
];

export const Gallery: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {items.map((item) => (
        <div key={item.id} className={item.spanClass}>
          <ImageCard item={item} />
        </div>
      ))}
    </div>
  );
};
