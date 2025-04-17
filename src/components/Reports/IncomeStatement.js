import React, { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import * as XLSX from "xlsx";

const IncomeStatementReport = ({ fromDate, toDate, selectedReport, onClose }) => {
  const [incomeData, setIncomeData] = useState(null);

  const handleDownload = (data) => {
    if (!data) {
      alert("No data available to download.");
      return;
    }

    const formattedData = Object.entries(data).map(([key, value]) => ({
      Item: key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase()),
      Amount: value,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Income Statement");
    XLSX.writeFile(workbook, "Income_Statement_Report.xlsx");
  };

  useEffect(() => {
    const fetchIncomeStatement = async () => {
      try {
        const response = await ApiService.post("/dashboards/generateIncomeStatement", {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          fromDate,
          toDate,
          branchName: selectedReport,
        });

        if (response?.status && response.data) {
          setIncomeData(response.data);
        } else {
          console.error("No income statement data found");
        }
      } catch (error) {
        console.error("Failed to fetch Income Statement data:", error);
      }
    };

    fetchIncomeStatement();
  }, [fromDate, toDate, selectedReport]);

  if (!incomeData) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h4 className="text-xl font-semibold mb-4">Income Statement Preview</h4>

        <div className="overflow-x-auto max-h-96 border border-gray-300 rounded-lg">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-2 text-left border">Item</th>
                <th className="p-2 text-right border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(incomeData).map(([key, value], idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="p-2 border capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </td>
                  <td className="p-2 border text-right">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDownload(incomeData)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeStatementReport;