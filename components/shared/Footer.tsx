// import Link from "next/link";
// import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
// import Image from "next/image";

// export default function Footer() {
//   return (
//     <footer className="relative bg-[#064e3b] text-white pt-16 pb-8 overflow-hidden">
//       {/* World Map Background - Centered & 20% Opacity */}
//       <div className="absolute inset-0 pointer-events-none">
//         <Image
//           src="/bg/world-map-white.png" // ← Place your uploaded image here
//           alt="World map background"
//           fill
//           className="object-contain object-center opacity-20 select-none"
//           priority
//         />
//       </div>

//       {/* Content (exactly your original design) */}
//       <div className="relative z-10 container mx-auto px-4 md:px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           {/* Column 1 */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
//                 <span className="font-bold text-sm">ATA</span>
//               </div>
//               <span className="font-bold text-lg">
//                 African Traditional Architecture
//               </span>
//             </div>
//             <p className="text-sm text-gray-300 leading-relaxed">
//               Preserving, celebrating, and reimagining indigenous African
//               Architecture.
//             </p>
//           </div>

//           {/* Column 2 */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Our Work</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   href="#"
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   African Traditional Architecture Digital Archive
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   African Traditional Decor & Interior Design
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   Database of African Architects, Artisans & Designers
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Column 3 */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Join The Village</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   href="#"
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   Join our Forum
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   Subscribe to our Newsletter
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   Contribute
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Column 4 - Newsletter */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Subscribe Our Newsletter</h3>
//             <p className="text-sm text-gray-300 mb-4">
//               Subscribe to our newsletter to get our latest news and updates.
//             </p>
//             <div className="relative">
//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 className="w-full px-4 py-2 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d97706]"
//               />
//               <button className="absolute right-1 top-1 p-1.5 bg-[#84cc16] rounded-full text-white hover:bg-[#65a30d] transition-colors">
//                 <Send className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="text-sm text-gray-400">
//             © 2024 African Traditional Architecture. All rights reserved.
//           </div>
//           <div className="flex gap-4 text-xs">
//             <Link href="#" className="text-gray-300 hover:text-white">
//               Terms & Conditions
//             </Link>
//             <Link href="#" className="text-gray-300 hover:text-white">
//               Privacy Policy
//             </Link>
//             <Link href="#" className="text-gray-300 hover:text-white">
//               Contact Us
//             </Link>
//           </div>
//           <div className="flex gap-4">
//             <Link
//               href="#"
//               className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
//             >
//               <Facebook className="h-4 w-4" />
//             </Link>
//             <Link
//               href="#"
//               className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
//             >
//               <Twitter className="h-4 w-4" />
//             </Link>
//             <Link
//               href="#"
//               className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
//             >
//               <Instagram className="h-4 w-4" />
//             </Link>
//             <Link
//               href="#"
//               className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
//             >
//               <Linkedin className="h-4 w-4" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// import Link from "next/link";
// import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
// import Image from "next/image";

// export default function Footer() {
//   return (
//     <footer className="relative bg-[#064e3b] text-white pt-16 pb-8 overflow-hidden">
//       {/* BIGGER World Map Background – 200% size */}
//       <div className="absolute inset-0 pointer-events-none">
//         <img
//           src="/bg/world-map-white.png"
//           alt="World map background"
//           className="object-center opacity-20 absolute w-full h-full scale-[0.5] select-none"
//           // scale-[2] = 200% → makes it much bigger
//           // You can use scale-150, scale-[2.5], etc. if you want even bigger
//         />
//       </div>

//       {/* Your original content – unchanged */}
//       <div className="relative z-10 container mx-auto px-4 md:px-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           {/* Column 1 */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 mb-4">
//               <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
//                 <span className="font-bold text-sm">ATA</span>
//               </div>
//               <span className="font-bold text-lg">
//                 African Traditional Architecture
//               </span>
//             </div>
//             <p className="text-sm text-gray-300 leading-relaxed">
//               Preserving, celebrating, and reimagining indigenous African
//               Architecture.
//             </p>
//           </div>

//           {/* Column 2 */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Our Work</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   href="#"
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   African Traditional Architecture Digital Archive
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   African Traditional Decor & Interior Design
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   Database of African Architects, Artisans & Designers
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Column 3 */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Join The Village</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link
//                   href="#"
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   Join our Forum
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   Subscribe to our Newsletter
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="#"
//                   className="text-sm text-gray-300 hover:text-white transition-colors"
//                 >
//                   Contribute
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Column 4 - Newsletter */}
//           <div>
//             <h3 className="font-bold text-lg mb-4">Subscribe Our Newsletter</h3>
//             <p className="text-sm text-gray-300 mb-4">
//               Subscribe to our newsletter to get our latest news and updates.
//             </p>
//             <div className="relative">
//               <input
//                 type="email"
//                 placeholder="Your Email"
//                 className="w-full px-4 py-2 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d97706]"
//               />
//               <button className="absolute right-1 top-1 p-1.5 bg-[#84cc16] rounded-full text-white hover:bg-[#65a30d] transition-colors">
//                 <Send className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="text-sm text-gray-400">
//             © 2024 African Traditional Architecture. All rights reserved.
//           </div>
//           <div className="flex gap-4 text-xs">
//             <Link href="#" className="text-gray-300 hover:text-white">
//               Terms & Conditions
//             </Link>
//             <Link href="#" className="text-gray-300 hover:text-white">
//               Privacy Policy
//             </Link>
//             <Link href="#" className="text-gray-300 hover:text-white">
//               Contact Us
//             </Link>
//           </div>
//           <div className="flex gap-4">
//             <Link
//               href="#"
//               className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
//             >
//               <Facebook className="h-4 w-4" />
//             </Link>
//             <Link
//               href="#"
//               className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
//             >
//               <Twitter className="h-4 w-4" />
//             </Link>
//             <Link
//               href="#"
//               className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
//             >
//               <Instagram className="h-4 w-4" />
//             </Link>
//             <Link
//               href="#"
//               className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
//             >
//               <Linkedin className="h-4 w-4" />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#064e3b] text-white pt-32 pb-16 overflow-hidden">
      {/* 1. Solid Green Background (your original) */}
      <div className="absolute inset-0 bg-[#064e3b]" />

      {/* 2. World Map — FULLY FILLS the footer */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/bg/world-map-white.png"
          alt="World map background"
          fill
          className="object-contain object-center opacity-20 select-none"
          quality={1000}
          priority
        />
      </div>

      {/* Your original content — unchanged */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <span className="font-bold text-sm">ATA</span>
              </div>
              <span className="font-bold text-lg">
                African Traditional Architecture
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Preserving, celebrating, and reimagining indigenous African
              Architecture.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Work</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  African Traditional Architecture Digital Archive
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  African Traditional Decor & Interior Design
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Database of African Architects, Artisans & Designers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Join The Village</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Join our Forum
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Subscribe to our Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  Contribute
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Subscribe Our Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe to our newsletter to get our latest news and updates.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#d97706]"
              />
              <button className="absolute right-1 top-1 p-1.5 bg-[#84cc16] rounded-full text-white hover:bg-[#65a30d] transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © 2024 African Traditional Architecture. All rights reserved.
          </div>
          <div className="flex gap-4 text-xs">
            <Link href="#" className="text-gray-300 hover:text-white">
              Terms & Conditions
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              Contact Us
            </Link>
          </div>
          <div className="flex gap-4">
            <Link
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
