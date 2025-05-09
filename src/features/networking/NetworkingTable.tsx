import { useState } from "react";
import type { NetworkingContact } from "./NetworkingPage";
import ExportButton from "../../utils/ExportButton";
import ViewNetworkingModal from "./ViewNetworkingModal";

interface Props {
  contacts: NetworkingContact[];
  onUpdate: (contact: NetworkingContact) => void;
  onAdd: () => void;
  onDelete: (contact: NetworkingContact) => void;
}

const NetworkingTable = ({ contacts, onUpdate, onAdd, onDelete }: Props) => {
  const [selectedContact, setSelectedContact] = useState<NetworkingContact | null>(null);

  const formatDate = (raw: string) =>
    new Date(raw).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
  });

  return (
    <>
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-semibold">
            Networking Contacts ({contacts.length})
          </h3>
          <div className="flex gap-2">
            <button
              onClick={onAdd}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Add Contact
            </button>
            <ExportButton
              data={contacts}
              filename="networking.xlsx"
              sheetName="Networking"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Company</th>
                <th className="p-2">Type</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => setSelectedContact(contact)}>
                  <td className="p-2">{contact.contact_name}</td>
                  <td className="p-2">{contact.company}</td>
                  <td className="p-2">{contact.type}</td>
                  <td className="p-2">{formatDate(contact.contact_date)}</td>
                  <td className="p-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdate(contact);
                      }}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(contact);
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

      {selectedContact && (
        <ViewNetworkingModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </>
  );
};

export default NetworkingTable;
