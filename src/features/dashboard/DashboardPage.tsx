import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardPanel from "./DashboardPanel";

interface DashboardStats {
  section: string;
  total: number;
  daily: number;
  weekly: number;
  monthly: number;
}

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/dashboard/summary`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Dashboard fetch failed:", err));
  }, []);

  const handlePanelClick = (section: string) => {
    switch (section) {
      case "applications":
        navigate("/applications");
        break;
      case "networking":
        navigate("/networking");
        break;
      case "references":
        navigate("/references");
        break;
      case "leetcode":
        navigate("/skills");
        break;
      default:
        break;
    }
  };
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {stats.map((item) => (
        <DashboardPanel
          key={item.section}
          title={item.section}
          total={item.total}
          daily={item.daily}
          weekly={item.weekly}
          monthly={item.monthly}
          onClick={() => handlePanelClick(item.section)}
        />
      ))}
    </div>
  );
};

export default DashboardPage;
