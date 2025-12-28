"use client";
import { authFetch } from "@/lib/authFetch";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Filter,
  MoreVertical,
  Trash,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";

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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { costumFormatDate } from "@/components/shared/DateTime";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface IPost {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  owner: {
    name: string;
    email: string;
    role: string;
  };
  coverImage: string;
  category: "cultural" | string;
  country: string;
  region: string;
  images: string[];
  medias: string[];
  pdfs: string[];
  status: "approved" | "pending" | "rejected" | string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

const ContentTable = () => {
  const [allPosts, setAllPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getPosts = async () => {
    setLoading(true);
    try {
      const res = await authFetch(`/contents/all-contents`, {
        method: "GET",
        auth: true,
      });
      const data = await res.json();

      console.log("API Response:", data);

      setAllPosts(data?.data?.contents || data?.data || []);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Frontend pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allPosts.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleViewDetails = (post: IPost) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleEdit = (post: IPost) => {
    console.log("Edit post:", post);
    // Add your edit logic here
  };

  const handleDelete = (post: IPost) => {
    console.log("Delete post:", post);
    // Add your delete logic here
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
        <h1 className="text-3xl font-bold text-teal-900">Content</h1>
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
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
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
                currentPosts.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors text-sm"
                  >
                    {/* Image */}
                    <td className="py-4 px-6">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${item.coverImage}`}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    {/* Title */}
                    <td className="py-4 px-6 font-medium text-gray-700 max-w-[260px] truncate">
                      {item.title}
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6 text-gray-600 capitalize">
                      {item.category}
                    </td>

                    {/* Owner */}
                    <td className="py-4 px-6 text-gray-600">
                      {item.owner.name}
                    </td>

                    {/* Country */}
                    <td className="py-4 px-6 text-gray-600 capitalize">
                      {item.country}
                    </td>

                    {/* Region */}
                    <td className="py-4 px-6 text-gray-600 capitalize">
                      {item.region}
                    </td>

                    {/* Last Updated */}
                    <td className="py-4 px-6 text-gray-600">
                      {new Date(item.updatedAt).toLocaleDateString()}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold inline-block min-w-[90px] text-center ${
                          item.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : item.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Action Dropdown */}
                    <td className="py-4 px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="bg-[#ecfccb] hover:bg-lime-200 text-teal-900 w-8 h-8 rounded-full flex items-center justify-center transition-colors ml-auto">
                            <MoreVertical size={16} />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => handleViewDetails(item)}
                            className="cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEdit(item)}
                            className="cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Content
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(item)}
                            className="cursor-pointer text-red-600"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
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

        {/* Pagination */}
        {!loading && allPosts.length > 0 && (
          <div className="flex items-center justify-center px-6 py-4 border-t border-gray-200">
            {/* <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, allPosts.length)} of {allPosts.length}{" "}
              entries
            </div> */}

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

      {/* View Details Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-teal-900">
              {selectedPost?.title}
            </DialogTitle>
            <DialogDescription className="text-base">
              {selectedPost?.shortDescription}
            </DialogDescription>
          </DialogHeader>

          {selectedPost && (
            <div className="mt-4 space-y-4">
              {/* Content Info */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium capitalize">
                    {selectedPost.category}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium capitalize">
                    {selectedPost.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="font-medium capitalize">
                    {selectedPost.country}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p className="font-medium capitalize">
                    {selectedPost.region}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Owner</p>
                  <p className="font-medium">{selectedPost.owner.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="font-medium">
                    {costumFormatDate(selectedPost.createdAt)}
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="description" className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="images">
                    Images ({selectedPost.images.length})
                  </TabsTrigger>
                  <TabsTrigger value="medias">
                    Videos ({selectedPost.medias.length})
                  </TabsTrigger>
                  <TabsTrigger value="pdfs">
                    PDFs ({selectedPost.pdfs.length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="flex-1 mt-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                      {selectedPost.description}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="images" className="flex-1 mt-4">
                  <ScrollArea className="h-[400px]">
                    {selectedPost.images.length > 0 ? (
                      <Carousel className="w-full max-w-2xl mx-auto">
                        <CarouselContent>
                          {selectedPost.images.map((img, idx) => (
                            <CarouselItem key={idx}>
                              <img
                                src={`${process.env.NEXT_PUBLIC_API_URL}${img}`}
                                alt={`Image ${idx + 1}`}
                                className="w-full h-auto object-contain rounded-lg"
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    ) : (
                      <p className="text-center text-gray-500 py-8">
                        No images available
                      </p>
                    )}
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="medias" className="flex-1 mt-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedPost.medias.length > 0 ? (
                        selectedPost.medias.map((media, idx) => (
                          <video
                            key={idx}
                            controls
                            className="w-full rounded-lg"
                          >
                            <source
                              src={`${process.env.NEXT_PUBLIC_API_URL}${media}`}
                            />
                            Your browser does not support the video tag.
                          </video>
                        ))
                      ) : (
                        <p className="col-span-2 text-center text-gray-500 py-8">
                          No videos available
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="pdfs" className="flex-1 mt-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                      {selectedPost.pdfs.length > 0 ? (
                        selectedPost.pdfs.map((pdf, idx) => (
                          <a
                            key={idx}
                            href={`${process.env.NEXT_PUBLIC_API_URL}${pdf}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-medium text-gray-700">
                              PDF Document {idx + 1}
                            </span>
                            <Upload className="h-4 w-4 text-gray-500" />
                          </a>
                        ))
                      ) : (
                        <p className="text-center text-gray-500 py-8">
                          No PDFs available
                        </p>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentTable;
