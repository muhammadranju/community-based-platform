import { ArrowLeft } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

function BackButton({ link, text }: { link: string; text: string }) {
  return (
    <div className="flex justify-start">
      <Link href={link} className="flex items-center gap-2 my-5">
        <Button
          variant="outline"
          className="rounded-xl py-5 bg-emerald-900 text-white hover:bg-emerald-900 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-emerald-900">Back to {text}</span>
      </Link>
    </div>
  );
}

export default BackButton;
