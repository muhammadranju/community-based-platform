"use client";
import React, { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";

// --- Interfaces ---
export interface FloatingLabel {
  text: string;
  subText: string;
  positionClass: string; // Tailwind classes for positioning (e.g., "top-8 left-8")
}

export interface ArchitectureRegion {
  id: string;
  title: string;
  shortTitle: string; // For the card
  description: string;
  colorHex: string; // The main background color
  accentColorHex: string; // A slightly darker/lighter shade for accents if needed
  bgImage: string;
  mainImage: string;
  iconPath: string; // Path to the icon image
  labels: FloatingLabel[];
}

// --- Data Configuration ---
export const REGIONS: ArchitectureRegion[] = [
  {
    id: "east",
    title: "East African",
    shortTitle: "East African Architecture",
    description: "Explore the diverse structures of East Africa.",
    colorHex: "#B20500", // Red
    accentColorHex: "#8B0000",
    bgImage: "/bg/bg-1.jpg",
    mainImage: "/bg/east.png",
    iconPath: "East",
    labels: [
      {
        text: "Dorze Architecture",
        subText: "Ethiopia",
        positionClass: "top-1/3 left-8",
      },
      {
        text: "Guraghe Tukul",
        subText: "Ethiopia",
        positionClass: "top-12 right-12",
      },
    ],
  },
  {
    id: "central",
    title: "Central African",
    shortTitle: "Central African Architecture",
    description: "Discover the intricate earth architecture.",
    colorHex: "#37893C", // Green
    accentColorHex: "#1a5d1a",
    bgImage: "/bg/bg-2.jpg",
    mainImage: "/bg/central.png",
    iconPath: "Central",
    labels: [
      {
        text: "Mousgoum Architecture",
        subText: "Cameroon",
        positionClass: "top-10 left-10",
      },
      {
        text: "Bamum Architecture",
        subText: "Cameroon",
        positionClass: "bottom-20 right-10",
      },
    ],
  },
  {
    id: "west",
    title: "West African",
    shortTitle: "West African Architecture",
    description: "From the mud mosques of Mali to the Ashanti palaces.",
    colorHex: "#063391", // Blue
    accentColorHex: "#041E55",
    bgImage: "/bg/bg-3.jpg",
    mainImage: "/bg/west.png",
    iconPath: "West",
    labels: [
      {
        text: "Tiébélé Architecture",
        subText: "Burkina Faso",
        positionClass: "top-8 left-1/4",
      },
      {
        text: "Great Djenne Mosque",
        subText: "Mali",
        positionClass: "bottom-12 right-8",
      },
    ],
  },
  {
    id: "south",
    title: "South African",
    shortTitle: "South African Architecture",
    description: "Experience the unique designs of Southern Africa.",
    colorHex: "#C89D1F", // Yellow/Gold
    accentColorHex: "#9E7B15",
    bgImage: "/bg/bg-4.jpg",
    mainImage: "/bg/south.png",
    iconPath: "South",
    labels: [
      {
        text: "Eswatini Architecture",
        subText: "Eswatini",
        positionClass: "top-20 left-12",
      },
      {
        text: "Besakana Architecture",
        subText: "Madagascar",
        positionClass: "bottom-24 right-16",
      },
    ],
  },
  {
    id: "north",
    title: "North African",
    shortTitle: "North African Architecture",
    description: "The ancient medinas and desert fortresses.",
    colorHex: "#E26513", // Orange
    accentColorHex: "#A3460A",
    bgImage: "/bg/bg-5.jpg",
    mainImage: "/bg/north.png",
    iconPath: "North",
    labels: [
      {
        text: "Tamnit Palace",
        subText: "Adrar Algeria",
        positionClass: "top-16 left-16",
      },
      {
        text: "Berber Architecture",
        subText: "Algeria",
        positionClass: "bottom-32 right-8",
      },
    ],
  },
  {
    id: "global",
    title: "Global - African",
    shortTitle: "Global - African Architecture",
    description: "The influence of African architecture spreads globally.",
    colorHex: "#6C0544", // Purple
    accentColorHex: "#4A022E",
    bgImage: "/bg/bg-6.jpg",
    mainImage: "/bg/global.png",
    iconPath: "Global",
    labels: [
      {
        text: "Oyotunji African Village",
        subText: "South Carolina, USA",
        positionClass: "top-12 left-12",
      },
    ],
  },
];

// --- SocialIcons ---
const SocialIcons = () => (
  <div className="lg:flex hidden lg:mt-10 ">
    <Image src="/Icons/icon-1.png" width={70} height={70} alt="" />
    <Image src="/Icons/icon-2.png" width={70} height={70} alt="" />
    <Image src="/Icons/icon-3.png" width={70} height={70} alt="" />
    <Image src="/Icons/icon-4.png" width={70} height={70} alt="" />
    <Image src="/Icons/icon-5.png" width={70} height={70} alt="" />
    <Image src="/Icons/icon-6.png" width={70} height={70} alt="" />
  </div>
);

// --- Images Array ---
const Images = [
  "/Icons/Vector-1.png",
  "/Icons/Vector-2.png",
  "/Icons/Vector-3.png",
  "/Icons/Vector-4.png",
  "/Icons/Vector-5.png",
  "/Icons/Vector-6.png",
];

// --- Main Component ---
const AfricanArchitectureHero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    if (!isTransitioning) {
      setDisplayIndex(activeIndex);
    }
  }, [activeIndex, isTransitioning]);

  return (
    <section className="relative text-white rounded-2xl overflow-hidden shadow-2xl bg-black">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        {REGIONS.map((region, index) => (
          <div
            key={region.id}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
            style={{
              backgroundImage: `url("${region.bgImage}")`,
              opacity: index === displayIndex ? 1 : 0,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 pt-12 pb-8 relative z-10">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          allowTouchMove={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          onTransitionStart={() => setIsTransitioning(true)}
          onTransitionEnd={() => {
            setIsTransitioning(false);
            setDisplayIndex(activeIndex);
          }}
          onTouchStart={() => setIsTransitioning(true)}
          onTouchEnd={() => {
            setTimeout(() => {
              if (swiperRef.current) {
                setDisplayIndex(swiperRef.current.realIndex);
                setIsTransitioning(false);
              }
            }, 100);
          }}
          className="mb-8"
        >
          {REGIONS.map((region, index) => (
            <SwiperSlide key={region.id}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-10 ">
                  <h1 className="text-[28px] md:text-6xl font-bold leading-tight drop-shadow-sm">
                    {region.title} Traditional Architecture
                  </h1>

                  <button
                    className="bg-white hover:bg-gray-100 rounded-full px-8 py-4 lg:text-lg text-xs font-bold shadow transition-colors"
                    style={{
                      color:
                        region.colorHex === "#C89D1F"
                          ? "#8a6b0e"
                          : region.colorHex,
                    }}
                  >
                    Explore Our Digital Archive
                  </button>

                  <div className="hidden lg:block">
                    <SocialIcons />
                  </div>
                </div>

                <div className="relative h-[250px] md:h-[400px] rounded-3xl overflow-hidden bg-gray-200/10 border-2 border-white/20 -mt-14 lg:mt-0">
                  <Image
                    width={500}
                    height={500}
                    src={region.mainImage}
                    alt={region.title}
                    className="w-full h-full object-cover"
                  />

                  {region.labels.map((label, idx) => (
                    <div
                      key={idx}
                      className={`absolute ${label.positionClass} bg-white text-black px-4 py-2 rounded-lg text-xs md:text-sm font-bold z-10 animate-bounce-slow hover:scale-105 transition-transform cursor-help shadow-md`}
                    >
                      {label.text}
                      <br />
                      <span className="opacity-70 font-normal">
                        {label.subText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-5">
          {REGIONS.map((region, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                onClick={() => swiperRef.current?.slideToLoop(index)}
                className={`
                  rounded-xl p-4 flex lg:flex-col items-center justify-center text-center lg:h-44 cursor-pointer shadow-lg
                  transition-all duration-300
                  ${
                    isActive
                      ? "bg-white/20 backdrop-blur-sm"
                      : "hover:-translate-y-1 hover:ring-2 hover:ring-white/50"
                  }
                `}
                style={{
                  backgroundColor: isActive
                    ? "#ffffff"
                    : `${region.colorHex}E6`,
                  color: isActive ? region.colorHex : "#ffffff",
                }}
              >
                <div
                  className="lg:p-4 p-2 rounded-full mb-1 transition-colors duration-300"
                  style={{
                    backgroundColor: isActive ? region.colorHex : "#ffffff",
                  }}
                >
                  <Image
                    src={Images[index]}
                    alt={region.title}
                    width={80}
                    height={80}
                    className="rounded-lg lg:w-14 w-10 transition-all duration-300"
                    style={{
                      filter: isActive ? "brightness(0) invert(1)" : "none",
                    }}
                  />
                </div>
                <span
                  className="lg:text-lg text-xs font-semibold drop-shadow-lg transition-colors duration-300"
                  style={{
                    color: isActive ? region.colorHex : "#ffffff",
                  }}
                >
                  {region.shortTitle.replace(" Architecture", "")}
                  <br className="hidden lg:block mr-1" /> Architecture
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default AfricanArchitectureHero;
