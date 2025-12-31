import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import React, { useState } from "react";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface Document {
  id: string;
  name: string;
  role: string;
  url: string;
}

interface PDFDocumentGalleryProps {
  title: string;
  companyName: string;
  playlist: Document[];
}

export const DocumentGallery: React.FC<PDFDocumentGalleryProps> = ({
  title,
  companyName,
  playlist,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(playlist.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = playlist.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const renderPageNumbers = () => {
    const pages = [];

    // Show first 4 pages
    for (let i = 1; i <= Math.min(4, totalPages); i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-colors ${
            currentPage === i
              ? "bg-lime-100 border-2 border-emerald-900 text-emerald-900"
              : "text-emerald-900 hover:bg-lime-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis if there are more pages
    if (totalPages > 5) {
      pages.push(
        <div
          key="dots"
          className="w-10 h-10 flex items-center justify-center text-emerald-900 font-bold text-xl pb-2"
        >
          ...
        </div>
      );
    }

    // Show last page if more than 4 pages
    if (totalPages > 4) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-colors ${
            currentPage === totalPages
              ? "bg-lime-100 border-2 border-emerald-900 text-emerald-900"
              : "text-emerald-900 hover:bg-lime-50"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-start bg-white my-20 px-4">
      <div className="w-full max-w-7xl bg-lime-50 rounded-4xl border-2 border-lime-500 p-6 md:p-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-emerald-900 tracking-tight">
            {title}
          </h1>
        </div>

        {/* Grid of Document Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
          {currentItems.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8">
            {/* Prev Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-white hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 sm:gap-2">
              {renderPageNumbers()}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-white hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <div className="flex flex-col cursor-pointer group ">
      <a href={document.url} target="_blank" rel="noopener noreferrer">
        <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg h-48 md:h-60 flex items-center justify-center group-hover:scale-105 transform transition-transform">
          <div className="absolute inset-0 bg-linear-to-b from-gray-200 to-gray-100" />

          {/* PDF Preview or Icon */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <PdfPreview url={document.url} onLoadSuccess={setNumPages} />
          </div>

          {/* Pages Count Badge */}
          <div className="absolute bottom-3 right-3 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {numPages} pages
          </div>
        </div>
      </a>

      {/* Document Info */}
      <div className="mt-4">
        <h3 className="text-sm md:text-base font-bold text-emerald-900 line-clamp-2 hover:text-emerald-700">
          {document.name}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 mt-1">{document.role}</p>
      </div>
    </div>
  );
};

interface PdfPreviewProps {
  url: string;
  onLoadSuccess: (numPages: number) => void;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ url, onLoadSuccess }) => {
  const [error, setError] = useState(false);

  return (
    <div className="w-full h-full">
      {!error ? (
        <iframe
          src={`${url}#toolbar=0&navpanes=0`}
          className="w-full h-full border-none"
          onError={() => {
            setError(true);
          }}
          onLoad={(e) => {
            try {
              const iframeDoc = (e.target as HTMLIFrameElement).contentDocument;
              if (iframeDoc) {
                onLoadSuccess(1);
              }
            } catch (err) {
              onLoadSuccess(1);
            }
          }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 h-full">
          <FileText className="w-12 h-12 text-gray-400" />
          <span className="text-xs text-gray-500 text-center px-2">PDF</span>
        </div>
      )}
    </div>
  );
};
