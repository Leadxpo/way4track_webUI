import React, { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import * as XLSX from 'xlsx';

const TcsReport = ({ fromDate, toDate, selectedReport, onClose }) => {
  const [salesReturnData, setSalesReturnData] = useState([]);

  const handleDownload = (data) => {
    if (!data || data.length === 0) {
      alert("No data available to download.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Return");
    XLSX.writeFile(workbook, "Sales_Return_Report.xlsx");
  };

  useEffect(() => {
    const fetchSalesReturn = async () => {
      try {
        const response = await ApiService.post('/dashboards/getTCSReport', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          fromDate,
          toDate,
          branchName: selectedReport,
        });

        if (response?.status && Array.isArray(response.data)) {
          setSalesReturnData(response.data);
        } else {
          console.error('No sales return data found');
        }
      } catch (error) {
        console.error('Failed to fetch Sales Return data:', error);
      }
    };

    fetchSalesReturn();
  }, [fromDate, toDate, selectedReport]);

  if (!salesReturnData || salesReturnData.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h4 className="text-xl font-semibold mb-4">TCS report Preview</h4>

        <div className="overflow-x-auto max-h-60 border border-gray-300 rounded-lg">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                {Object.keys(salesReturnData[0]).map((key, index) => (
                  <th key={index} className="p-2 text-left border capitalize">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {salesReturnData.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                  {Object.entries(row).map(([key, value], colIndex) => (
                    <td key={colIndex} className="p-2 border">
                      {
                        key.includes('Date') && value
                          ? new Date(value).toLocaleString()
                          : value ?? ''
                      }
                    </td>
                  ))}
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
            onClick={() => handleDownload(salesReturnData)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TcsReport;