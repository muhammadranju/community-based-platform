"use client";
import { authFetch } from "@/lib/authFetch";
import { ChevronDown, Menu } from "lucide-react";
import React, { useEffect, useState } from "react";

interface TopBarProps {
  toggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ toggleSidebar }) => {
  const [user, setUser] = useState<any>({});
  // const user = UserInfo();
  const getUserData = async () => {
    const response = await authFetch("/user/profile");
    const user = await response.json();
    setUser(user.data);
    console.log(user.data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
        >
          <Menu className="text-primary-color" />
        </button>
        <div className="flex items-center text-primary-color font-black text-2xl ">
          {user?.role === "SUPER_ADMIN" || user?.role === "ADMIN"
            ? "Admin"
            : "User"}{" "}
          Dashboard
        </div>
      </div>

      <div className="lg:flex hidden flex-1 flex-col md:flex-row md:items-center justify-end gap-4 ">
        {/* Search */}
        {/* <div className="relative w-full md:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 border border-primary-color/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color/20 text-sm text-gray-600 placeholder-gray-400 bg-white"
          />
        </div> */}

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* <button className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-full shadow-sm transition-colors whitespace-nowrap">
            Export SVG
          </button> */}
          {/* <button className="px-4 py-2 border border-primary-color/30 text-primary-color hover:bg-teal-50 text-sm font-medium rounded-full transition-colors whitespace-nowrap">
            New{" "}
            {user?.role === "SUPER_ADMIN" || user?.role === "ADMIN"
              ? "Admin"
              : "User"}
          </button> */}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 px-2 pr-4 py-2 cursor-pointer hover:bg-gray-100 rounded-full">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${user?.image}`}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-primary-color flex items-center ">
              {user?.name}
              {/* <ChevronDown size={14} /> */}
            </div>
            <div className="text-xs text-gray-500">
              {user?.role === "SUPER_ADMIN" || user?.role === "ADMIN"
                ? "Admin"
                : "Member"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
