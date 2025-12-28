"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { authFetch } from "@/lib/authFetch";
import { ChevronLeft, ChevronRight, Eye, Upload } from "lucide-react";
import { useEffect, useState } from "react";

export interface IUser {
  _id: string;
  name: string;
  role: string;
  email: string;
  image: string;
  status: string;
  website: string;
  verified: boolean;
  uploads: string[];
  bio: string;
}

function Page() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 8;

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const res = await authFetch("/user/all-users", {
        method: "GET",
        auth: true,
      });
      const data = await res.json();
      setUsers(data?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  // Handle opening modal with user data
  const handleOpenModal = (user: IUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Skeleton Row Component
  const TableSkeletonRow = () => (
    <tr className="border-b border-gray-100">
      <td className="py-4 px-6">
        <Skeleton className="w-12 h-12 rounded-full" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-40" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-48" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-6 w-20 rounded-full" />
      </td>
      <td className="py-4 px-6 text-center">
        <Skeleton className="h-4 w-8 mx-auto" />
      </td>
      <td className="py-4 px-6 text-right">
        <Skeleton className="h-8 w-8 rounded-full ml-auto" />
      </td>
    </tr>
  );

  return (
    <div className="w-full">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-emerald-900">Users</h1>
        <div>
          <button className="flex items-center gap-2 bg-white text-emerald-900 border border-emerald-900 px-5 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm">
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
              <tr className="bg-emerald-900 text-white text-left">
                <th className="py-4 px-6 font-medium text-sm">Image</th>
                <th className="py-4 px-6 font-medium text-sm">Name</th>
                <th className="py-4 px-6 font-medium text-sm">Email</th>
                <th className="py-4 px-6 font-medium text-sm">Website</th>
                <th className="py-4 px-6 font-medium text-sm">Bio</th>
                <th className="py-4 px-6 font-medium text-sm">Role</th>
                <th className="py-4 px-6 font-medium text-sm">Status</th>
                <th className="py-4 px-6 font-medium text-sm text-center">
                  Uploads
                </th>
                <th className="py-4 px-6 font-medium text-sm text-right">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading
                ? // Show skeleton rows while loading
                  Array.from({ length: itemsPerPage }).map((_, idx) => (
                    <TableSkeletonRow key={idx} />
                  ))
                : // Show actual user data
                  currentUsers.map((item, idx) => (
                    <tr
                      key={`${item._id}-${idx}`}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 text-gray-700 font-medium">
                        <img
                          src={item.image}
                          className="w-12 h-12 rounded-full"
                          alt=""
                        />
                      </td>
                      <td className="py-4 px-6 text-gray-700 font-medium">
                        {item.name}
                      </td>
                      <td className="py-4 px-6 text-gray-700 font-medium">
                        {item.email}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {item.website.length || "N/A"}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {item.bio || "N/A"}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {item.role === "SUPER_ADMIN" ? "Admin" : "Member"}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block min-w-[80px] text-center
                        ${
                          item.status === "active"
                            ? "bg-[#dcfce7] text-[#15803d]"
                            : "bg-red-100 text-red-500"
                        }
                      `}
                        >
                          {item.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-center">
                        {item.uploads.length}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="bg-[#ecfccb] hover:bg-lime-200 text-emerald-900 w-12 h-8 rounded-md flex items-center justify-center transition-colors ml-auto cursor-pointer"
                        >
                          <Eye />
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && (
        <div className="flex justify-center items-center gap-2 mt-8">
          {/* Previous Button */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, idx) => (
            <button
              key={idx}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              disabled={page === "..."}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors
              ${
                page === currentPage
                  ? "bg-[#ecfccb] text-emerald-900"
                  : page === "..."
                  ? "text-gray-400 cursor-default"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }
            `}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* User Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-emerald-900">
              User Details
            </DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6 mt-4">
              {/* User Image and Basic Info */}
              <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className="w-24 h-24 rounded-full border-4 border-emerald-900"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedUser.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{selectedUser.email}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          selectedUser.status === "active"
                            ? "bg-[#dcfce7] text-[#15803d]"
                            : "bg-red-100 text-red-500"
                        }
                      `}
                    >
                      {selectedUser.status === "active" ? "Active" : "Inactive"}
                    </span>
                    {selectedUser.verified && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-emerald-900">
                    Role
                  </label>
                  <p className="text-gray-700">
                    {selectedUser.role === "SUPER_ADMIN"
                      ? "Administrator"
                      : "Member"}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-emerald-900">
                    User ID
                  </label>
                  <p className="text-gray-700 font-mono text-sm break-all">
                    {selectedUser._id}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-emerald-900">
                    Website
                  </label>
                  <p className="text-gray-700 break-all">
                    {selectedUser.website || "N/A"}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-emerald-900">
                    Total Uploads
                  </label>
                  <p className="text-gray-700">
                    {selectedUser.uploads.length} files
                  </p>
                </div>
              </div>

              {/* Bio Section */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-emerald-900">
                  Bio
                </label>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {selectedUser.bio || "No bio available"}
                </p>
              </div>

              {/* Uploads Section */}
              {selectedUser.uploads.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-emerald-900">
                    Uploaded Files ({selectedUser.uploads.length})
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                    <ul className="space-y-1">
                      {selectedUser.uploads.map((upload, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-700 font-mono break-all"
                        >
                          • {upload}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-medium transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-full font-medium transition-colors">
                  Edit User
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
