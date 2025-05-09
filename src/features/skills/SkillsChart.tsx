import { useState } from "react";
import type { SkillLog } from "./types";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, BarChart, Bar
} from "recharts";

interface Props {
  logs: SkillLog[];
}

const SkillsChart = ({ logs }: Props) => {
  const [view, setView] = useState<string>("leetcode");

  const leetcodeLogs = logs.filter(
    (log) => log.category === "leetcode" && log.num_problems !== null
  );
  const otherCategories = [...new Set(logs.map((log) => log.category))].filter(
    (c) => c !== "leetcode"
  );

  const leetcodeLineData: Record<string, { date: string; easy: number; medium: number; hard: number }> = {};
  const recentBarStats: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 };

  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);

  leetcodeLogs.forEach((log) => {
    const dateKey = log.date;
    const [, difficulty] = log.topics.split(",").map((s) => s.trim());
    const num = log.num_problems || 0;

    // Line chart grouping
    if (!leetcodeLineData[dateKey]) {
      leetcodeLineData[dateKey] = { date: dateKey, easy: 0, medium: 0, hard: 0 };
    }

    if (difficulty === "Easy") leetcodeLineData[dateKey].easy += num;
    else if (difficulty === "Medium") leetcodeLineData[dateKey].medium += num;
    else if (difficulty === "Hard") leetcodeLineData[dateKey].hard += num;

    // Bar chart: past 7 days
    const logDate = new Date(log.date);
    if (logDate >= sevenDaysAgo && logDate <= today) {
      if (["Easy", "Medium", "Hard"].includes(difficulty)) {
        recentBarStats[difficulty] += num;
      }
    }
  });

  const leetcodeLineArray = Object.values(leetcodeLineData).sort(
    (a, b) => a.date.localeCompare(b.date)
  );

  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-md font-semibold">Skill Progress</h3>
        <select
          className="border p-1 rounded text-sm"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="leetcode">Leetcode</option>
          {otherCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Leetcode Charts */}
      {view === "leetcode" && (
        <>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={leetcodeLineArray}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="easy" stroke="#16a34a" strokeWidth={2} />
              <Line type="monotone" dataKey="medium" stroke="#eab308" strokeWidth={2} />
              <Line type="monotone" dataKey="hard" stroke="#dc2626" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[recentBarStats]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={false} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="Easy" fill="#16a34a" />
              <Bar dataKey="Medium" fill="#eab308" />
              <Bar dataKey="Hard" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}

      {/* Other Category Line Chart */}
      {view !== "leetcode" && (() => {
        const reducedMap = logs
          .filter((log) => log.category === view)
          .reduce<Record<string, { date: string; count: number }>>((acc, log) => {
            if (!acc[log.date]) acc[log.date] = { date: log.date, count: 0 };
            acc[log.date].count += 1;
            return acc;
          }, {});

        const otherChartData = Object.values(reducedMap).sort(
          (a, b) => a.date.localeCompare(b.date)
        );

        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={otherChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      })()}
    </div>
  );
};

export default SkillsChart;
