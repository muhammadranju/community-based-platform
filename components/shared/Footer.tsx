"use client";

import { ChevronRight, HeartHandshake, Home, Send } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FaFacebook, FaLinkedin, FaTiktok, FaYoutube } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Email is required", {
        description: "Please enter your email address",
      });
      return;
    }
    // Simulate submission
    toast.success("Subscribed successfully!", {
      description: "You will receive a confirmation email",
    });
    setEmail("");
  };

  return (
    <footer className="w-full ">
      {/* Top CTA Section */}
      <div className="w-full lg:py-12 py-8 bg-accent-bg lg:px-0 px-4">
        <div className="lg:max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <div className="flex flex-row items-center gap-6  md:text-left flex-1 justify-start">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-lime-500">
              <Home className="text-white w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-emerald-900 text-xl font-semibold max-w-xs leading-snug">
              Acces Our African Indigenous Architecture Digital Archive
            </h3>
          </div>

          {/* Divider Line */}
          <div className="hidden md:block h-24 border w-1 bg-gray-400"></div>

          {/* Right CTA */}
          <div className="flex flex-row items-center gap-6  md:text-left flex-1 justify-start lg:ml-10">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-lime-500">
              <HeartHandshake
                className="text-white w-8 h-8"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-emerald-900 text-xl font-semibold max-w-xs leading-snug">
              Learn How You Can Donate To Support Our Work
            </h3>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="relative w-full text-white pt-10 pb-8 overflow-hidden bg-emerald-900 lg:px-0 px-4">
        {/* World Map Background with low opacity */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
            alt="World Map"
            className="w-full h-full md:w-[70%] md:h-auto opacity-[0.0.10] invert object-cover md:object-contain"
            style={{ filter: "brightness(100) contrast(0)" }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 lg:mb-16 mb-8">
            {/* Column 1: Social */}
            <div>
              <h4 className="text-2xl lg:text-3xl font-semibold lg:mb-6 mb-2">
                Lets Get Social
              </h4>
              <p className="text-lg text-gray-200 mb-6 font-light leading-relaxed">
                Follow us on our <br /> social media channels
              </p>
              <div className="flex gap-3">
                <SocialLink
                  link="https://www.youtube.com/@mudhouses/videos"
                  icon={<FaYoutube size={20} />}
                />
                <SocialLink
                  link="https://www.tiktok.com/@african_mudarchitecture"
                  icon={<FaTiktok size={20} />}
                />
                <SocialLink
                  link="https://www.linkedin.com/company/african-traditional-architecture/?viewAsMember=true"
                  icon={<FaLinkedin size={20} />}
                />
                <SocialLink
                  link="https://www.instagram.com/african_mudarchitecture"
                  icon={<PiInstagramLogoFill size={20} />}
                />
                <SocialLink
                  link="https://www.facebook.com"
                  icon={<FaFacebook size={20} />}
                />
              </div>
            </div>

            {/* Column 2: Our Work */}
            <div>
              <h4 className="text-xl font-semibold lg:mb-6 mb-2">Our Work</h4>
              <ul className="space-y-4">
                <LinkItem text="African Indigenous Architecture Digital Archive" />
                <LinkItem text="African Traditional Decor & Interior Design" />
                <LinkItem text="Database of African Builders, Architects & Designers" />
              </ul>
            </div>

            {/* Column 3: Join The Village */}
            <div>
              <h4 className="text-xl font-semibold lg:mb-6 mb-2">
                Join The Village
              </h4>
              <ul className="space-y-4">
                <LinkItem text="Join conversations on our forum and start new topics" />
                <LinkItem text="Upload content to our African Architecture digital archive" />
                <LinkItem text="Become a trusted profession in African Indigenous Architecture" />
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h4 className="lg:text-xl text-2xl font-semibold lg:mb-6 mb-2">
                Subscribe Our Newsletter
              </h4>
              <p className="lg:text-xs text-sm text-gray-200 mb-6 font-light leading-relaxed">
                Subscribe to our newsletter and explore designs and building
                techniques centered on African Indigenous Architecture
              </p>
              <div className="relative w-full">
                <Input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-gray-800 rounded-full py-6 px-5 pr-14 focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
                <Button
                  onClick={handleSubscribe}
                  className="absolute right-0 top-px bottom-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:opacity-90 bg-lime-500 hover:bg-lime-600"
                >
                  <Send size={50} className="text-white" />
                  {/* ml-1 to visually center the icon better */}
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Divider */}

          <div className="border-t border-white/20 pt-4 flex lg:px-0  flex-col md:flex-row items-center justify-between">
            <p className="mb-4 md:mb-0 flex-1 text-center md:text-left px-4">
              © Africa Traditional Architecture 2025| All Rights Reserved
            </p>
            <div className="flex lg:gap-x-10 gap-x-6 text-center md:text-left">
              <Link
                href="/terms-and-conditions"
                className="hover:text-white transition-colors text-xs lg:text-base"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors text-xs lg:text-base"
              >
                Privacy Policy
              </Link>
              <Link
                href="/contact"
                className="hover:text-white transition-colors text-xs lg:text-base"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<{ icon: React.ReactNode; link: string }> = ({
  icon,
  link,
}) => (
  <a
    href={link}
    target="_blank"
    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-emerald-900 hover:bg-lime-500 hover:text-white transition-all duration-300"
  >
    {icon}
  </a>
);

const LinkItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 group cursor-pointer">
    <ChevronRight className="w-4 h-4 mt-1 text-lime-500 shrink-0 group-hover:translate-x-1 transition-transform" />

    <Link
      href="#"
      className="text-xs font-light leading-relaxed text-gray-200 group-hover:text-white transition-colors"
    >
      {text}
    </Link>
  </li>
);

export default Footer;
