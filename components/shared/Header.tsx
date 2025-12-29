"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  LogOut,
  Menu,
  NotebookTabs,
  TableOfContents,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUpload, FaUser } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { SignOut } from "./SignOut";
import getUser from "./UserInfo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "OUR WORK", href: "/our-work" },
    { name: "FORUM", href: "/forum" },
    { name: "CONTACT", href: "/contact" },
    { name: "DONATE", href: "/donate" },
  ];

  const isActive = (href: string) => pathname === href;
  const token = true; // For demo purposes
  const user = getUser();

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 mb-5 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                width={160}
                height={160}
                className="w-auto lg:h-16 h-12 "
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-semibold transition-colors flex items-center ${
                      isActive(link.href)
                        ? "text-[#1a5d1a] font-bold"
                        : "text-black hover:text-[#1a5d1a]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                {user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-3  py-1 px-2 rounded-full hover:bg-gray-100 transition-all duration-200 cursor-pointer ">
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bflex items-center justify-center shrink-0">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}${user?.image}`}
                            alt=""
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>

                        {/* Name and Role */}
                        <div className="hidden sm:flex flex-col items-start">
                          <span className="text-sm font-semibold text-gray-900">
                            {user?.name || "User"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {user?.role === "USER" ? "Member" : "Admin"}
                          </span>
                        </div>
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-64">
                      {/* Profile Header */}
                      <div className="p-4 border-b">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0">
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}${user?.image}`}
                              alt=""
                              className="w-full h-full object-cover rounded-full"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {user?.name || "User"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {user?.role === "USER"
                                ? "Member Account"
                                : "Administrator"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dashboard Navigation */}
                      <DropdownMenuItem asChild>
                        <Link
                          href={
                            user?.role === "USER"
                              ? "/dashboard/users/overview"
                              : "/dashboard/overview"
                          }
                          className="flex items-center gap-2 cursor-pointer py-2"
                        >
                          <MdDashboard className="w-4 h-4 text-amber-600" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>

                      {user?.role === "USER" && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/dashboard/my-upload"
                              className="flex items-center gap-2 cursor-pointer py-2"
                            >
                              <FaUpload className="w-4 h-4 text-amber-600" />
                              <span>My Upload</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/dashboard/my-forums"
                              className="flex items-center gap-2 cursor-pointer py-2"
                            >
                              <Form className="w-4 h-4 text-amber-600" />
                              <span>Forum</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}

                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/profile"
                          className="flex items-center gap-2 cursor-pointer py-2"
                        >
                          <FaUser className="w-4 h-4 text-amber-600" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>

                      {user?.role === "USER" && (
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/settings"
                            className="flex items-center gap-2 cursor-pointer py-2"
                          >
                            <IoSettingsSharp className="w-4 h-4 text-amber-600" />
                            <span>Settings</span>
                          </Link>
                        </DropdownMenuItem>
                      )}

                      {user?.role !== "USER" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel className="text-xs font-semibold text-gray-600 px-2 py-2">
                            Admin Tools
                          </DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/dashboard/contents"
                              className="flex items-center gap-2 cursor-pointer py-2"
                            >
                              <TableOfContents className="w-4 h-4 text-amber-600" />
                              <span>Contents</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/dashboard/users"
                              className="flex items-center gap-2 cursor-pointer py-2"
                            >
                              <Users className="w-4 h-4 text-amber-600" />
                              <span>Users</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/dashboard/forums"
                              className="flex items-center gap-2 cursor-pointer py-2"
                            >
                              <Form className="w-4 h-4 text-amber-600" />
                              <span>Forums</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href="/dashboard/waiting-list"
                              className="flex items-center gap-2 cursor-pointer py-2"
                            >
                              <NotebookTabs className="w-4 h-4 text-amber-600" />
                              <span>Waiting List</span>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}

                      <DropdownMenuSeparator />

                      {/* Logout */}
                      <DropdownMenuItem
                        onClick={SignOut}
                        className="cursor-pointer py-2 text-red-600 hover:text-red-700"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {!token ||
                (!user && (
                  <div className="flex items-center gap-3">
                    <Link href="/signup">
                      <Button className="px-6 py-5 text-black rounded-full hover:bg-gray-100 border border-black bg-transparent">
                        Sign up
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button className="px-6 py-5 bg-amber-600 hover:bg-amber-600 text-white rounded-full">
                        Login
                      </Button>
                    </Link>
                  </div>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-white z-50 relative bg-orange-600 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Sliding Sidebar Menu + Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute left-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header inside sidebar */}
            <div className="flex items-center justify-between p-6 border-b">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={140}
                  height={140}
                  className="lg:h-16 h-12 w-auto"
                />
              </Link>
              <button
                onClick={closeMenu}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-6 py-8 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className={`block w-full text-left py-4 px-4 rounded-lg text-lg font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-lime-500/10 text-lime-600 font-bold border-l-4 border-lime-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-lime-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Dashboard Menu */}
            {token && (
              <div className="px-6 py-6 border-t space-y-2">
                <p className="text-sm font-bold text-gray-600 px-2">
                  Dashboard
                </p>
                <Link
                  href="/dashboard/overview"
                  onClick={closeMenu}
                  className="flex items-center gap-2 py-3 px-4 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition"
                >
                  <MdDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-2 py-3 px-4 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition"
                >
                  <FaUser className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={closeMenu}
                  className="flex items-center gap-2 py-3 px-4 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition"
                >
                  <IoSettingsSharp className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
                <Link
                  href="/my-upload"
                  onClick={closeMenu}
                  className="flex items-center gap-2 py-3 px-4 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition"
                >
                  <FaUpload className="w-4 h-4" />
                  <span>My Upload</span>
                </Link>
              </div>
            )}

            {/* Action Buttons */}
            {!token && (
              <div className="p-6 border-t space-y-3">
                <Link href="/signup" className="block" onClick={closeMenu}>
                  <Button className="w-full py-6 text-black rounded-full hover:bg-gray-100 border border-black bg-transparent text-lg font-medium">
                    Sign up
                  </Button>
                </Link>
                <Link href="/login" className="block" onClick={closeMenu}>
                  <Button className="w-full py-6 bg-amber-600 hover:bg-amber-600 text-white rounded-full text-lg font-medium">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
