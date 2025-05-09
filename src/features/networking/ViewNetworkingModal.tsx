import type { NetworkingContact } from "./NetworkingPage";

interface Props {
  contact: NetworkingContact;
  onClose: () => void;
}

const ViewNetworkingModal = ({ contact, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Contact Details</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {contact.contact_name}</p>
          <p><strong>Company:</strong> {contact.company}</p>
          <p><strong>Type:</strong> {contact.type}</p>
          <p><strong>Date:</strong> {new Date(contact.contact_date).toLocaleDateString()}</p>
          <p><strong>Related App ID:</strong> {contact.related_application_id ?? "N/A"}</p>
          <p><strong>Notes:</strong> {contact.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewNetworkingModal;
