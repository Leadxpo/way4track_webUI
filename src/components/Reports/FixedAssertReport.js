import React, { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import * as XLSX from 'xlsx';

const FixedAssetReport = ({ fromDate, toDate, selectedReport, onClose }) => {
  const [assetData, setAssetData] = useState([
    {
      assetId: "A001",
      assetName: "Desktop Computer",
      purchaseDate: "2022-04-10T00:00:00Z",
      cost: 45000,
      depreciationRate: "15%",
      location: "Head Office",
      status: "Active"
    },
    {
      assetId: "A002",
      assetName: "Office Chair",
      purchaseDate: "2021-11-05T00:00:00Z",
      cost: 3500,
      depreciationRate: "10%",
      location: "Branch 1",
      status: "Active"
    },
    {
      assetId: "A003",
      assetName: "Printer",
      purchaseDate: "2020-06-20T00:00:00Z",
      cost: 12000,
      depreciationRate: "20%",
      location: "Branch 2",
      status: "Retired"
    }
  ]
  );

  const handleDownload = () => {
    if (!assetData || assetData.length === 0) {
      alert("No data available to download.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(assetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Fixed Assets");
    XLSX.writeFile(workbook, "Fixed_Assets_Report.xlsx");
  };

  // useEffect(() => {
  //   const fetchAssets = async () => {
  //     try {
  //       const response = await ApiService.post("/dashboards/getFixedAssertsForReport", {
  //         companyCode: initialAuthState.companyCode,
  //         unitCode: initialAuthState.unitCode,
  //         fromDate,
  //         toDate,
  //         branchName: selectedReport,
  //       });

  //       if (response?.status && Array.isArray(response.data?.asserts)) {
  //         setAssetData(response.data.asserts);
  //       } else {
  //         console.error("No fixed asset data found");
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch fixed asset data:", error);
  //     }
  //   };

  //   fetchAssets();
  // }, [fromDate, toDate, selectedReport]);

  if (!assetData || assetData.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full">
        <h4 className="text-xl font-semibold mb-4">Fixed Asset Report Preview</h4>

        <div className="overflow-x-auto max-h-60 border border-gray-300 rounded-lg">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                {Object.keys(assetData[0]).map((key, index) => (
                  <th key={index} className="p-2 text-left border capitalize">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assetData.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  {Object.entries(row).map(([key, value], colIndex) => (
                    <td key={colIndex} className="p-2 border">
                      {
                        key.toLowerCase().includes('date') && value
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
            onClick={handleDownload}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixedAssetReport;
