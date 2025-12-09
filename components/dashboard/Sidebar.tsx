"use client";

import { ChartNoAxesColumn, LogOut, Upload, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillPieChart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { RiShoppingBag4Line } from "react-icons/ri";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  // Helper function to check if the link is active
  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Content - Now floating with margins */}
      <aside
        className={`fixed lg:left-4 left-0 lg:top-4 top-0 lg:bottom-4 bottom-0 z-50 w-64 bg-primary-color text-white lg:rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          {/* Logo Area */}
          <div className="bg-white rounded-xl p-4 mb-8 flex justify-center items-center shadow-lg">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="mb-2"
            />
          </div>

          {/* Navigation */}
          <nav className="space-y-4">
            <Link
              href="/dashboard/overview"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive("/dashboard/overview")
                  ? "bg-lime-500 text-white"
                  : "text-gray-300 hover:text-white hover:bg-teal-800"
              }`}
            >
              <AiFillPieChart size={18} className="text-current" />
              <span>Overview</span>
            </Link>

            <Link
              href="/dashboard/contnets"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/dashboard/contnets")
                  ? "bg-lime-500 text-white"
                  : "text-gray-300 hover:text-white hover:bg-teal-800"
              }`}
            >
              <ChartNoAxesColumn size={20} />
              <span>Content</span>
            </Link>

            <Link
              href="/dashboard/users"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/dashboard/users")
                  ? "bg-lime-500 text-white"
                  : "text-gray-300 hover:text-white hover:bg-teal-800"
              }`}
            >
              <Users size={20} />
              <span>Users</span>
            </Link>

            <Link
              href="/dashboard/users/overview"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/dashboard/users/overview")
                  ? "bg-lime-500 text-white"
                  : "text-gray-300 hover:text-white hover:bg-teal-800"
              }`}
            >
              <AiFillPieChart size={20} />
              <span>Users Overview</span>
            </Link>

            <Link
              href="/dashboard/moderations"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/dashboard/moderations")
                  ? "bg-lime-500 text-white"
                  : "text-gray-300 hover:text-white hover:bg-teal-800"
              }`}
            >
              <RiShoppingBag4Line size={20} />
              <span>Moderations</span>
            </Link>

            <Link
              href="/dashboard/profile"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/dashboard/profile")
                  ? "bg-lime-500 text-white"
                  : "text-gray-300 hover:text-white hover:bg-teal-800"
              }`}
            >
              <CgProfile size={20} />
              <span>Profile</span>
            </Link>

            <Link
              href="/dashboard/my-upload"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/dashboard/my-upload")
                  ? "bg-lime-500 text-white"
                  : "text-gray-300 hover:text-white hover:bg-teal-800"
              }`}
            >
              <Upload size={20} />
              <span>My Uploads</span>
            </Link>

            <Link
              href="/dashboard/settings"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive("/dashboard/settings")
                  ? "bg-lime-500 text-white"
                  : "text-gray-300 hover:text-white hover:bg-teal-800"
              }`}
            >
              <IoSettingsOutline size={20} />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        <div className="p-6">
          <button className="flex items-center space-x-3 text-gray-300 hover:text-white w-full px-4 py-3 transition-colors rounded-lg">
            <LogOut size={20} className="rotate-180" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
