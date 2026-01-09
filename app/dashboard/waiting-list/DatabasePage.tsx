"use client";

import { costumFormatDate } from "@/components/shared/DateTime";
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
import {
  ArrowLeft,
  Calendar,
  Filter,
  MoreVertical,
  Upload,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface IDatabaseRecord {
  _id: string;
  name: string;
  email: string;
  country: string;
  about: string;
  createdAt: string;
  updatedAt: string;
}

export function DatabasePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL state for shareability, but we handle logic client-side
  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSort =
    (searchParams.get("sort") as "newest" | "oldest") || "newest";

  const itemsPerPage = 10;

  // Stores all fetched records from the server
  const [allRecords, setAllRecords] = useState<IDatabaseRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      // Fetch "all" records by setting a high limit.
      // We process pagination on the client side.
      const res = await authFetch(`/database?limit=10000`, {
        method: "GET",
        auth: true,
      });
      const json = await res.json();

      if (json.success) {
        setRecords(json.data.result || []);
      } else {
        setAllRecords([]);
      }
    } catch (error) {
      console.error(error);
      setAllRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Helper to update records (e.g. after fetch or delete)
  const setRecords = (data: IDatabaseRecord[]) => {
    setAllRecords(data);
  };

  // Client-side processing: Sort -> Paginate
  const processedRecords = () => {
    let sorted = [...allRecords];

    // 1. Sort
    if (currentSort === "newest") {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else {
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    // 2. Paginate
    const totalCount = sorted.length;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // Ensure currentPage is valid
    const safePage = Math.min(
      Math.max(1, currentPage),
      Math.max(1, totalPages)
    );

    const startIndex = (safePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSlice = sorted.slice(startIndex, endIndex);

    return {
      currentSlice,
      totalPages,
      totalCount,
      safePage,
    };
  };

  const { currentSlice, totalPages, totalCount, safePage } = processedRecords();

  const handleView = (id: string) => {
    router.push(`/database/${id}`);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const res = await authFetch(`/database/${deleteId}`, {
        method: "DELETE",
        auth: true,
      });

      if (res.ok) {
        // Remove from local state immediately
        setAllRecords((prev) => prev.filter((item) => item._id !== deleteId));
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
    params.set("page", "1"); // Reset to page 1 on sort change
    router.push(`?${params.toString()}`);
  };

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
        <Skeleton className="h-4 w-32" />
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-teal-900 mb-1">
            Waiting List
          </h1>

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 bg-teal-900 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-950 transition-colors text-sm cursor-pointer mt-5"
          >
            <ArrowLeft size={16} /> Back
          </button>
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
                <th className="py-4 px-6 font-medium text-sm">Name</th>
                <th className="py-4 px-6 font-medium text-sm">Email</th>
                <th className="py-4 px-6 font-medium text-sm">Country</th>
                <th className="py-4 px-6 font-medium text-sm">About</th>
                <th className="py-4 px-6 font-medium text-sm">Updated</th>
                <th className="py-4 px-6 font-medium text-sm text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: itemsPerPage }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))
              ) : currentSlice.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              ) : (
                currentSlice.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-700 font-medium uppercase">
                      #{item._id.slice(-6)}
                    </td>
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{item.email}</td>
                    <td className="py-4 px-6 text-gray-600">{item.country}</td>
                    <td className="py-4 px-6 text-gray-600">
                      {item.about.length > 50
                        ? item.about.substring(0, 50) + "..."
                        : item.about}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        {costumFormatDate(item.updatedAt)}
                      </div>
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
                            onClick={() => handleView(item._id)}
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
                                  permanently delete this record.
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

        {!loading && totalCount > 0 && (
          <div className="py-6 px-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-8">
              <button
                onClick={() => safePage > 1 && handlePageChange(safePage - 1)}
                disabled={safePage === 1}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all
                  ${
                    safePage === 1
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
                  {safePage}
                </div>
                <div className="absolute inset-0 rounded-full ring-4 ring-lime-500 -z-10" />
              </div>

              <button
                onClick={() =>
                  safePage < totalPages && handlePageChange(safePage + 1)
                }
                disabled={safePage >= totalPages}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all
                  ${
                    safePage >= totalPages
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
