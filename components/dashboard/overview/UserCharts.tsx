import { authFetch } from "@/lib/authFetch";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

export const UsersUploadsChart: React.FC = () => {
  const [uploadAnalytics, setUploadAnalytics] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getUploadAnalytics = async () => {
    try {
      setLoading(true);
      const res = await authFetch("/analytics/user-uploads-chart", {
        method: "GET",
        auth: true,
      });
      const result = await res.json();

      // Robust data extraction and remapping
      let rawData = result?.data?.result || result?.data || result;
      if (Array.isArray(rawData)) {
        const formattedData = rawData.map((item: any) => ({
          month: item.month || item.name || "N/A",
          uploads: Number(item.uploads ?? item.value ?? 0),
        }));
        setUploadAnalytics(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch user uploads chart:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUploadAnalytics();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl border border-amber-600/30 shadow-sm h-[320px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-primary-color text-lg font-bold">
          Upload per Month
        </h3>
      </div>

      <div className="flex-1 w-full relative -ml-4">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm italic">
            Loading uploads...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={uploadAnalytics}>
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
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                height={30}
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
                dataKey="uploads"
                stroke="#d97706"
                fillOpacity={1}
                fill="url(#colorValue2)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export const ActiveUsersChart: React.FC = () => {
  const [activeUsersAnalytics, setActiveUsersAnalytics] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getActiveUsersAnalytics = async () => {
    try {
      setLoading(true);
      const res = await authFetch("/analytics/active-users-chart", {
        method: "GET",
        auth: true,
      });
      const result = await res.json();

      // Robust data extraction and remapping
      let rawData = result?.data?.result || result?.data || result;
      if (Array.isArray(rawData)) {
        const formattedData = rawData.map((item: any) => ({
          month: item.month || item.name || "N/A",
          activeUsers: Number(item.activeUsers ?? item.value ?? 0),
        }));
        setActiveUsersAnalytics(formattedData);
      }
    } catch (error) {
      console.error("Failed to fetch active users chart:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getActiveUsersAnalytics();
  }, []);
  return (
    <div className="bg-gray-200 p-6 rounded-2xl shadow-sm h-[320px] flex flex-col">
      <h3 className="text-primary-color text-lg font-bold mb-6">
        Active Users
      </h3>

      <div className="flex-1 w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm italic">
            Loading users...
          </div>
        ) : (
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
                {activeUsersAnalytics?.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index % 2 === 0 ? "#0f3936" : "#84cc16"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
