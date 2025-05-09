import type { Application } from "./ApplicationsPage";

interface Props {
  app: Application | null;
  onClose: () => void;
}

const ViewApplicationModal = ({ app, onClose }: Props) => {
  if (!app) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Application Details</h2>
        <div className="space-y-2 text-sm">
          <p><strong>Company:</strong> {app.company}</p>
          <p><strong>Position:</strong> {app.position}</p>
          <p><strong>Status:</strong> {app.status}</p>
          <p><strong>Date Applied:</strong> {new Date(app.date_applied).toLocaleDateString()}</p>
          <p><strong>Tags:</strong> {app.tags}</p>
          <p><strong>Notes:</strong> {app.notes}</p>
          <p><strong>Job URL:</strong> <a href={app.job_url} className="text-blue-600 underline" target="_blank">{app.job_url}</a></p>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicationModal;
