import { useEffect, useState } from "react";
import type { Reference } from "./ReferencesPage";

interface Props {
  existing?: Reference;
  onSubmit: (ref: Omit<Reference, "id">, id?: number) => void;
  onClose: () => void;
}

const EditReferenceModal = ({ existing, onSubmit, onClose }: Props) => {
  const [id, setId] = useState<number | undefined>(undefined);

  const [form, setForm] = useState<Omit<Reference, "id">>({
    name: "",
    company: "",
    role: "",
    contact_info: "",
    notes: "",
  });

  useEffect(() => {
    if (existing) {
      const { id, ...rest } = existing;
      setId(id);
      setForm(rest);
    }
  }, [existing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form, id);
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative space-y-4">
        <button type="button" onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold">
          &times;
        </button>
        <h2 className="text-xl font-semibold">{existing ? "Edit" : "Add"} Reference</h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="contact_info"
          type="text"
          placeholder="contact info"
          value={form.contact_info}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="notes"
          placeholder="notes"
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

export default EditReferenceModal;
