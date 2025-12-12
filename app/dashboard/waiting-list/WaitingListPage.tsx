import React from "react";
import { Filter, Upload, MoreVertical } from "lucide-react";
import { WAITING_LIST_ITEMS } from "@/components/dashboard/constants";

export const DashboardWaitingList: React.FC = () => {
  return (
    <div className="w-full">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-teal-900">Waiting list</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-teal-900 text-white px-5 py-2 rounded-full font-medium hover:bg-teal-950 transition-colors text-sm shadow-sm">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-white text-teal-900 border border-teal-900 px-5 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm">
            <Upload size={16} className="rotate-180" />
            Export
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-lime-500 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-teal-900 text-white text-left text-sm">
                <th className="py-4 px-6 font-medium">Full Name</th>
                <th className="py-4 px-6 font-medium">Email</th>
                <th className="py-4 px-6 font-medium">Country & City/Region</th>
                <th className="py-4 px-6 font-medium">Role</th>
                <th className="py-4 px-6 font-medium">Area Expertise</th>
                <th className="py-4 px-6 font-medium">Years of Experience</th>
                <th className="py-4 px-6 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {WAITING_LIST_ITEMS.map((item, idx) => (
                <tr
                  key={`${item.id}-${idx}`}
                  className="hover:bg-gray-50 transition-colors text-sm text-gray-700"
                >
                  <td className="py-4 px-6 font-medium">{item.fullName}</td>
                  <td className="py-4 px-6 text-gray-600">{item.email}</td>
                  <td className="py-4 px-6 text-gray-600">{item.location}</td>
                  <td className="py-4 px-6 text-gray-600">{item.role}</td>
                  <td className="py-4 px-6 text-gray-600">{item.expertise}</td>
                  <td className="py-4 px-6 text-gray-600">{item.experience}</td>
                  <td className="py-4 px-6 text-center">
                    <button className="bg-[#ecfccb] hover:bg-lime-200 text-teal-900 w-8 h-8 rounded-full flex items-center justify-center transition-colors mx-auto">
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
      <div className="flex justify-end mt-6">
        <button className="bg-[#d97706] hover:bg-[#b45309] text-white px-8 py-3 rounded-full font-semibold shadow-md transition-colors text-sm">
          See More
        </button>
      </div>
    </div>
  );
};
