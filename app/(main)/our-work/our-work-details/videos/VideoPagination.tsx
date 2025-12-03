import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const VideoPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Helper to generate pagination items based on current page
  // We want to show: 1, 2, 3, 4 ... 21 as per the image
  const renderPageNumbers = () => {
    const pages = [];

    // Logic to mimic the image exactly for the demo state
    // Image shows: 1 2 3 4 ... 21
    const maxVisible = 4;

    for (let i = 1; i <= maxVisible; i++) {
      pages.push(
        <PageNumber
          key={i}
          num={i}
          active={currentPage === i}
          onClick={() => onPageChange(i)}
        />
      );
    }

    // Ellipsis
    pages.push(
      <span
        key="dots"
        className="flex items-end justify-center w-8 h-8 text-[#052E16] font-bold text-lg pb-1 tracking-widest"
      >
        ...
      </span>
    );

    // Last Page
    pages.push(
      <PageNumber
        key={totalPages}
        num={totalPages}
        active={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      />
    );

    return pages;
  };

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className="w-10 h-10 rounded-full bg-[#053F2E] flex items-center justify-center hover:bg-[#08503a] transition-colors disabled:opacity-50"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2.5} />
      </button>

      {/* Page Numbers */}
      <div className="hidden sm:flex items-center gap-1 mx-2">
        {renderPageNumbers()}
      </div>
      {/* Mobile simplified numbers (just current / total) */}
      <div className="sm:hidden flex items-center px-2 font-bold text-[#052E16]">
        {currentPage} / {totalPages}
      </div>

      {/* Next Button */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        className="w-10 h-10 rounded-full bg-[#053F2E] flex items-center justify-center hover:bg-[#08503a] transition-colors disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-5 h-5 text-white" strokeWidth={2.5} />
      </button>
    </div>
  );
};

interface PageNumberProps {
  num: number;
  active: boolean;
  onClick: () => void;
}

const PageNumber: React.FC<PageNumberProps> = ({ num, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${
                  active
                    ? "border border-[#8EB543] text-[#052E16] bg-transparent"
                    : "text-[#052E16]/70 hover:bg-black/5"
                }
            `}
    >
      {num}
    </button>
  );
};

export default VideoPagination;
