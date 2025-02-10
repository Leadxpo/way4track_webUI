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
const Performance = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Performance</h1>
      <div className="mb-4">
        <input
          type="text"
          //value={staffId}
          //onChange={(e) => setStaffId(e.target.value)}
          placeholder="Enter Staff ID"
          className="border p-2 mr-2"
        />
        <button
          //onClick={handleSearch}
          className="bg-green-700 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>
      <div className="bg-gradient-to-r from-lime-300 to-lime-400 rounded-lg p-4 shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={[]}>
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
    </div>
  );
};

export default Performance;
