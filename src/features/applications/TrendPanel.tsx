import type { Application } from "./ApplicationsPage";

interface Props {
  applications: Application[];
}

const TrendPanel = ({ applications }: Props) => {
  const total = applications.length;
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = applications.filter((a) => a.date_applied === today).length;

  const interviewCount = applications.filter((a) =>
    ["interview", "offer"].includes(a.status.toLowerCase())
  ).length;

  const avgPerDay = total > 0
    ? (total / new Set(applications.map((a) => a.date_applied)).size).toFixed(1)
    : "0";

  return (
    <div className="bg-white shadow rounded-lg p-4 h-full">
      <h3 className="text-md font-semibold mb-4">Application Trends</h3>
      <ul className="text-sm space-y-3">
        <li>📆 {todayCount} applications today</li>
        <li>🎯 {interviewCount} in interview/offer</li>
        <li>📊 Avg. {avgPerDay} apps/day</li>
        <li>📦 Total: {total} applications</li>
      </ul>
    </div>
  );
};

export default TrendPanel;
