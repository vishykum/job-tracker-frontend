import { useState, useEffect } from "react";
import type { SkillLog, SkillCategory, QuestionType, Difficulty } from "./types";

interface Props {
  existing?: SkillLog;
  onSubmit: (log: Omit<SkillLog, "id">, id?: number) => void;
  onClose: () => void;
}

const questionTypes: QuestionType[] = [
  "Array/String", "Two Pointers", "Sliding Window", "Matrix", "Hashmap", "Intervals", "Stack",
  "Linked List", "Binary Tree General", "Binary Tree BFS", "Binary Search Tree", "Graph General", 
  "Graph BFS", "Trie", "Backtracking", "Divide & Conquer", "Kadane's Algorithm", "Binary Search", 
  "Heap", "Bit Manipulation", "Math", "1D DP", "Multidimensional DP", "SQL", "Other"
];

const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];

const EditSkillModal = ({ existing, onSubmit, onClose }: Props) => {
  const [form, setForm] = useState<Omit<SkillLog, "id">>({
    date: new Date().toISOString().slice(0, 10),
    category: "leetcode",
    num_problems: null,
    duration_minutes: 30,
    topics: "",
    notes: "",
  });

  const [questionType, setQuestionType] = useState<QuestionType>("Array/String");
  const [difficulty, setDifficulty] = useState<Difficulty>("Easy");

  useEffect(() => {
    if (existing) {
      setForm(existing);
      if (existing.category === "leetcode" && existing.topics) {
        const parts = existing.topics.split(",").map((s) => s.trim());
        if (parts.length === 2) {
          setQuestionType(parts[0] as QuestionType);
          setDifficulty(parts[1] as Difficulty);
        }
      }
    }
  }, [existing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form };

    if (form.category === "leetcode") {
      payload.topics = `${questionType}, ${difficulty}`;
      payload.num_problems = form.num_problems ?? 0;
    } else {
      payload.num_problems = null;
    }

    onSubmit(payload, existing?.id);
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative space-y-4"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold">
          {existing ? "Edit" : "Add"} Skill Log
        </h2>

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={(e) => {
            const value = e.target.value as SkillCategory;
            setForm((prev) => ({ ...prev, category: value }));
          }}
          className="w-full border p-2 rounded"
        >
          <option value="leetcode">Leetcode</option>
          <option value="dsa">DSA</option>
          <option value="system_design">System Design</option>
          <option value="project">Project</option>
          <option value="course">Course</option>
          <option value="other">Other</option>
        </select>

        {form.category === "leetcode" && (
          <>
            <input
              name="num_problems"
              type="number"
              placeholder="Number of problems"
              value={form.num_problems ?? ""}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              min={0}
            />

            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value as QuestionType)}
              className="w-full border p-2 rounded"
            >
              {questionTypes.map((qt) => (
                <option key={qt} value={qt}>
                  {qt}
                </option>
              ))}
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              className="w-full border p-2 rounded"
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </>
        )}

        {form.category !== "leetcode" && (
          <input
            name="topics"
            placeholder="Topics (comma separated)"
            value={form.topics}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        )}

        <input
          name="duration_minutes"
          type="number"
          placeholder="Duration (minutes)"
          value={form.duration_minutes}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          min={0}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end pt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {existing ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSkillModal;
