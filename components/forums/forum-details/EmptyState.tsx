import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

// Empty State Component
export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="rounded-full bg-amber-50 p-4 mb-4">
      <AlertCircle className="w-8 h-8 text-amber-600" />
    </div>
    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
      No Discussions Yet
    </h3>
    <p className="text-gray-500 text-center max-w-md mb-6">
      There are no discussions in this category yet. Check back soon as new
      discussions will be added here!
    </p>
    <Button className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-full font-medium transition-colors">
      Be the First to Start a Discussion
    </Button>
  </div>
);
