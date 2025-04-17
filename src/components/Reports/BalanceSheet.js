import React, { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import * as XLSX from 'xlsx';

const BalanceSheet = ({ fromDate, toDate, selectedReport, onClose }) => {
  const [balanceSheet, setBalanceSheet] = useState([]);

  const handleDownload = (data) => {
    if (!data || data.length === 0) {
      alert("No data available to download.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Balance Sheet");
    XLSX.writeFile(workbook, "BalanceSheet.xlsx");
  };

  useEffect(() => {
    const fetchBalanceSheet = async () => {
      try {
        const response = await ApiService.post('/dashboards/getBalanceSheet', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          fromDate,
          toDate,
          branchName: selectedReport,
        });

        const {
          assets = [],
          liabilities = [],
          income = [],
          expenses = [],
          suspenseAccount = [],
        } = response.data || {};

        const sum = (arr, field) =>
          arr?.reduce((acc, cur) => acc + Number(cur[field] || 0), 0);

        const totalAssets = sum(assets, 'debitAmount') - sum(assets, 'creditAmount');
        const totalLiabilities = sum(liabilities, 'creditAmount') - sum(liabilities, 'debitAmount');
        const totalExpenses = sum(expenses, 'debitAmount');
        const totalIncome = sum(income, 'creditAmount');

        const netProfitOrLoss = totalIncome - totalExpenses;
        const equity = netProfitOrLoss;

        const formatted = [
          {
            Head: 'Assets',
            Amount: totalAssets.toFixed(2),
          },
          {
            Head: 'Liabilities',
            Amount: totalLiabilities.toFixed(2),
          },
          {
            Head: 'Equity (Net Profit/Loss)',
            Amount: equity.toFixed(2),
          },
          {
            Head: 'Total Liabilities + Equity',
            Amount: (totalLiabilities + equity).toFixed(2),
          },
        ];

        setBalanceSheet(formatted);
      } catch (error) {
        console.error('Failed to fetch Balance Sheet', error);
      }
    };

    fetchBalanceSheet();
  }, [fromDate, toDate, selectedReport]);

  if (!balanceSheet || balanceSheet.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h4 className="text-xl font-semibold mb-4">Balance Sheet</h4>

        <div className="overflow-x-auto max-h-60 border border-gray-300 rounded-lg">
          <table className="min-w-full border">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                {Object.keys(balanceSheet[0]).map((key, index) => (
                  <th key={index} className="p-2 text-left border">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {balanceSheet.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
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
            onClick={() => handleDownload(balanceSheet)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheet;
