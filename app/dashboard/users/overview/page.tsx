"use client";
import {
  ACTIVITY_ITEMS,
  OVERVIEW_CHART_DATA,
} from "@/components/dashboard/constants";
import { StatsGrid } from "@/components/dashboard/overview/StatsGrid";
import { CircleDot, Flag, Upload, User } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
// import { OVERVIEW_CHART_DATA, ACTIVITY_ITEMS } from "../constants";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#84cc16] text-white px-4 py-2 rounded-lg shadow-lg text-center relative">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-lg font-bold">
          {(payload[0].value / 1000).toFixed(1)}K
        </p>
        {/* Triangle pointer */}
        <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-[#84cc16]"></div>
      </div>
    );
  }
  return null;
};

const UserOverview = () => {
  return (
    <div className="w-full space-y-8">
      {/* Top Stats Cards */}
      <StatsGrid />

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-teal-900/20 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-1">
                Total Upload
              </h2>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-teal-900">4.40K</span>
                <span className="text-gray-400 font-medium">Jul 83.82K</span>
              </div>
            </div>

            <div className="flex bg-white border border-gray-100 rounded-full p-1 shadow-sm">
              <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-teal-900 rounded-full">
                Day
              </button>
              <button className="px-4 py-1.5 text-sm font-medium text-white bg-[#d97706] rounded-full shadow-sm">
                Month
              </button>
              <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-teal-900 rounded-full">
                Year
              </button>
            </div>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={OVERVIEW_CHART_DATA}
                margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#134e4a" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#134e4a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  dy={10}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: "#84cc16",
                    strokeWidth: 2,
                    strokeDasharray: "5 5",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#134e4a"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUploads)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Sidebar */}
        <div className="bg-white rounded-3xl border border-lime-500/30 p-6 shadow-sm h-full">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-teal-900">Latest Activity</h2>
            <p className="text-sm text-gray-500">
              Recent changes to your content
            </p>
          </div>

          <div className="space-y-4">
            {ACTIVITY_ITEMS.map((item, idx) => (
              <div key={idx} className="bg-[#e4ede4] p-4 rounded-xl">
                <h4 className="font-bold text-teal-900 text-sm mb-2">
                  {item.title}
                </h4>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-medium">
                    {item.type}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium
                    ${
                      item.status === "Published"
                        ? "bg-[#bbf7d0] text-green-800"
                        : item.status === "In Review"
                        ? "bg-[#fed7aa] text-orange-800"
                        : "bg-[#fecaca] text-red-800"
                    }
                  `}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
