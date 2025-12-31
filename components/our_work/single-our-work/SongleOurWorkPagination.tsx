import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationProps } from "./interface";

export const SongleOurWorkPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const maxPagesToShow = 5;
  const pages: (number | string)[] = [];

  // Generate page numbers to display
  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <div
            key={`dots-${idx}`}
            className="text-gray-400 font-bold px-1 text-lg"
          >
            ...
          </div>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-medium flex items-center justify-center transition-colors ${
              currentPage === page
                ? "border border-emerald-900 bg-lime-50 text-emerald-900"
                : "border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
