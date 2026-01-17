"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function BackButton({ link, text }: { link: string; text: string }) {
  const router = useRouter();
  return (
    <div className="flex justify-start">
      <div
        className="flex items-center gap-2 my-5"
        onClick={() => router.back()}
      >
        <Button
          variant="outline"
          className="rounded-xl py-5 bg-emerald-900 text-white hover:bg-emerald-900 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-emerald-900">Back to {text}</span>
      </div>
    </div>
  );
}

export default BackButton;
