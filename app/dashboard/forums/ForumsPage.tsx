"use client";

import { useEffect, useMemo, useState } from "react";
import { authFetch } from "@/lib/authFetch";
import { Skeleton } from "@/components/ui/skeleton";
import ForumsTableHeader from "@/components/dashboard/forums/ForumsTableHeader";
import ForumPagination from "@/components/dashboard/forums/ForumPagination";
import ForumDetailsDialog from "@/components/dashboard/forums/ForumDetailsDialog";
import ForumTableRow from "@/components/dashboard/forums/ForumTableRow";

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
  type: string;
  refSlug: string;
  slug: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export default function ForumsDashboardPage() {
  const [forums, setForums] = useState<IDiscussionPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IDiscussionPost | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const itemsPerPage = 10;

  const fetchForums = async () => {
    setIsLoading(true);
    try {
      const res = await authFetch("/forums", { method: "GET", auth: true });
      const data = await res.json();
      setForums(data?.data || []);
    } catch (error) {
      console.error("Error fetching forums:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForums();
  }, []);

  const sortedForums = useMemo(() => {
    return [...forums].sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [forums, sortOrder]);

  const totalPages = Math.ceil(sortedForums.length / itemsPerPage);
  const currentItems = sortedForums.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      <ForumsTableHeader
        sortOrder={sortOrder}
        onSortChange={(order) => {
          setSortOrder(order);
          setCurrentPage(1);
        }}
      />

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
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
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
                currentItems.map((post) => (
                  <ForumTableRow
                    key={post._id}
                    post={post}
                    onViewDetails={(p) => {
                      setSelectedPost(p);
                      setIsModalOpen(true);
                    }}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {!isLoading && forums.length > 0 && (
          <ForumPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <ForumDetailsDialog
        post={selectedPost}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
