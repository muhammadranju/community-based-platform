"use client";

import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PaymentErrorPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-red-50 rounded-full p-6 mb-6">
        <XCircle className="w-16 h-16 text-red-600" />
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-red-900 mb-4">
        Payment Failed
      </h1>

      <p className="text-xl text-gray-600 max-w-lg mb-8">
        We were unable to process your donation. Please check your payment
        details and try again.
      </p>

      <div className="flex gap-4">
        <Button
          onClick={() => router.push("/donate")}
          className="rounded-full bg-emerald-900 text-white hover:bg-emerald-800 px-8 py-6 text-lg"
        >
          Try Again
        </Button>
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="rounded-full border-gray-300 hover:bg-gray-50 px-8 py-6 text-lg"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
