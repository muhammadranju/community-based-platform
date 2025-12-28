// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { authFetch } from "@/lib/authFetch";
// import parse from "html-react-parser";
// import {
//   ArrowRight,
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   Eye,
//   MessageSquare,
//   Search,
//   User,
// } from "lucide-react";
// import Link from "next/link";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { ForumBanner } from "../ForumBanner";
// import { HeaderSection } from "../ForumHeaderSection";
// import { capitalCase } from "change-case";

// // --- Types ---
// interface DiscussionData {
//   id: number;
//   title: string;
//   description: string;
//   posts: string;
//   views: string;
//   lastUpdated: string;
//   type: string;
//   updatedBy?: string;
//   variant: "blue" | "green" | "purple" | "red" | "gold" | "orange";
//   iconType:
//     | "introductions"
//     | "cultural"
//     | "rebuilding"
//     | "materials"
//     | "interactive"
//     | "community";
//   link?: string;
// }

// const StatBlock = ({
//   label,
//   value,
//   isLast = false,
// }: {
//   label: string;
//   value: string;
//   isLast?: boolean;
// }) => (
//   <div
//     className={`flex flex-col justify-center px-4 md:px-6 ${
//       !isLast ? "border-r border-gray-200 hidden md:flex" : ""
//     }`}
//   >
//     <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
//       {label}
//     </span>
//     <span className="text-xs md:text-sm font-semibold text-gray-700 truncate max-w-[120px]">
//       {value}
//     </span>
//   </div>
// );

// // Mobile specific stat block to handle layout differently on small screens
// const MobileStatRow = ({
//   posts,
//   views,
//   lastUpdated,
//   updatedBy,
// }: {
//   posts: string;
//   views: string;
//   lastUpdated: string;
//   updatedBy?: string;
// }) => (
//   <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-4 md:hidden text-xs text-gray-500 border-t border-gray-100 pt-3 w-full">
//     <div className="flex items-center gap-1">
//       <MessageSquare className="w-3 h-3" />
//       <span className="font-medium">{posts} Posts</span>
//     </div>
//     <div className="flex items-center gap-1">
//       <Eye className="w-3 h-3" />
//       <span className="font-medium">{views} Views</span>
//     </div>
//     <div className="flex items-center gap-1 w-full sm:w-auto">
//       <Clock className="w-3 h-3" />
//       <span className="truncate">Updated: {lastUpdated}</span>
//     </div>
//     {updatedBy && (
//       <div className="flex items-center gap-1 w-full sm:w-auto">
//         <User className="w-3 h-3" />
//         <span className="truncate">By: {updatedBy}</span>
//       </div>
//     )}
//   </div>
// );

// /**
//  * ForumCard Component
//  * Main component for displaying a discussion topic
//  */

// const iconTypeToVariant = {
//   introduction: "blue",
//   cultural: "green",
//   rebuilding: "purple",
//   materials: "red",
//   interactive: "gold",
//   community: "orange",
// };

// const ForumCard = ({
//   data,
//   link,
//   slug,
// }: {
//   data: DiscussionData;
//   link: string;
//   slug: string;
// }) => {
//   console.log(data);
//   return (
//     <div
//       className={`group relative bg-white rounded-2xl border transition-all duration-200 shadow-sm p-5 md:p-6 mb-4`}
//     >
//       <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
//         {/* Icon Section */}
//         <div className="flex-shrink-0">
//           <div
//             className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white border-6 ${
//               data.type === "introductions"
//                 ? "border-blue-900"
//                 : data.type === "cultural"
//                 ? "border-green-900"
//                 : data.type === "rebuilding"
//                 ? "border-purple-900"
//                 : data.type === "materials"
//                 ? "border-red-900"
//                 : data.type === "interactive"
//                 ? "border-purple-900"
//                 : "border-orange-900"
//             } p-2`}
//           >
//             {data.type === "introductions" ? (
//               <img src="/Icons/Introductions.png" alt="" />
//             ) : data.type === "cultural" ? (
//               <img src="/Icons/Cultural.png" alt="" />
//             ) : data.type === "rebuilding" ? (
//               <img src="/Icons/Rebuilding.png" alt="" />
//             ) : data.type === "materials" ? (
//               <img src="/Icons/Materials.png" alt="" />
//             ) : data.type === "interactive" ? (
//               <img src="/Icons/Interactive.png" alt="" />
//             ) : (
//               <img src="/Icons/Community.png" alt="" />
//             )}
//           </div>
//         </div>

