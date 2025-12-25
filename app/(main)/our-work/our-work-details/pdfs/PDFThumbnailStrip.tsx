import React from "react";
import { FileText } from "lucide-react";

interface PDFThumbnailStripProps {
  documents: Array<{ id: string; name: string; url: string }>;
  currentIndex: number;
  onSelect: (index: number) => void;
}

export const PDFThumbnailStrip: React.FC<PDFThumbnailStripProps> = ({
  documents,
  currentIndex,
  onSelect,
}) => {
  return (
    <div className="flex flex-col h-full bg-white/50 rounded-4xl p-2 overflow-hidden border border-emerald-900/10 shadow-inner">
      <div className="flex flex-col space-y-4 h-full overflow-y-auto no-scrollbar py-2 px-2">
        {documents.map((doc, index) => (
          <div
            key={doc.id}
            onClick={() => onSelect(index)}
            className="relative group cursor-pointer transition-transform hover:scale-[1.02] mb-4"
          >
            {/* Badge - Page Number */}
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md z-20 transition-colors bg-emerald-900 text-white border-2 border-white">
              {index + 1}
            </div>

            {/* Thumbnail Card */}
            <div
              className={`rounded-xl overflow-hidden shadow-sm p-4 bg-white transition-all ${
                index === currentIndex
                  ? "border-2 border-emerald-900 ring-4 ring-lime-400/30"
                  : "border-2 border-transparent hover:border-emerald-900"
              }`}
            >
              {/* PDF Icon and Title */}
              <div className="aspect-3/4 rounded-lg overflow-hidden bg-gray-100 relative flex flex-col items-center justify-center p-4 text-center">
                <FileText className="w-12 h-12 text-emerald-900 mb-2" />
                <p className="text-xs text-gray-600 font-medium line-clamp-2">
                  {doc.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
