import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { UPLOAD_STATS, ACTIVE_USER_STATS } from "../constants";

export const UploadsChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-amber-600/30 shadow-sm h-[320px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-primary-color text-lg font-bold">
          Upload per Month
        </h3>
      </div>

      <div className="flex-1 w-full relative -ml-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={UPLOAD_STATS}>
            <defs>
              <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#134e4a" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#134e4a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#d97706" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 0, fill: "transparent" }}
              height={10}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="value1"
              stroke="#134e4a"
              fillOpacity={1}
              fill="url(#colorValue1)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="value2"
              stroke="#d97706"
              fillOpacity={1}
              fill="url(#colorValue2)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center mt-2 px-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-primary-color"></span>
            <span className="text-xs text-gray-500 font-medium">
              This Month
            </span>
          </div>
          <span className="text-sm font-bold text-primary-color block ml-5">
            $4,504
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1 justify-end">
            <span className="w-3 h-3 rounded-full bg-amber-600"></span>
            <span className="text-xs text-amber-600 font-medium">
              Last Month
            </span>
          </div>
          <span className="text-sm font-bold text-amber-600 block text-right">
            $3,004
          </span>
        </div>
      </div>
    </div>
  );
};

export const ActiveUsersChart: React.FC = () => {
  return (
    <div className="bg-gray-200 p-6 rounded-2xl shadow-sm h-[320px] flex flex-col">
      <h3 className="text-primary-color text-lg font-bold mb-6">
        Active Users
      </h3>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={ACTIVE_USER_STATS} barSize={20}>
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#64748b" }}
              dy={10}
            />
            <Bar dataKey="value1" radius={[4, 4, 4, 4]}>
              {ACTIVE_USER_STATS.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 2 === 0 ? "#0f3936" : "#84cc16"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
