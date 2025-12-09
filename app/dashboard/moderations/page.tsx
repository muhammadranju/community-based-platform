import { FLAGGED_ITEMS } from "@/components/dashboard/constants";
import { MoreVertical, Upload } from "lucide-react";

function page() {
  return (
    <div className="w-full">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-teal-900">
          Flagged / Pending Review
        </h1>
        <div>
          <button className="flex items-center gap-2 bg-white text-teal-900 border border-teal-900 px-5 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm">
            <Upload size={16} className="rotate-180" />
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
                <th className="py-4 px-6 font-medium text-sm">Owner</th>
                <th className="py-4 px-6 font-medium text-sm">Type</th>
                <th className="py-4 px-6 font-medium text-sm">Status</th>
                <th className="py-4 px-6 font-medium text-sm text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {FLAGGED_ITEMS.map((item, idx) => (
                <tr
                  key={`${item.id}-${idx}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 text-gray-700 font-medium">
                    {item.title}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{item.owner}</td>
                  <td className="py-4 px-6 text-gray-600">{item.type}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold inline-block min-w-[80px] text-center
                        ${
                          item.status === "Flagged"
                            ? "bg-[#ffdad6] text-red-900"
                            : "bg-orange-100 text-orange-700"
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
    </div>
  );
}

export default page;
