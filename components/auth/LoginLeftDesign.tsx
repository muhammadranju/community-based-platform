import Link from "next/link";
import { Button } from "../ui/button";

function LoginLeftDesign({ link, text }: { link: string; text?: string }) {
  return (
    <>
      {/* --- Mobile Header --- */}
      <div className="lg:hidden w-full px-4 lg:px-12 py-4 flex justify-between items-center bg-white shrink-0 z-30 relative">
        <div className="flex flex-col items-center">
          <Link href="/">
            <img
              src="/logo.png"
              alt="ATA Logo"
              className="lg:h-16 h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const span = document.createElement("span");
                span.innerText = "ATA";
                span.className = "text-orange-600 font-black text-2xl";
                e.currentTarget.parentNode?.appendChild(span);
              }}
            />
          </Link>
        </div>

        <Link href={link}>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 h-10 font-semibold shadow-md transition-all text-sm">
            {text}
          </Button>
        </Link>
      </div>

      {/* --- Left Panel (Visual) --- */}
      {/* On mobile: Visible, Full width, Aspect ratio controlled */}
      <div className="w-full lg:w-[45%] shrink-0 relative overflow-hidden bg-[#65a30d] flex items-center justify-center p-6 lg:p-12 min-h-[400px] lg:min-h-screen lg:h-auto">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-100 pointer-events-none z-0">
          <img
            src="/Rectangle.png"
            alt="Pattern"
            className="w-full h-full object-cover opacity-20"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 opacity-100 bg-[url('/Rectangle.png')] bg-repeat -z-10"></div>
        </div>

        {/* Content Container (Card) */}
        {/* On mobile, use aspect ratio or fixed height to prevent stretching. */}
        <div className="relative w-full max-w-md lg:max-w-full lg:h-full max-h-[400px] lg:max-h-[90vh] aspect-[4/5] lg:aspect-auto bg-white rounded-[2.5rem] overflow-hidden flex flex-col  z-10">
          {/* Top Wireframe/Geometry Section */}

          {/* Bottom Image Section (The Hut) */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="w-full h-full relative">
              <img
                src="/bg/Rectangle4.png"
                alt="African Traditional Architecture"
                className="w-full h-full object-cover object-bottom"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=1000&auto=format&fit=crop";
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginLeftDesign;
