import { useEffect, useState } from "react";
import axios from "axios";
import FilterBar from "./FilterBar";
import NetworkingTable from "./NetworkingTable";
import TrendPanel from "./TrendPanel";
import NetworkingChart from "./NetworkingChart";
import EditNetworkingModal from "./EditNetworkingModal";

export interface NetworkingContact {
  id: number;
  contact_name: string;
  company: string;
  type: string;
  contact_date: string;
  notes: string;
  related_application_id?: number | null;
}


const NetworkingPage = () => {
  const [contacts, setContacts] = useState<NetworkingContact[]>([]);
  const [filtered, setFiltered] = useState<NetworkingContact[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<NetworkingContact | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/networking`)
      .then((res) => {
        const cleaned = res.data.map((c: NetworkingContact) => {
          const validDate = new Date(c.contact_date);
          return {
            ...c,
            date: !isNaN(validDate.getTime()) ? validDate.toISOString().slice(0, 10) : "",
          };
        });
        setContacts(cleaned);
        setFiltered(cleaned);
        localStorage.setItem("networking", JSON.stringify(cleaned));
      })
      .catch((err) => console.error("Fetch error:", err));
  
    const localCache = localStorage.getItem("networking");
    if (localCache) {
      try {
        const parsed = JSON.parse(localCache);
        const cleaned = parsed.filter((c: NetworkingContact) =>
          !!c.contact_date && !isNaN(new Date(c.contact_date).getTime())
        );
        setContacts(cleaned);
        setFiltered(cleaned);
      } catch (e) {
        console.warn("Invalid local networking cache:", e);
      }
    }
  }, []);  
  

  const handleSave = async (contact: Omit<NetworkingContact, "id">, id?: number) => {
    try {
      let updatedList: NetworkingContact[];

      if (id) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/networking/${id}`, contact);
        updatedList = contacts.map((c) => (c.id === id ? { ...c, ...contact } : c));
      } else {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/networking`, contact);
        const newContact: NetworkingContact = { id: res.data.id, ...contact };
        updatedList = [...contacts, newContact];
      }

      setContacts(updatedList);
      setFiltered(updatedList);
      localStorage.setItem("networking", JSON.stringify(updatedList));
      setShowModal(false);
      setSelectedContact(null);
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleDelete = async (contact: NetworkingContact) => {
    const confirmDelete = window.confirm(`Delete contact with ${contact.contact_name}?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/networking/${contact.id}`);
      const updatedList = contacts.filter((c) => c.id !== contact.id);
      setContacts(updatedList);
      setFiltered(updatedList);
      localStorage.setItem("networking", JSON.stringify(updatedList));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="flex gap-4 h-full">
      <div className="flex flex-col flex-1 space-y-6">
        <NetworkingChart contacts={contacts} />
        <FilterBar original={contacts} setFiltered={setFiltered} />
        <NetworkingTable
          contacts={filtered}
          onUpdate={(c) => {
            setSelectedContact(c);
            setShowModal(true);
          }}
          onAdd={() => {
            setSelectedContact(null);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
      </div>
      <div className="w-72 shrink-0">
        <TrendPanel contacts={contacts} />
      </div>

      {showModal && (
        <EditNetworkingModal
          existing={selectedContact || undefined}
          onSubmit={handleSave}
          onClose={() => {
            setShowModal(false);
            setSelectedContact(null);
          }}
        />
      )}
    </div>
  );
};

export default NetworkingPage;
