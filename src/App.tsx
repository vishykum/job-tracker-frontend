import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ApplicationsPage from "./features/applications/ApplicationsPage";
import NetworkingPage from "./features/networking/NetworkingPage";
import ReferencesPage from "./features/references/ReferencesPage";
import DashboardPage from "./features/dashboard/DashboardPage";
import SkillsPage from "./features/skills/SkillsPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/references" element={<ReferencesPage />} />
        <Route path="/networking" element={<NetworkingPage />} />
        <Route path="/skills" element={<SkillsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
