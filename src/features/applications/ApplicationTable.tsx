import type { Application } from "./ApplicationsPage";
import ExportButton from "../../utils/ExportButton";
import ViewApplicationModal from "./ViewApplicationModal";
import { useState } from "react";

interface Props {
  applications: Application[];
  onUpdate: (app: Application) => void;
  onAdd: () => void;
  onDelete: (app: Application) => void;
}

const ApplicationTable = ({ applications, onUpdate, onAdd, onDelete }: Props) => {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

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
            Applications ({applications.length})
          </h3>
          <div className="flex gap-2">
            <button
              onClick={onAdd}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              + Add Application
            </button>
            <ExportButton data={applications} filename="applications.xlsx" sheetName="Applications"/>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-2">Company</th>
                <th className="p-2">Position</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date Applied</th>
                <th className="p-2">Tags</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedApp(app)}
                >
                  <td className="p-2">{app.company}</td>
                  <td className="p-2">{app.position}</td>
                  <td className="p-2">{app.status}</td>
                  <td className="p-2">{formatDate(app.date_applied)}</td>
                  <td className="p-2">{app.tags}</td>
                  <td className="p-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdate(app);
                      }}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(app);
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

      {selectedApp && (
        <ViewApplicationModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </>
  );
};

export default ApplicationTable;
