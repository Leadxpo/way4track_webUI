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

const monthNames = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AnalysisCardBarChart = ({ togglePopup, creditDebitPercent }) => {
  const [chartData, setChartData] = useState([]);
  const [credits, setCredits] = useState([]);
  const [debits, setDebits] = useState([]);

  const getAnalysis = async () => {
    try {
      const date = new Date().getFullYear();
      const response = await ApiService.post(
        '/dashboards/getOverAllYearlySales',
        {
          date,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      if (response.status) {
        const fetchedData = response.data;

        console.log("88888888888>", fetchedData);

        // Format data for the chart
        const formattedChartData = fetchedData.map((item) => ({
          name: monthNames[item.month],
          balance: item.TotalSalesAmount || 0,
        }));

        setChartData(formattedChartData);

        // Since credit/debit not in response, we just show static placeholders
        setCredits([
          {
            label: 'Total Sales',
            percentage: 100,
          },
        ]);

        setDebits([
          {
            label: 'Expenses (N/A)',
            percentage: 0,
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
