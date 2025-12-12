"use client";
import React from "react";
import { MoveLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NotFoundPage: React.FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-6 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-900/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Large 404 Graphic */}
        <div className="relative mb-6">
          <h1 className="text-[120px] sm:text-[180px] font-black text-emerald-900 leading-none select-none tracking-tighter opacity-90">
            404
          </h1>
          {/* Floating element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ecfccb] px-6 py-2 rounded-2xl rotate-12 shadow-sm border border-lime-500/30">
            <span className="text-emerald-900 font-bold text-lg sm:text-xl whitespace-nowrap">
              Page Not Found
            </span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-emerald-900 mb-4">
          We can't find that page
        </h2>

        <p className="text-gray-500 text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button className="w-full sm:w-auto px-8 py-3.5 bg-emerald-900 text-white rounded-full font-semibold hover:bg-emerald-950 transition-all shadow-lg hover:shadow-emerald-900/20 flex items-center justify-center gap-2">
              <Home size={18} />
              Go to Homepage
            </Button>
          </Link>

          <Button
            onClick={() => router.back()}
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-emerald-900 border border-emerald-900/20 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <MoveLeft size={18} />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
