"use client";
import HeaderBanner from "@/components/our_work_details/HeaderBanner";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { PDFSidebar } from "./PDFSidebar";
import { PDFDocumentViewer } from "./PDFDocumentViewer";
import { PDFActionBar } from "./PDFActionBar";
import { PDFThumbnailStrip } from "./PDFThumbnailStrip";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { DocumentGallery } from "./PDFDocumentGallery";

export interface DocumentItem {
  id: string;
  name: string;
  role: string;
  isActive: boolean;
}

export interface PageThumbnail {
  id: number;
  image: string;
  pageNumber: number;
  isActive?: boolean;
}

export interface DocumentDetails {
  companyName: string;
  title: string;
  coverImage: string;
  totalPages: number;
  currentPage: number;
  website: string;
}

export const DOCUMENTS: DocumentItem[] = [
  {
    id: "1",
    name: "Courtney Henry",
    role: "Medical Assistant",
    isActive: true,
  },
  {
    id: "2",
    name: "Courtney Henry",
    role: "Medical Assistant",
    isActive: false,
  },
  {
    id: "3",
    name: "Courtney Henry",
    role: "Medical Assistant",
    isActive: false,
  },
  {
    id: "4",
    name: "Courtney Henry",
    role: "Medical Assistant",
    isActive: false,
  },
  {
    id: "5",
    name: "Courtney Henry",
    role: "Medical Assistant",
    isActive: false,
  },
  {
    id: "6",
    name: "Courtney Henry",
    role: "Medical Assistant",
    isActive: false,
  },
  {
    id: "7",
    name: "Courtney Henry",
    role: "Medical Assistant",
    isActive: false,
  },
  {
    id: "8",
    name: "Courtney Henry",
    role: "Medical Assistant",
    isActive: false,
  },
];

export const CURRENT_DOCUMENT: DocumentDetails = {
  companyName: "Liceria Real Estate",
  title: "Property management for all your needs",
  // Using a distinct architectural image similar to the Lalibela church in the screenshot
  coverImage: "/bg/bg111.png",
  totalPages: 20,
  currentPage: 1,
  website: "reallygreatsite.com",
};

export const THUMBNAILS: PageThumbnail[] = [
  {
    id: 1,
    pageNumber: 1,
    image: "/bg/bg111.png",
    isActive: true,
  },
  {
    id: 2,
    pageNumber: 2,
    image: "/bg/bg111.png",
    isActive: false,
  },
  {
    id: 3,
    pageNumber: 3,
    image: "/bg/bg111.png",
    isActive: false,
  },
  {
    id: 4,
    pageNumber: 4,
    image: "/bg/bg111.png",
    isActive: false,
  },
  {
    id: 5,
    pageNumber: 5,
    image: "/bg/bg111.png",
    isActive: false,
  },
];
function PdfsPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen lg:px-0 px-4 lg:max-w-[1300px] mx-auto">
      <div className="max-w-7xl mx-auto">
        <HeaderBanner />
      </div>
      <div className="">
        <div className="max-w-[1580px] mx-auto h-[calc(100vh-4rem)] flex flex-col">
          {/* Top Navigation / Back Button */}
          <Button
            onClick={() => router.back()}
            className="group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-emerald-900 rounded-full shadow-md hover:bg-forest/90 transition-transform active:scale-95 my-5"
            aria-label="Go back"
          >
            <ArrowLeft
              className="w-5 h-5 md:w-6 md:h-6 text-white"
              strokeWidth={2.5}
            />
          </Button>

          {/* Main Grid Layout */}
          <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
            {/* Left Sidebar - Hidden on mobile/tablet vertical view initially, usually behind a toggle, but for this visual match we stack it or scroll it */}
            <div className="hidden lg:block lg:col-span-3 h-full min-h-0">
              <PDFSidebar />
            </div>

            {/* Mobile View: Sidebar could be here horizontally or stacked, implementing horizontal scroll for mobile friendliness */}
            <div className="lg:hidden col-span-1 overflow-x-auto pb-4">
              {/* Reusing sidebar structure but formatted for horizontal scroll on mobile could be complex, 
                 for now keeping it hidden on small screens to prioritize the Main view as per standard responsiveness 
                 or letting it stack if we remove 'hidden'. Let's stack it for full responsiveness. */}
              <div className="h-96 mb-4 block lg:hidden">
                <PDFSidebar />
              </div>
            </div>

            {/* Center Document View */}
            <div className="col-span-1 lg:col-span-7 h-full flex flex-col min-h-0">
              <div className="flex-grow min-h-0 mb-6">
                <PDFDocumentViewer />
              </div>

              {/* Action Bar (Sticky or bottom of center col) */}
              <div className="flex-shrink-0">
                <PDFActionBar />
              </div>
            </div>

            {/* Right Thumbnails */}
            <div className="col-span-1 lg:col-span-2 h-full min-h-0 hidden md:block">
              <PDFThumbnailStrip />
            </div>

            {/* Mobile Thumbnail View */}
            <div className="col-span-1 md:hidden flex gap-4 overflow-x-auto py-4">
              {/* Simplified mobile thumbnails would go here, sticking to desktop structure for now */}
            </div>
          </div>
        </div>
      </div>

      <DocumentGallery />
    </div>
  );
}

export default PdfsPage;