//         {/* Content Section */}
//         <div className="flex-grow min-w-0 pr-4">
//           <Link href={`/forum/${link}/${slug}`}>
//             <h3
//               className={`text-lg md:text-xl font-bold ${
//                 data.type === "introductions"
//                   ? "text-blue-900"
//                   : data.type === "cultural"
//                   ? "text-green-900"
//                   : data.type === "rebuilding"
//                   ? "text-purple-900"
//                   : data.type === "materials"
//                   ? "text-red-900"
//                   : data.type === "interactive"
//                   ? "text-gold-900"
//                   : "text-orange-900"
//               } mb-2 leading-tight`}
//             >
//               {data.title}
//             </h3>
//           </Link>
//           <p className="text-gray-500 text-sm leading-relaxed">
//             {parse(
//               data.description.length > 100
//                 ? data.description.substring(0, 100) + "..."
//                 : data.description
//             )}
//           </p>

//           {/* Mobile Stats (Visible only on mobile) */}
//           {/* <MobileStatRow
//             posts={data.posts}
//             views={data.views}
//             lastUpdated={data.lastUpdated}
//             updatedBy={data.updatedBy}
//           /> */}
//         </div>

//         {/* Desktop Stats Section (Hidden on mobile, Flex on md) */}
//         {/* <div className="hidden md:flex items-center flex-shrink-0 border-l border-gray-200 pl-2 h-full min-h-[60px]">
//           <StatBlock label="POSTS" value={data.posts} />
//           <StatBlock label="VIEWS" value={data.views} />
//           <div className="flex flex-col justify-center px-6">
//             <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
//               LAST UPDATED
//             </span>
//             <span className="text-xs md:text-sm font-semibold text-gray-700 mb-1">
//               {data.lastUpdated}
//             </span>
//             {data.updatedBy && (
//               <span className="text-[10px] text-green-700 font-medium">
//                 {data.updatedBy}
//               </span>
//             )}
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default function page() {
//   const [forumData, setForumData] = useState([]);

//   const router = useRouter();
//   const { forum_details: forumUrl } = useParams();
//   const searchParams = useSearchParams();
//   const type = searchParams.get("type");

//   const getForumsByType = async () => {
//     const response = await authFetch(`/forums?type=${type}&ref=${forumUrl}`, {
//       method: "GET",
//       auth: false,
//     });
//     const result = await response.json();
//     setForumData(result?.data);
//   };

//   useEffect(() => {
//     getForumsByType();
//   }, []);

//   console.log(forumData);
//   return (
//     <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 lg:px-0">
//       {/* Top Hero Image - Using a landscape placeholder that mimics the aerial village view */}
//       <div className="w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden mb-12 shadow-sm">
//         <img
//           src="/bg/Rectangle8.png"
//           alt="Aerial view of African village architecture"
//           className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
//         />
//       </div>

//       {/* Content Section */}
//       <Button
//         onClick={() => router.back()}
//         className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-color text-white hover:bg-green-900 transition-colors shadow-sm mb-5"
//       >
//         <ChevronLeft size={20} />
//       </Button>
//       {/* Content Section */}
//       <HeaderSection
//         title="Cultural & Historical Discussions"
//         description={capitalCase(forumUrl as string)}
//       />
//       <ForumBanner />
//       <div className="space-y-10">
//         {/* Header Section */}
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
//           <div className="max-w-xl">
//             <h1 className="text-3xl md:text-4xl font-bold text-primary-color tracking-tight leading-tight">
//               Ask a question/Start <br className="hidden md:block" /> a New
//               Discussions
//             </h1>
//           </div>

//           <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
//             {/* Search Input */}
//             <div className="relative w-full sm:w-80 md:w-96 group  rounded-xl">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Search className="h-5 w-5 text-orange-400" />
//               </div>

//               <Input
//                 placeholder="Search Forum"
//                 className="w-full pl-10 pr-12 py-6 rounded-lg border bg-accent-bg border-emerald-900 text-sm placeholder-gray-500 transition-all"
//               />
//               <Button className="absolute inset-y-[7px] right-1 px-3  bg-amber-700 hover:bg-amber-600 text-white rounded-md flex items-center justify-center transition-colors">
//                 <ArrowRight className="h-4 w-4 " />
//               </Button>
//             </div>

//             {/* Filter Buttons */}
//             <div className="flex items-center gap-3 w-full sm:w-auto">
//               <Button className="flex-1 sm:flex-none px-6 py-6 bg-transparent rounded-full border border-amber-600 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors">
//                 Topics
//               </Button>
//               <Button className="flex-1 sm:flex-none px-6 py-6 bg-transparent rounded-full border border-amber-600 text-sm font-semibold text-gray-700 hover:border-orange-300 hover:bg-orange-50 transition-colors">
//                 Posts
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Discussions List */}
//         <div className="space-y-8">
//           {/* Section 2: Cultural & Historical */}
//           <div className="space-y-6">
//             <div className="space-y-4">
//               {forumData.map((discussion: any) => (
//                 <>
//                   {console.log(discussion)}
//                   <ForumCard
//                     key={discussion.id}
//                     data={discussion}
//                     link={forumUrl as string}
//                     slug={discussion.slug}
//                   />
//                 </>
//               ))}

