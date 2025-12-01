import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function FeaturedStoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="inline-block bg-[#84cc16] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              OUR BLOG
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#064e3b]">
              Featured Stories / Articles
            </h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 text-[#064e3b]">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-[#78350f] text-white hover:bg-[#5a270b]">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Story 1 */}
          <div className="relative h-[650px] rounded-3xl overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-[#78350f]">
              {/* Placeholder for image */}
              <div className="w-full h-full opacity-50 bg-[url('/bg/Rectangle2.png')] bg-cover bg-center"></div>
            </div>
            <div className="absolute inset-0 bg-linear-to-t  from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-4  max-w-md">
                African Traditional Decor & Interior Design
              </h3>
              <p className="text-sm text-gray-300 mb-6 line-clamp-3">
                Discover the rich history and cultural significance of African
                traditional decor and how it influences modern interior design
                trends across the globe.
              </p>
              <Link
                href="#"
                className="inline-flex items-center px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#78350f] transition-colors text-sm font-bold"
              >
                Read More
              </Link>
            </div>
          </div>

          {/* Story 2 */}
          <div className="relative h-[650px] rounded-3xl overflow-hidden group cursor-pointer">
            {/* <img src="./bg/Rectangle2.png" alt="" /> */}
            <div className="absolute inset-0 bg-[#78350f]">
              {/* Placeholder for image */}
              <div className="w-full h-full opacity-50 bg-[url('/bg/Rectangle3.png')] bg-cover bg-center"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-4 max-w-md">
                African Traditional Decor & Interior Design
              </h3>
              <p className="text-sm text-gray-300 mb-6 line-clamp-3">
                Explore the intricate patterns, materials, and techniques used
                in traditional African architecture and how they are being
                preserved today.
              </p>
              <Link
                href="#"
                className="inline-flex items-center px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-[#78350f] transition-colors text-sm font-bold"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
