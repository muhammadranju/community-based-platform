import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import CustomBadge from "./HomeBadge";

export default function FeaturedStoriesSection() {
  return (
    <section className=" bg-white">
      <div className="flex justify-between items-end mb-12">
        <div>
          <CustomBadge>OUR BLOG</CustomBadge>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-color">
            Featured Stories / Articles
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="p-4 rounded-full border border-orange-900 hover:bg-gray-100 text-orange-900 cursor-pointer">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button className="p-4 rounded-full bg-orange-900 text-white hover:bg-orange-900/90 cursor-pointer">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Story 1 */}
        <div className="relative h-[650px] rounded-3xl overflow-hidden group cursor-pointer">
          <div className="absolute inset-0 bg-orange-900">
            {/* Placeholder for image */}
            <div className="w-full h-full opacity-50 bg-[url('/bg/Rectangle2.png')] bg-cover bg-center"></div>
          </div>
          <div className="absolute inset-0 bg-linear-to-t  from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h3 className="text-4xl font-bold mb-4  max-w-md">
              African Traditional Decor & Interior Design
            </h3>
            <p className="text-base text-gray-300 mb-6 ">
              If you desire to start building your dream home based on the
              foundation of our ancestors knowledge, but don’t know where to
              start. We hope the design inspirations here will help you get
              started. We have a combination of paid and free resources based on
              the contributions of our experts.
            </p>
            <Link
              href="#"
              className="inline-flex items-center px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-orange-900 transition-colors text-sm font-bold"
            >
              Read More
            </Link>
          </div>
        </div>

        {/* Story 2 */}
        <div className="relative h-[650px] rounded-3xl overflow-hidden group cursor-pointer">
          {/* <img src="./bg/Rectangle2.png" alt="" /> */}
          <div className="absolute inset-0 bg-orange-900">
            {/* Placeholder for image */}
            <div className="w-full h-full opacity-50 bg-[url('/bg/Rectangle3.png')] bg-cover bg-center"></div>
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h3 className="text-4xl font-bold mb-4 max-w-md">
              African Traditional Decor & Interior Design
            </h3>
            <p className="text-base text-gray-300 mb-6 ">
              If you desire to start building your dream home based on the
              foundation of our ancestors knowledge, but don’t know where to
              start. We hope the design inspirations here will help you get
              started. We have a combination of paid and free resources based on
              the contributions of our experts.
            </p>
            <Link
              href="#"
              className="inline-flex items-center px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-orange-900 transition-colors text-sm font-bold"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