//               {/* {discussions
//                 .filter(
//                   (d) =>
//                     d.variant === "green" ||
//                     d.variant === "blue" ||
//                     d.variant === "purple" ||
//                     d.variant === "red" ||
//                     d.variant === "gold" ||
//                     d.variant === "orange"
//                 )
//                 .map((discussion) => (
//                   <ForumCard
//                     key={discussion.id}
//                     data={discussion}
//                     link={forumUrl as string}
//                   />
//                 ))} */}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className=" my-10">
//         <Pagination />
//       </div>
//     </div>
//   );
// }

// const Pagination = () => {
//   return (
//     <div className="flex items-center gap-1.5 sm:gap-2">
//       <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-primary-color transition-colors">
//         <ChevronLeft size={20} />
//       </button>

//       <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-highlight bg-lime-50 text-primary font-medium flex items-center justify-center">
//         1
//       </button>
//       <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 text-gray-500 font-medium flex items-center justify-center hover:bg-gray-50">
//         2
//       </button>
//       <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 text-gray-500 font-medium flex items-center justify-center hover:bg-gray-50">
//         3
//       </button>
//       <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 text-gray-500 font-medium flex items-center justify-center hover:bg-gray-50">
//         4
//       </button>

//       <div className="text-gray-400 font-bold px-1 text-lg">...</div>

//       <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 text-gray-500 font-medium flex items-center justify-center hover:bg-gray-50">
//         21
//       </button>

//       <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-primary-color transition-colors">
//         <ChevronRight size={20} />
//       </button>
//     </div>
//   );
// };

"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authFetch } from "@/lib/authFetch";
import parse from "html-react-parser";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  MessageSquare,
  Search,
  User,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ForumBanner } from "../ForumBanner";
import { HeaderSection } from "../ForumHeaderSection";
import { capitalCase } from "change-case";

