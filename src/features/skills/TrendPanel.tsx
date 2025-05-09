import type { SkillLog } from "./types";

interface Props {
  logs: SkillLog[];
}

const TrendPanel = ({ logs }: Props) => {
  const leetcodeLogs = logs.filter((l) => l.category === "leetcode");

  const totalSolved = leetcodeLogs.reduce((sum, log) => sum + (log.num_problems ?? 0), 0);

  const topicStats = leetcodeLogs.reduce<Record<string, number>>((acc, log) => {
    const [topic] = log.topics.split(",").map((s) => s.trim());
    if (!acc[topic]) acc[topic] = 0;
    acc[topic] += log.num_problems ?? 0;
    return acc;
  }, {});

  const topTopics = Object.entries(topicStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-2 text-sm">
      <h3 className="text-md font-semibold">Leetcode Trends</h3>
      <p><strong>Total Solved:</strong> {totalSolved}</p>
      <div className="pt-2">
        <p className="font-medium mb-1">Top Topics:</p>
        <ul className="list-disc ml-4">
          {topTopics.map(([topic, count]) => (
            <li key={topic}>{topic} — {count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrendPanel;
