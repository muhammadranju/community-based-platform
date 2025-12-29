// import React, { useState } from "react";
// // Generating 10 identical items to match the screenshot's grid
// export const MOCK_DOCUMENTS: DocumentItem[] = Array.from({ length: 10 }).map(
//   (_, index) => ({
//     id: `doc-${index}`,
//     companyName: "Liceria Real Estate",
//     title: "Property management for all your needs",
//     // Using an architectural image to mimic the building in the reference
//     imageUrl: `/bg/bg111.png`,
//     website: "reallygreatsite.com",
//   })
// );

// export const DocumentGallery: React.FC = () => {
//   const [page, setPage] = useState(1);

//   return (
//     <div className="flex justify-center items-start bg-white my-20  mt-44">
//       {/*
//         The main green container.
//         Matches the screenshot: rounded corners, light lime background.
//       */}
//       <div className="w-full bg-[#f4fde8] rounded-[40px] border border-[#e2f5d3] p-5 md:p-12 shadow-sm">
//         {/* Header */}
//         <div className="mb-10">
//           <h1 className="text-3xl md:text-5xl font-semibold text-[#064e3b] tracking-tight">
//             Read More Documents
//           </h1>
//         </div>

//         {/* Grid Layout
//            - Mobile: 1 col
//            - Tablet: 2 or 3 cols
//            - Desktop: 4 or 5 cols (matches screenshot with 5 cols)
//         */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
//           {MOCK_DOCUMENTS.map((doc) => (
//             <DocumentCard key={doc.id} document={doc} />
//           ))}
//         </div>

//         {/* Footer / Pagination */}
//         <div className="mt-12 flex items-center">
//           <Pagination
//             currentPage={page}
//             totalPages={21}
//             onPageChange={setPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { DocumentCard, DocumentItem, PaginationProps } from "./PDFDocumentCard";

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   // Helper to generate the specific sequence: 1, 2, 3, 4 ... 21
//   const renderPageNumbers = () => {
//     const pages = [];

//     // In the screenshot, we see 1, 2, 3, 4 ... 21 explicitly.
//     // We will render 1-4, then dots, then the last page.

//     for (let i = 1; i <= 4; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => onPageChange(i)}
//           className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-colors
//             ${
//               currentPage === i
//                 ? "bg-[#efffe3] border-2 border-[#14532d] text-[#14532d]"
//                 : "text-[#14532d] hover:bg-green-100"
//             }`}
//         >
//           {i}
//         </button>
//       );
//     }

//     // The ellipsis
//     pages.push(
//       <div
//         key="dots"
//         className="w-10 h-10 flex items-center justify-center text-[#14532d] font-bold text-xl pb-2"
//       >
//         ...
//       </div>
//     );

//     // The last page (21 as per screenshot)
//     pages.push(
//       <button
//         key={21}
//         onClick={() => onPageChange(21)}
//         className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-colors
//           ${
//             currentPage === 21
//               ? "bg-[#efffe3] border-2 border-[#14532d] text-[#14532d]"
//               : "text-[#14532d] hover:bg-green-100"
//           }`}
//       >
//         21
//       </button>
//     );

//     return pages;
//   };

//   return (
//     <div className="flex items-center gap-2 sm:gap-3 mt-8">
//       {/* Prev Button */}
//       <button
//         onClick={() => onPageChange(Math.max(1, currentPage - 1))}
//         className="w-10 h-10 rounded-full bg-[#064e3b] flex items-center justify-center text-white hover:bg-[#022c22] transition-colors"
//       >
//         <ChevronLeft size={20} />
//       </button>

//       {/* Page Numbers */}
//       <div className="flex items-center gap-1 sm:gap-2">
//         {renderPageNumbers()}
//       </div>

//       {/* Next Button */}
//       <button
//         onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
//         className="w-10 h-10 rounded-full bg-[#064e3b] flex items-center justify-center text-white hover:bg-[#022c22] transition-colors"
//       >
//         <ChevronRight size={20} />
//       </button>
//     </div>
//   );
// };

import React, { useState } from "react";
import { Document, pdfjs } from "react-pdf";
// Generating 10 identical items to match the screenshot's grid

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFDocumentGalleryProps {
  url: string;
  title: string;
  companyName: string;
}

export const DocumentGallery: React.FC<PDFDocumentGalleryProps> = ({
  url,
  title,
  companyName,
}) => {
  const [numPages, setNumPages] = useState<number>(0);

  return (
    <div className="flex justify-center items-start bg-white my-20  mt-44">
      {/* 
        The main green container. 
        Matches the screenshot: rounded corners, light lime background.
      */}
      <div className="w-full bg-[#f4fde8] rounded-[40px] border border-[#e2f5d3] p-5 md:p-12 shadow-sm">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-semibold text-[#064e3b] tracking-tight">
            Read More Documents
          </h1>
        </div>

        {/* Grid Layout 
           - Mobile: 1 col
           - Tablet: 2 or 3 cols
           - Desktop: 4 or 5 cols (matches screenshot with 5 cols)
        */}
        {/* Grid of PDF pages as cards */}
        <Document
          file={url}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: numPages }, (_, index) => (
              <DocumentCard
                key={index}
                pdfUrl={url}
                pageNumber={index + 1}
                companyName={companyName}
                title={title}
              />
            ))}
          </div>
        </Document>

        {/* Footer / Pagination */}
        <div className="mt-12 flex items-center">
          <Pagination
            currentPage={numPages}
            totalPages={21}
            onPageChange={setNumPages}
          />
        </div>
      </div>
    </div>
  );
};

import { ChevronLeft, ChevronRight } from "lucide-react";
import { DocumentCard, DocumentItem, PaginationProps } from "./PDFDocumentCard";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Helper to generate the specific sequence: 1, 2, 3, 4 ... 21
  const renderPageNumbers = () => {
    const pages = [];

    // In the screenshot, we see 1, 2, 3, 4 ... 21 explicitly.
    // We will render 1-4, then dots, then the last page.

    for (let i = 1; i <= 4; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-colors
            ${
              currentPage === i
                ? "bg-[#efffe3] border-2 border-[#14532d] text-[#14532d]"
                : "text-[#14532d] hover:bg-green-100"
            }`}
        >
          {i}
        </button>
      );
    }

    // The ellipsis
    pages.push(
      <div
        key="dots"
        className="w-10 h-10 flex items-center justify-center text-[#14532d] font-bold text-xl pb-2"
      >
        ...
      </div>
    );

    // The last page (21 as per screenshot)
    pages.push(
      <button
        key={21}
        onClick={() => onPageChange(21)}
        className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-colors
          ${
            currentPage === 21
              ? "bg-[#efffe3] border-2 border-[#14532d] text-[#14532d]"
              : "text-[#14532d] hover:bg-green-100"
          }`}
      >
        21
      </button>
    );

    return pages;
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 mt-8">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="w-10 h-10 rounded-full bg-[#064e3b] flex items-center justify-center text-white hover:bg-[#022c22] transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-2">
        {renderPageNumbers()}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="w-10 h-10 rounded-full bg-[#064e3b] flex items-center justify-center text-white hover:bg-[#022c22] transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
