import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { formatString } from '../../common/commonUtils';
import { useLocation, useNavigate } from 'react-router';

const Payroll = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [payrollData, setPayrollData] = useState([]);
  const [branches, setBranches] = useState([{ branchName: 'All' }]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]
  );
  const location = useLocation();
  const navigate = useNavigate();
  const fetchPayrollData = async (branchName = "All") => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        date: selectedDate,
      };

      if (branchName !== "All") {
        payload.branch = branchName;
      }

      const res = await ApiService.post("/dashboards/payRoll", payload);
      if (res.status) {

        console.log("Formatted Payroll Data:", res.data);

        setPayrollData(res.data);
        if (branchName === "All") {
          const uniqueBranches = Array.from(
            new Set(res.data.map((b) => b.branch).filter(Boolean)) // Filter out null values
          ).map((branch) => ({
            branchName: branch,
          }));
          setBranches([{ branchName: "All" }, ...uniqueBranches]);
        }
      } else {
        setPayrollData([]);
        if (branchName === "All") setBranches([{ branchName: "All" }]);
      }
    } catch (err) {
      console.error("Failed to fetch payroll data:", err);
      setPayrollData([]);
    }
  };

  useEffect(() => {
    fetchPayrollData(selectedBranch);
  }, [selectedBranch, selectedDate]);


  useEffect(() => {
    fetchPayrollData();
  }, []);
  // Columns for the table
  const columns = payrollData.length
    ? Object.keys(payrollData[0]).map((key, index) => ({
      title: typeof key === "string" ? formatString(key) : key,  // Ensure key is a string
      dataIndex: key, // Use key instead of index for proper column mapping
    }))
    : [];
  useEffect(() => {
    fetchPayrollData(activeTab);
  }, [activeTab]);

  const payrollItem = {
    staffId: "EMP123",
    staffName: "John Doe",
    designation: "Software Engineer",
    staffPhoto: "https://via.placeholder.com/100",
    branch: "Mumbai",
    salaryStatus: "Paid",
    monthDays: 30,
    presentDays: 28,
    leaveDays: 2,
    actualSalary: 50000,
    perDaySalary: 1666.67,
    perHourSalary: 185.19,
    totalOTHours: 10,
    OTAmount: 1851.85,
    lateDeductions: 500,
    grossSalary: 52000,
    netSalary: 50500,
  };
  
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
  const handleDownloadClick = () => {
    fetchPayrollData(selectedBranch, selectedDate);
  };
  return (
    <div>
      {/* <p className='btn-primary' onClick={()=>navigate('/payroll-details', { state: { paySlipDetails: payrollItem } })}>View</p> */}
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
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={handleDownloadClick}
        >
          Search
        </button>
      </div>

      {/* Table */}

      <div className="overflow-x-auto mt-4 mb-6">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              {payrollData.length > 0 && Object.keys(payrollData[0] || {}).map(key => (
                <th key={key} className="px-4 py-2 border">{key.replace(/([A-Z])/g, ' $1').trim()}</th>
              ))}
              <th  className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.length > 0 ? (
              payrollData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border">
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex} className="px-4 py-2 border">{value ?? 'N/A'}</td>
                  ))}
                  <td><p className='btn-primary' onClick={()=>navigate('/payroll-details', { state: { paySlipDetails: row } })}>View</p></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={Object.keys(payrollData[0] || {}).length} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payroll;
