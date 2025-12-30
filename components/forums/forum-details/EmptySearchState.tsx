import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface EmptySearchStateProps {
  query: string;
  onClear: () => void;
}

export default function EmptySearchState({
  query,
  onClear,
}: EmptySearchStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="rounded-full bg-blue-50 p-4 mb-4">
        <Search className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
        No Results Found
      </h3>
      <p className="text-gray-500 text-center max-w-md mb-6">
        We couldn't find any discussions matching "{query}". Try searching with
        different keywords.
      </p>
      <Button
        onClick={onClear}
        className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-full font-medium transition-colors"
      >
        Clear Search
      </Button>
    </div>
  );
}
