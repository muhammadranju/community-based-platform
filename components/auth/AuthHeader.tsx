import Link from "next/link";
import { Button } from "../ui/button";

function AuthHeader({ link, text }: { link: string; text?: string }) {
  return (
    <div className="hidden lg:flex w-full px-6 py-6 md:px-12 lg:px-48 justify-between items-center shrink-0">
      <div className="flex flex-col items-center">
        <img
          src="/logo.png"
          alt="ATA Logo"
          className="lg:h-20 h-16 w-auto object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const span = document.createElement("span");
            span.innerText = "ATA";
            span.className = "text-[#b45309] font-black text-2xl";
            e.currentTarget.parentNode?.appendChild(span);
          }}
        />
      </div>

      <Link href={link}>
        <Button className="bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-full px-8 font-semibold shadow-md transition-all">
          {text}
        </Button>
      </Link>
    </div>
  );
}

export default AuthHeader;
