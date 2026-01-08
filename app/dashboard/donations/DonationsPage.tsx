"use client";
import { costumFormatDate } from "@/components/shared/DateTime";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authFetch } from "@/lib/authFetch";
import { Calendar, CreditCard, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Types matching the provided data structure
export interface IDonation {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  volunteerCategory: string;
  donationCategory: string;
  amount: number;
  description: string;
  stripeSessionId: string;
  paymentStatus: "pending" | "succeeded" | "failed" | "unpaid" | string;
  createdAt: string;
  updatedAt: string;
}

export function DonationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSort =
    (searchParams.get("sort") as "newest" | "oldest") || "newest";
  const limit = 10;

  const [donations, setDonations] = useState<IDonation[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await authFetch(
        `/donation?limit=${limit}&page=${currentPage}&sort=${currentSort}`,
        { method: "GET", auth: true }
      );
      const json = await res.json();

      console.log("Donations API Response:", json); // Debugging

      if (json.success && json.data) {
        let fetchedData: IDonation[] = [];
        let fetchedTotal = 0;

        // Primary handling for the current API structure: { data: { donations: [], pagination: { total } } }
        if (json.data.donations && Array.isArray(json.data.donations)) {
          fetchedData = json.data.donations;
          fetchedTotal = json.data.pagination?.total ?? 0;
        }
        // Fallback for older/possible alternative structures
        else if (json.data && !Array.isArray(json.data) && json.data.result) {
          fetchedData = json.data.result || [];
          fetchedTotal = json.data.pagination?.total ?? 0;
        } else if (Array.isArray(json.data)) {
          fetchedData = json.data;
          fetchedTotal = json.pagination?.total ?? 0;
        }

        // Client-side sort fallback to ensure correct order
        const sortedData = [...fetchedData].sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return currentSort === "newest" ? dateB - dateA : dateA - dateB;
        });

        setDonations(sortedData);
        setTotal(fetchedTotal);
      } else {
        setDonations([]);
        setTotal(0);
      }
    } catch (error) {
      console.error(error);
      setDonations([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, currentSort]);

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "succeeded":
      case "paid":
        return "bg-[#dcfce7] text-[#15803d]";
      case "pending":
      case "unpaid":
        return "bg-[#ffedd5] text-[#c2410c]";
      case "failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const SkeletonRow = () => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-20" />
      </td>
      <td className="py-4 px-6">
        <div className="space-y-1">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-2 w-24" />
        </div>
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-6 w-20 rounded-full" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-24" />
      </td>
    </tr>
  );

  return (
    <div className="w-full mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-teal-900 mb-2">Donations</h1>
          <p className="text-gray-500 text-sm">
            Track and manage incoming donations and payments.
          </p>
        </div>
        <div className="flex gap-3">
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 bg-teal-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-teal-950 transition-colors text-sm shadow-md hover:shadow-lg">
                <Filter size={16} />
                Filter
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleSortChange("newest")}
                className={`cursor-pointer justify-between ${
                  currentSort === "newest" ? "font-semibold bg-gray-50" : ""
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
                  currentSort === "oldest" ? "font-semibold bg-gray-50" : ""
                }`}
              >
                Oldest First
                {currentSort === "oldest" && (
                  <span className="ml-2 text-teal-600">✓</span>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-lime-500 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-teal-900 text-white text-left">
                <th className="py-4 px-6 font-medium text-sm">ID</th>
                <th className="py-4 px-6 font-medium text-sm">Donor Name</th>
                <th className="py-4 px-6 font-medium text-sm">Category</th>
                <th className="py-4 px-6 font-medium text-sm">Phone</th>
                <th className="py-4 px-6 font-medium text-sm">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: limit }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))
              ) : donations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                        <CreditCard size={24} />
                      </div>
                      <p>No donations found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                donations.map((item) => (
                  <tr
                    key={item._id}
                    className="group hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-500 font-mono text-xs">
                      #{item._id.slice(-6).toUpperCase()}
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800 text-sm">
                          {item.firstName} {item.lastName}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.email}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 capitalize">
                        {item.donationCategory}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-bold text-teal-900">
                        {item.phoneNumber}
                      </span>
                    </td>

                    <td className="py-4 px-6 text-gray-600 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        {costumFormatDate(item.createdAt)}
                        {/* {new Date(item.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )} */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section - Redesigned to match your desired look */}
        {!loading && totalPages > 1 && (
          <div className="py-8 px-6 border-t border-gray-200 bg-gray-50/50">
            <div className="flex items-center justify-center gap-6">
              {/* Previous Button */}
              <button
                onClick={() =>
                  currentPage > 1 && handlePageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
                className={`
          w-12 h-12 rounded-full flex items-center justify-center transition-all
          ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-400 text-white hover:bg-gray-500 shadow-md"
          }
        `}
              >
                <svg
                  className="w-6 h-6"
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

              {/* Current Page (highlighted in lime green) */}
              <div className="w-12 h-12 rounded-full bg-lime-300 flex items-center justify-center text-teal-900 font-bold text-lg shadow-md">
                {currentPage}
              </div>

              {/* Next Page Number (plain text, teal) */}
              {currentPage < totalPages && (
                <span className="text-teal-900 font-medium text-lg">
                  {currentPage + 1}
                </span>
              )}

              {/* Next Button (dark teal) */}
              <button
                onClick={() =>
                  currentPage < totalPages && handlePageChange(currentPage + 1)
                }
                disabled={currentPage >= totalPages}
                className={`
          w-12 h-12 rounded-full flex items-center justify-center transition-all
          ${
            currentPage >= totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-teal-900 text-white hover:bg-teal-800 shadow-md"
          }
        `}
              >
                <svg
                  className="w-6 h-6"
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

            {/* Records info text */}
            <div className="text-center mt-6 text-sm text-gray-500">
              Showing {(currentPage - 1) * limit + 1} to{" "}
              {Math.min(currentPage * limit, total)} of {total} records
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
