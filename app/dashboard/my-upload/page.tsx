"use client";

import { authFetch } from "@/lib/authFetch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Filter, MoreVertical, Upload } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface IContent {
  _id: string;
  coverImage: string;
  title: string;
  category: string;
  country: string;
  status: string;
  region: string;
  updatedAt: string;
  slug: string;
}

function page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = 8; // You already have limit logic, keeping it fixed for simplicity

  const [contents, setContents] = useState<IContent[]>([]);
  const [total, setTotal] = useState(0); // Assume API returns total count
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchContents = async () => {
    setLoading(true);
    try {
      const res = await authFetch(
        `/contents/users?limit=${limit}&page=${currentPage}`,
        { method: "GET", auth: true }
      );
      const json = await res.json();

      if (json.success) {
        setContents(json.data.contents || []);
        const pagination = json.data.pagination;
        setTotal(pagination.total);
        // Optional: you can also store totalPages if you want
      } else {
        setContents([]);
        setTotal(0);
      }
    } catch (error) {
      console.error(error);
      setContents([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const regions = ["east", "central", "west", "north", "south", "global"];

  useEffect(() => {
    fetchContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleView = (slug: string, region: string) => {
    const item = regions.find((item) => item === region);
    console.log(item);
    router.push(`/our-work/${slug}?region=${item}-african-architecture`);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      // Example: await authFetch(`/contents/${deleteId}`, { method: "DELETE", auth: true });
      console.log("Deleting content with id:", deleteId);

      // Optimistic update: remove from state
      setContents((prev) => prev.filter((item) => item._id !== deleteId));
      setTotal((prev) => prev - 1);
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setDeleteId(null);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const totalPages = Math.ceil(total / limit);

  const SkeletonRow = () => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6">
        <Skeleton className="w-12 h-12 rounded-md" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-48" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-6 w-20 rounded-full" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="py-4 px-6 text-right">
        <Skeleton className="w-8 h-8 rounded-full ml-auto" />
      </td>
    </tr>
  );

  return (
    <div className="w-full">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-teal-900 mb-1">My Uploads</h1>
          <p className="text-gray-500 text-sm">
            Manage your Image, Video and Documents
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-teal-900 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-950 transition-colors text-sm">
            <Filter size={16} />
            Filter
          </button>
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
                <th className="py-4 px-6 font-medium text-sm">Image</th>
                <th className="py-4 px-6 font-medium text-sm">Title</th>
                <th className="py-4 px-6 font-medium text-sm">Category</th>
                <th className="py-4 px-6 font-medium text-sm">Country</th>
                <th className="py-4 px-6 font-medium text-sm">Status</th>
                <th className="py-4 px-6 font-medium text-sm">Updated</th>
                <th className="py-4 px-6 font-medium text-sm text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading
                ? Array.from({ length: limit }).map((_, i) => (
                    <SkeletonRow key={i} />
                  ))
                : contents.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 text-gray-700 font-medium">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_API_URL + item.coverImage
                          }
                          className="w-12 h-12 object-cover rounded-md"
                          alt={item.title}
                        />
                      </td>
                      <td className="py-4 px-6 text-gray-700 font-medium">
                        {item.title}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {item.category}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {item.country}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block min-w-[80px] text-center ${
                            item.status === "approved"
                              ? "bg-[#dcfce7] text-[#15803d]"
                              : "bg-[#ffedd5] text-[#c2410c]"
                          }`}
                        >
                          {item.status === "approved" ? "Approved" : "Pending"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {new Date(item.updatedAt).toLocaleDateString()}
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
                              onClick={() => handleView(item.slug, item.region)}
                            >
                              View
                            </DropdownMenuItem>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-600"
                                  onSelect={(e) => e.preventDefault()} // Prevent dropdown close
                                >
                                  Delete
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the content.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => {
                                      setDeleteId(item._id);
                                      handleDelete();
                                    }}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Confirm Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {/* Clean Pagination - Matches your reference design */}
        {/* Clean Pagination - Matches your design */}
        {!loading && contents.length > 0 && (
          <div className="py-6 px-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-8">
              {/* Previous */}
              <button
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
                className={`
          w-10 h-10 rounded-full flex items-center justify-center transition-all
          ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-teal-100 text-teal-900 hover:bg-teal-200"
          }
        `}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Current Page */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-900 font-semibold text-lg">
                  {currentPage}
                </div>
                <div className="absolute inset-0 rounded-full ring-4 ring-lime-500 -z-10" />
              </div>

              {/* Next */}
              <button
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage >= totalPages}
                className={`
          w-10 h-10 rounded-full flex items-center justify-center transition-all
          ${
            currentPage >= totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-teal-100 text-teal-900 hover:bg-teal-200"
          }
        `}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
