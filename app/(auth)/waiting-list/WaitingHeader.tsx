import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function WaitingHeader() {
  return (
    <>
      {/* Navbar */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
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
                    className="lg:h-16 w-auto object-contain"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/waiting-list/login">
            <Button className="bg-amber-600 hover:bg-amber-600 text-white rounded-full px-6 h-9 text-sm font-semibold">
              Login
            </Button>
          </Link>
        </div>
      </header>
    </>
  );
}

export default WaitingHeader;
