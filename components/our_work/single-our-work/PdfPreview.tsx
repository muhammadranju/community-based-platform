"use client";
import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Setting the worker source to cdnjs for consistency and reliability across client/server boundaries
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfPreviewProps {
  url: string;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ url }) => {
  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden bg-gray-50">
      <Document
        file={url}
        loading={
          <div className="flex flex-col items-center gap-2 py-10 animate-pulse">
            <div className="w-12 h-16 bg-gray-200 rounded" />
            <div className="w-20 h-2 bg-gray-200 rounded-full" />
          </div>
        }
        error={
          <div className="flex flex-col items-center gap-2 text-gray-400 p-4">
            <img
              src="/bg/pdf-icon.png"
              className="w-10 opacity-30 grayscale"
              alt="PDF"
            />
            <span className="text-[10px]">Preview unavailable</span>
          </div>
        }
      >
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          className="shadow-sm max-w-full"
        />
      </Document>
    </div>
  );
};

export default PdfPreview;
