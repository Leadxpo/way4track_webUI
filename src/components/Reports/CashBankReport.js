import React, { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import * as XLSX from "xlsx";



const CashBankReport = ({ fromDate, toDate, onClose,selectedReport }) => {
  const [bankData, setBankData] = useState([]);
  const [cashData, setCashData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("bank"); // Default tab is 'bank'

  const handleDownload = (bankData, cashData) => {
    if ((!bankData || bankData.length === 0) && (!cashData || cashData.length === 0)) {
      alert("No data available to download.");
      return;
    }

    // Convert bank and cash data into Excel sheets
    const bankSheet = XLSX.utils.json_to_sheet(bankData);
    const cashSheet = XLSX.utils.json_to_sheet(cashData);

    // Create a new workbook and append both sheets
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, bankSheet, "Bank Statement");
    XLSX.utils.book_append_sheet(workbook, cashSheet, "Cash Statement");

    // Write the Excel file
    XLSX.writeFile(workbook, "Bank_and_Cash_Report.xlsx");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch bank statement data
        const bankResponse = await ApiService.post('/dashboards/getBankStmtForReport', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          fromDate,
          toDate,
          branchName: selectedReport
        });

        if (bankResponse?.status && Array.isArray(bankResponse.data)) {
          setBankData(bankResponse.data);
          setError(null);
        } else {
          setError('No bank statement data found');
        }

        // Fetch cash statement data
        const cashResponse = await ApiService.post('/dashboards/getCashStmtForReport', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          fromDate,
          toDate,
        });

        if (cashResponse?.status && Array.isArray(cashResponse.data)) {
          setCashData(cashResponse.data);
          setError(null);
        } else {
          setError('No cash statement data found');
        }
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [fromDate, toDate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const renderTable = (data) => {
    return (
      <div className="overflow-x-auto max-h-60 border border-gray-300 rounded-lg mb-4">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              {Object.keys(data[0] || {}).map((key, index) => (
                <th key={index} className="p-2 text-left border capitalize">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                {Object.entries(row).map(([key, value], colIndex) => (
                  <td key={colIndex} className="p-2 border">
                    {
                      key.includes('Date') && value
                        ? new Date(value).toLocaleString()
                        : value ?? 'N/A'
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full min-h-[500px]">
        <h4 className="text-xl font-semibold mb-4">Bank and Cash Report Preview</h4>

        {/* Tab Buttons */}
        <div className="flex mb-4">
          <button
            onClick={() => setActiveTab("bank")}
            className={`px-4 py-2 rounded-l-lg ${activeTab === "bank" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            Bank Statement
          </button>
          <button
            onClick={() => setActiveTab("cash")}
            className={`px-4 py-2 rounded-r-lg ${activeTab === "cash" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            Cash Statement
          </button>
        </div>

        {/* Render Selected Tab */}
        {activeTab === "bank" ? renderTable(bankData) : renderTable(cashData)}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDownload(bankData, cashData)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashBankReport;
