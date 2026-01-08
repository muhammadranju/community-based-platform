"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Filter,
  Upload,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authFetch } from "@/lib/authFetch";

export interface IWaitingList {
  _id: string;
  name: string;
  role: "builder" | string;
  email: string;
  image: string;
  website: string;
  country: string;
  expertise: string;
  experience: string;
  about: string;
  bio: string;
  status: "active" | "inactive" | string;
  available: boolean;
  verified?: boolean;
  isRoleTitle: boolean;
  agreedToTerms: boolean;
  uploads?: string[];
}

export const DashboardWaitingList: React.FC = () => {
  const [waitingList, setWaitingList] = useState<IWaitingList[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState<IWaitingList | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sorting state
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const getWaitingList = async () => {
    setLoading(true);
    try {
      const res = await authFetch("/waiting-list", {
        method: "GET",
        auth: true,
      });
      const data = await res.json();
      setWaitingList(data?.data || []);
    } catch (error) {
      console.error("Error fetching waiting list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWaitingList();
  }, []);

  // Sort by _id (MongoDB ObjectId → newest first by default)
  const sortedWaitingList = useMemo(() => {
    const sorted = [...waitingList];
    sorted.sort((a, b) => {
      if (sortOrder === "newest") {
        return b._id.localeCompare(a._id); // Newer _id > older
      } else {
        return a._id.localeCompare(b._id); // Older first
      }
    });
    return sorted;
  }, [waitingList, sortOrder]);

  // Pagination using sorted data
  const totalPages = Math.ceil(sortedWaitingList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedWaitingList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleViewDetails = (item: IWaitingList) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const TableSkeleton = () => (
    <tbody className="divide-y divide-gray-100">
      {Array.from({ length: itemsPerPage }).map((_, idx) => (
        <tr key={idx} className="text-sm">
          <td className="py-4 px-6">
            <Skeleton className="w-10 h-10 rounded-full" />
          </td>
          <td className="py-4 px-6">
            <Skeleton className="h-4 w-32" />
          </td>
          <td className="py-4 px-6">
            <Skeleton className="h-4 w-40" />
          </td>
          <td className="py-4 px-6">
            <Skeleton className="h-4 w-16" />
          </td>
          <td className="py-4 px-6">
            <Skeleton className="h-4 w-24" />
          </td>
          <td className="py-4 px-6">
            <Skeleton className="h-4 w-28" />
          </td>
          <td className="py-4 px-6">
            <Skeleton className="h-4 w-20" />
          </td>
          <td className="py-4 px-6">
            <Skeleton className="h-4 w-36" />
          </td>
          <td className="py-4 px-6">
            <Skeleton className="h-4 w-32" />
          </td>
          <td className="py-4 px-6">
            <Skeleton className="h-4 w-20" />
          </td>
          <td className="py-4 px-6">
            <Skeleton className="h-6 w-16 rounded-full" />
          </td>
          <td className="py-4 px-6">
            <Skeleton className="h-6 w-20 rounded-full" />
          </td>
          <td className="py-4 px-6 text-right">
            <Skeleton className="h-8 w-8 rounded-full ml-auto" />
          </td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className="w-full">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-teal-900">Waiting list</h1>
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
                  setCurrentPage(1);
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
                  setCurrentPage(1);
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

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-lime-500 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-teal-900 text-white text-left">
                <th className="py-4 px-6 font-medium text-sm">Image</th>
                <th className="py-4 px-6 font-medium text-sm">Name</th>
                <th className="py-4 px-6 font-medium text-sm">Email</th>
                <th className="py-4 px-6 font-medium text-sm">Website</th>
                <th className="py-4 px-6 font-medium text-sm">Country</th>
                <th className="py-4 px-6 font-medium text-sm">Expertise</th>
                <th className="py-4 px-6 font-medium text-sm">Experience</th>
                <th className="py-4 px-6 font-medium text-sm">About</th>
                <th className="py-4 px-6 font-medium text-sm">Role</th>
                <th className="py-4 px-6 font-medium text-sm">Status</th>
                <th className="py-4 px-6 font-medium text-sm text-center">
                  Available
                </th>
                <th className="py-4 px-6 font-medium text-sm text-right">
                  Manage
                </th>
              </tr>
            </thead>
            {loading ? (
              <TableSkeleton />
            ) : (
              <tbody className="divide-y divide-gray-100">
                {currentItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={12}
                      className="py-12 text-center text-gray-500"
                    >
                      No items in waiting list
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, idx) => (
                    <tr
                      key={`${item._id}-${idx}`}
                      className="hover:bg-gray-50 transition-colors text-sm text-gray-700"
                    >
                      <td className="py-4 px-6">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${item.image}`}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="py-4 px-6">{item.name}</td>
                      <td className="py-4 px-6">{item.email}</td>
                      <td className="py-4 px-6">
                        {item.website ? (
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-teal-700 hover:underline"
                          >
                            Visit
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="py-4 px-6">{item.country}</td>
                      <td className="py-4 px-6">{item.expertise}</td>
                      <td className="py-4 px-6">{item.experience}</td>
                      <td className="py-4 px-6 truncate max-w-[200px]">
                        {item.about}
                      </td>
                      <td className="py-4 px-6 capitalize">{item.role}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {item.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-10">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            item.available
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {item.available ? "Available" : "Not Available"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="bg-[#ecfccb] hover:bg-lime-200 text-teal-900 w-8 h-8 rounded-full flex items-center justify-center transition-colors ml-auto">
                              <MoreVertical size={16} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(item)}
                            >
                              <Eye size={16} className="mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
        </div>

        {/* Pagination */}
        {!loading && waitingList.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full bg-teal-900 text-white flex items-center justify-center hover:bg-teal-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <ChevronLeft size={20} />
              </button>

              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && handlePageChange(page)
                  }
                  disabled={page === "..."}
                  className={`min-w-[40px] h-10 rounded-full font-medium text-sm transition-colors ${
                    page === currentPage
                      ? "bg-lime-200 text-teal-900"
                      : page === "..."
                      ? "cursor-default text-gray-400"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full bg-teal-900 text-white flex items-center justify-center hover:bg-teal-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-teal-900">
              User Details
            </DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {selectedItem.name}
                  </h3>
                  <p className="text-gray-600">{selectedItem.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p className="text-gray-900 capitalize">
                    {selectedItem.role}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Country</p>
                  <p className="text-gray-900">{selectedItem.country}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Expertise</p>
                  <p className="text-gray-900">{selectedItem.expertise}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Experience
                  </p>
                  <p className="text-gray-900">{selectedItem.experience}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      selectedItem.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {selectedItem.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Availability
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      selectedItem.available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {selectedItem.available ? "Available" : "Not Available"}
                  </span>
                </div>
              </div>

              {selectedItem.website && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Website</p>
                  <a
                    href={selectedItem.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 hover:underline"
                  >
                    {selectedItem.website}
                  </a>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-gray-500">About</p>
                <p className="text-gray-900">{selectedItem.about}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Bio</p>
                <p className="text-gray-900">{selectedItem.bio}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
