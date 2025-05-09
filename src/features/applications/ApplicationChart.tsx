import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useState } from "react";
import type { Application } from "./ApplicationsPage";

interface Props {
  applications: Application[];
}

const ApplicationChart = ({ applications }: Props) => {
  const [activeChart, setActiveChart] = useState<"applications" | "interviews">("applications");

  const dailyStats = applications.reduce<Record<string, { applications: number; interviews: number }>>((acc, app) => {
    const date = app.date_applied;
    if (!acc[date]) acc[date] = { applications: 0, interviews: 0 };
    acc[date].applications += 1;
    if (["interview", "offer"].includes(app.status.toLowerCase())) acc[date].interviews += 1;
    return acc;
  }, {});

  const formatDate = (raw: string) =>
    new Date(raw).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  
  const chartData = Object.entries(dailyStats).map(([dateStr, stats]) => ({
    date: formatDate(dateStr),
    ...stats,
  }));

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Daily {activeChart === "applications" ? "Applications" : "Interviews"}</h3>
        <div className="space-x-2">
          <button onClick={() => setActiveChart("applications")} className={`px-3 py-1 rounded-md text-sm ${activeChart === "applications" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            Applications
          </button>
          <button onClick={() => setActiveChart("interviews")} className={`px-3 py-1 rounded-md text-sm ${activeChart === "interviews" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            Interviews
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={activeChart}
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApplicationChart;
