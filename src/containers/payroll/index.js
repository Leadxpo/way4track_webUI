import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const Payroll = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [payrollData, setPayrollData] = useState([]);
  const [branches, setBranches] = useState([{ branchName: 'All' }]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fetch payroll data
  const fetchPayrollData = async (branchName = 'All') => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      if (branchName !== 'All') {
        payload.branch = branchName; // Ensure correct key is sent
      }


      const res = await ApiService.post('/dashboards/payRoll', payload);
      if (res.status) {
        setPayrollData(res.data);

        if (branchName === 'All') {
          // const branchOptions = [
          //   { branchName: 'All' },
          //   ...res.data.map((branch) => ({
          //     branchName: branch.branch, // Ensure branch list uses the correct key
          //   })),
          // ];
          const uniqueBranches = Array.from(new Set(res.data.map((b) => b.branch))).map((branch) => ({
            branchName: branch,
          }));
          setBranches([{ branchName: 'All' }, ...uniqueBranches]);
          // setBranches(branchOptions);
        }
      } else {
        setPayrollData([]);
        if (branchName === 'All') setBranches([{ branchName: 'All' }]);
      }
    } catch (err) {
      console.error('Failed to fetch payroll data:', err);
      setPayrollData([]);
    }
  };


  // Fetch data on initial render
  useEffect(() => {
    fetchPayrollData();
  }, []);

  useEffect(() => {
    fetchPayrollData(activeTab);
  }, [activeTab]);


  // Fetch data when selected branch changes
  useEffect(() => {
    fetchPayrollData(selectedBranch);
  }, [selectedBranch]);

  // Columns for the table
  const columns = payrollData.length
    ? Object.keys(payrollData[0]).map((key, index) => ({
      title: key,
      dataIndex: index,
    }))
    : [];

  // Handle tab click
  const handleTabClick = (branch) => {
    setActiveTab(branch);
    setSelectedBranch(branch);
    fetchPayrollData(branch);  // Immediately fetch new data when a tab is clicked
  };



  // Handle row edit
  const handleChangePayroll = (row) => {
    setSelectedRow(row);
    setIsPopupOpen(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedRow(null);
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex space-x-4 mb-4 border-b">
        {branches.map((branch) => (
          <button
            key={branch.branchName} // Use branchName as the key
            onClick={() => handleTabClick(branch.branchName)} // Set active tab and branch
            className={`pb-2 text-sm font-semibold ${activeTab === branch.branchName
              ? 'border-b-2 border-black text-black'
              : 'text-gray-500'
              }`}
          >
            {branch.branchName}
          </button>
        ))}
      </div>

      {/* Table */}
      <Table
        columns={payrollData.length > 0 ? Object.keys(payrollData[0]) : []}
        data={payrollData.filter(
          (row) => activeTab === 'All' || row.branch === activeTab
        )}
        onEdit={handleChangePayroll}
        onDetails={() => { }}
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
              Payroll Details
            </h2>
            <div className="flex justify-center mb-6">
              <img
                className="rounded-full h-28 w-28 object-cover shadow-lg"
                src={selectedRow.staffPhoto || "/default-profile.png"}
                alt={selectedRow.staffName}
              />

            </div>
            <div className="space-y-2">
              <p>
                <strong>Staff ID:</strong> {selectedRow.staffId}
              </p>
              <p>
                <strong>Staff Name:</strong> {selectedRow.staffName}
              </p>
              <p>
                <strong>Branch:</strong> {selectedRow.branch}
              </p>
              <p>
                <strong>In-Company Experience:</strong> {selectedRow.inExperience} years
              </p>
              <p>
                <strong>Overall Experience:</strong> {selectedRow.overallExperience} years
              </p>
              <p>
                <strong>Basic Salary:</strong> ${selectedRow.basicSalary}
              </p>
            </div>

            {/* Input Field */}
            <div className="mt-6">
              <label className="block text-green-600 font-bold mb-2">
                Enter New Payroll Amount
              </label>
              <input
                type="text"
                placeholder="Enter Payroll Amount"
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
