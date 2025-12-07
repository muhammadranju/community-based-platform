import { HandHeart, Sprout } from "lucide-react";
import React from "react";

export const WaysToGive: React.FC = () => {
  return (
    <section className="w-full bg-white rounded-3xl border border-brand-border p-8 md:p-12 shadow-sm">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Side: Text Heading */}
        <div className="w-full lg:w-1/3 text-center lg:text-left">
          <h2 className="text-brand-dark text-4xl md:text-5xl font-bold leading-tight">
            There are two ways to give
          </h2>
        </div>

        {/* Right Side: Action Cards */}
        <div className="w-full lg:w-2/3 flex flex-col sm:flex-row gap-6">
          <Card
            icon={<Sprout className="w-8 h-8 text-teal-900" />}
            label="Monetary"
            onClick={() => console.log("Monetary clicked")}
          />
          <Card
            icon={<HandHeart className="w-8 h-8 text-teal-900" />}
            label="Volunteer"
            onClick={() => console.log("Volunteer clicked")}
          />
        </div>
      </div>
    </section>
  );
};

interface CardProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative w-full flex-1 cursor-pointer transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Decorative Background Container matching the image style */}
      <div className="relative overflow-hidden rounded-3xl bg-white p-1 h-32 md:h-40 border border-lime-500">
        {/* Inner Border Area - simulates the geometric pattern via SVG in CSS or standard border */}
        <div className="absolute inset-2 rounded-[1.2rem] border-[1.5px] border-teal-900/30 border-dashed flex items-center justify-between px-6 md:px-10 bg-white/50 backdrop-blur-[2px] hover:bg-white/80 transition-colors duration-200">
          {/* Icon Circle */}
          <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-lime-500 group-hover:scale-110 transition-transform duration-200 text-white">
            {icon}
          </div>

          {/* Label */}
          <span className="text-xl md:text-2xl font-bold text-teal-900 group-hover:text-teal-900 transition-colors duration-200">
            {label}
          </span>

          {/* Subtle decorative curves in background (simulated via CSS classes if needed, kept clean here) */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-lime-500 rounded-bl-full -z-10" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-lime-500 rounded-tr-full -z-10" />
        </div>
      </div>
    </div>
  );
};

// tinver vai -5960
