import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ArchiveCardProps {
  id: number;
  title: string;
  backgroundColor: string;
  icon: string;
  image: string;
  description: string;
  borderColor: string;
  link: string;
}

export default function ArchiveCard({
  title,
  backgroundColor,
  icon,
  image,
  description,
  borderColor,
  link,
}: ArchiveCardProps) {
  return (
    <div
      className={cn(
        "border-2 rounded-3xl p-6 md:p-8 bg-white flex flex-col h-full",
        borderColor
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          "w-full rounded-2xl flex items-center justify-center mb-6 relative",
          backgroundColor
        )}
      >
        <img src={image} className="absolute" alt="" />
        <img src={icon} alt="" />
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold text-emerald-900 mb-4">
        {title}
      </h3>

      {/* Description - takes available space */}
      <p className="text-emerald-900 text-sm md:text-base leading-relaxed flex-1">
        {description}
      </p>

      {/* Button - pushed to bottom */}
      <div className="mt-6">
        <Link href={`/our-work/explore-archive?region=${link}`}>
          <Button
            className={cn(
              "text-gray-700 border hover:bg-gray-50 rounded-full px-6 py-5 font-medium bg-transparent w-full md:w-auto",
              borderColor
            )}
          >
            Explore Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
