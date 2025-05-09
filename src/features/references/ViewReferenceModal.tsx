import type { Reference } from "./ReferencesPage";

interface Props {
  reference: Reference;
  onClose: () => void;
}

const ViewReferenceModal = ({ reference, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Reference Details</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Name:</strong> {reference.name}</p>
          <p><strong>Company:</strong> {reference.company}</p>
          <p><strong>Role:</strong> {reference.role}</p>
          <p><strong>Contact Info:</strong> {reference.contact_info}</p>
          <p><strong>Notes:</strong> {reference.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewReferenceModal;
