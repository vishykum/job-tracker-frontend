import { useEffect, useState } from "react";
import axios from "axios";
import ApplicationChart from "./ApplicationChart";
import FilterBar from "./FilterBar";
import ApplicationTable from "./ApplicationTable";
import TrendPanel from "./TrendPanel";
import EditApplicationModal from "./EditApplicationModal";

export interface Application {
  id: number;
  company: string;
  position: string;
  status: string;
  date_applied: string;
  job_url: string;
  notes: string;
  tags: string;
}

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filtered, setFiltered] = useState<Application[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  useEffect(() => {
    const localCache = localStorage.getItem("applications");
    if (localCache) {
      const parsed = JSON.parse(localCache);
      setApplications(parsed);
      setFiltered(parsed);
    }

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/applications`)
      .then((res) => {
        setApplications(res.data);
        setFiltered(res.data);
        localStorage.setItem("applications", JSON.stringify(res.data));
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleSave = async (app: Omit<Application, "id">, id?: number) => {
    try {
      let updatedList: Application[];

      if (id) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/applications/${id}`, app);
        updatedList = applications.map((a) => (a.id === id ? { ...a, ...app } : a));
      } else {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/applications`, app);
        const newApp: Application = { id: res.data.applicationId, ...app };
        updatedList = [...applications, newApp];
      }

      setApplications(updatedList);
      setFiltered(updatedList);
      localStorage.setItem("applications", JSON.stringify(updatedList));
      setShowModal(false);
      setSelectedApp(null);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleDelete = async (app: Application) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the application for ${app.position} at ${app.company}?`
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/applications/${app.id}`);
      const updatedList = applications.filter((a) => a.id !== app.id);
      setApplications(updatedList);
      setFiltered(updatedList);
      localStorage.setItem("applications", JSON.stringify(updatedList));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="flex gap-4 h-full">
      <div className="flex flex-col flex-1 space-y-6">
        <ApplicationChart applications={applications} />
        <FilterBar original={applications} setFiltered={setFiltered} />
        <ApplicationTable
          applications={filtered}
          onUpdate={(app) => {
            setSelectedApp(app);
            setShowModal(true);
          }}
          onAdd={() => {
            setSelectedApp(null);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
      </div>
      <div className="w-72 shrink-0">
        <TrendPanel applications={applications} />
      </div>

      {showModal && (
        <EditApplicationModal
          existing={selectedApp || undefined}
          onSubmit={handleSave}
          onClose={() => {
            setShowModal(false);
            setSelectedApp(null);
          }}
        />
      )}
    </div>
  );
};

export default ApplicationsPage;
