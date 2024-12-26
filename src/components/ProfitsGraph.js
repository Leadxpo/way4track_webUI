import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const ProfitsGraph = ({ branchData, index }) => {
  const averageProfit = () => {
    return (
      branchData.data.reduce((acc, item) => acc + item.profit, 0) /
      branchData.data.length
    ).toFixed(2);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg w-full transition-transform duration-300 transform hover:-translate-y-1 mt-6 gap-4">
      {/* Graph Section */}
      <div
        className="rounded-xl flex justify-center items-center"
        style={{ background: branchData.background }}
      >
        <ResponsiveContainer width="100%" height={220} className="mt-2 mr-4">
          <LineChart data={branchData.data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="white"
              horizontal={true}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              hide={false}
              axisLine={true}
              tickLine={false}
              stroke="white"
            />
            <YAxis
              hide={false}
              axisLine={true}
              tickLine={false}
              stroke="white"
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="white"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Location and Profit Section */}
      <div className="text-left m-4">
        <h3 className="text-lg font-semibold">{branchData.branch}</h3>
        <p className="text-gray-500">Profit - {averageProfit()}%</p>
      </div>
    </div>
  );
};

export default ProfitsGraph;
