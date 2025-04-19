import React, { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import * as XLSX from 'xlsx'; // Import XLSX for file download

const TrailBalance = ({ fromDate, toDate, selectedReport, onClose }) => {
  const [trialBalance, setTrialBalance] = useState([]);

  const handleDownload = (data) => {
    if (!data || data.length === 0) {
      alert("No data available to download.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trial Balance");
    XLSX.writeFile(workbook, "Trial_Balance_Report.xlsx");
  };

  useEffect(() => {
    const fetchTrialBalance = async () => {
      try {
        const response = await ApiService.post('/dashboards/getTrialBalance', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          fromDate,
          toDate,
          branchName: selectedReport,
        });

        const {
          assets = [],
          liabilities = [],
          expenses = [],
          income = [],
          suspenseAccount = [],
        } = response.data || {};

        const sum = (arr, field) =>
          arr?.reduce((acc, cur) => acc + Number(cur[field] || 0), 0);

        const formatted = [
          {
            head: 'Assets',
            debit: sum(assets, 'debitAmount'),
            credit: sum(assets, 'creditAmount'),
          },
          {
            head: 'Liabilities',
            debit: sum(liabilities, 'debitAmount'),
            credit: sum(liabilities, 'creditAmount'),
          },
          {
            head: 'Expenses',
            debit: sum(expenses, 'debitAmount'),
            credit: sum(expenses, 'creditAmount'),
          },
          {
            head: 'Direct Incomes',
            debit: 0,
            credit: sum(
              income.filter((item) => item.groupName === 'direct_incomes'),
              'creditAmount'
            ),
          },
          {
            head: 'Suspense Account',
            debit: sum(suspenseAccount, 'debitAmount'),
            credit: sum(suspenseAccount, 'creditAmount'),
          },
        ];

        const totalDebit = formatted.reduce((acc, row) => acc + row.debit, 0);
        const totalCredit = formatted.reduce((acc, row) => acc + row.credit, 0);

        formatted.push({
          head: 'Total',
          debit: totalDebit,
          credit: totalCredit,
        });

        setTrialBalance(formatted);
      } catch (error) {
        console.error('Failed to fetch Trial Balance', error);
      }
    };

    fetchTrialBalance();
  }, [fromDate, toDate, selectedReport]);

  if (!trialBalance || trialBalance.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h4 className="text-xl font-semibold mb-4">Preview Data</h4>

        <div className="overflow-x-auto max-h-60 border border-gray-300 rounded-lg">
          <table className="min-w-full border">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                {Object.keys(trialBalance[0]).map((key, index) => (
                  <th key={index} className="p-2 text-left border">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trialBalance.map((row, index) => (
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
            onClick={() => handleDownload(trialBalance)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Download Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrailBalance;