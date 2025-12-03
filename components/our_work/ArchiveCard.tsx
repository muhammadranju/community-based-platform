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
      className={cn("border-2 rounded-3xl p-6 md:p-8 bg-white", borderColor)}
    >
      {/* Icon Container */}
      <div
        className={cn(
          "w-full  rounded-2xl flex items-center justify-center mb-6 relative",
          backgroundColor
        )}
      >
        <img src={image} className="absolute" alt="" />
        <img src={icon} alt="" />
        {/* <img src={"/bg/pattern_bg.png"} alt="" /> */}
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold text-primary-color mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-primary-color text-sm md:text-base leading-relaxed mb-6">
        {description}
      </p>

      {/* Button */}
      <div>
        <Link href={link}>
          <Button
            // variant="outline"
            // className={`text-gray-700 border  hover:bg-gray-50 rounded-full px-6 py-2 font-medium bg-transparent`}
            className={cn(
              "text-gray-700 border  hover:bg-gray-50 rounded-full px-6 py-2 font-medium bg-transparent",
              borderColor
            )}
          >
            Explore Nows
          </Button>
        </Link>
      </div>
    </div>
  );
}
