"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "OUR WORK", href: "/our-work" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
    { name: "DONATE", href: "/donate" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
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
                width={120}
                height={120}
                className="w-auto h-12"
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
                    {!isActive(link.href) && (
                      <ChevronDown className="ml-1 h-3 w-3" />
                    )}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <Link href="/signup">
                  <Button className="px-6 py-5 text-black rounded-full hover:bg-gray-100 border border-black bg-transparent">
                    Sign up
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="px-6 py-5 bg-secondary-color hover:bg-secondary-color2 text-white rounded-full">
                    Login
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 z-50 relative"
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
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Sidebar */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute left-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header inside sidebar */}
            <div className="flex items-center justify-between p-6 border-b">
              <Image
                src="/logo.png"
                alt="Logo"
                width={140}
                height={140}
                className="h-12 w-auto"
              />
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
                      ? "bg-[#1a5d1a]/10 text-[#1a5d1a] font-bold border-l-4 border-[#1a5d1a]"
                      : "text-gray-700 hover:bg-gray-100 hover:text-[#1a5d1a]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="p-6 border-t space-y-3">
              <Link href="/signup" className="block" onClick={closeMenu}>
                <Button className="w-full py-6 text-black rounded-full hover:bg-gray-100 border border-black bg-transparent text-lg font-medium">
                  Sign up
                </Button>
              </Link>
              <Link href="/login" className="block" onClick={closeMenu}>
                <Button className="w-full py-6 bg-secondary-color hover:bg-secondary-color2 text-white rounded-full text-lg font-medium">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
