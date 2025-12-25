"use client";
import React from "react";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import HeaderBanner from "@/components/our_work_details/HeaderBanner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import CopyPath from "@/components/shared/CopyPath";
import { toast } from "sonner";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  spanClass: string; // Tailwind class for grid span
  heightClass: string; // Tailwind class for height
}

export interface IconProps {
  className?: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const Header: React.FC = () => {
  const copy = () => {
    CopyPath();
    toast.success("Link copied to clipboard");
  };
  const router = useRouter();
  return (
    <div className="">
      <HeaderBanner />
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Back Button */}
        <Button
          onClick={() => router.back()}
          className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-emerald-900 rounded-full shadow-md hover:bg-forest/90 transition-transform active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft
            className="w-5 h-5 md:w-6 md:h-6 text-white"
            strokeWidth={2.5}
          />
        </Button>

        {/* Right Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <ActionButton
            icon={Heart}
            label="Save"
            onClick={() => toast.success("Saved to your library")}
          />
          <ActionButton icon={Share2} label="Share" onClick={copy} />
        </div>
      </div>
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 group cursor-pointer active:scale-95 transition-transform"
    >
      <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 bg-forest rounded-full shadow-sm group-hover:bg-forest/90  bg-emerald-900">
        <Icon
          className="w-4 h-4 md:w-5 md:h-5 text-white fill-transparent"
          strokeWidth={2.5}
        />
      </div>
      <span className="text-xs md:text-sm font-medium text-emerald-900">
        {label}
      </span>
    </button>
  );
};
