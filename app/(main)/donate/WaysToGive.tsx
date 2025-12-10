import { HandHeart, Sprout } from "lucide-react";
import React from "react";

export const WaysToGive: React.FC = () => {
  return (
    <section className="w-full bg-white rounded-3xl border border-emerald-900 lg:p-8 p-4 shadow-sm">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left Side: Text Heading */}
        <div className="w-full lg:w-1/3 text-center lg:text-left">
          <h2 className="text-emerald-900 text-4xl md:text-5xl font-bold leading-tight">
            There are two ways to give
          </h2>
        </div>

        {/* Right Side: Action Cards */}
        <div className="w-full lg:w-2/3 flex flex-col sm:flex-row gap-6">
          <Card
            icon={<Sprout className="w-8 h-8 text-white" />}
            label="Monetary"
            onClick={() => console.log("Monetary clicked")}
          />
          <Card
            icon={<HandHeart className="w-8 h-8 text-white" />}
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
      <div className="relative overflow-hidden rounded-tr-[50px] rounded-bl-[50px] rounded-tl-xl rounded-br-xl  border-2 border-lime-500 p-4 h-32 flex items-center justify-center gap-6 shadow-sm hover:shadow-md transition-all">
        {/* Background decorative curve lines (optional, can be added with SVG if needed for exact pattern) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/bg/pattern.png')] bg-cover" />

        {/* Icon Circle */}
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-lime-500 text-white shrink-0 z-10">
          {icon}
        </div>

        {/* Label */}
        <span className="text-2xl font-bold text-emerald-900 z-10">
          {label}
        </span>
      </div>
    </div>
  );
};

// tinver vai -5960
