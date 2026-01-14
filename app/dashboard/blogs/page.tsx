"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/authFetch";
import { Skeleton } from "@/components/ui/skeleton";
import BlogTableHeader from "@/components/dashboard/blogs/BlogTableHeader";
import BlogTableRow from "@/components/dashboard/blogs/BlogTableRow";
import EditBlogDialog from "@/components/dashboard/blogs/EditBlogDialog";
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
import { IBlog } from "@/types/types";

export default function BlogsPage() {
  const [allBlogs, setAllBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteBlog, setDeleteBlog] = useState<IBlog | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editBlog, setEditBlog] = useState<IBlog | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`/blogs`, {
        method: "GET",
        auth: true,
      });
      const data = await res.json();
      // Adjust according to actual response structure
      setAllBlogs(data?.data?.data || data?.data || []);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async () => {
    if (!deleteBlog) return;
    try {
      const res = await authFetch(`/blogs/${deleteBlog._id}`, {
        method: "DELETE",
        auth: true,
      });
      const data = await res.json();
      if (data?.success) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } else {
        toast.error(data?.message || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
      toast.error("An error occurred while deleting");
    } finally {
      setDeleteBlog(null);
      setOpenDeleteDialog(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full">
      <BlogTableHeader />

      <div className="bg-white rounded-3xl border border-lime-500 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-teal-900 text-white text-left">
                <th className="py-4 px-6 font-medium text-sm">Image</th>
                <th className="py-4 px-6 font-medium text-sm">Title</th>
                <th className="py-4 px-6 font-medium text-sm">Author</th>
                <th className="py-4 px-6 font-medium text-sm">Category</th>
                <th className="py-4 px-6 font-medium text-sm">Tags</th>
                <th className="py-4 px-6 font-medium text-sm">Created At</th>
                <th className="py-4 px-6 font-medium text-sm text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="py-4 px-6">
                      <Skeleton className="w-16 h-16 rounded-md" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-48" />
                    </td>
                    <td className="py-4 px-6">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Skeleton className="w-8 h-8 rounded-full ml-auto" />
                    </td>
                  </tr>
                ))
              ) : allBlogs.length > 0 ? (
                allBlogs.map((blog) => (
                  <BlogTableRow
                    key={blog._id}
                    blog={blog}
                    handelDeleteBlog={(b) => {
                      setDeleteBlog(b);
                      setOpenDeleteDialog(true);
                    }}
                    handleEditBlog={(b) => {
                      setEditBlog(b);
                      setOpenEditDialog(true);
                    }}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    No blogs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <EditBlogDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        blog={editBlog}
        onSuccess={fetchBlogs}
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
                {deleteBlog?.title}
              </span>
              " from the platform.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="rounded-full border-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBlog}
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
