"use client";
import React from "react";
import { Filter, Upload, MoreVertical } from "lucide-react";
import { CONTENT_ITEMS } from "@/components/dashboard/constants";
// import { CONTENT_ITEMS } from '../constants';

const ContentTable = () => {
  return (
    <div className="w-full">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-teal-900">Content</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-teal-900 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-950 transition-colors">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-white text-teal-900 border border-teal-900 px-5 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors">
            <Upload size={18} className="rotate-180" />
            Export
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-lime-500 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-teal-900 text-white text-left">
                <th className="py-4 px-6 font-medium text-sm">Title</th>
                <th className="py-4 px-6 font-medium text-sm">ID</th>
                <th className="py-4 px-6 font-medium text-sm">Type</th>
                <th className="py-4 px-6 font-medium text-sm">Owner</th>
                <th className="py-4 px-6 font-medium text-sm">Updated</th>
                <th className="py-4 px-6 font-medium text-sm">Status</th>
                <th className="py-4 px-6 font-medium text-sm text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {CONTENT_ITEMS.map((item) => (
                <tr
                  key={`${item.id}-${item.status}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 text-gray-700 font-medium">
                    {item.title}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{item.contentId}</td>
                  <td className="py-4 px-6 text-gray-600">{item.type}</td>
                  <td className="py-4 px-6 text-gray-600">{item.owner}</td>
                  <td className="py-4 px-6 text-gray-600">{item.updated}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block min-w-[80px] text-center
                        ${
                          item.status === "Approved"
                            ? "bg-[#dcfce7] text-[#15803d]"
                            : item.status === "Flagged"
                            ? "bg-[#fee2e2] text-[#b91c1c]"
                            : "bg-[#ffedd5] text-[#c2410c]"
                        }
                      `}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="bg-[#ecfccb] hover:bg-lime-200 text-teal-900 w-8 h-8 rounded-full flex items-center justify-center transition-colors ml-auto">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Action */}
      <div className="flex justify-end mt-8">
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-colors text-sm">
          See More
        </button>
      </div>
    </div>
  );
};

export default ContentTable;
