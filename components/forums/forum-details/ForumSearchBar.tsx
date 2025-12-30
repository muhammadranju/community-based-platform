import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";

interface ForumSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ForumSearchBar({
  value,
  onChange,
}: ForumSearchBarProps) {
  return (
    <div className="relative w-full sm:w-80 md:w-96 group rounded-xl">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-orange-400" />
      </div>

      <Input
        placeholder="Search Forum"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-12 py-6 rounded-lg border bg-accent-bg border-emerald-900 text-sm placeholder-gray-500 transition-all"
      />

      <Button className="absolute inset-y-[7px] right-1 px-3 bg-amber-700 hover:bg-amber-600 text-white rounded-md flex items-center justify-center transition-colors">
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
