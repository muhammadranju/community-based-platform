import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function WaitingHeader() {
  return (
    <>
      {/* Navbar */}
      <header className="container mx-auto px-4 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo Recreation */}
          <div className="relative  flex items-center justify-center">
            {/* Using a text/svg hybrid to mimic the ATA logo from the image */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <Link href="/">
                  <Image
                    src="/logo.png"
                    alt="ATA Logo"
                    width={120}
                    height={120}
                    className="lg:h-16 h-12 w-auto object-contain"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default WaitingHeader;
