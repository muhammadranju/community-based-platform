"use client";

import {
  ChartNoAxesColumn,
  LogOut,
  NotebookPen,
  Upload,
  Users,
} from "lucide-react";
import { AiFillPieChart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoCloudUploadOutline, IoSettingsOutline } from "react-icons/io5";
import { RiShoppingBag4Line } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    href: "/dashboard/overview",
    label: "Overview",
    icon: <AiFillPieChart size={20} />,
  },
  {
    href: "/dashboard/contnets",
    label: "Content",
    icon: <ChartNoAxesColumn size={20} />,
  },
  { href: "/dashboard/users", label: "Users", icon: <Users size={20} /> },
  {
    href: "/dashboard/users/overview",
    label: "Users Overview",
    icon: <AiFillPieChart size={20} />,
  },
  {
    href: "/dashboard/moderations",
    label: "Moderations",
    icon: <RiShoppingBag4Line size={20} />,
  },
  {
    href: "/dashboard/waiting-list",
    label: "Waiting List",
    icon: <NotebookPen size={20} />,
  },
  {
    href: "/dashboard/upload-content",
    label: "Upload Content",
    icon: <IoCloudUploadOutline size={20} />,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: <CgProfile size={20} />,
  },
  {
    href: "/dashboard/my-upload",
    label: "My Uploads",
    icon: <Upload size={20} />,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: <IoSettingsOutline size={20} />,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        href={item.href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
          isActive
            ? "bg-lime-500 text-white"
            : "text-gray-300 hover:text-white hover:bg-teal-800"
        }`}
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary-color text-white flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 lg:left-4 lg:top-4 lg:bottom-4 lg:rounded-2xl lg:shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Section */}
        <div className="p-6">
          <div className="bg-white rounded-xl p-4 mb-8 shadow-lg flex justify-center">
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-6">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-teal-800/50 rounded-lg transition-colors">
            <LogOut size={20} className="rotate-180" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
