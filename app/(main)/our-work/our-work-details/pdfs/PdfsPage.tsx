"use client";
import HeaderBanner from "@/components/our_work_details/HeaderBanner";
import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/authFetch";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { toast } from "sonner";

const PDFSidebar = dynamic(
  () => import("./PDFSidebar").then((mod) => mod.PDFSidebar),
  { ssr: false }
);
const PDFDocumentViewer = dynamic(
  () => import("./PDFDocumentViewer").then((mod) => mod.PDFDocumentViewer),
  { ssr: false }
);
const PDFThumbnailStrip = dynamic(
  () => import("./PDFThumbnailStrip").then((mod) => mod.PDFThumbnailStrip),
  { ssr: false }
);
const DocumentGallery = dynamic(
  () => import("./PDFDocumentGallery").then((mod) => mod.DocumentGallery),
  { ssr: false }
);

export interface DocumentItem {
  id: string;
  name: string;
  role: string;
  url: string;
}

const Socialbutton = ({
  icon = "",
  text,
  onClick,
}: {
  icon?: React.ReactNode;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <span
      onClick={onClick}
      className="p-2 border border-gray-500 rounded-full flex items-center gap-2 cursor-pointer"
    >
      {icon}
      {text}
    </span>
  );
};

function PdfsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState<DocumentItem[]>([]);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchPDF = async () => {
    if (!slug) return;
    try {
      const response = await authFetch(`/contents/${slug}`, { auth: false });
      const data = await response.json();
      const contentData = data?.data?.result;

      if (contentData?.pdfs) {
        const list = contentData.pdfs.map((pdfUrl: string, index: number) => {
          const fileName = pdfUrl.split("/").pop() || `Document ${index + 1}`;
          const fullUrl = pdfUrl.startsWith("http")
            ? pdfUrl
            : `${process.env.NEXT_PUBLIC_API_URL}${pdfUrl}`;

          return {
            id: `doc-${index}`,
            name: fileName.replace(/-\d+\.pdf$/, "").replace(/_/g, " "),
            role: contentData.owner?.name || "Unknown Owner",
            url: fullUrl,
          };
        });
        setPlaylist(list);
      }
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPDF();
  }, [slug]);

  const handlePdfSelect = (index: number) => {
    setCurrentPdfIndex(index);
  };
  const handlePageSelect = (index: number) => {
    setCurrentPage(index + 1);
  };

  const currentPdf = playlist[currentPdfIndex];

  return (
    <div className="flex flex-col lg:px-0 px-6 lg:max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto">
        <HeaderBanner />
      </div>
      <div className="">
        <div className="lg:max-w-7x mx-auto  flex flex-col">
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
          <div className="grow grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
            {/* Left Sidebar */}
            <div className="hidden lg:block lg:col-span-3 lg:h-[800px] h-full min-h-0">
              <PDFSidebar
                documents={playlist}
                selectedIndex={currentPdfIndex}
                onSelect={handlePdfSelect}
              />
            </div>

            {/* Mobile Sidebar */}
            <div className="lg:hidden col-span-1 overflow-x-auto pb-4">
              <div className="h-96 mb-4 block lg:hidden">
                <PDFSidebar
                  documents={playlist}
                  selectedIndex={currentPdfIndex}
                  onSelect={handlePdfSelect}
                />
              </div>
            </div>

            {/* Center Document View */}
            <div className="col-span-1 lg:col-span-7 lg:h-[900px] h-full flex flex-col min-h-0">
              {currentPdf && (
                <PDFDocumentViewer
                  url={currentPdf.url}
                  title={currentPdf.name}
                  companyName={currentPdf.role}
                  currentPage={currentPage}
                />
              )}
              <div className="flex gap-2 items-center lg:justify-between mt-10 ">
                <div className="flex gap-2 items-center">
                  <Socialbutton
                    icon={<AiOutlineLike size={20} className="text-lime-500" />}
                    text="Like"
                    onClick={() => toast.success("Liked this document")}
                  />

                  <Socialbutton
                    icon={
                      <AiOutlineDislike size={20} className="text-lime-500" />
                    }
                    text="Dislike"
                    onClick={() => toast.success("Disliked this document")}
                  />
                  <span
                    onClick={() => toast.success("Commented on this document")}
                    className="p-2 border border-gray-500 rounded-full flex items-center gap-2 cursor-pointer"
                  >
                    Comments
                  </span>
                </div>
                <Socialbutton
                  icon={
                    <AiOutlineShareAlt size={20} className="text-lime-500" />
                  }
                  text="Share"
                  onClick={() => toast.success("Shared this document")}
                />
              </div>
            </div>

            <div className="col-span-1 lg:col-span-2 h-full lg:h-[900px]  min-h-0 hidden md:block">
              {currentPdf && (
                <PDFThumbnailStrip
                  pdfUrl={currentPdf.url}
                  title={currentPdf.name}
                  companyName={currentPdf.role}
                  currentIndex={currentPdfIndex - 1}
                  onSelect={handlePageSelect}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        {playlist.length > 0 && (
          <DocumentGallery
            title="Read More Documents"
            companyName={currentPdf?.role || "Company"}
            playlist={playlist}
          />
        )}
      </div>
    </div>
  );
}

export default PdfsPage;
