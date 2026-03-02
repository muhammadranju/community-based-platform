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
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  ArrowLeft,
  Calendar,
  Eye,
  Filter,
  Mail,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { costumFormatDate } from "@/components/shared/DateTime";

export interface IContact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export function ContactsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSort =
    (searchParams.get("sort") as "newest" | "oldest") || "newest";
  const limit = 8;

  const [contacts, setContacts] = useState<IContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`/user-contacts`, {
        method: "GET",
        auth: true,
      });
      const json = await res.json();

      if (json.success) {
        setContacts(json.data || []);
      } else {
        setContacts([]);
      }
    } catch (error) {
      console.error(error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Client-side sorting
  const sortedContacts = useMemo(() => {
    const sorted = [...contacts];
    if (currentSort === "newest") {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else {
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }
    return sorted;
  }, [contacts, currentSort]);

  // Client-side pagination
  const paginatedContacts = useMemo(() => {
    const startIndex = (currentPage - 1) * limit;
    return sortedContacts.slice(startIndex, startIndex + limit);
  }, [sortedContacts, currentPage]);

  const totalPages = Math.ceil(sortedContacts.length / limit);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (sort: "newest" | "oldest") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const SkeletonRow = () => (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-24" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-32" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-40" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-36" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-48" />
      </td>
      <td className="py-4 px-6">
        <Skeleton className="h-4 w-28" />
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
          <h1 className="text-3xl font-bold text-teal-900 mb-1">Contacts</h1>

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
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-lime-500 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-teal-900 text-white text-left">
                <th className="py-4 px-6 font-medium text-sm">Name</th>
                <th className="py-4 px-6 font-medium text-sm">Email</th>
                <th className="py-4 px-6 font-medium text-sm">Phone</th>
                <th className="py-4 px-6 font-medium text-sm">Address</th>
                <th className="py-4 px-6 font-medium text-sm">Message</th>
                <th className="py-4 px-6 font-medium text-sm">Submitted</th>
                <th className="py-4 px-6 font-medium text-sm">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: limit }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))
              ) : paginatedContacts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No contacts found
                  </td>
                </tr>
              ) : (
                paginatedContacts.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-700 font-medium">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      <a
                        href={`mailto:${item.email}`}
                        className="text-teal-600 hover:underline"
                      >
                        {item.email}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      <a
                        href={`tel:${item.phone}`}
                        className="text-teal-600 hover:underline"
                      >
                        {item.phone}
                      </a>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{item.address}</td>
                    <td className="py-4 px-6 text-gray-600 max-w-xs truncate">
                      {item.message}
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        {costumFormatDate(item.createdAt)}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm">
                      <button
                        onClick={() => {
                          setSelectedContact(item);
                          setIsModalOpen(true);
                        }}
                        className="text-teal-900 p-2 rounded-full font-medium hover:bg-teal-950/20 transition-colors text-sm cursor-pointer"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && contacts.length > 0 && (
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
                <Eye size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md md:max-w-lg rounded-2xl p-6 bg-white border-0 shadow-xl overflow-hidden">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-2xl font-bold text-teal-900">
              Contact Details
            </DialogTitle>
            <DialogDescription className="text-gray-500 mt-1">
              Full information submitted by the user.
            </DialogDescription>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-gray-50/80 rounded-xl p-4 md:p-5 border border-gray-100 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      Name
                    </h4>
                    <p className="text-gray-900 font-semibold text-[15px]">
                      {selectedContact.name}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      Email
                    </h4>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="text-teal-700 font-medium hover:text-teal-900 hover:underline break-all transition-colors text-[15px]"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      Phone
                    </h4>
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="text-teal-700 font-medium hover:text-teal-900 hover:underline transition-colors text-[15px]"
                    >
                      {selectedContact.phone}
                    </a>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      Submitted
                    </h4>
                    <p className="text-gray-900 font-medium text-[15px]">
                      {costumFormatDate(selectedContact.createdAt)}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      Address
                    </h4>
                    <p className="text-gray-900 font-medium text-[15px]">
                      {selectedContact.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-lime-50/50 rounded-xl p-4 md:p-5 border border-lime-200/50 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br from-lime-200/20 to-teal-500/5 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-110"></div>
                <h4 className="text-[11px] font-bold text-teal-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  Message
                </h4>
                <div className="bg-white/60 rounded-lg p-3.5 border border-white max-h-[250px] overflow-y-auto">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-[15px]">
                    {selectedContact.message || (
                      <span className="text-gray-400 italic">
                        No message provided
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-end">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${selectedContact.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-700 font-medium hover:text-teal-900 hover:underline break-all transition-colors text-[15px]"
                >
                  <button className="flex items-center gap-2 bg-teal-900 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-950 transition-colors text-sm cursor-pointer">
                    <Mail size={16} /> Send Email
                  </button>
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