// --- Types ---
interface DiscussionData {
  id: number;
  title: string;
  description: string;
  posts: string;
  views: string;
  lastUpdated: string;
  type: string;
  updatedBy?: string;
  variant: "blue" | "green" | "purple" | "red" | "gold" | "orange";
  iconType:
    | "introductions"
    | "cultural"
    | "rebuilding"
    | "materials"
    | "interactive"
    | "community";
  link?: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const StatBlock = ({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) => (
  <div
    className={`flex flex-col justify-center px-4 md:px-6 ${
      !isLast ? "border-r border-gray-200 hidden md:flex" : ""
    }`}
  >
    <span className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
      {label}
    </span>
    <span className="text-xs md:text-sm font-semibold text-gray-700 truncate max-w-[120px]">
      {value}
    </span>
  </div>
);

const MobileStatRow = ({
  posts,
  views,
  lastUpdated,
  updatedBy,
}: {
  posts: string;
  views: string;
  lastUpdated: string;
  updatedBy?: string;
}) => (
  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-4 md:hidden text-xs text-gray-500 border-t border-gray-100 pt-3 w-full">
    <div className="flex items-center gap-1">
      <MessageSquare className="w-3 h-3" />
      <span className="font-medium">{posts} Posts</span>
    </div>
    <div className="flex items-center gap-1">
      <Eye className="w-3 h-3" />
      <span className="font-medium">{views} Views</span>
    </div>
    <div className="flex items-center gap-1 w-full sm:w-auto">
      <Clock className="w-3 h-3" />
      <span className="truncate">Updated: {lastUpdated}</span>
    </div>
    {updatedBy && (
      <div className="flex items-center gap-1 w-full sm:w-auto">
        <User className="w-3 h-3" />
        <span className="truncate">By: {updatedBy}</span>
      </div>
    )}
  </div>
);

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const maxPagesToShow = 5;
  const pages: (number | string)[] = [];

  // Generate page numbers to display
  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <div
            key={`dots-${idx}`}
            className="text-gray-400 font-bold px-1 text-lg"
          >
            ...
          </div>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full font-medium flex items-center justify-center transition-colors ${
              currentPage === page
                ? "border border-emerald-900 bg-lime-50 text-emerald-900"
                : "border border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="rounded-full bg-amber-50 p-4 mb-4">
      <AlertCircle className="w-8 h-8 text-amber-600" />
    </div>
    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
      No Discussions Yet
    </h3>
    <p className="text-gray-500 text-center max-w-md mb-6">
      There are no discussions in this category yet. Check back soon as new
      discussions will be added here!
    </p>
    <Button className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-full font-medium transition-colors">
      Be the First to Start a Discussion
    </Button>
  </div>
);

const ForumCard = ({
  data,
  link,
  slug,
}: {
  data: DiscussionData;
  link: string;
  slug: string;
}) => {
  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200 shadow-sm p-5 md:p-6 mb-4`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        {/* Icon Section */}
        <div className="flex-shrink-0">
          <div
            className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-white border-6 ${
              data.type === "introductions"
                ? "border-blue-900"
                : data.type === "cultural"
                ? "border-green-900"
                : data.type === "rebuilding"
                ? "border-purple-900"
                : data.type === "materials"
                ? "border-red-900"
                : data.type === "interactive"
                ? "border-purple-900"
                : "border-orange-900"
            } p-2`}
          >
            {data.type === "introductions" ? (
              <img src="/Icons/Introductions.png" alt="" />
            ) : data.type === "cultural" ? (
              <img src="/Icons/Cultural.png" alt="" />
            ) : data.type === "rebuilding" ? (
              <img src="/Icons/Rebuilding.png" alt="" />
            ) : data.type === "materials" ? (
              <img src="/Icons/Materials.png" alt="" />
            ) : data.type === "interactive" ? (
              <img src="/Icons/Interactive.png" alt="" />
            ) : (
              <img src="/Icons/Community.png" alt="" />
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow min-w-0 pr-4">
          <Link href={`/forum/${link}/${slug}`}>
            <h3
              className={`text-lg md:text-xl font-bold ${
                data.type === "introductions"
                  ? "text-blue-900"
                  : data.type === "cultural"
                  ? "text-green-900"
                  : data.type === "rebuilding"
                  ? "text-purple-900"
                  : data.type === "materials"
                  ? "text-red-900"
                  : data.type === "interactive"
                  ? "text-gold-900"
                  : "text-orange-900"
              } mb-2 leading-tight hover:underline cursor-pointer`}
            >
              {data.title}
            </h3>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed">
            {parse(
              data.description.length > 100
                ? data.description.substring(0, 100) + "..."
                : data.description
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function page() {
  const [forumData, setForumData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const { forum_details: forumUrl } = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const getForumsByType = async () => {
    setIsLoading(true);
    try {
      const response = await authFetch(`/forums?type=${type}&ref=${forumUrl}`, {
        method: "GET",
        auth: false,
      });
      const result = await response.json();
      setForumData(result?.data || []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching forums:", error);
      setForumData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getForumsByType();
  }, [type, forumUrl]);

  // Search filter logic
  const filteredData = forumData.filter(
    (discussion: any) =>
      discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      discussion.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to discussions list
    setTimeout(() => {
      document
        .getElementById("discussions-list")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto px-4 lg:px-0">
      {/* Top Hero Image */}
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

      {/* Header Section */}
      <HeaderSection
        title="Cultural & Historical Discussions"
        description={capitalCase(forumUrl as string)}
      />
      <ForumBanner />

      <div className="space-y-10">
        {/* Header Section with Search and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-color tracking-tight leading-tight">
              Ask a question/Start <br className="hidden md:block" /> a New
              Discussions
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-80 md:w-96 group rounded-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-orange-400" />
              </div>

              <Input
                placeholder="Search Forum"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-12 py-6 rounded-lg border bg-accent-bg border-emerald-900 text-sm placeholder-gray-500 transition-all"
              />
              <Button className="absolute inset-y-[7px] right-1 px-3 bg-amber-700 hover:bg-amber-600 text-white rounded-md flex items-center justify-center transition-colors">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button className="flex-1 sm:flex-none px-6 py-6 bg-transparent rounded-full border border-amber-600 text-sm font-semibold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors">
                Topics
              </Button>
              <Button className="flex-1 sm:flex-none px-6 py-6 bg-transparent rounded-full border border-amber-600 text-sm font-semibold text-gray-700 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                Posts
              </Button>
            </div>
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
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="rounded-full bg-blue-50 p-4 mb-4">
                <Search className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                No Results Found
              </h3>
              <p className="text-gray-500 text-center max-w-md mb-6">
                We couldn't find any discussions matching "{searchQuery}". Try
                searching with different keywords.
              </p>
              <Button
                onClick={() => handleSearch("")}
                className="px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-full font-medium transition-colors"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                {paginatedData.map((discussion: any) => (
                  <ForumCard
                    key={discussion.id}
                    data={discussion}
                    link={forumUrl as string}
                    slug={discussion.slug}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {filteredData.length > 0 && totalPages > 1 && (
          <div className="my-10 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Pagination Info */}
        {filteredData.length > 0 && (
          <div className="text-center text-sm text-gray-500 py-4">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredData.length)} of {filteredData.length}{" "}
            {searchQuery ? "search results" : "discussions"}
          </div>
        )}
      </div>
    </div>
  );
}
