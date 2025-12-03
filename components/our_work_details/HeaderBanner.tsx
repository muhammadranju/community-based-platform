import { Search } from "lucide-react";
import { useState } from "react";

function HeaderBanner() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="bg-[url('/bg/our_work_bg_red.jpg')] rounded-3xl  p-8 md:p-12 lg:p-24">
      <div className="mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Icon Circle */}
          <div className="shrink-0">
            <div className="w-24 h-24 md:w-44 md:h-44 rounded-full flex items-center justify-center">
              <img src="/Frame/Frame-1.png" className="w-full h-full" alt="" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-white text-center md:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6">
              East African Traditional Architecture
            </h1>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Explore our digital archive by searching for your favourite Indigenous architecture here"
                className="w-full pl-12 pr-6 py-3 md:py-4 rounded-full bg-black/20 border-2 border-red-300 border-opacity-60 text-white placeholder-red-100 focus:outline-none focus:border-white focus:bg-opacity-70 transition text-sm md:text-base"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderBanner;
