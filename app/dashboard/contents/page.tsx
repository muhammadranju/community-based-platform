"use client";
import { authFetch } from "@/lib/authFetch";
import { Filter, MoreVertical, Upload } from "lucide-react";
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getPosts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await authFetch(
        `/contents/all-contents?page=${page}&limit=10`,
        {
          method: "GET",
          auth: true,
        }
      );
      const data = await res.json();
      setPosts(data?.data?.contents || data?.data || []);
      // Assuming the API returns pagination metadata.
      // Adjust 'totalPages' access path based on actual API response structure if needed.
      setTotalPages(data?.data?.totalPages || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts(1);
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      getPosts(newPage);
    }
  };

  const handleViewContents = (post: IPost) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  return (
    <div className="w-full">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-teal-900">Content</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-teal-900 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-950 transition-colors">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-white text-teal-900 border border-teal-900 px-5 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors">
            <Upload size={18} className="rotate-180" />
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
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
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
                : posts.map((item) => (
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

                      {/* Action */}
                      <td className="py-4 px-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="bg-[#ecfccb] hover:bg-lime-200 text-teal-900 w-8 h-8 rounded-full flex items-center justify-center transition-colors ml-auto">
                              <MoreVertical size={16} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewContents(item)}
                            >
                              View Contents
                            </DropdownMenuItem>
                            {/* Add more actions here if needed */}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-8 px-4">
        <div className="text-sm text-gray-600">
          Showing page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 border rounded-md text-sm font-medium text-white bg-teal-900 hover:bg-teal-950 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* View Contents Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>{selectedPost?.title}</DialogTitle>
            <DialogDescription>
              {selectedPost?.shortDescription}
            </DialogDescription>
          </DialogHeader>

          {selectedPost && (
            <Tabs defaultValue="description" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="medias">Medias</TabsTrigger>
                <TabsTrigger value="pdfs">PDFs</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="flex-1">
                <ScrollArea className="h-full pr-4">
                  <div className="prose prose-sm max-w-none">
                    {selectedPost.description}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="images" className="flex-1">
                <ScrollArea className="h-full">
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
                </ScrollArea>
              </TabsContent>

              <TabsContent value="medias" className="flex-1">
                <ScrollArea className="h-full pr-4">
                  <div className="grid grid-cols-2 gap-4">
                    {selectedPost.medias.length > 0 ? (
                      selectedPost.medias.map((media, idx) => (
                        <video key={idx} controls className="w-full rounded-lg">
                          <source
                            src={`${process.env.NEXT_PUBLIC_API_URL}${media}`}
                          />
                        </video>
                      ))
                    ) : (
                      <p>No medias available</p>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              {/* <TabsContent value="pdfs" className="flex-1">
                <ScrollArea className="h-full pr-4">
                  <div className="space-y-4">
                    {selectedPost.pdfs.length > 0 ? (
                      selectedPost.pdfs.map((pdf, idx) => (
                        <a
                          key={idx}
                          href={`${process.env.NEXT_PUBLIC_API_URL}${pdf}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 border rounded-lg hover:bg-gray-50"
                        >
                          PDF {idx + 1}
                        </a>
                      ))
                    ) : (
                      <p>No PDFs available</p>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent> */}
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentTable;
