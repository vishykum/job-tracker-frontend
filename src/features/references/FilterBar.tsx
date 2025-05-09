import type { Reference } from "./ReferencesPage";

interface Props {
  original: Reference[];
  setFiltered: (data: Reference[]) => void;
}

const FilterBar = ({ original, setFiltered }: Props) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = original.filter(
      (r) =>
        r.name.toLowerCase().includes(keyword) ||
        r.company.toLowerCase().includes(keyword) ||
        r.role.toLowerCase().includes(keyword)
    );
    setFiltered(filtered);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search by name, company, or position"
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>
  );
};

export default FilterBar;
