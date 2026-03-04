"use client";

import { useEffect, useMemo, useState } from "react";
import { authFetch } from "@/lib/authFetch";
import { Skeleton } from "@/components/ui/skeleton";
import ContentTableHeader from "@/components/dashboard/contents/ContentTableHeader";
import ContentTableRow from "@/components/dashboard/contents/ContentTableRow";
import ContentPagination from "@/components/dashboard/contents/ContentPagination";
import ContentDetailsDialog from "@/components/dashboard/contents/ContentDetailsDialog";
import UpdateContentDialog from "@/components/dashboard/contents/UpdateContentDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export interface IPost {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  owner: { name: string; email: string; role: string };
  coverImage: string;
  category: string;
  country: string;
  region: string;
  images: string[];
  medias: string[];
  pdfs: string[];
  status: "approved" | "pending" | "rejected";
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export default function ContentsTablePage() {
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [editPost, setEditPost] = useState<IPost | null>(null);
  const [deletePost, setDeletePost] = useState<IPost | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const itemsPerPage = 10;

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`/contents/all-contents`, {
        method: "GET",
        auth: true,
      });
      const data = await res.json();
      setAllPosts(data?.data?.contents || data?.data || []);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handelDeletePost = async () => {
    if (!deletePost) return;
    try {
      const res = await authFetch(`/contents/${deletePost._id}`, {
        method: "DELETE",
        auth: true,
      });
      const data = await res.json();
      if (data?.success) {
        toast.success("Content deleted successfully");
        fetchPosts();
      } else {
        toast.error(data?.message || "Failed to delete content");
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
      toast.error("An error occurred while deleting");
    } finally {
      setDeletePost(null);
      setOpenDeleteDialog(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const sortedPosts = useMemo(() => {
    return [...allPosts].sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }, [allPosts, sortOrder]);

  const totalPages = Math.ceil(sortedPosts.length / itemsPerPage);
  const currentPosts = sortedPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="w-full">
      <ContentTableHeader
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
                <th className="py-4 px-6 font-medium text-sm">Image</th>
                <th className="py-4 px-6 font-medium text-sm">Title</th>
                <th className="py-4 px-6 font-medium text-sm">Category</th>
                <th className="py-4 px-6 font-medium text-sm">Owner</th>
                <th className="py-4 px-6 font-medium text-sm">Country</th>
                <th className="py-4 px-6 font-medium text-sm">Region</th>
                <th className="py-4 px-6 font-medium text-sm">Last Updated</th>
                <th className="py-4 px-6 font-medium text-sm">Status</th>
                <th className="py-4 px-6 font-medium text-sm text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: itemsPerPage }).map((_, i) => (
                  <tr key={i}>
                    <td className="py-4 px-6">
                      <Skeleton className="w-16 h-16 rounded-md" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-48" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-24" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Skeleton className="w-8 h-8 rounded-full ml-auto" />
                    </td>
                  </tr>
                ))
              ) : currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <ContentTableRow
                    key={post._id}
                    post={post}
                    onViewDetails={(p) => {
                      setSelectedPost(p);
                      setOpenDialog(true);
                    }}
                    onEditPost={(p) => {
                      setEditPost(p);
                      setOpenEditDialog(true);
                    }}
                    handelDeletePost={(p) => {
                      setDeletePost(p);
                      setOpenDeleteDialog(true);
                    }}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-500">
                    No content found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {!loading && sortedPosts.length > 0 && (
          <ContentPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <ContentDetailsDialog
        post={selectedPost}
        open={openDialog}
        onOpenChange={setOpenDialog}
      />

      <UpdateContentDialog
        post={editPost}
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        onSuccess={fetchPosts}
      />

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent className="rounded-3xl border-lime-500">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-teal-900 text-2xl font-bold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              This action cannot be undone. This will permanently delete "
              <span className="font-semibold text-teal-700">
                {deletePost?.title}
              </span>
              " from the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="rounded-full border-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handelDeletePost}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
            >
              Confirm Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
