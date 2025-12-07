import { Button } from "@/components/ui/button";
import React from "react";

export const DonateHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl bg-brand-dark shadow-xl h-[250px] md:h-[350px] lg:h-[400px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/bg/Rectangle6.jpg"
          alt="Hands holding a plant"
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        {/* Gradient Overlay to ensure text readability and match the brand dark green */}
        <div className="absolute inset-0 bg-emerald-900/70  to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-8 md:px-16 py-12 flex flex-col items-start justify-center h-full">
        <div className="max-w-xl">
          <p className="text-white/90 text-sm md:text-base font-medium tracking-wide mb-2">
            Small steps to make a
          </p>
          <h1 className="text-white text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-10">
            Big
            <br />
            Impact
          </h1>

          <Button className="px-6 py-5 bg-amber-600 hover:bg-amber-600 text-white rounded-full">
            Donate Now
          </Button>
        </div>
      </div>
    </section>
  );
};
