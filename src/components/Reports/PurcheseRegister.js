import React, { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import * as XLSX from 'xlsx';

const PurchaseRegister = ({ fromDate, toDate, selectedReport, onClose }) => {
  const [purchaseData, setPurchaseData] = useState([]);

  const handleDownload = (data) => {
    if (!data || data.length === 0) {
      alert("No data available to download.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Register");
    XLSX.writeFile(workbook, "PurchaseRegister.xlsx");
  };

  useEffect(() => {
    const fetchPurchaseRegister = async () => {
      try {
        const response = await ApiService.post('dashboards/getPURCHASEReport', {
          // If you have a dedicated API for purchase register, replace above endpoint
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          fromDate,
          toDate,
          branchName: selectedReport,
        });

        const rawData = response.data?.data || [];
        console.log("📦 Purchase Register Data:", rawData);

        const formattedData = rawData.map((item, index) => ({
          "S.No": index + 1,
          "Voucher ID": item.voucherId || "",
          "Voucher Type": item.voucherType || "",
          "Supplier Name": item.ledgerName || "-",        // Assuming this is supplier
          "Payment Mode": item.paymentType || "-",        // Payment method
          "Total Amount": item.totalAmount != null ? item.totalAmount : "-",
          "Purchase Date": item.generationDate
            ? new Date(item.generationDate).toLocaleString()
            : "-",
        }));

        setPurchaseData(formattedData);
      } catch (error) {
        console.error("Failed to fetch purchase register", error);
      }
    };

    fetchPurchaseRegister();
  }, [fromDate, toDate, selectedReport]);

  if (!purchaseData || purchaseData.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full">
        <h4 className="text-xl font-semibold mb-4">Purchase Register</h4>

        <div className="overflow-x-auto max-h-96 border border-gray-300 rounded-lg">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                {Object.keys(purchaseData[0]).map((key, index) => (
                  <th key={index} className="p-2 text-left border">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {purchaseData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}>
                  {Object.values(row).map((value, i) => (
                    <td key={i} className="p-2 border">{value}</td>
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
            onClick={() => handleDownload(purchaseData)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseRegister;
