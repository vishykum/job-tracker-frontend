import * as XLSX from "xlsx";

interface ExportButtonProps {
  data: Record<string, any>[];
  filename?: string;
  sheetName?: string;
}

const ExportButton = ({ data, filename = "export.xlsx", sheetName = "Sheet1" }: ExportButtonProps) => {
  const handleExport = () => {
    if (!data.length) return;

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, filename);
  };

  return (
    <button
      onClick={handleExport}
      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
    >
      Export to XLSX
    </button>
  );
};

export default ExportButton;
