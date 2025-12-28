import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFThumbnailStripProps {
  pdfUrl: string;
  title: string;
  companyName: string;
  currentIndex: number;
  onSelect: (index: number) => void;
}

export const PDFThumbnailStrip: React.FC<PDFThumbnailStripProps> = ({
  pdfUrl,
  currentIndex,
  onSelect,
}) => {
  const [numPages, setNumPages] = React.useState<number>(0);

  const handleSelect = (index: number) => {
    console.log("Selected page:", index + 1);
    onSelect(index);
  };

  return (
    <div className="flex flex-col bg-white/50 rounded-4xl p-2 border border-emerald-900/10 shadow-inner ">
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {/* 🔒 Vertical scroll only */}
        <div
          className="
            flex flex-col space-y-4
            max-h-[800px]
            overflow-y-auto
            overflow-x-hidden
            py-2 px-2
          "
        >
          {Array.from({ length: numPages }, (_, index) => (
            <div
              key={index}
              onClick={() => handleSelect(index)}
              className="relative group cursor-pointer transition-transform hover:scale-[1.02]"
            >
              {/* Page badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md z-20 bg-emerald-900 text-white border-2 border-white">
                {index + 1}
              </div>

              {/* Thumbnail card */}
              <div
                className={`rounded-xl overflow-hidden shadow-sm p-4 bg-white transition-all ${
                  index === currentIndex
                    ? "border-2 border-emerald-900 ring-4 ring-lime-400/30"
                    : "border-2 border-transparent hover:border-emerald-900"
                }`}
              >
                {/* 🔒 Prevent canvas overflow */}
                <div className="aspect-3/4 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <Page
                    pageNumber={index + 1}
                    width={120}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Document>
    </div>
  );
};
