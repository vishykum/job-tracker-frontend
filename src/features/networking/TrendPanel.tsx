import type { NetworkingContact } from "./NetworkingPage";

interface Props {
  contacts: NetworkingContact[];
}

const TrendPanel = ({ contacts }: Props) => {
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = contacts.filter(
    (c) => typeof c.contact_date === "string" && c.contact_date.slice(0, 10) === today
  ).length;
  

  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-2 text-sm">
      <h3 className="text-md font-semibold">Networking Stats</h3>
      <p><strong>Total Contacts:</strong> {contacts.length}</p>
      <p><strong>Contacted Today:</strong> {todayCount}</p>
    </div>
  );
};

export default TrendPanel;
