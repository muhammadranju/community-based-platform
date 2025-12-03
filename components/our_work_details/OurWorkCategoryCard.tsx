import Link from "next/link";

interface CategoryCardProps {
  title: string;
  backgroundColor: string;
  icon: string;
  slug: string;
}
export default function OurWorkCategoryCard({
  title,
  backgroundColor,
  icon,
  slug,
}: CategoryCardProps) {
  return (
    <Link href={`/our-work${slug}`} className="w-full">
      <div
        className="rounded-2xl p-4 md:p-8 flex flex-row md:flex-col items-center gap-4 text-white w-full md:w-48 cursor-pointer hover:shadow-lg transition-shadow h-full"
        style={{ backgroundColor }}
      >
        {/* Icon Circle Background */}
        <div className="w-12 h-12 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center shrink-0">
          <img
            src={icon}
            alt=""
            className="w-6 h-6 md:w-20 md:h-20 object-contain"
          />
        </div>

        {/* Title */}
        <h3 className="text-left md:text-center font-bold text-sm md:text-base leading-tight whitespace-pre-line">
          {title}
        </h3>
      </div>
    </Link>
  );
}
