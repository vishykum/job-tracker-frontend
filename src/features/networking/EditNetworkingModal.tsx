import { useState, useEffect } from "react";
import type { NetworkingContact } from "./NetworkingPage";

interface Props {
  existing?: NetworkingContact;
  onSubmit: (contact: Omit<NetworkingContact, "id">, id?: number) => void;
  onClose: () => void;
}

const EditNetworkingModal = ({ existing, onSubmit, onClose }: Props) => {
  const [form, setForm] = useState<Omit<NetworkingContact, "id">>({
    contact_name: "",
    company: "",
    type: "",
    contact_date: new Date().toISOString().slice(0, 10),
    notes: "",
    related_application_id: null,
  });

  const enumTypes = ["email", "linkedin", "call", "referral", "other"];

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
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "related_application_id"
          ? value === "" ? null : parseInt(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = {
      ...form,
      contact_date: form.contact_date.slice(0, 10),
    };
    onSubmit(normalized, existing?.id);
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative space-y-4">
        <button type="button" onClick={onClose} className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold">
          &times;
        </button>
        <h2 className="text-xl font-semibold">{existing ? "Edit" : "Add"} Contact</h2>

        <input
          name="contact_name"
          placeholder="Name"
          value={form.contact_name}
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

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          <option value="">Select Type</option>
          {enumTypes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>

        <input
          name="contact_date"
          type="date"
          value={form.contact_date}
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
          name="related_application_id"
          type="number"
          placeholder="Related Application ID"
          value={form.related_application_id ?? ""}
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

export default EditNetworkingModal;
