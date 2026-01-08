import { Home } from "lucide-react";
import React from "react";
import { Document, Page } from "react-pdf";
export interface DocumentItem {
  id: string;
  companyName: string;
  title: string;
  imageUrl: string;
  website: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface DocumentCardProps {
  pdfUrl: string;
  pageNumber: number;
  companyName: string;
  title: string;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  pdfUrl,
  pageNumber,
  companyName,
  title,
}) => {
  return (
    <div className="w-full h-full flex flex-col relative group cursor-pointer transition-transform hover:-translate-y-1">
      {/* The card acts like a physical paper sheet on a surface */}
      <div className="bg-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow aspect-3/4 lg:p-4 pt-4 p-2 flex flex-col justify-between">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase font-semibold tracking-wider">
            <Home size={12} className="text-gray-500" />
            <span>{companyName}</span>
          </div>

          <h3 className="lg:text-xl md:text-lg text-base font-bold text-primary-color leading-tight">
            {title}
          </h3>
        </div>

        {/* Image Section - Centered and clipped like the design */}
        <div className="grow flex items-center justify-center py-4">
          <div className="w-full h-32 overflow-hidden rounded-md">
            <Document file={pdfUrl}>
              <Page
                pageNumber={pageNumber}
                width={200} // adjust width for thumbnail
                renderTextLayer={false} // improve performance
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        </div>

        {/* Footer Section */}
        {/* <div className="text-right border-t border-gray-300 pt-2">
          <span className="text-[10px] text-gray-500 font-medium">
            {document.website}
          </span>
        </div> */}
      </div>
    </div>
  );
};
