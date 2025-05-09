import {useState } from "react";
import type { Application } from "./ApplicationsPage";

interface Props {
  original: Application[];
  setFiltered: (apps: Application[]) => void;
}

const FilterBar = ({ original, setFiltered }: Props) => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const applyFilters = () => {
    let result = original;

    if (search.trim()) {
      result = result.filter((app) =>
        `${app.company} ${app.position}`.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status) {
      result = result.filter((app) => app.status.toLowerCase() === status.toLowerCase());
    }

    if (fromDate) {
      result = result.filter((app) => app.date_applied >= fromDate);
    }

    if (toDate) {
      result = result.filter((app) => app.date_applied <= toDate);
    }

    setFiltered(result);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-wrap items-center gap-4">
      <input
        type="text"
        placeholder="Company or Position"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-2 border rounded-md w-64"
      />
      <select
        className="px-3 py-2 border rounded-md"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
      <input type="date" className="px-3 py-2 border rounded-md" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
      <input type="date" className="px-3 py-2 border rounded-md" value={toDate} onChange={(e) => setToDate(e.target.value)} />
      <button onClick={applyFilters} className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBar;
