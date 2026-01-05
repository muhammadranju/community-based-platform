"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      router.push("/donate");
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-emerald-50 rounded-full p-6 mb-6">
        <CheckCircle2 className="w-16 h-16 text-emerald-600" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
        Thank You!
      </h1>

      <p className="text-xl text-gray-600 max-w-lg mb-8">
        Your donation has been successfully received. We appreciate your support
        in helping us make a big impact.
      </p>

      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-500">
          Redirecting to donation page in {countdown} seconds...
        </p>
        <Button
          onClick={() => router.push("/donate")}
          variant="outline"
          className="mt-4 rounded-full border-emerald-900 text-emerald-900 hover:bg-emerald-50"
        >
          Return Immediately
        </Button>
      </div>
    </div>
  );
}
