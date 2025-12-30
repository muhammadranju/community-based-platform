import { Button } from "@/components/ui/button";

export default function ForumFilterButtons() {
  return (
    <div className="flex items-center gap-3 w-full sm:w-auto">
      <Button className="flex-1 sm:flex-none px-6 py-6 bg-transparent rounded-full border border-amber-600 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors">
        Topics
      </Button>
      <Button className="flex-1 sm:flex-none px-6 py-6 bg-transparent rounded-full border border-amber-600 text-sm font-semibold text-gray-700 hover:border-orange-300 hover:bg-orange-50 transition-colors">
        Posts
      </Button>
    </div>
  );
}
