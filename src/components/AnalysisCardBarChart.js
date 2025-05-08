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

const AnalysisCardBarChart = ({ togglePopup, date }) => {
  const [chartData, setChartData] = useState([]);
  const [currentDate, setCurrentDate] = useState(date);

  useEffect(() => {
    setCurrentDate(date);
  }, [date]);

  const getAnalysis = async () => {
    try {
      const response = await ApiService.post('/dashboards/getOverAllYearlySales', {
        date: currentDate,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      if (response.status) {
        const rawData = response.data;

        const formattedChartData = rawData.map((item) => ({
          name: monthNames[item.month] || `Month ${item.month}`,
          balance: item.TotalSalesAmount || 0,
        }));

        setChartData(formattedChartData);
      } else {
        console.warn('No data found');
        setChartData([]);
      }
    } catch (e) {
      console.error('Error in fetching analysis details:', e);
      setChartData([]);
    }
  };

  useEffect(() => {
    getAnalysis();
  }, [currentDate]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-black mb-4">
        Overall Yearly Sales Analysis
      </h2>

      <div className="bg-gradient-to-r from-lime-300 to-lime-400 rounded-lg p-4 shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="white" />
            <XAxis dataKey="name" stroke="#fff" tick={{ fill: '#fff' }} />
            <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
            <Tooltip
              formatter={(value) => [`${value.toFixed(2)} Rs`, 'Total Sales']}
              contentStyle={{ backgroundColor: '#333', color: '#fff', borderRadius: 8 }}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#fff"
              strokeWidth={3}
              dot={{ r: 4, fill: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Popup Trigger */}
      <div className="flex justify-center mt-6">
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
          onClick={togglePopup}
        >
          View Full Summary
        </button>
      </div>
    </div>
  );
};

export default AnalysisCardBarChart;
