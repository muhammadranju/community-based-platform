"use client";
import { authFetch } from "@/lib/authFetch";
import { MoreVertical, Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO } from "date-fns";
import { costumFormatDate } from "@/components/shared/DateTime";

export interface IPostOwner {
  _id: string;
  name: string;
  role: "USER" | "ADMIN" | string;
  email: string;
  image: string;
}

export interface IDiscussionPost {
  _id: string;
  title: string;
  description: string;
  owner: IPostOwner;
  category: string;
  type: "rebuilding" | string;
  refSlug: string;
  slug: string;
  status: "approved" | "pending" | "rejected" | string;
  createdAt: string;
  updatedAt: string;
}

function Page() {
  const [forums, setForums] = useState<IDiscussionPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IDiscussionPost | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getForums = async () => {
    setIsLoading(true);
    try {
      const res = await authFetch("/forums", {
        method: "GET",
        auth: true,
      });
      const data = await res.json();
      setForums(data?.data);
    } catch (error) {
      console.error("Error fetching forums:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getForums();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = forums.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(forums.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleActionClick = (post: IDiscussionPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const getIconSrc = (type: string) => {
    const iconMap: Record<string, string> = {
      introductions: "/Icons/Introductions.png",
      cultural: "/Icons/Cultural.png",
      rebuilding: "/Icons/Rebuilding.png",
      materials: "/Icons/Materials.png",
      interactive: "/Icons/Interactive.png",
    };
    return iconMap[type] || "/Icons/Community.png";
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="w-full">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-teal-900">
          Flagged / Pending Review
        </h1>
        <div>
          <button className="flex items-center gap-2 bg-white text-teal-900 border border-teal-900 px-5 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm">
            <Upload size={16} className="rotate-180" />
            Export
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-lime-500 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-teal-900 text-white text-left">
                <th className="py-4 px-6 font-medium text-sm">Icon</th>
                <th className="py-4 px-6 font-medium text-sm">Title</th>
                <th className="py-4 px-6 font-medium text-sm">Owner</th>
                <th className="py-4 px-6 font-medium text-sm">Type</th>
                <th className="py-4 px-6 font-medium text-sm">Status</th>
                <th className="py-4 px-6 font-medium text-sm text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                // Skeleton Loading Rows
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="text-sm">
                    <td className="py-4 px-6">
                      <Skeleton className="w-8 h-8 rounded" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-48" />
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Skeleton className="w-8 h-8 rounded-full ml-auto" />
                    </td>
                  </tr>
                ))
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No forums found
                  </td>
                </tr>
              ) : (
                currentItems.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors text-sm"
                  >
                    {/* Icon */}
                    <td className="py-4 px-6">
                      <img
                        src={getIconSrc(item.type)}
                        alt={item.type}
                        className="w-8 h-8 object-contain"
                      />
                    </td>

                    {/* Title */}
                    <td className="py-4 px-6 font-medium text-gray-700 max-w-[280px] truncate">
                      {item.title}
                    </td>

                    {/* Owner */}
                    <td className="py-4 px-6 text-gray-600">
                      <div>
                        <p className="font-medium text-gray-700">
                          {item.owner.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.owner.email}
                        </p>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-4 px-6 text-gray-600 capitalize">
                      {item.type}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-block min-w-[90px] text-center ${
                          item.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : item.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status === "approved"
                          ? "Approved"
                          : item.status === "pending"
                          ? "Pending"
                          : "Rejected"}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleActionClick(item)}
                        className="bg-[#ecfccb] hover:bg-lime-200 text-teal-900 w-8 h-8 rounded-full flex items-center justify-center transition-colors ml-auto"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && forums.length > 0 && (
          <div className="flex items-center justify-center px-6 py-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 sr-only">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, forums.length)} of {forums.length}{" "}
              entries
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-900 text-white hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="w-10 h-10 flex items-center justify-center text-gray-400"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page as number)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-lime-200 text-teal-900"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-900 text-white hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Shadcn UI Dialog/Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-teal-900">
              Post Details
            </DialogTitle>
            <DialogDescription>
              Review the complete information for this forum post
            </DialogDescription>
          </DialogHeader>

          {selectedPost && (
            <div className="space-y-6 mt-4">
              {/* Post Icon & Type */}
              <div className="flex items-center gap-4">
                <img
                  src={getIconSrc(selectedPost.type)}
                  alt={selectedPost.type}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-lg font-semibold text-gray-900 capitalize">
                    {selectedPost.type}
                  </p>
                </div>
              </div>

              {/* Title */}
              <div>
                <p className="text-sm text-gray-500 mb-1">Title</p>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedPost.title}
                </h3>
              </div>

              {/* Owner Information */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-3">Owner Information</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="font-medium text-gray-900">
                      {selectedPost.owner.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email:</span>
                    <span className="font-medium text-gray-900">
                      {selectedPost.owner.email}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Role:</span>
                    <span className="font-medium text-gray-900">
                      {selectedPost.owner.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Metadata */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                      selectedPost.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : selectedPost.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedPost.status.charAt(0).toUpperCase() +
                      selectedPost.status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="font-medium text-gray-900">
                    {selectedPost.category}
                  </p>
                </div>
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Created At</p>
                  <p className="text-gray-900">
                    {costumFormatDate(selectedPost.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Updated At</p>
                  <p className="text-gray-900">
                    {costumFormatDate(selectedPost.updatedAt)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Approve
                </button>
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Reject
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Page;
