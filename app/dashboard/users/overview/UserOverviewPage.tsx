"use client";
import { TotalUploadChart } from "@/components/dashboard/overview/UserCharts";
import { UserStatsGrid } from "@/components/dashboard/overview/UserStatsGrid";
import { authFetch } from "@/lib/authFetch";
import { useEffect, useState } from "react";
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

interface IUploadContents {
  title: string;
  coverImage: string;
  status: string;
  description: string;
}

const UserOverview = () => {
  const [analytics, setAnalytics] = useState([]);
  const [uploadContents, setUploadContents] = useState<IUploadContents[]>([]);

  const getAnalytics = async () => {
    const res = await authFetch("/analytics/user-dashboard-stats", {
      method: "GET",
      auth: true,
    });

    const uploadRes = await authFetch("/contents/users?limit=6", {
      method: "GET",
      auth: true,
    });

    const data = await res.json();
    setAnalytics(data?.data);

    const uploadData = await uploadRes.json();
    setUploadContents(uploadData?.data?.contents);
  };
  useEffect(() => {
    getAnalytics();
  }, []);

  return (
    <div className="w-full space-y-8">
      <title>Users Overview Dashboard - African Traditional Architecture</title>
      {/* Top Stats Cards */}
      <UserStatsGrid analytics={analytics} />

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2  overflow-hidden">
          <TotalUploadChart />
        </div>

        {/* Activity Sidebar */}
        <div className="bg-white rounded-3xl border border-lime-500/30 p-6 shadow-sm h-full">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-teal-900">Latest Activity</h2>
            <p className="text-sm text-gray-500">
              Recent uploaded to your contents
            </p>
          </div>

          <div className="space-y-2">
            {uploadContents.map((item, idx) => (
              <div key={idx} className="bg-[#e4ede4] p-4 rounded-xl">
                <h4 className="font-bold text-teal-900 text-sm mb-2">
                  {item.title}
                </h4>
                <div className="flex justify-start items-center gap-4">
                  <span className="text-xs text-gray-500 font-medium">
                    {/* <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${item.coverImage}`}
                      className="w-24 h-24 object-cover"
                      alt=""
                    /> */}
                    {item.description.length > 100
                      ? item.description.substring(0, 100) + "..."
                      : item.description}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium
                    ${
                      item.status === "approved"
                        ? "bg-[#bbf7d0] text-green-800"
                        : item.status === "In Review"
                        ? "bg-[#fed7aa] text-orange-800"
                        : "bg-[#fecaca] text-red-800"
                    }
                  `}
                  >
                    {item.status === "approved"
                      ? "Approved"
                      : item.status === "In Review"
                      ? "In Review"
                      : "Pending"}
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
