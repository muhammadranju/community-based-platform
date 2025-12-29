"use client";

import { authFetch } from "@/lib/authFetch";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip,
  ChartOptions,
  ChartTypeRegistry,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Tooltip
);

interface ChartDataPoint {
  month: string;
  uploads: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    chartData: ChartDataPoint[];
    currentMonthTotal: number;
    previousMonthTotal: number;
    totalUploads: number;
  };
}

export const TotalUploadChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentMonthTotal, setCurrentMonthTotal] = useState<number>(0);
  const [previousMonthTotal, setPreviousMonthTotal] = useState<number>(0);
  const [timeframe, setTimeframe] = useState<"Day" | "Month" | "Year">("Month");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [totalUploads, setTotalUploads] = useState<number>(0);

  const chartRef = React.useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await authFetch("/analytics/user-uploads-chart", {
          method: "GET",
          auth: true,
        });

        if (!res.ok) throw new Error(`API Error: ${res.status}`);

        const result: ApiResponse = await res.json();

        if (result.success && result.data.chartData) {
          setChartData(result.data.chartData);
          setCurrentMonthTotal(result.data.currentMonthTotal);
          setPreviousMonthTotal(result.data.previousMonthTotal);
          setTotalUploads(result.data.totalUploads);
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

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-amber-600/30 shadow-sm">
        <p className="text-gray-500">Loading chart...</p>
      </div>
    );
  }

  if (error || !chartData.length) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-amber-600/30 shadow-sm">
        <p className="text-gray-500">{error || "No data available"}</p>
      </div>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  };

  const barBackgroundColors = chartData.map((_, index) =>
    index === hoveredIndex ? "#84cc16" : "transparent"
  );

  const data = {
    labels: chartData.map((item) => item.month),
    datasets: [
      {
        type: "line" as const,
        label: "Uploads",
        data: chartData.map((item) => item.uploads),
        borderColor: "#0f3936",
        backgroundColor: "rgba(15, 57, 54, 0.1)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#0f3936",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: "#0f3936",
        order: 2,
      },
      {
        type: "bar" as const,
        label: "Highlight",
        data: chartData.map((item, index) =>
          index === hoveredIndex ? item.uploads : null
        ),
        backgroundColor: barBackgroundColors,
        borderRadius: 8,
        barPercentage: 0.6,
        categoryPercentage: 0.7,
        order: 1,
      },
    ],
  };

  // Changed: No longer typing as ChartOptions<"line"> — use generic or any for mixed charts
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Better for fixed height containers
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#84cc16",
        padding: 12,
        titleFont: { size: 16, weight: "bold" },
        bodyFont: { size: 14, weight: "bold" },
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        cornerRadius: 8, // Fixed: was borderRadius
        boxPadding: 8,
        callbacks: {
          title: (context) => {
            if (context.length > 0) {
              const index = context[0].dataIndex;
              setHoveredIndex(index);
              return context[0].label;
            }
            return "";
          },
          label: (context) => {
            const value = context.raw as number;
            if (value === null) return "";
            return formatNumber(value);
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
          color: "#6b7280",
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        border: {
          display: false, // Fixed: replaced drawBorder
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#6b7280",
          callback: function (value) {
            return formatNumber(value as number);
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-emerald-900 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-teal-900 text-2xl font-bold">Total Upload</h3>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-teal-900 text-3xl font-bold">
              {formatNumber(totalUploads)}
            </p>
          </div>
        </div>

        {/* Timeframe Buttons */}
        <div className="flex gap-2 bg-gray-100 p-2 rounded-full">
          {(["Day", "Month", "Year"] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                timeframe === tf
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[500px]">
        {/* Changed: type="line" → type="bar" (or "line", doesn't matter — just consistent) */}
        <Chart type="line" data={data} options={options} ref={chartRef} />
      </div>
    </div>
  );
};
