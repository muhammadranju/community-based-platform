import { Home, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// CORRECT worker configuration for module environment
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFDocumentViewerProps {
  url: string;
  title: string;
  companyName: string;
  currentPage: number; // 1-based page number
}

export const PDFDocumentViewer: React.FC<PDFDocumentViewerProps> = ({
  url,
  title,
  companyName,
  currentPage,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // 🔥 SYNC thumbnail selection → viewer page
  useEffect(() => {
    if (currentPage >= 1) {
      setPageNumber(currentPage);
    }
  }, [currentPage]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setError(null);
  }

  function onDocumentLoadError(error: Error) {
    console.error("PDF Load Error:", error);
    setError(error.message);
  }

  // Dynamic page width based on device
  const pageWidth = isMobile ? window.innerWidth - 32 : 640;

  return (
    <div className="flex flex-col h-full bg-white shadow-md lg:rounded-4xl rounded-2xl lg:px-10 lg:py-10 py-6 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-gray-200/50 to-transparent pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="lg:flex items-center gap-3 mb-4 text-gray-600 hidden">
          <Home className="w-5 h-5 text-gray-500" />
          <span className="text-sm md:text-base font-medium text-gray-700 tracking-wide">
            {companyName}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-xl lg:text-4xl font-bold text-emerald-900 mb-6 leading-tight">
          {title}
        </h1>

        {/* PDF Viewer */}
        <div className="grow w-full rounded-2xl overflow-hidden relative bg-white flex items-center justify-center">
          {error ? (
            <div className="flex flex-col items-center gap-4 p-8 text-center">
              <div className="text-red-500 font-medium text-lg">
                Failed to load PDF
              </div>
              <div className="text-sm text-gray-600">{error}</div>
            </div>
          ) : (
            <div className="w-full h-full overflow-auto flex flex-col items-center pb-6">
              <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex flex-col items-center gap-2 py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-900" />
                    <span className="text-sm text-gray-500">
                      Loading PDF...
                    </span>
                  </div>
                }
              >
                <Page
                  width={pageWidth}
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="w-full"
                />
              </Document>

              {/* Navigation */}
              {numPages > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2 lg:gap-4 bg-white w-full px-4 py-3 border-t border-emerald-900 ">
                  <button
                    onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                    disabled={pageNumber === 1}
                    className="px-3 lg:px-4 py-1.5 lg:py-2 bg-emerald-900 text-white rounded-full disabled:opacity-50 text-xs lg:text-sm font-medium hover:bg-emerald-800 transition-colors"
                  >
                    ← Prev
                  </button>

                  <span className="text-emerald-900 font-semibold text-xs lg:text-sm whitespace-nowrap">
                    {pageNumber}/{numPages}
                  </span>

                  <button
                    onClick={() =>
                      setPageNumber((p) => Math.min(numPages, p + 1))
                    }
                    disabled={pageNumber === numPages}
                    className="px-3 lg:px-4 py-1.5 lg:py-2 bg-emerald-900 text-white rounded-full disabled:opacity-50 text-xs lg:text-sm font-medium hover:bg-emerald-800 transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
