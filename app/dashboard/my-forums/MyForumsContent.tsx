"use client";

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
import { Skeleton } from "@/components/ui/skeleton";
import { authFetch } from "@/lib/authFetch";
import { Filter, MoreVertical, Upload } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface IContent {
  _id: string;
  title: string;
  category: string;
  type: string;
  status: string;
  updatedAt: string;
  slug: string;
  owner?: string;
  description: string;
}

export function MyForumsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSort =
    (searchParams.get("sort") as "newest" | "oldest") || "newest";
  const limit = 10;

  const [forums, setForums] = useState<IContent[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchForums = async () => {
    setLoading(true);
    try {
      const res = await authFetch(
        `/forums/users?limit=${limit}&page=${currentPage}&sort=${currentSort}`,
        { method: "GET", auth: true }
      );
      const json = await res.json();

      if (json.success) {
        setForums(json.data.result || []);
        setTotal(json.data.pagination?.total || 0);
      } else {
        setForums([]);
        setTotal(0);
      }
    } catch (error) {
      console.error(error);
      setForums([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentSort]);

  const handleView = (slug: string, type: string) => {
    router.push(`/forum/${slug}?type=${type}`);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await authFetch(`/forums/${deleteId}`, {
        method: "DELETE",
        auth: true,
      });

      if (res.ok) {
        setForums((prev) => prev.filter((item) => item._id !== deleteId));
        setTotal((prev) => prev - 1);
      }
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

  const handleSortChange = (sort: "newest" | "oldest") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    params.set("page", "1"); // Reset to first page
    router.push(`?${params.toString()}`);
  };

  const totalPages = Math.ceil(total / limit);

  const SkeletonRow = () => (
    <tr className="hover:bg-gray-50 transition-colors">
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

  console.log(forums);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-teal-900 mb-1">My Forums</h1>
          <p className="text-gray-500 text-sm">
            Manage your forum discussions and questions
          </p>
        </div>
        <div className="flex gap-3">
          {/* Filter Dropdown - Newest / Oldest */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 bg-teal-900 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-950 transition-colors text-sm">
                <Filter size={16} />
                Filter
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleSortChange("newest")}
                className={`cursor-pointer justify-between ${
                  currentSort === "newest" ? "font-semibold" : ""
                }`}
              >
                Newest First
                {currentSort === "newest" && (
                  <span className="ml-2 text-teal-600">✓</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("oldest")}
                className={`cursor-pointer justify-between ${
                  currentSort === "oldest" ? "font-semibold" : ""
                }`}
              >
                Oldest First
                {currentSort === "oldest" && (
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

      <div className="bg-white rounded-3xl border border-lime-500 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-teal-900 text-white text-left">
                <th className="py-4 px-6 font-medium text-sm">Id</th>
                <th className="py-4 px-6 font-medium text-sm">Title</th>
                <th className="py-4 px-6 font-medium text-sm">Type</th>
                <th className="py-4 px-6 font-medium text-sm">Description</th>
                <th className="py-4 px-6 font-medium text-sm">Status</th>
                <th className="py-4 px-6 font-medium text-sm">Updated</th>
                <th className="py-4 px-6 font-medium text-sm text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: limit }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))
              ) : forums.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No forums found
                  </td>
                </tr>
              ) : (
                forums.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-700 font-medium uppercase">
                      #{item?._id?.slice(-6)}
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      {item.title}
                    </td>
                    <td className="py-4 px-6 text-gray-600 capitalize">
                      {item.type}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {item.description.length > 100
                        ? item.description.substring(0, 100) + "..."
                        : item.description}
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
                            onClick={() => handleView(item.slug, item.type)}
                          >
                            View
                          </DropdownMenuItem>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                className="text-red-600 focus:text-red-600 sr-only"
                                onSelect={(e) => e.preventDefault()}
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
                                  permanently delete your forum post.
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && total > 0 && (
          <div className="py-6 px-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-8">
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

              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-900 font-semibold text-lg">
                  {currentPage}
                </div>
                <div className="absolute inset-0 rounded-full ring-4 ring-lime-500 -z-10" />
              </div>

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
