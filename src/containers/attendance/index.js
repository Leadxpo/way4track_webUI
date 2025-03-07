import React from 'react';
import Table from '../../components/Table';
import { useNavigate } from 'react-router';
const Attendance = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mb-6">
        {/* Top Section - Bulk Upload Button */}
        <div className="flex justify-end mb-4">
          <button
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition h-10"
            onClick={() => navigate('/attendance-upload')}
          >
            Bulk Upload Update
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Staff ID"
            className="w-full px-2 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Slat Month / Year"
            className="w-full px-2 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Branch Dropdown */}
          <div className="relative w-full col-span-2 md:col-span-1">
            <select className="w-full p-2 h-10 border border-gray-300 rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Select Branch</option>
              <option>Branch 1</option>
              <option>Branch 2</option>
            </select>
          </div>

          <button className="bg-green-600 text-white font-semibold rounded-md w-full col-span-2 md:col-span-1 hover:bg-green-700 transition h-10">
            Search
          </button>
        </div>
      </div>
      <Table data={[]} columns={[]} />
    </div>
  );
};

export default Attendance;
