
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const ProfitsGraph = ({ branchData }) => {
  const averageProfit = () => {
    if (!branchData?.data?.length) return '0.00';
    return (
      branchData.data.reduce(
        (acc, item) => acc + Number(item.salesAmount),
        0
      ) / branchData.data.length
    ).toFixed(2); 
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transform transition-all duration-300 w-[340px] min-w-[320px] max-w-[600px] p-4">
      {/* Chart with Gradient Background */}
      <div
        className="rounded-xl p-4"
        style={{
          background: branchData.background,
        }}
      >
        <div className="overflow-x-auto">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={branchData.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
              <XAxis
                dataKey="month"
                tick={{ fill: '#fff', fontSize: 12 }}
                axisLine={{ stroke: 'white' }}
                tickLine={false}
                angle={-35}
                dy={10}
              />
              <YAxis
                tick={{ fill: '#fff', fontSize: 12 }}
                axisLine={{ stroke: 'white' }}
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  borderRadius: '8px',
                  border: 'none',
                }}
                labelStyle={{ color: 'white' }}
                itemStyle={{ color: 'white' }}
                formatter={(value) => [`${value}%`, 'Profit/Loss']}
              />
              <Line
                type="monotone"
                dataKey="profitorLoss"
                stroke="#ffffff"
                strokeWidth={3}
                dot={{ r: 4, stroke: '#fff', strokeWidth: 2, fill: '#ffffff' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Info Below Graph */}
      <div className="mt-4 px-2">
        <h3 className="text-lg font-bold text-gray-800">{branchData.branch}</h3>
        <p className="text-sm text-gray-500">
          Average Profit/Loss:{' '}
          <span
            className={
              Number(averageProfit()) >= 0
                ? 'text-green-600 font-semibold'
                : 'text-red-600 font-semibold'
            }
          >
            {averageProfit()}%
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProfitsGraph;
