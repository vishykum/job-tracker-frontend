import { useLocation } from "react-router-dom";

const routeToTitleMap: Record<string, string> = {
  "/": "Dashboard",
  "/applications": "Job Applications",
  "/references": "References",
  "/networking": "Networking Activity",
  "/skills": "Skill Tracker",
};

const TopBar = () => {
  const location = useLocation();
  const title = routeToTitleMap[location.pathname] || "Page";

  return (
    <header className="bg-white border-b border-gray-200 p-4 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </header>
  );
};

export default TopBar;
