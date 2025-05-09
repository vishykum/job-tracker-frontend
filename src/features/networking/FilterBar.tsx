import type { NetworkingContact } from "./NetworkingPage";

interface Props {
  original: NetworkingContact[];
  setFiltered: (data: NetworkingContact[]) => void;
}

const FilterBar = ({ original, setFiltered }: Props) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = original.filter(
      (c) =>
        c.contact_name.toLowerCase().includes(keyword) ||
        c.company.toLowerCase().includes(keyword)
    );
    setFiltered(filtered);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <input
        type="text"
        onChange={handleSearch}
        placeholder="Search by name or company"
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>
  );
};

export default FilterBar;
