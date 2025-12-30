import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";

interface ForumsTableHeaderProps {
  sortOrder: "newest" | "oldest";
  onSortChange: (order: "newest" | "oldest") => void;
}

export default function ForumsTableHeader({
  sortOrder,
  onSortChange,
}: ForumsTableHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 className="text-3xl font-bold text-teal-900">Forums</h1>

      <div className="flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 bg-teal-900 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-950 transition-colors text-sm shadow-sm">
              <Filter size={16} />
              Filter
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onSortChange("newest")}
              className={`cursor-pointer justify-between ${
                sortOrder === "newest" ? "font-semibold" : ""
              }`}
            >
              Newest First
              {sortOrder === "newest" && (
                <span className="ml-2 text-teal-600">✓</span>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSortChange("oldest")}
              className={`cursor-pointer justify-between ${
                sortOrder === "oldest" ? "font-semibold" : ""
              }`}
            >
              Oldest First
              {sortOrder === "oldest" && (
                <span className="ml-2 text-teal-600">✓</span>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
