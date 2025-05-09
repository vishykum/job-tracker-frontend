import type { Reference } from "./ReferencesPage";
import ExportButton from "../../utils/ExportButton";
import { useState } from "react";
import ViewReferenceModal from "./ViewReferenceModal";

interface Props {
  references: Reference[];
  onUpdate: (ref: Reference) => void;
  onAdd: () => void;
  onDelete: (ref: Reference) => void;
}

const ReferenceTable = ({ references, onUpdate, onAdd, onDelete }: Props) => {
  const [selectedRef, setSelectedRef] = useState<Reference | null>(null);

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-semibold">References ({references.length})</h3>
          <div className="flex gap-2">
            <button
              onClick={onAdd}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Add Reference
            </button>
            <ExportButton
              data={references}
              filename="references.xlsx"
              sheetName="References"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Company</th>
                <th className="p-2">Role</th>
                <th className="p-2">Contact Info</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {references.map((ref) => (
                <tr
                  key={ref.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedRef(ref)}
                >
                  <td className="p-2">{ref.name}</td>
                  <td className="p-2">{ref.company}</td>
                  <td className="p-2">{ref.role}</td>
                  <td className="p-2">{ref.contact_info}</td>
                  <td className="p-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdate(ref);
                      }}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(ref);
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRef && (
        <ViewReferenceModal
          reference={selectedRef}
          onClose={() => setSelectedRef(null)}
        />
      )}
    </>
  );
};

export default ReferenceTable;
