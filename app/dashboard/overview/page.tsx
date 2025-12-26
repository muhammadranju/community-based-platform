"use client";
import {
  ActiveUsersChart,
  UploadsChart,
} from "@/components/dashboard/overview/Charts";
import { PromoCard } from "@/components/dashboard/overview/PromoCard";
import { StatsGrid } from "@/components/dashboard/overview/StatsGrid";
import {
  NewestMembersTable,
  RecentUploadsTable,
} from "@/components/dashboard/overview/Tables";
import { authFetch } from "@/lib/authFetch";
import { useEffect, useState } from "react";

function page() {
  const [analytics, setAnalytics] = useState([]);
  const getAnalytics = async () => {
    const res = await authFetch("/analytics/dashboard-stats", {
      method: "GET",
      auth: true,
    });
    const data = await res.json();
    setAnalytics(data?.data);
  };
  useEffect(() => {
    getAnalytics();
  }, []);

  return (
    <>
      <StatsGrid analytics={analytics} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column (Tables) - Spans 2 columns on large screens */}
        <div className="xl:col-span-2 space-y-8">
          <RecentUploadsTable />
          <NewestMembersTable />
        </div>

        {/* Right Column (Charts & Promo) - Spans 1 column */}
        <div className="xl:col-span-1 space-y-8">
          <UploadsChart />
          <ActiveUsersChart />
          <PromoCard />
        </div>
      </div>
    </>
  );
}

export default page;
