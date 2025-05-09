import { useState, useEffect } from "react";
import type { Application } from "./ApplicationsPage";

interface Props {
  existing?: Application;
  onSubmit: (app: Omit<Application, "id">, id?: number) => void;
  onClose: () => void;
}

const EditApplicationModal = ({ existing, onSubmit, onClose }: Props) => {
  const [form, setForm] = useState<Omit<Application, "id">>({
    company: "",
    position: "",
    status: "applied",
    date_applied: new Date().toISOString().slice(0, 10),
    job_url: "",
    notes: "",
    tags: "",
  });

  useEffect(() => {
    if (existing) {
      const { id, ...rest } = existing;
      setForm(rest);
    }
  }, [existing]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const normalizedForm = {
      ...form,
      date_applied: form.date_applied.slice(0, 10), // ensure YYYY-MM-DD only
    };
  
    onSubmit(normalizedForm, existing?.id);
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative space-y-4"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold">
          {existing ? "Edit" : "Add"} Application
        </h2>

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
        <input
          name="date_applied"
          type="date"
          value={form.date_applied}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="job_url"
          placeholder="Job URL"
          value={form.job_url}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {existing ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditApplicationModal;
