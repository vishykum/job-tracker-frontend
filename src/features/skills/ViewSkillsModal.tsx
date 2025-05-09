import type { SkillLog } from "./types";

interface Props {
  log: SkillLog;
  onClose: () => void;
}

const ViewSkillsModal = ({ log, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">Skill Log Details</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Date:</strong> {log.date}</p>
          <p><strong>Category:</strong> {log.category}</p>
          {log.category === "leetcode" && (
            <>
              <p><strong>Problems Solved:</strong> {log.num_problems}</p>
              <p><strong>Leetcode Topic:</strong> {log.topics}</p>
            </>
          )}
          {log.category !== "leetcode" && (
            <>
              <p><strong>Topics:</strong> {log.topics}</p>
            </>
          )}
          <p><strong>Duration:</strong> {log.duration_minutes} min</p>
          <p><strong>Notes:</strong> {log.notes || "—"}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewSkillsModal;
