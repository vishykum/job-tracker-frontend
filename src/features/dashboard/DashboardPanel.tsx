interface Props {
    title: string;
    total: number;
    daily: number;
    weekly: number;
    monthly: number;
    onClick: () => void;
  }
  
  const Arrow = ({ value }: { value: number }) => {
    if (value > 0) return <span className="text-green-600">↑ {value}</span>;
    if (value < 0) return <span className="text-red-500">↓ {Math.abs(value)}</span>;
    return <span className="text-gray-500">0</span>;
  };
  
  const DashboardPanel = ({ title, total, daily, weekly, monthly, onClick }: Props) => {
    const formatTitle = (raw: string) =>
      raw.charAt(0).toUpperCase() + raw.slice(1).replace("_", " ");
  
    return (
      <div
        className="cursor-pointer bg-gray-900/90 hover:bg-gray-900 text-white shadow rounded-lg p-6 hover:shadow-md transition"
        onClick={onClick}
      >
        <h3 className="text-lg font-semibold mb-3">{formatTitle(title)}</h3>
        <div className="space-y-1 text-sm">
          <p><strong>Total:</strong> {total}</p>
          <p><strong>Today:</strong> <Arrow value={daily} /></p>
          <p><strong>This Week:</strong> <Arrow value={weekly} /></p>
          <p><strong>This Month:</strong> <Arrow value={monthly} /></p>
        </div>
      </div>
    );
  };
  
  export default DashboardPanel;
  