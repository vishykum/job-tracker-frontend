import { useEffect, useState } from "react";
import axios from "axios";
import type { SkillLog } from "./types";
import SkillsChart from "./SkillsChart";
import SkillsTable from "./SkillsTable";
import TrendPanel from "./TrendPanel";
import EditSkillModal from "./EditSkillModal";

const SkillsPage = () => {
  const [skills, setSkills] = useState<SkillLog[]>([]);
  const [filtered, setFiltered] = useState<SkillLog[]>([]);
  const [selected, setSelected] = useState<SkillLog | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const localCache = localStorage.getItem("skills");
    if (localCache) {
      const parsed = JSON.parse(localCache);
      setSkills(parsed);
      setFiltered(parsed);
    }

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/skills`)
      .then((res) => {
        setSkills(res.data);
        setFiltered(res.data);
        localStorage.setItem("skills", JSON.stringify(res.data));
      })
      .catch((err) => console.error("Skills fetch failed:", err));
  }, []);

  const handleSave = async (log: Omit<SkillLog, "id">, id?: number) => {
    try {
      let updated: SkillLog[];

      if (id) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/skills/${id}`, log);
        updated = skills.map((s) => (s.id === id ? { id, ...log } : s));
      } else {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/skills`, log);
        updated = [...skills, { id: res.data.logId, ...log }];
      }

      setSkills(updated);
      setFiltered(updated);
      localStorage.setItem("skills", JSON.stringify(updated));
      setShowModal(false);
      setSelected(null);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleDelete = async (log: SkillLog) => {
    const confirm = window.confirm(`Delete log for ${log.category} on ${log.date}?`);
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/skills/${log.id}`);
      const updated = skills.filter((s) => s.id !== log.id);
      setSkills(updated);
      setFiltered(updated);
      localStorage.setItem("skills", JSON.stringify(updated));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="flex gap-4 h-full">
      <div className="flex flex-col flex-1 space-y-6">
        <SkillsChart logs={skills} />
        <SkillsTable
          logs={filtered}
          onUpdate={(log) => {
            setSelected(log);
            setShowModal(true);
          }}
          onAdd={() => {
            setSelected(null);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      <div className="w-72 shrink-0">
        <TrendPanel logs={skills} />
      </div>

      {showModal && (
        <EditSkillModal
          existing={selected || undefined}
          onSubmit={handleSave}
          onClose={() => {
            setShowModal(false);
            setSelected(null);
          }}
        />
      )}
    </div>
  );
};

export default SkillsPage;
