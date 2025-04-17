import React, { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import * as XLSX from "xlsx";

const CashFlowReport = ({ fromDate, toDate, selectedReport, onClose }) => {
  const [cashFlowData, setCashFlowData] = useState(null);

  const handleDownload = (data) => {
    if (!data) {
      alert("No data available to download.");
      return;
    }

    const rows = [
      ["Cash Flow Statement"],
      [],
      ["Summary"],
      ["Item", "Amount"],
      ["Cash Inflow", data.cashInflow],
      ["Cash Outflow", data.cashOutflow],
      ["Net Cash Flow", data.netCashFlow],
      [],
      ["Transactions"],
      [],
      [
        "S.No",
        "Voucher Type",
        "Amount",
        "Date",
        "Group",
        "Ledger",
        "Branch",
        "Payment Type",
      ],
      ...data.transactions.map((txn, i) => [
        i + 1,
        txn.voucherType || "-",
        txn.totalAmount ?? "-",
        txn.generationDate
          ? new Date(txn.generationDate).toLocaleString()
          : "-",
        txn.groupName || "-",
        txn.ledgerName || "-",
        txn.branchName || "-",
        txn.paymentType || "-",
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Cash Flow Statement");
    XLSX.writeFile(wb, "Cash_Flow_Statement.xlsx");
  };

  useEffect(() => {
    const fetchCashFlow = async () => {
      try {
        const response = await ApiService.post("/dashboards/getCashFlow", {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          fromDate,
          toDate,
          branchName: selectedReport,
        });

        if (response?.status && response.data) {
          setCashFlowData(response.data);
        } else {
          console.error("No cash flow data found");
        }
      } catch (error) {
        console.error("Failed to fetch cash flow data:", error);
      }
    };

    fetchCashFlow();
  }, [fromDate, toDate, selectedReport]);

  if (!cashFlowData) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full">
        <h4 className="text-xl font-semibold mb-4">Cash Flow Statement Preview</h4>

        {/* Summary Section */}
        <div className="mb-4">
          <table className="min-w-full text-sm border mb-2">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-2 text-left border">Item</th>
                <th className="p-2 text-right border">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="p-2 border">Cash Inflow</td>
                <td className="p-2 border text-right">{cashFlowData.cashInflow}</td>
              </tr>
              <tr className="bg-white">
                <td className="p-2 border">Cash Outflow</td>
                <td className="p-2 border text-right">{cashFlowData.cashOutflow}</td>
              </tr>
              <tr className="bg-gray-100 font-bold">
                <td className="p-2 border">Net Cash Flow</td>
                <td className="p-2 border text-right">{cashFlowData.netCashFlow}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Transactions Section */}
        <div className="overflow-x-auto max-h-72 border border-gray-300 rounded-lg">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-2 border">S.No</th>
                <th className="p-2 border">Voucher Type</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Group</th>
                <th className="p-2 border">Ledger</th>
                <th className="p-2 border">Branch</th>
                <th className="p-2 border">Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {cashFlowData.transactions.map((txn, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border">{txn.voucherType || "-"}</td>
                  <td className="p-2 border text-right">{txn.totalAmount ?? "-"}</td>
                  <td className="p-2 border">
                    {txn.generationDate
                      ? new Date(txn.generationDate).toLocaleString()
                      : "-"}
                  </td>
                  <td className="p-2 border">{txn.groupName || "-"}</td>
                  <td className="p-2 border">{txn.ledgerName || "-"}</td>
                  <td className="p-2 border">{txn.branchName || "-"}</td>
                  <td className="p-2 border">{txn.paymentType || "-"}</td>
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
            onClick={() => handleDownload(cashFlowData)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CashFlowReport;
