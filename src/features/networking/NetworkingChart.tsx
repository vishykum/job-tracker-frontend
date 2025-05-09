import type { NetworkingContact } from "./NetworkingPage";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

interface Props {
  contacts: NetworkingContact[];
}

const NetworkingChart = ({ contacts }: Props) => {
  const dateCount: Record<string, number> = {};

  contacts.forEach((c) => {
    const dateObj = new Date(c.contact_date);
    if (!isNaN(dateObj.getTime())) {
      const date = dateObj.toISOString().slice(0, 10);
      dateCount[date] = (dateCount[date] || 0) + 1;
    }
  });

  const chartData = Object.entries(dateCount).map(([date, count]) => ({
    date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    count,
  }));

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-md font-semibold mb-2">Networking Activity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetworkingChart;
