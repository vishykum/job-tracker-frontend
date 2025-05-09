import { useState } from "react";
import type { SkillLog } from "./types";
import ExportButton from "../../utils/ExportButton";
import ViewSkillsModal from "./ViewSkillsModal";

interface Props {
  logs: SkillLog[];
  onUpdate: (log: SkillLog) => void;
  onAdd: () => void;
  onDelete: (log: SkillLog) => void;
}

const SkillsTable = ({ logs, onUpdate, onAdd, onDelete }: Props) => {
  const [search, setSearch] = useState({ date: "", category: "", topics: "" });
  const [selectedLog, setSelectedLog] = useState<SkillLog | null>(null);

  const filtered = logs.filter((log) => {
    return (
      log.date.includes(search.date) &&
      log.category.toLowerCase().includes(search.category.toLowerCase()) &&
      log.topics.toLowerCase().includes(search.topics.toLowerCase())
    );
  });

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-semibold">Skill Logs ({filtered.length})</h3>
          <div className="flex gap-2">
            <button
              onClick={onAdd}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Add Log
            </button>
            <ExportButton data={filtered} filename="skills.xlsx" sheetName="Skill Logs" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-2">
          <input
            placeholder="Filter by date"
            value={search.date}
            onChange={(e) => setSearch({ ...search, date: e.target.value })}
            className="border rounded px-2 py-1 text-sm"
          />
          <input
            placeholder="Filter by category"
            value={search.category}
            onChange={(e) => setSearch({ ...search, category: e.target.value })}
            className="border rounded px-2 py-1 text-sm"
          />
          <input
            placeholder="Filter by topics"
            value={search.topics}
            onChange={(e) => setSearch({ ...search, topics: e.target.value })}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Category</th>
                <th className="p-2">Problems</th>
                <th className="p-2">Duration</th>
                <th className="p-2">Topics</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedLog(log)}
                >
                  <td className="p-2">{log.date}</td>
                  <td className="p-2">{log.category}</td>
                  <td className="p-2">{log.num_problems ?? "-"}</td>
                  <td className="p-2">{log.duration_minutes} min</td>
                  <td className="p-2">{log.topics}</td>
                  <td className="p-2 space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdate(log);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(log);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLog && (
        <ViewSkillsModal log={selectedLog} onClose={() => setSelectedLog(null)} />
      )}
    </>
  );
};

export default SkillsTable;
