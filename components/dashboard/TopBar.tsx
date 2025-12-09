import React from "react";
import { Search, ChevronDown, Menu } from "lucide-react";

interface TopBarProps {
  toggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
        >
          <Menu className="text-primary-color" />
        </button>
        <div className="flex items-center text-primary-color font-semibold text-lg cursor-pointer">
          Admin Dashboard
          <ChevronDown size={18} className="ml-2" />
        </div>
      </div>

      <div className="lg:flex hidden flex-1 flex-col md:flex-row md:items-center justify-end gap-4 ">
        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 border border-primary-color/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color/20 text-sm text-gray-600 placeholder-gray-400 bg-white"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-full shadow-sm transition-colors whitespace-nowrap">
            Export SVG
          </button>
          <button className="px-4 py-2 border border-primary-color/30 text-primary-color hover:bg-teal-50 text-sm font-medium rounded-full transition-colors whitespace-nowrap">
            New Admin
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
          <img
            src="https://picsum.photos/100/100"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-primary-color flex items-center gap-1">
              Musfiq
              <ChevronDown size={14} />
            </div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};
