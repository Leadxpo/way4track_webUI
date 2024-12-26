import React, { useState } from 'react';
import payrollData from '../../mockData/mockPayroll.json';
import Table from '../../components/Table';

const Payroll = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedRow, setSelectedRow] = useState(null); // State to track the selected row for the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const filteredData =
    activeTab === 'All'
      ? payrollData
      : payrollData.filter((row) => row.branchName === activeTab);

  const columns = Object.keys(payrollData[0]);
  const branches = [
    'All',
    'Visakhapatnam',
    'Hyderabad',
    'Vijayawada',
    'Kakinada',
  ];

  const handleChangePayroll = (row) => {
    setSelectedRow(row); // Set the selected row details
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
    setSelectedRow(null); // Reset the selected row
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4 mb-4 border-b">
        {branches.map((branch) => (
          <button
            key={branch}
            onClick={() => setActiveTab(branch)}
            className={`pb-2 text-sm font-semibold ${
              activeTab === branch
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500'
            }`}
          >
            {branch}
          </button>
        ))}
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={filteredData}
        onEdit={handleChangePayroll}
        onDetails={() => {}}
        showDelete={false}
      />

      {/* Popup Modal */}
      {isPopupOpen && selectedRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-[90%] max-w-lg shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>

            {/* Popup Content */}
            <h2 className="text-xl font-bold text-center mb-6 text-green-600">
              Pay Roll
            </h2>
            <div className="flex justify-center mb-6">
              <img
                className="rounded-full h-28 w-28 object-cover shadow-lg"
                src="https://via.placeholder.com/150" // Replace with actual image source if available
                alt="Profile"
              />
            </div>
            <div className="space-y-2">
              <p>
                <strong>Client Name:</strong> {selectedRow.clientName}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedRow.phoneNumber}
              </p>
              <p>
                <strong>Email:</strong> {selectedRow.email}
              </p>
              <p>
                <strong>Client Branch:</strong> {selectedRow.branchName}
              </p>
              <p>
                <strong>Date of Birth:</strong> {selectedRow.dob}
              </p>
              <p>
                <strong>Address:</strong> {selectedRow.address}
              </p>
            </div>

            {/* Input Field */}
            <div className="mt-6">
              <label className="block text-green-600 font-bold mb-2">
                Pay Roll
              </label>
              <input
                type="text"
                placeholder="Enter Pay Roll"
                className="w-full border border-green-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Submit Button */}
            <button className="w-full bg-green-600 text-white py-2 mt-6 rounded-md hover:bg-green-700">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
