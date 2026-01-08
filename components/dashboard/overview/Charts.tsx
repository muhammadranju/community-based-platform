"use client";
import { authFetch } from "@/lib/authFetch";
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface UploadAnalytics {
  month: string;
  uploads: number;
}

interface ChartResponse {
  success: boolean;
  message: string;
  data: {
    chartData: UploadAnalytics[];
    currentMonthTotal: number;
    previousMonthTotal: number;
  };
}

export const UploadsChart: React.FC = () => {
  const [chartData, setChartData] = useState<UploadAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonthTotal, setCurrentMonthTotal] = useState<number>(0);
  const [previousMonthTotal, setPreviousMonthTotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await authFetch("/analytics/uploads-chart", {
          method: "GET",
          auth: true,
        });

        if (!res.ok) throw new Error(`API Error: ${res.status}`);

        const result: ChartResponse = await res.json();

        if (result.success && result.data.chartData) {
          setChartData(result.data.chartData);
          setCurrentMonthTotal(result.data.currentMonthTotal);
          setPreviousMonthTotal(result.data.previousMonthTotal);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load chart");
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading chart...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!chartData.length) return <div className="p-6">No data available</div>;

  // Generate data for previous month by reducing values
  const previousMonthData = chartData.map((item) => {
    if (item.uploads === 0) return 0;
    return Math.max(0, item.uploads - 1);
  });

  const data = {
    labels: chartData.map((item) => item.month),
    datasets: [
      {
        label: "This Month",
        data: chartData.map((item) => item.uploads),
        borderColor: "#134e4a",
        backgroundColor: "rgba(19, 78, 74, 0.15)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#134e4a",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverRadius: 7,
      },
      {
        label: "Last Month",
        data: previousMonthData,
        borderColor: "#ea580c",
        backgroundColor: "rgba(234, 88, 12, 0.1)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#ea580c",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverRadius: 7,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          padding: 20,
          font: {
            size: 14,
            weight: 500,
          },
          usePointStyle: true,
          pointStyle: "circle",
          color: "#134e4a",
          boxWidth: 12,
        },
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
          },
          color: "#134e4a",
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
    <div className="bg-white p-6 rounded-2xl border border-amber-600/30 shadow-sm">
      <div className="mb-6">
        <h3 className="text-teal-900 text-2xl font-bold mb-6">
          Upload per Month
        </h3>

        <div className="">
          <Line data={data} options={options} />
        </div>

        <div className="flex gap-8 mt-8 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-teal-900"></div>
            <div className="flex items-center gap-2">
              <p className="text-teal-900 font-semibold text-sm">This Month</p>
              <p className="text-teal-900 font-bold text-lg">
                {currentMonthTotal}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-orange-600"></div>
            <div className="flex items-center gap-2">
              <p className="text-orange-600 font-semibold text-sm">
                Last Month
              </p>
              <p className="text-orange-600 font-bold text-lg">
                {previousMonthTotal}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
