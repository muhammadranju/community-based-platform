"use client";
import React, { useEffect, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { COUNTRIES } from "../our_work/ProcessCardData";
import { useRouter, useSearchParams } from "next/navigation";

const CountrySidebar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const currentCountry = searchParams.get("country");
  const [selectedCountry, setSelectedCountry] = useState(
    currentCountry || "Countries"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const currentSearch = searchParams.get("search");

  useEffect(() => {
    if (currentCountry) {
      setSelectedCountry(currentCountry);
    } else {
      setSelectedCountry("Countries");
    }
    // Set initial search query from URL
    if (currentSearch) {
      setSearchQuery(currentSearch);
    }
  }, [currentCountry, currentSearch]);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setIsOpen(false);

    const params = new URLSearchParams(searchParams.toString());
    if (country === "Countries") {
      params.delete("country");
    } else {
      params.set("country", country);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery) {
        params.set("search", searchQuery);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`, { scroll: false });
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Use COUNTRIES directly without local filtering for the listing
  // or keep it if user wants BOTH content search AND side filtering (unlikely given prompt)
  // Prompt said "I don't want to country I want for data", so implies specifically the INPUT behavior.
  // I will revert the FILTERING of the country list to keep functionality clean for "Data" search.

  const filteredCountries = COUNTRIES;

  return (
    <div className="border border-lime-500 rounded-2xl p-6 md:p-4 bg-white shadow-sm w-full">
      <h3 className="text-2xl font-bold text-emerald-900 mb-6 ">
        Explore the archive
      </h3>

      {/* Mobile View: Search + Dropdown Row */}
      <div className="flex md:hidden gap-3 mb-6">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-white" />
          </div>
          <input
            type="text"
            className="block w-full pl-9 pr-4 py-3 rounded-lg leading-5 bg-emerald-900 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-emerald-900 text-sm shadow-sm transition-shadow"
            placeholder="Search archive..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Dropdown Trigger */}
        <div className="relative w-1/2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-lime-500 rounded-lg text-emerald-900 text-sm font-medium shadow-sm"
          >
            <span className="truncate">{selectedCountry}</span>
            <ChevronDown className="h-4 w-4 ml-2 shrink-0" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-lime-500 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
              <button
                onClick={() => handleCountrySelect("Countries")}
                className="w-full text-left px-4 py-2 text-sm text-emerald-900 hover:bg-accent-bg hover:text-emerald-900 transition-colors"
              >
                All Countries
              </button>
              {filteredCountries.map((country) => (
                <button
                  key={country}
                  onClick={() => handleCountrySelect(country)}
                  className="w-full text-left px-4 py-2 text-sm text-emerald-900 hover:bg-accent-bg hover:text-emerald-900 transition-colors"
                >
                  {country}
                </button>
              ))}
              {filteredCountries.length === 0 && (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No countries found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Desktop View: Search + List */}
      <div className="hidden md:block">
        {/* Search Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-2 rounded-full leading-5 bg-emerald-900 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-brand-green sm:text-sm shadow-sm transition-shadow"
            placeholder="Search archive..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Countries List */}
        <div className="flex flex-col gap-3 max-h-fit overflow-y-auto custom-scrollbar p-2">
          <button
            onClick={() => handleCountrySelect("Countries")}
            className={`group flex items-center gap-3 w-full text-left px-5 py-2 rounded-full border transition-all duration-200 ${
              selectedCountry === "Countries"
                ? "border-emerald-900 bg-white ring-1 ring-emerald-900"
                : "border-lime-500 bg-[#F2F6EF] hover:border-emerald-900 hover:bg-white"
            }`}
          >
            <span
              className={`text-xs font-semibold ${
                selectedCountry === "Countries"
                  ? "text-emerald-900 font-bold"
                  : "text-emerald-900 "
              }`}
            >
              All Countries
            </span>
          </button>

          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <button
                key={country}
                onClick={() => handleCountrySelect(country)}
                className={`group flex items-center gap-3 w-full text-left px-5 py-2 rounded-full border transition-all duration-200 ${
                  selectedCountry === country
                    ? "border-emerald-900 bg-white ring-1 ring-emerald-900"
                    : "border-lime-500 bg-[#F2F6EF] hover:border-emerald-900 hover:bg-white"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    selectedCountry === country
                      ? "border-emerald-900"
                      : "border-emerald-900 group-hover:border-emerald-900"
                  }`}
                >
                  {selectedCountry === country && (
                    <div className="w-2.5 h-2.5 bg-emerald-900 rounded-full" />
                  )}
                </div>
                <span
                  className={`text-xs font-semibold ${
                    selectedCountry === country
                      ? "text-emerald-900 font-bold"
                      : "text-emerald-900 "
                  }`}
                >
                  {country}
                </span>
              </button>
            ))
          ) : (
            <div className="text-sm text-gray-500 px-4 py-2">
              No countries found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountrySidebar;
