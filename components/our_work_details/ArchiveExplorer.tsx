import { authFetch } from "@/lib/authFetch";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  const searchParams = useSearchParams();
  const region = searchParams.get("region");
  const country = searchParams.get("country");
  const search = searchParams.get("search");
  const isAuthtenticated = true;

  const [popularContent, setPopularContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter content
  const filteredContent = popularContent.filter((item: any) => {
    let matchesRegion = true;
    let matchesCountry = true;
    let matchesSearch = true;

    // Filter by Region
    if (region) {
      const cleanRegion = region
        .split("?")[0]
        ?.replace(/^\//, "/")
        .toLowerCase();
      // "east-african-architecture" -> "east" check
      // simplistic check: does the item region match the start of the param, or is included
      const itemRegion = item.region?.toLowerCase() || "";

      // If region param is complex like "east-african-architecture", check if item.region ("east") is inside it
      // Or if item.region is "east", allow loosely.
      matchesRegion = itemRegion && cleanRegion.includes(itemRegion);
    }

    // Filter by Country
    if (country) {
      const cleanCountry = country.toLowerCase();
      const itemCountry = item.country?.toLowerCase() || "";
      matchesCountry = itemCountry === cleanCountry;
    }

    // Filter by Search Query (Title or Description)
    if (search) {
      const query = search.toLowerCase();
      const title = item.title?.toLowerCase() || "";
      const desc = item.description?.toLowerCase() || "";
      const shortDesc = item.shortDescription?.toLowerCase() || "";
      matchesSearch =
        title.includes(query) ||
        desc.includes(query) ||
        shortDesc.includes(query);
    }

    return matchesRegion && matchesCountry && matchesSearch;
  });

  // Calculate Pagination on FILTERED content
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPopularContent = async () => {
    const response = await authFetch("/contents", {
      method: "GET",
      auth: false,
    });
    const data = await response.json();
    console.log(data);
    setPopularContent(data?.data);
  };

  useEffect(() => {
    getPopularContent();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Sidebar - Countries */}

      <div className="w-full lg:w-[340px] shrink-0 lg:sticky lg:top-8">
        <CountrySidebar />
      </div>

      {/* Main Content */}
      <div className="w-full flex-1 min-w-0">
        {!isAuthtenticated && <ArchiveHeader />}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* {ARCHIVE_ITEMS.map((item) => (
            <ArchiveCard key={item.id} item={item} region={region} />
          ))} */}
          {currentItems.map((item: any, index: number) => (
            <ArchiveCard key={index} item={item} region={region || ""} />
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <Pagination>
            <PaginationContent className="flex items-center gap-1">
              <PaginationItem>
                <Button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full bg-teal-800 hover:bg-teal-700 text-white flex items-center justify-center p-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </PaginationItem>

              {/* Page 1 */}
              {totalPages > 0 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(1);
                    }}
                    isActive={currentPage === 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      currentPage === 1
                        ? "bg-white text-teal-800 font-bold border-2 border-lime-400 shadow-sm ring-4 ring-lime-400/30"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Ellipsis if far from start */}
              {currentPage > 3 && (
                <PaginationItem>
                  <span className="flex items-center justify-center w-10 h-10">
                    ...
                  </span>
                </PaginationItem>
              )}

              {/* Current Page (if it's not 1 and not last) */}
              {currentPage !== 1 && currentPage !== totalPages && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive
                    className="w-10 h-10 rounded-full bg-white text-teal-800 font-bold border-2 border-lime-400 shadow-sm ring-4 ring-lime-400/30 flex items-center justify-center"
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Ellipsis if far from end */}
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <span className="flex items-center justify-center w-10 h-10">
                    ...
                  </span>
                </PaginationItem>
              )}

              {/* Last Page (if more than 1) */}
              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(totalPages);
                    }}
                    isActive={currentPage === totalPages}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      currentPage === totalPages
                        ? "bg-white text-teal-800 font-bold border-2 border-lime-400 shadow-sm ring-4 ring-lime-400/30"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Next Button */}
              <PaginationItem>
                <Button
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="w-10 h-10 rounded-full bg-teal-800 hover:bg-teal-700 text-white flex items-center justify-center p-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
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
