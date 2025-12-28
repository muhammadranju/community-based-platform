"use client";

import { authFetch } from "@/lib/authFetch";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

interface ActiveUserData {
  month: string;
  activeUsers: number;
}

export const ActiveUsersChart: React.FC = () => {
  const [activeUsersAnalytics, setActiveUsersAnalytics] = useState<
    ActiveUserData[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await authFetch("/analytics/active-users-chart", {
          method: "GET",
          auth: true,
        });

        if (!res.ok) throw new Error(`API Error: ${res.status}`);

        const result = await res.json();

        const normalized: ActiveUserData[] = (result.data || []).map(
          (item: any) => ({
            month: item.month,
            activeUsers: Number(item.activeUsers ?? 0),
          })
        );

        setActiveUsersAnalytics(normalized);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load chart");
        setActiveUsersAnalytics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-200 p-6 rounded-2xl shadow-sm h-[320px] flex flex-col relative">
      <h3 className="text-primary-color text-lg font-bold mb-6">
        Active Users
      </h3>

      {loading ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          Loading chart...
        </div>
      ) : activeUsersAnalytics.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <span>No data available</span>
          {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
      ) : (
        <div className="w-full h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activeUsersAnalytics} barSize={20}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#64748b" }}
                dy={10}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar dataKey="activeUsers" radius={[4, 4, 4, 4]}>
                {activeUsersAnalytics.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? "#0f3936" : "#84cc16"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
