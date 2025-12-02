import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

function AuthHeader({ link, text }: { link: string; text?: string }) {
  return (
    <div className="hidden lg:flex w-full px-6 py-6 md:px-12 lg:px-48 justify-between items-center shrink-0">
      <Link href="/">
        <div className="flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="ATA Logo"
            width={120}
            height={120}
            className="lg:h-12 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const span = document.createElement("span");
              span.innerText = "ATA";
              span.className = "text-secondary-color2 font-black text-2xl";
              e.currentTarget.parentNode?.appendChild(span);
            }}
          />
        </div>
      </Link>

      <Link href={link}>
        <Button className="px-6 py-5 bg-secondary-color hover:bg-secondary-color2 text-white rounded-full">
          {text}
        </Button>
      </Link>
    </div>
  );
}

export default AuthHeader;
