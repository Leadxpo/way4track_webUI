import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ApiService from '../services/ApiService';
import { initialAuthState } from '../services/ApiService';

const AnalysisCardBarChart = ({ togglePopup, creditDebitPercent }) => {
  const [chartData, setChartData] = useState([]);
  const [credits, setCredits] = useState([]);
  const [debits, setDebits] = useState([]);

  const getAnalysis = async () => {
    try {
      const date = new Date();
      // const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(
      //   date.getMonth() + 1
      // ).padStart(2, '0')}/${date.getFullYear()}`;
      const formattedDate = date.getFullYear();
      const response = await ApiService.post(
        '/dashboards/getMonthWiseBalance',
        {
          date: formattedDate,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      if (response.status) {
        // const fetchedData = {
        //   status: true,
        //   errorCode: 200,
        //   internalMessage: 'Data retrieved successfully',
        //   data: [
        //     {
        //       year: 2025,
        //       month: 1,
        //       monthName: 'January',
        //       creditAmount: 280500,
        //       debitAmount: 0,
        //       balanceAmount: 280500,
        //     },
        //     {
        //       year: 2025,
        //       month: 2,
        //       monthName: 'February',
        //       creditAmount: 14000,
        //       debitAmount: 0,
        //       balanceAmount: 14000,
        //     },
        //   ],
        // };
        const fetchedData = response.data;
        // Format data for the chart
        const formattedChartData = fetchedData.data.map((item) => ({
          name: item.monthName,
          balance: item.balanceAmount, // Using balanceAmount for the chart
        }));

        setChartData(formattedChartData);

        // Compute total credits & debits
        const totalCreditAmount = fetchedData.data.reduce(
          (sum, item) => sum + item.creditAmount,
          0
        );
        const totalDebitAmount = fetchedData.data.reduce(
          (sum, item) => sum + item.debitAmount,
          0
        );

        setCredits([
          {
            label: 'Products',
            percentage:
              ((fetchedData.data[0]?.creditAmount || 0) / totalCreditAmount) *
              100,
          },
          {
            label: 'Sales',
            percentage:
              ((fetchedData.data[1]?.creditAmount || 0) / totalCreditAmount) *
              100,
          },
          {
            label: 'Services',
            percentage:
              ((fetchedData.data[2]?.creditAmount || 0) / totalCreditAmount) *
              100,
          },
        ]);

        setDebits([
          {
            label: 'Salaries',
            percentage:
              ((fetchedData.data[0]?.debitAmount || 0) / totalDebitAmount) *
              100,
          },
          {
            label: 'Expenses',
            percentage:
              ((fetchedData.data[1]?.debitAmount || 0) / totalDebitAmount) *
              100,
          },
        ]);
      } else {
        alert(response.data.message || 'Failed to fetch analysis details.');
      }
    } catch (e) {
      console.error('Error in fetching analysis details:', e);
    }
  };

  useEffect(() => {
    getAnalysis();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-black mb-4">
        Analysis For All Branches
      </h2>

      {/* Chart Section */}
      <div className="bg-gradient-to-r from-lime-300 to-lime-400 rounded-lg p-4 shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="white"
              horizontal
              vertical={false}
            />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#fff"
              strokeWidth={4}
              dot={{ fill: '#fff', r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Credit and Debit Section */}
      <div className="flex justify-around mt-8">
        {/* Credits */}
        <div className="text-center">
          <h3 className="text-green-600 font-semibold text-xl">
            No. of Credits
          </h3>
          <ul className="text-gray-700 text-lg mt-2">
            {credits.map((credit, index) => (
              <li key={index}>
                {index + 1}. {credit.label}: {credit.percentage.toFixed(2)}%
              </li>
            ))}
          </ul>
          <button
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded-full"
            onClick={togglePopup}
          >
            For More
          </button>
        </div>

        {/* Debits */}
        <div className="text-center">
          <h3 className="text-red-600 font-semibold text-xl">No. of Debits</h3>
          <ul className="text-gray-700 text-lg mt-2">
            {debits.map((debit, index) => (
              <li key={index}>
                {index + 1}. {debit.label}: {debit.percentage.toFixed(2)}%
              </li>
            ))}
          </ul>
          <button
            className="bg-red-600 text-white px-4 py-2 mt-4 rounded-full"
            onClick={togglePopup}
          >
            For More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisCardBarChart;
