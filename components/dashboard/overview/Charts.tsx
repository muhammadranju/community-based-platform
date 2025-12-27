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
  YAxis,
} from "recharts";

// export const UploadsChart: React.FC = () => {
//   const [uploadAnalytics, setUploadAnalytics] = useState<any>([]);
//   const getUploadAnalytics = async () => {
//     const res = await authFetch("/analytics/uploads-chart", {
//       method: "GET",
//       auth: true,
//     });
//     const data = await res.json();

//     setUploadAnalytics(data?.data);
//   };
//   useEffect(() => {
//     getUploadAnalytics();
//   }, []);

//   return (
//     <div className="bg-white p-6 rounded-2xl border border-amber-600/30 shadow-sm h-[320px] flex flex-col">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-primary-color text-lg font-bold">
//           Upload per Month
//         </h3>
//       </div>

//       <div className="flex-1 w-full relative -ml-4">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart data={uploadAnalytics}>
//             <defs>
//               <linearGradient id="colorValue1" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#134e4a" stopOpacity={0.1} />
//                 <stop offset="95%" stopColor="#134e4a" stopOpacity={0} />
//               </linearGradient>
//               <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
//                 <stop offset="5%" stopColor="#d97706" stopOpacity={0.1} />
//                 <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
//               </linearGradient>
//             </defs>

//             <XAxis
//               dataKey="month"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fontSize: 0, fill: "transparent" }}
//               height={10}
//             />

//             <Tooltip
//               contentStyle={{
//                 borderRadius: "8px",
//                 border: "none",
//                 boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
//               }}
//             />

//             <Area
//               type="monotone"
//               dataKey="uploads"
//               stroke="#d97706"
//               fillOpacity={1}
//               fill="url(#colorValue2)"
//               strokeWidth={2}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

export const UploadsChart: React.FC = () => {
  const [uploadAnalytics, setUploadAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugError, setDebugError] = useState<string | null>(null);

  const getUploadAnalytics = async () => {
    try {
      setLoading(true);
      setDebugError(null);
      const res = await authFetch("/analytics/uploads-chart", {
        method: "GET",
        auth: true,
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }

      const result = await res.json();

      console.log("Uploads Chart API Response:", result);

      if (result.success && Array.isArray(result.data)) {
        setUploadAnalytics(result.data);
      } else if (Array.isArray(result)) {
        // Fallback if data is returned directly as an array
        setUploadAnalytics(result);
      } else {
        console.warn("Unexpected data structure for uploads chart:", result);
        setUploadAnalytics([]);
        setDebugError("Data format invalid");
      }
    } catch (error: any) {
      console.error("Failed to fetch upload analytics:", error);
      setUploadAnalytics([]);
      setDebugError(error.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUploadAnalytics();
  }, []);

  // If no data at all, show a friendly message
  const hasData = uploadAnalytics.some((item) => item.uploads > 0);

  return (
    <div className="bg-white p-6 rounded-2xl border border-amber-600/30 shadow-sm h-[320px] flex flex-col relative">
      {/* DEBUG OVERLAY - REMOVE AFTER FIXING */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-0 right-0 p-2 bg-black/80 text-white text-[10px] z-50 max-w-[200px] overflow-auto max-h-[100px] opacity-50 hover:opacity-100">
          Status: {loading ? "Loading" : "Loaded"}
          <br />
          Items: {uploadAnalytics.length}
          <br />
          Error: {debugError || "None"}
          <br />
          Data Sample: {JSON.stringify(uploadAnalytics[0] || "No Data")}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-primary-color text-lg font-bold">
          Uploads per Month
        </h3>
      </div>

      <div className="flex-1 w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading chart...
          </div>
        ) : uploadAnalytics.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <span>No data available</span>
            {debugError && (
              <span className="text-xs text-red-400 mt-1">{debugError}</span>
            )}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={uploadAnalytics}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="month" // Expecting "month" key
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
                domain={[0, "dataMax + 5"]}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#111827" }}
                formatter={(value: number) => `${value} uploads`}
              />

              <Area
                type="monotone"
                dataKey="uploads" // Expecting "uploads" key
                stroke="#d97706"
                fill="url(#colorUploads)"
                strokeWidth={3}
                dot={{ fill: "#d97706", r: 4 }}
                activeDot={{ fill: "#d97706", r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {/* Optional: Show message when all values are zero but data exists */}
        {!loading && !hasData && uploadAnalytics.length > 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-400 text-sm">
              No uploads yet this year
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export const ActiveUsersChart: React.FC = () => {
  const [activeUsersAnalytics, setActiveUsersAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugError, setDebugError] = useState<string | null>(null);

  const getActiveUsersAnalytics = async () => {
    try {
      setLoading(true);
      setDebugError(null);
      const res = await authFetch("/analytics/active-users-chart", {
        method: "GET",
        auth: true,
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const result = await res.json();

      console.log("Active Users Chart API Response:", result);

      if (result.success && Array.isArray(result.data)) {
        setActiveUsersAnalytics(result.data);
      } else if (Array.isArray(result)) {
        // Fallback if data is returned directly as an array
        setActiveUsersAnalytics(result);
      } else {
        console.warn(
          "Unexpected data structure for active users chart:",
          result
        );
        setActiveUsersAnalytics([]);
        setDebugError("Data format invalid");
      }
    } catch (error: any) {
      console.error("Failed to fetch active users analytics:", error);
      setActiveUsersAnalytics([]);
      setDebugError(error.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActiveUsersAnalytics();
  }, []);

  return (
    <div className="bg-gray-200 p-6 rounded-2xl shadow-sm h-[320px] flex flex-col relative">
      {/* DEBUG OVERLAY - REMOVE AFTER FIXING */}
      {process.env.NODE_ENV === "development" && (
        <div className="absolute top-0 right-0 p-2 bg-black/80 text-white text-[10px] z-50 max-w-[200px] overflow-auto max-h-[100px] opacity-50 hover:opacity-100">
          Status: {loading ? "Loading" : "Loaded"}
          <br />
          Items: {activeUsersAnalytics.length}
          <br />
          Error: {debugError || "None"}
          <br />
          Data Sample: {JSON.stringify(activeUsersAnalytics[0] || "No Data")}
        </div>
      )}

      <h3 className="text-primary-color text-lg font-bold mb-6">
        Active Users
      </h3>

      <div className="flex-1 w-full">
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading chart...
          </div>
        ) : activeUsersAnalytics.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <span>No data available</span>
            {debugError && (
              <span className="text-xs text-red-500 mt-1">{debugError}</span>
            )}
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
                {activeUsersAnalytics.length > 0 &&
                  activeUsersAnalytics.map((entry: any, index: number) => (
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
