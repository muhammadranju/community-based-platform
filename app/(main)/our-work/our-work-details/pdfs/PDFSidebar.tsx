import React from "react";
import { ArrowRight, FileText } from "lucide-react";
import { DOCUMENTS } from "./page";

export const PDFSidebar: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-white rounded-[2rem] border border-gray-200 shadow-sm p-6 overflow-hidden">
      <h2 className="text-[#113e33] text-2xl font-bold mb-6 px-2">
        7 Documents
      </h2>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-4 pr-1">
        {DOCUMENTS.map((doc) => (
          <div
            key={doc.id}
            className={`group flex items-center p-4 rounded-2xl transition-all duration-200 cursor-pointer ${
              doc.isActive
                ? "bg-primary text-white shadow-lg shadow-green-900/20"
                : "bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md"
            }`}
          >
            {/* Icon Box */}
            <div
              className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg mr-4 ${
                doc.isActive ? "bg-white/10" : "bg-red-50"
              }`}
            >
              <FileText
                className={`w-6 h-6 ${
                  doc.isActive ? "text-white" : "text-red-500"
                }`}
              />
            </div>

            {/* Text Content */}
            <div className="flex-grow min-w-0">
              <h3
                className={`text-base font-bold truncate ${
                  doc.isActive ? "text-white" : "text-[#113e33]"
                }`}
              >
                {doc.name}
              </h3>
              <p
                className={`text-xs truncate ${
                  doc.isActive ? "text-green-100" : "text-gray-400"
                }`}
              >
                {doc.role}
              </p>
            </div>

            {/* Arrow Action */}
            <div
              className={`flex-shrink-0 ml-2 rounded-full w-8 h-8 flex items-center justify-center ${
                doc.isActive ? "bg-white" : "bg-[#113e33]"
              }`}
            >
              <ArrowRight
                className={`w-4 h-4 ${
                  doc.isActive ? "text-[#113e33]" : "text-white"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
