"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ForumBanner } from "../ForumBanner";
import { HeaderSection } from "../ForumHeaderSection";

import EmptySearchState from "@/components/forums/forum-details/EmptySearchState";
import { EmptyState } from "@/components/forums/forum-details/EmptyState";
import {
  DiscussionData,
  ForumDetailsCard,
} from "@/components/forums/forum-details/ForumDetailsCard";
import { ForumDetailsPagination } from "@/components/forums/forum-details/ForumDetailsPagination";
import ForumFilterButtons from "@/components/forums/forum-details/ForumFilterButtons";
import ForumSearchBar from "@/components/forums/forum-details/ForumSearchBar";
import PaginationInfo from "@/components/forums/forum-details/PaginationInfo";
import { authFetch } from "@/lib/authFetch";
import { capitalCase } from "change-case";

export default function ForumDetailsPage() {
  const [forumData, setForumData] = useState<DiscussionData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 6;
  const router = useRouter();
  const { forum_details: forumUrl } = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const fetchForums = async () => {
    setIsLoading(true);
    try {
      const response = await authFetch(`/forums?type=${type}&ref=${forumUrl}`, {
        method: "GET",
        auth: false,
      });
      const result = await response.json();
      setForumData(result?.data || []);
    } catch (error) {
      console.error("Error fetching forums:", error);
      setForumData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchForums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, forumUrl]);

  // Filtered data
  const filteredData = forumData.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document
      .getElementById("discussions-list")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 lg:px-0">
      {/* Hero Image */}
      <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden mb-12 shadow-sm">
        <img
          src="/bg/Rectangle8.png"
          alt="Aerial view of African village architecture"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Back Button */}
      <Button
        onClick={() => router.back()}
        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-color text-white hover:bg-green-900 transition-colors shadow-sm mb-5"
      >
        <ChevronLeft size={20} />
      </Button>

      {/* Header */}
      <HeaderSection
        title="Cultural & Historical Discussions"
        description={capitalCase(forumUrl as string)}
      />
      <ForumBanner />

      <div className="space-y-10">
        {/* Search + Filters Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-color tracking-tight leading-tight">
              Ask a question/Start <br className="hidden md:block" /> a New
              Discussion
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <ForumSearchBar value={searchQuery} onChange={handleSearch} />
            <ForumFilterButtons />
          </div>
        </div>

        {/* Discussions List */}
        <div id="discussions-list" className="space-y-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-900"></div>
            </div>
          ) : forumData.length === 0 ? (
            <EmptyState />
          ) : filteredData.length === 0 ? (
            <EmptySearchState
              query={searchQuery}
              onClear={() => handleSearch("")}
            />
          ) : (
            <div className="space-y-6">
              {paginatedData.map((discussion) => (
                <ForumDetailsCard
                  key={discussion.id}
                  data={discussion}
                  link={forumUrl as string}
                  slug={discussion?.slug as string}
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && totalPages > 1 && (
          <div className="my-10 flex justify-center">
            <ForumDetailsPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Pagination Info */}
        {filteredData.length > 0 && (
          <PaginationInfo
            start={startIndex + 1}
            end={endIndex}
            total={filteredData.length}
            hasSearch={!!searchQuery}
          />
        )}
      </div>
    </div>
  );
}
