import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const links = [
    { label: "Dashboard", to: "/" },
    { label: "Applications", to: "/applications" },
    { label: "References", to: "/references" },
    { label: "Networking", to: "/networking" },
    { label: "Skills", to: "/skills" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">🎯 Job Tracker</h1>
      <nav className="flex flex-col space-y-2">
        {links.map(({ label, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md transition ${
                isActive ? "bg-gray-700 font-semibold" : "hover:bg-gray-700"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
