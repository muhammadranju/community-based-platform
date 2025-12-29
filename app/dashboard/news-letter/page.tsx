"use client";
import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authFetch } from "@/lib/authFetch";
import { toast } from "sonner";
import { Filter, Upload } from "lucide-react";

interface NewsletterSubscriber {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const NewsletterSubscribersTable: React.FC = () => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const pageSize = 10;

  const fetchSubscribers = async () => {
    try {
      setIsLoading(true);
      const response = await authFetch("/news-letter", {
        method: "GET",
        auth: true,
      });
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      if (result.success) {
        setSubscribers(result.data || []);
      } else {
        toast.error(result.message || "Failed to load data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load subscribers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Sort subscribers by createdAt
  const sortedSubscribers = useMemo(() => {
    const sorted = [...subscribers];
    sorted.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    return sorted;
  }, [subscribers, sortOrder]);

  // Pagination based on sorted data
  const totalPages = Math.ceil(sortedSubscribers.length / pageSize);
  const paginatedData = sortedSubscribers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const formatDate = (isoString: string) =>
    format(new Date(isoString), "MMMM d, yyyy");
  const formatTime = (isoString: string) =>
    format(new Date(isoString), "h:mm a");

  const handlePrevious = () => {
    setPage((p) => Math.max(1, p - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    setPage((p) => Math.min(totalPages, p + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full mx-auto">
      <title>
        Newsletter Subscribers Dashboard - African Traditional Architecture
      </title>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-teal-900">
          Newsletter Subscribers
        </h1>
        <div className="flex gap-3">
          {/* Filter Dropdown - Newest / Oldest */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 bg-teal-900 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-950 transition-colors text-sm shadow-sm">
                <Filter size={16} />
                Filter
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setSortOrder("newest");
                  setPage(1);
                }}
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
                onClick={() => {
                  setSortOrder("oldest");
                  setPage(1);
                }}
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

          <button className="flex items-center gap-2 bg-white text-teal-900 border border-teal-900 px-5 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm sr-only">
            <Upload size={16} className="rotate-180" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No.
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Subscribed
                </TableHead>
                <TableHead className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200">
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <TableRow key={i} className="hover:bg-gray-50">
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-8" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-64" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                  </TableRow>
                ))
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="px-6 py-10 text-center text-gray-500"
                  >
                    No subscribers found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((sub, index) => (
                  <TableRow key={sub._id} className="hover:bg-gray-50">
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(page - 1) * pageSize + index + 1}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {sub.email}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(sub.createdAt)}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatTime(sub.createdAt)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!isLoading && subscribers.length > 0 && (
          <div className="border-t border-gray-200 px-4 py-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePrevious();
                    }}
                    className={
                      page === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {/* Show up to 5 page numbers */}
                {Array.from(
                  { length: Math.min(5, totalPages) },
                  (_, i) => i + Math.max(1, page - 2)
                )
                  .filter((p) => p <= totalPages)
                  .map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(p);
                        }}
                        isActive={page === p}
                        className="cursor-pointer"
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                {totalPages > 5 && page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNext();
                    }}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsletterSubscribersTable;
