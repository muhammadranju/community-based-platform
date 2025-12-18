import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { COUNTRIES } from "../our_work/ProcessCardData";

const CountrySidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Countries");

  return (
    <div className="border border-lime-500 rounded-2xl p-6 md:p-4 bg-white shadow-sm w-full">
      <h3 className="text-2xl font-bold text-emerald-900 mb-6 ">
        Explore the archive by country
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
            placeholder="Search by countries"
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
              {COUNTRIES.map((country) => (
                <button
                  key={country}
                  onClick={() => {
                    setSelectedCountry(country);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-emerald-900 hover:bg-accent-bg hover:text-emerald-900 transition-colors"
                >
                  {country}
                </button>
              ))}
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
            placeholder="Search by countries"
          />
        </div>

        {/* Countries List */}
        <div className="flex flex-col gap-3 max-h-fit overflow-y-auto custom-scrollbar p-2">
          {COUNTRIES.map((country, index) => (
            <button
              key={country}
              className={`group flex items-center gap-3 w-full text-left px-5 py-2 rounded-full border transition-all duration-200 ${
                index === 0
                  ? "border-emerald-900 bg-white ring-1 ring-emerald-900"
                  : "border-lime-500 bg-[#F2F6EF] hover:border-emerald-900 hover:bg-white"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  index === 0
                    ? "border-emerald-900"
                    : "border-emerald-900 group-hover:border-emerald-900"
                }`}
              >
                {index === 0 && (
                  <div className="w-2.5 h-2.5 bg-emerald-900 rounded-full" />
                )}
              </div>
              <span
                className={`text-xs font-semibold ${
                  index === 0
                    ? "text-emerald-900 font-bold"
                    : "text-emerald-900 "
                }`}
              >
                {country}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountrySidebar;
