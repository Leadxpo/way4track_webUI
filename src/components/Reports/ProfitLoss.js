import React, { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import * as XLSX from 'xlsx';

const ProfitLoss = ({ fromDate, toDate, selectedReport, onClose }) => {
  const [profitLoss, setProfitLoss] = useState([]);

  const handleDownload = (data) => {
    if (!data || data.length === 0) {
      alert("No data available to download.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Profit & Loss");
    XLSX.writeFile(workbook, "ProfitAndLoss.xlsx");
  };

  useEffect(() => {
    const fetchProfitLoss = async () => {
      try {
        const response = await ApiService.post('/dashboards/getProfitAndLoss', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          fromDate,
          toDate,
          branchName: selectedReport,
        });

        const {
          purchases = [],
          sales = [],
          indirectExpenses = [],
          indirectIncomes = [],
        } = response.data || {};

        const sum = (arr, field) =>
          arr?.reduce((acc, cur) => acc + Number(cur[field] || 0), 0);

        const totalPurchases = sum(purchases, 'purchaseAmount');
        const totalSales = sum(sales, 'salesAmount');
        const totalIndirectExpenses = sum(indirectExpenses, 'indirectExpenseAmount');
        const totalIndirectIncomes = sum(indirectIncomes, 'indirectIncomeAmount');

        const grossProfit = totalSales - totalPurchases;
        const netProfit = grossProfit + totalIndirectIncomes - totalIndirectExpenses;

        const formatted = [
          { Head: 'Total Purchases', Amount: totalPurchases.toFixed(2) },
          { Head: 'Total Sales', Amount: totalSales.toFixed(2) },
          { Head: 'Gross Profit/Loss', Amount: grossProfit.toFixed(2) },
          { Head: 'Indirect Incomes', Amount: totalIndirectIncomes.toFixed(2) },
          { Head: 'Indirect Expenses', Amount: totalIndirectExpenses.toFixed(2) },
          { Head: 'Net Profit/Loss', Amount: netProfit.toFixed(2) },
        ];

        setProfitLoss(formatted);
      } catch (error) {
        console.error("Failed to fetch Profit & Loss", error);
      }
    };

    fetchProfitLoss();
  }, [fromDate, toDate, selectedReport]);

  if (!profitLoss || profitLoss.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h4 className="text-xl font-semibold mb-4">Profit & Loss</h4>

        <div className="overflow-x-auto max-h-60 border border-gray-300 rounded-lg">
          <table className="min-w-full border">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                {Object.keys(profitLoss[0]).map((key, index) => (
                  <th key={index} className="p-2 text-left border">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {profitLoss.map((row, index) => (
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
            onClick={() => handleDownload(profitLoss)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;
