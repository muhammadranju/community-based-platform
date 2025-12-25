import { ArrowRight, FileText } from "lucide-react";
import React from "react";
import { DocumentItem } from "./PdfsPage";

interface PDFSidebarProps {
  documents: DocumentItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const PDFSidebar: React.FC<PDFSidebarProps> = ({
  documents,
  selectedIndex,
  onSelect,
}) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-4xl border border-lime-500 shadow-sm p-6 overflow-hidden">
      <h2 className="text-[#113e33] text-2xl font-bold mb-6 px-2">
        {documents.length} Documents
      </h2>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-1">
        {documents.map((doc, index) => {
          const isActive = index === selectedIndex;
          return (
            <div
              key={doc.id}
              onClick={() => onSelect(index)}
              className={`group flex items-center p-4 rounded-2xl transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-emerald-900 text-white shadow-lg shadow-green-900/20"
                  : "bg-white border border-gray-100 hover:bg-emerald-900 hover:border-emerald-900 hover:shadow-md"
              }`}
            >
              {/* Icon Box */}
              <div
                className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg mr-4`}
              >
                {isActive ? (
                  <FileText className="w-6 h-6 text-white" />
                ) : (
                  <div className="relative">
                    <img
                      src="/bg/pdf-icon.png"
                      className="w-8 h-8 group-hover:hidden"
                      alt="PDF"
                    />
                    <FileText className="w-6 h-6 text-white hidden group-hover:block" />
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="flex-grow min-w-0">
                <h3
                  className={`text-base font-bold truncate transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-[#113e33] group-hover:text-white"
                  }`}
                >
                  {doc.name}
                </h3>
                <p
                  className={`text-xs truncate transition-colors ${
                    isActive
                      ? "text-green-100"
                      : "text-gray-400 group-hover:text-green-100"
                  }`}
                >
                  {doc.role}
                </p>
              </div>

              {/* Arrow Action */}
              <div
                className={`flex-shrink-0 ml-2 rounded-full w-8 h-8 flex items-center justify-center transition-colors ${
                  isActive ? "bg-white" : "bg-[#113e33] group-hover:bg-white"
                }`}
              >
                <ArrowRight
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? "text-[#113e33]"
                      : "text-white group-hover:text-[#113e33]"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
