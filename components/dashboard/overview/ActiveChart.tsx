"use client";

import { authFetch } from "@/lib/authFetch";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface ActiveUserData {
  month: string;
  activeUsers: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: ActiveUserData[];
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

        const result: ApiResponse = await res.json();

        if (result.success && result.data) {
          const normalized: ActiveUserData[] = result.data.map((item: any) => ({
            month: item.month,
            activeUsers: Number(item.activeUsers ?? 0),
          }));
          setActiveUsersAnalytics(normalized);
        } else {
          throw new Error("Invalid response format");
        }
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

  if (loading) {
    return (
      <div className="bg-gray-100 p-8 rounded-2xl shadow-sm h-96 flex items-center justify-center">
        <p className="text-gray-600">Loading chart...</p>
      </div>
    );
  }

  if (error || activeUsersAnalytics.length === 0) {
    return (
      <div className="bg-gray-100 p-8 rounded-2xl shadow-sm h-96 flex flex-col items-center justify-center">
        <p className="text-gray-600">No data available</p>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    );
  }

  // Create bar data with alternating colors
  const barColors = activeUsersAnalytics.map((_, index) =>
    index % 2 === 0 ? "#0f3936" : "#84cc16"
  );

  const chartData = {
    labels: activeUsersAnalytics.map((item) => item.month),
    datasets: [
      {
        label: "Active Users",
        data: activeUsersAnalytics.map((item) => item.activeUsers),
        backgroundColor: barColors,
        borderRadius: 6, // This is correct for bars
        borderSkipped: false,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: "x",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 14, weight: "bold" },
        bodyFont: { size: 13 },
        cornerRadius: 8, // ← Fixed: was borderRadius
        boxPadding: 6,
        callbacks: {
          label: function (context) {
            return `Active Users: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: 500,
          },
          color: "#0f3936",
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        border: {
          display: false, // This hides the Y-axis line itself
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#64748b",
          callback: function (value) {
            if (Number(value) >= 1000) {
              return Number(value) / 1000 + "k";
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 p-8 rounded-2xl shadow-sm">
      <h3 className="text-teal-900 text-2xl font-bold mb-8">Active Users</h3>

      <div className="w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};
