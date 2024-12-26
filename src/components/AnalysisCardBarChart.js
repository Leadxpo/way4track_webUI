import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', value: -10 },
  { name: 'Feb', value: 20 },
  { name: 'Mar', value: 50 },
  { name: 'Apr', value: 40 },
  { name: 'May', value: 30 },
  { name: 'Jun', value: 60 },
  { name: 'Jul', value: 70 },
  { name: 'Aug', value: 50 },
  { name: 'Sep', value: 40 },
  { name: 'Oct', value: 60 },
  { name: 'Nov', value: 80 },
  { name: 'Dec', value: 90 },
];

const AnalysisCardBarChart = ({ togglePopup }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-black mb-4">
        Analysis For All Branches
      </h2>

      {/* Chart Section */}
      <div className="bg-gradient-to-r from-lime-300 to-lime-400 rounded-lg p-4 shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="white"
              horizontal={true}
              vertical={false}
            />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#fff"
              strokeWidth={4}
              dot={{ fill: '#fff', r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Credit and Debit Section */}
      <div className="flex justify-around mt-8">
        {/* No. of Credits */}
        <div className="text-center">
          <h3 className="text-green-600 font-semibold text-xl">
            No. of Credits
          </h3>
          <ul className="text-gray-700 text-lg mt-2">
            <li>1. Products: 40%</li>
            <li>2. Sales: 30%</li>
            <li>3. Serves: 5%</li>
          </ul>
          <button
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded-full"
            onClick={togglePopup}
          >
            For More
          </button>
        </div>

        {/* No. of Debits */}
        <div className="text-center">
          <h3 className="text-red-600 font-semibold text-xl">No. of Debits</h3>
          <ul className="text-gray-700 text-lg mt-2">
            <li>1. Salaries: 10%</li>
            <li>2. Expenses: 10%</li>
            <li>3. Vouchers: 5%</li>
          </ul>
          <button className="bg-red-600 text-white px-4 py-2 mt-4 rounded-full">
            For More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisCardBarChart;
