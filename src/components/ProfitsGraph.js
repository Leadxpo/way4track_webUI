// import React from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   ResponsiveContainer,
//   CartesianGrid,
// } from 'recharts';

// const ProfitsGraph = ({ branchData, index }) => {
//   const averageProfit = () => {
//     return (
//       branchData.data.reduce((acc, item) => acc + Number(item.profitorLoss), 0) /
//       branchData.data.length
//     ).toFixed(2);
//   };
//   console.log(branchData, averageProfit(), "++++===========")

//   return (
//     <div className="bg-white rounded-xl shadow-lg w-full transition-transform duration-300 transform hover:-translate-y-1 mt-6 gap-4">
//       {/* Graph Section */}
//       <div
//         className="rounded-xl flex justify-center items-center"
//         style={{ background: branchData.background }}
//       >
//         <ResponsiveContainer width="100%" height={220} className="mt-2 mr-4">
//           <LineChart data={branchData.data}>
//             <CartesianGrid
//               strokeDasharray="3 3"
//               stroke="white"
//               horizontal={true}
//               vertical={false}
//             />
//             <XAxis
//               dataKey="month"
//               hide={false}
//               axisLine={true}
//               tickLine={false}
//               stroke="white"
//             />
//             <YAxis
//               hide={false}
//               axisLine={true}
//               tickLine={false}
//               stroke="white"
//             />
//             <Line
//               type="monotone"
//               dataKey="profitorLoss"
//               stroke="white"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Location and Profit Section */}
//       <div className="text-left m-4">
//         <h3 className="text-lg font-semibold">{branchData.branch}</h3>
//         <p className="text-gray-500">profitorLoss - {averageProfit()}%</p>
//       </div>
//     </div>
//   );
// };

// export default ProfitsGraph;
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
  console.log(branchData);
  // Calculate average profit safely
  const averageProfit = () => {
    if (!branchData?.data?.length) return '0.00'; // Handle empty data safely

    return (
      branchData.data.reduce(
        (acc, item) => acc + Number(item.profitorLoss),
        0
      ) / branchData.data.length
    ).toFixed(2);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg w-full transition-transform duration-300 transform hover:-translate-y-1 mt-6 gap-4 p-4">
      {/* Graph Section with Scroll */}
      <div
        className="rounded-xl flex justify-center items-center p-2"
        style={{ background: branchData.background }}
      >
        <div className="overflow-x-auto w-full">
          <ResponsiveContainer width={branchData.data.length * 60} height={220}>
            <LineChart data={branchData.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="white" />
              <XAxis
                dataKey="month"
                tick={{ fill: 'white', fontSize: 12 }}
                axisLine={{ stroke: 'white' }}
                tickLine={false}
                angle={-45} // Rotates month labels
                dy={10} // Adjusts label position
              />
              <YAxis
                tick={{ fill: 'white', fontSize: 12 }}
                axisLine={{ stroke: 'white' }}
                tickFormatter={(value) => `${value}%`} // Adds % to Y-axis values
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  color: 'white',
                }}
                formatter={(value) => [`${value}%`, 'Profit/Loss']} // Shows profit/loss % in tooltip
              />
              <Line
                type="monotone"
                dataKey="profitorLoss"
                stroke="white"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Location and Profit Section */}
      <div className="text-left mt-4">
        <h3 className="text-lg font-semibold">{branchData.branch}</h3>
        <p className="text-gray-500">Average Profit/Loss: {averageProfit()}%</p>
      </div>
    </div>
  );
};

export default ProfitsGraph;
