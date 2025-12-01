import {
  ChevronRight,
  Facebook,
  HeartHandshake,
  Home,
  Instagram,
  Linkedin,
  Send,
  Youtube,
} from "lucide-react";
import React from "react";

// Custom Icons for those not perfectly matched in Lucide
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="w-full font-poppins">
      {/* Top CTA Section */}
      <div className="w-full py-12 px-6 md:px-12 bg-accent-bg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Left CTA */}
          <div className="flex  flex-row items-center gap-6  md:text-left flex-1 justify-end ">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-accent-color">
              <Home className="text-white w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-primary-color text-xl font-medium max-w-xs leading-snug">
              Acces Our African Indigenous Architecture Digital Archive
            </h3>
          </div>

          {/* Divider Line */}
          <div className="hidden md:block h-16 w-px bg-gray-400 opacity-50"></div>

          {/* Right CTA */}
          <div className="flex flex-row items-center gap-6  md:text-left flex-1 justify-start">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-accent-color">
              <HeartHandshake
                className="text-white w-8 h-8"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-primary-color text-xl font-medium max-w-xs leading-snug">
              Learn How You Can Donate To Support Our Work
            </h3>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="relative w-full text-white pt-16 pb-8 overflow-hidden bg-primary-color">
        {/* World Map Background with low opacity */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
            alt="World Map"
            className="w-full h-full md:w-[70%] md:h-auto opacity-[0.0.10] invert object-cover md:object-contain"
            style={{ filter: "brightness(100) contrast(0)" }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            {/* Column 1: Social */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Lets Get Social</h4>
              <p className="text-sm text-gray-200 mb-6 font-light leading-relaxed">
                Follow us on our social media channels
              </p>
              <div className="flex gap-3">
                <SocialLink icon={<Youtube size={20} />} />
                <SocialLink icon={<TikTokIcon className="w-5 h-5" />} />
                <SocialLink icon={<Linkedin size={20} />} />
                <SocialLink icon={<Instagram size={20} />} />
                <SocialLink icon={<Facebook size={20} />} />
              </div>
            </div>

            {/* Column 2: Our Work */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Our Work</h4>
              <ul className="space-y-4">
                <LinkItem text="African Indigenous Architecture Digital Archive" />
                <LinkItem text="African Traditional Decor & Interior Design" />
                <LinkItem text="Database of African Builders, Architects & Designers" />
              </ul>
            </div>

            {/* Column 3: Join The Village */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Join The Village</h4>
              <ul className="space-y-4">
                <LinkItem text="Join conversations on our forum and start new topics" />
                <LinkItem text="Upload content to our African Architecture digital archive" />
                <LinkItem text="Become a trusted profession in African Indigenous Architecture" />
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div>
              <h4 className="text-xl font-semibold mb-6">
                Subscribe Our Newsletter
              </h4>
              <p className="text-xs text-gray-200 mb-6 font-light leading-relaxed">
                Subscribe to our newsletter and explore designs and building
                techniques centered on African Indigenous Architecture
              </p>
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full bg-white text-gray-800 rounded-full py-3 px-5 pr-14 focus:outline-none focus:ring-2 focus:ring-accent-color"
                />
                <button className="absolute right-1 top-1 bottom-1 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:opacity-90 bg-accent-color">
                  <Send size={18} className="text-white ml-1" />{" "}
                  {/* ml-1 to visually center the icon better */}
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Divider */}
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm font-light text-gray-300">
            <p className="mb-4 md:mb-0 lg:w-full w-1/2">
              © Africa Traditional Architecture 2025| All Rights Reserved
            </p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon }: { icon: React.ReactNode }) => (
  <a
    href="#"
    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-color hover:bg-accent-color hover:text-white transition-all duration-300"
  >
    {icon}
  </a>
);

const LinkItem = ({ text }: { text: string }) => (
  <li className="flex items-start gap-2 group cursor-pointer">
    <ChevronRight className="w-4 h-4 mt-1 text-accent-color shrink-0 group-hover:translate-x-1 transition-transform" />
    <span className="text-sm font-light leading-relaxed text-gray-200 group-hover:text-white transition-colors">
      {text}
    </span>
  </li>
);

export default Footer;
