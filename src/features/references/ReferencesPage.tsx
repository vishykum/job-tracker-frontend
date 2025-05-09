import { useEffect, useState } from "react";
import axios from "axios";
import FilterBar from "./FilterBar";
import ReferenceTable from "./ReferenceTable";
import EditReferenceModal from "./EditReferenceModal";

export interface Reference {
  id: number;
  name: string;
  company: string;
  contact_info: string;
  role: string;
  notes: string;
}

const ReferencesPage = () => {
    const [references, setReferences] = useState<Reference[]>([]);
    const [filtered, setFiltered] = useState<Reference[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRef, setSelectedRef] = useState<Reference | null>(null);
  
    useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/references`)
        .then((res) => {
          setReferences(res.data);
          setFiltered(res.data);
          localStorage.setItem("references", JSON.stringify(res.data));
        })
        .catch((err) => console.error("Fetch error:", err));
    }, []);
  
    const handleSave = async (ref: Omit<Reference, "id">, id?: number) => {
      try {
        let updatedList: Reference[];
  
        if (id) {
          await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/references/${id}`, ref);
          updatedList = references.map((r) => (r.id === id ? { ...r, ...ref } : r));
        } else {
          const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/references`, ref);
          const newRef: Reference = { id: res.data.id, ...ref };
          updatedList = [...references, newRef];
        }
  
        setReferences(updatedList);
        setFiltered(updatedList);
        localStorage.setItem("references", JSON.stringify(updatedList));
        setShowModal(false);
        setSelectedRef(null);
      } catch (err) {
        console.error("Save failed:", err);
      }
    };
  
    const handleDelete = async (ref: Reference) => {
      const confirm = window.confirm(`Delete reference for ${ref.name}?`);
      if (!confirm) return;
  
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/references/${ref.id}`);
        const updatedList = references.filter((r) => r.id !== ref.id);
        setReferences(updatedList);
        setFiltered(updatedList);
        localStorage.setItem("references", JSON.stringify(updatedList));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    };
  
    return (
      <div className="flex flex-col gap-6">
        <FilterBar original={references} setFiltered={setFiltered} />
        <ReferenceTable
          references={filtered}
          onUpdate={(ref) => {
            setSelectedRef(ref);
            setShowModal(true);
          }}
          onAdd={() => {
            setSelectedRef(null);
            setShowModal(true);
          }}
          onDelete={handleDelete}
        />
        {showModal && (
          <EditReferenceModal
            existing={selectedRef || undefined}
            onSubmit={handleSave}
            onClose={() => {
              setShowModal(false);
              setSelectedRef(null);
            }}
          />
        )}
      </div>
    );
  };
  

export default ReferencesPage;
