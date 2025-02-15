// import React from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// const Performance = () => {
//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-4">Performance</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           //value={staffId}
//           //onChange={(e) => setStaffId(e.target.value)}
//           placeholder="Enter Staff ID"
//           className="border p-2 mr-2"
//         />
//         <button
//           //onClick={handleSearch}
//           className="bg-green-700 text-white p-2 rounded-md"
//         >
//           Search
//         </button>
//       </div>
//       <div className="bg-gradient-to-r from-lime-300 to-lime-400 rounded-lg p-4 shadow-md">
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={[]}>
//             <CartesianGrid
//               strokeDasharray="3 3"
//               stroke="white"
//               horizontal
//               vertical={false}
//             />
//             <XAxis dataKey="name" axisLine={false} tickLine={false} />
//             <YAxis axisLine={false} tickLine={false} />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="balance"
//               stroke="#fff"
//               strokeWidth={4}
//               dot={{ fill: '#fff', r: 6 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Performance;

import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import DatePicker from 'react-datepicker'; // Import DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Make sure to import the styles

const Performance = () => {
  const [staffId, setStaffId] = useState(''); // Default Staff ID
  const [selectedDate, setSelectedDate] = useState(new Date()); // Date picker state
  const [chartData, setChartData] = useState([]);

  // Define a state for loading status (optional)
  const [loading, setLoading] = useState(false);

  // Fetch the data when the search button is clicked
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await ApiService.post('/work-allocations/getMonthTotalWorkAllocation', {
        staffId,
        year: selectedDate.getFullYear(), // Extract year from selected date
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      if (response.data.status && response.data.data.length > 0) {
        // Format the data for the chart
        const formattedData = response.data.data.map((item) => ({
          month: item.month, // Get month
          totalSuccessAppointments: parseInt(item.totalSuccessAppointments), // Ensure it's a number
        }));
        setChartData(formattedData);
      } else {
        setChartData([]); // No data
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Performance</h1>
      <div className="mb-4">
        {/* Staff ID input */}
        <input
          type="text"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
          placeholder="Enter Staff ID"
          className="border p-2 mr-2"
        />

        {/* Date picker for selecting the date */}
        <div className="flex-grow mr-2">
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)} // Update selected date
            dateFormat="yyyy-MM-dd" // Format the selected date
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
          />
        </div>

        {/* Search button to trigger the fetch */}
        <button
          className="bg-green-700 text-white p-2 rounded-md"
          onClick={fetchData} // Trigger fetchData when button is clicked
          disabled={loading} // Optionally disable while loading
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {/* Line Chart Container */}
      <div className="bg-gradient-to-r from-lime-300 to-lime-400 rounded-lg p-4 shadow-md">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="white"
              horizontal
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              label={{ value: 'Month', position: 'bottom' }}
            />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="totalSuccessAppointments"
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


