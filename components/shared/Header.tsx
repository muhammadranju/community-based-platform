"use client";

import { Button } from "@/components/ui/button";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "OUR WORK", href: "/our-work" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
    { name: "DONATE", href: "/donate" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={120} height={120} />
          </Link>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center justify-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-black hover:text-[#1a5d1a] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <Link href="/signup">
              <Button className="py-5 px-5 text-black rounded-full hover:bg-gray-100 border border-black bg-transparent">
                Sign up
              </Button>
            </Link>
            <Link href="/login">
              <Button className="py-5 px-5 bg-[#d97706] hover:bg-[#b45309] text-white rounded-full ">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-600" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[#1a5d1a]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <Link href="/signup">
                <Button className="py-5 px-5 text-black rounded-full hover:bg-gray-100 border border-black bg-transparent">
                  Sign up
                </Button>
              </Link>
              <Link href="/login">
                <Button className="py-5 px-5 bg-[#d97706] hover:bg-[#b45309] text-white rounded-full ">
                  Login
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
