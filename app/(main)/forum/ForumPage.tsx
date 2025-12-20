"use client";

import { CommunityStatistics } from "./CommunityStatistics";
import { ForumBanner } from "./ForumBanner";
import { ForumCard } from "./ForumCard";
import { HeaderSection } from "./ForumHeaderSection";
import { forumSections } from "./forumData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

function ForumPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter sections based on search term
  const filteredSections = forumSections
    .map((section) => {
      const filteredItems = section.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...section, items: filteredItems };
    })
    .filter((section) => section.items.length > 0);

  return (
    <>
      {/* Top Hero Image - Using a landscape placeholder that mimics the aerial village view */}
      <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden mb-12 shadow-sm">
        <img
          src="/bg/Rectangle7.png"
          alt="Aerial view of African village architecture"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content Section */}
      <HeaderSection />
      <ForumBanner />

      {/* Search and Filters Section */}
      <div className="space-y-10 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-color tracking-tight leading-tight">
              Ask a question/Start <br className="hidden md:block" /> a New
              Discussions
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-80 md:w-96 group rounded-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-orange-400" />
              </div>

              <Input
                placeholder="Search Forum"
                className="w-full pl-10 pr-12 py-6 rounded-lg border bg-accent-bg border-emerald-900 text-sm placeholder-gray-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="absolute inset-y-[7px] right-1 px-3 bg-amber-700 hover:bg-amber-600 text-white rounded-md flex items-center justify-center transition-colors">
                <ArrowRight className="h-4 w-4 " />
              </Button>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button className="flex-1 sm:flex-none px-6 py-6 bg-transparent rounded-full border border-amber-600 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors">
                Topics
              </Button>
              <Button className="flex-1 sm:flex-none px-6 py-6 bg-transparent rounded-full border border-amber-600 text-sm font-semibold text-gray-700 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                Posts
              </Button>
            </div>
          </div>
        </div>

        {/* Dynamic Forum Sections */}
        <div className="space-y-12">
          {filteredSections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              {/* Only show section title if it exists and it's not the first one (logic from design)
                  Actually, the design shows titles for most sections. 'Introductions' was implied but maybe we show it. 
                  Let's show it if it's there. */}
              {section.title && section.title !== "Introductions" && (
                // Using hardcoded colors for section headers as per original logic if needed,
                // or just generic primary color matching the design
                <h2
                  className={`text-2xl font-bold tracking-tight
                  ${
                    section.theme === "purple" ||
                    section.theme === "red" ||
                    section.theme === "gold" ||
                    section.theme === "orange"
                      ? section.theme === "red" || section.theme === "orange"
                        ? "text-[#B20500]"
                        : "text-[#C59B26]"
                      : "text-emerald-700"
                  }
                `}
                >
                  {section.title}
                </h2>
              )}

              <div className="space-y-4">
                {section.items.map((item) => (
                  <ForumCard key={item.id} data={item} theme={section.theme} />
                ))}
              </div>
            </div>
          ))}

          {filteredSections.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No discussions found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      <CommunityStatistics />
    </>
  );
}

export default ForumPage;
