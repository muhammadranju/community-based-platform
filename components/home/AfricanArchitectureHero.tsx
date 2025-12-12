"use client";
import React, { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import { REGIONS } from "@/lib/data";

// --- SocialIcons & Images remain the same ---
const SocialIcons = () => (
  <div className="lg:flex hidden lg:mt-10">
    <Image src="/Icons/icon-1.png" width={70} height={70} alt="" />
    <Image src="/Icons/icon-2.png" width={70} height={70} alt="" />
    <Image src="/Icons/icon-3.png" width={70} height={70} alt="" />
    <Image src="/Icons/icon-4.png" width={70} height={70} alt="" />
    <Image src="/Icons/icon-5.png" width={70} height={70} alt="" />
    <Image src="/Icons/icon-6.png" width={70} height={70} alt="" />
  </div>
);

const Images = [
  "/Icons/Vector-1.png",
  "/Icons/Vector-2.png",
  "/Icons/Vector-3.png",
  "/Icons/Vector-4.png",
  "/Icons/Vector-5.png",
  "/Icons/Vector-6.png",
];

const AfricanArchitectureHero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative text-white rounded-2xl overflow-hidden shadow-2xl bg-black">
      {/* Background with fade */}
      <div className="absolute inset-0 z-0">
        {REGIONS.map((region, index) => (
          <div
            key={region.id}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url("${region.bgImage}")`,
              opacity: index === activeIndex ? 1 : 0,
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
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          className="mb-8"
        >
          {REGIONS.map((region, index) => {
            const isActive = index === activeIndex;

            return (
              <SwiperSlide key={region.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Text Content - Animated on slide change */}
                  <div
                    className={`space-y-10 ${
                      isActive ? "animate-slideUp" : "opacity-0"
                    }`}
                  >
                    <h1 className="text-[28px] md:text-6xl font-bold leading-tight drop-shadow-sm">
                      {region.title} Traditional Architecture
                    </h1>

                    <button
                      className="bg-white hover:bg-gray-100 rounded-full px-8 py-4 lg:text-lg text-xs font-bold shadow transition-all duration-500"
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

                  {/* Main Image + Labels - Animated together */}
                  <div
                    className={`relative h-[250px] md:h-[400px] rounded-3xl overflow-hidden bg-gray-200/10 border-2 border-white/20 -mt-14 lg:mt-0 ${
                      isActive ? "animate-slideInRight" : "opacity-0"
                    }`}
                  >
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
                        className={`absolute ${
                          label.positionClass
                        } bg-white text-black px-4 py-2 rounded-lg text-xs md:text-sm font-bold z-10 animate-bounce-slow hover:scale-105 transition-transform cursor-help shadow-md ${
                          isActive ? "animate-fadeInDelay" : "opacity-0"
                        }`}
                        style={{ animationDelay: `${idx * 0.15 + 0.4}s` }}
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
            );
          })}
        </Swiper>

        {/* Region Thumbnails - unchanged */}
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
                  className="lg:text-lg text-xs font-semibold drop-shadow-lg"
                  style={{ color: isActive ? region.colorHex : "#ffffff" }}
                >
                  {region.shortTitle.replace(" Architecture", "")}
                  <br className="hidden lg:block" /> Architecture
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Smooth synchronized animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInDelay {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.9s ease-out forwards;
        }

        .animate-fadeInDelay {
          animation: fadeInDelay 0.6s ease-out forwards;
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
