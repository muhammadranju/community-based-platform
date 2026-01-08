import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function StepThankYou() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn">
      <div className="bg-green-100 p-4 rounded-full">
        <CheckCircle2 className="w-16 h-16 text-green-600" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-primary-color">
          You're on the list!
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Thank you for joining our waiting list. We'll verify your details and
          notify you as soon as your spot opens up.
        </p>
      </div>
      <div className="pt-4">
        <Button
          asChild
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-2 rounded-lg"
        >
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  );
}
