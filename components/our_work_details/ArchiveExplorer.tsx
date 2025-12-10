import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { ARCHIVE_ITEMS } from "../our_work/ProcessCardData";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import ArchiveCard from "./ArchiveCard";
import ArchiveHeader from "./ArchiveHeader";
import CountrySidebar from "./CountrySidebar";

const ArchiveExplorer: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Sidebar - Countries */}
      <div className="w-full lg:w-[340px] shrink-0 lg:sticky lg:top-8">
        <CountrySidebar />
      </div>

      {/* Main Content */}
      <div className="w-full flex-1 min-w-0">
        <ArchiveHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ARCHIVE_ITEMS.map((item) => (
            <ArchiveCard key={item.id} item={item} />
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <Pagination>
            <PaginationContent className="flex items-center gap-1">
              <PaginationItem>
                <Button className="w-10 h-10 rounded-full bg-teal-800 hover:bg-teal-700 text-white flex items-center justify-center p-0">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </PaginationItem>

              {/* Page 1 */}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center font-medium"
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {/* Active Page (2) - with lime green ring */}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive
                  className="w-10 h-10 rounded-full bg-white text-teal-800 font-bold border-2 border-lime-400 shadow-sm ring-4 ring-lime-400/30 flex items-center justify-center"
                >
                  2
                </PaginationLink>
              </PaginationItem>

              {/* Last visible page */}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center font-medium"
                >
                  21
                </PaginationLink>
              </PaginationItem>

              {/* Next Button */}
              <PaginationItem>
                <Button className="w-10 h-10 rounded-full bg-teal-800 hover:bg-teal-700 text-white flex items-center justify-center p-0">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ArchiveExplorer;
