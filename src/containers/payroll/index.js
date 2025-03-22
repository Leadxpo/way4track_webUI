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

   // Define the column order explicitly
//    {
//     "ESIC_Employee": "0.00",
//     "ESIC_Employer": "0.00",
//     "PF_Employee": "0.00",
//     "PF_Employer1": "0.00",
//     "PF_Employer2": "0.00",
//     "extraHalfSalary": "0.00",
//     "daysOutLate6HoursOrMore": 0,
//     "carryForwardLeaves": 0,
//     "professionalTax": "0.00",
//     "": "0.00",
//     "": "0.00",
//     "leaveEncashment": "0.00",
//     "plBikeNeedToPay": "0",
//     "plBikeAmount": "0.00"
// }
   const columnOrder = [
    "staffId", "staffName", "designation","branch", "year", "month", "monthDays", 
    "presentDays", "leaveDays", "actualSalary", "perDaySalary", "perHourSalary", 
    "totalOTHours", "OTAmount", "incentives","foodAllowance","lateDays", "totalEarlyMinutes",
     "totalLateMinutes","lateDeductions", "grossSalary", "netSalary", "salaryStatus"
];
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

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4 whitespace-nowrap scrollbar-hide">
        <div className='className="overflow-hidden"'>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white text-left">
              {payrollData.length > 0 &&
                columnOrder.map((key) => (
                  <th key={key} className="px-4 py-3 border capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </th>
                ))}
              <th className="px-4 py-3 border">Action</th>
            <tr className="bg-gray-200 text-gray-700">
              {payrollData.length > 0 && Object.keys(payrollData[0] || {}).map(key => (
                <th key={key} className="px-4 py-2 border">{key.replace(/([A-Z])/g, ' $1').trim()}</th>
              ))}
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.length > 0 ? (
              payrollData.map((row, rowIndex) => (
                <tr
                  key={rowIndex} 
                  className={`border ${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                >
                  {columnOrder.map((value, colIndex) => (
                    <td style={{textWrap:'wrap'}} key={colIndex} className="px-4 py-2 border text-center">
                      {row[value] ?? "N/A"}
                    </td>
                  ))}
<<<<<<< HEAD
                  <td className="ppx-4 py-2 border sticky left-0 bg-white shadow-md text-center">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      onClick={() => navigate("/payroll-details", { state: { paySlipDetails: row } })}
                    >
                      View
                    </button>
                  </td>
                  <td><p className='btn' onClick={() => navigate('/edit-payroll', { state: { paySlipDetails: row } })}>View</p></td>
                  <td><p className='btn-primary' onClick={() => navigate('/payroll-details', { state: { paySlipDetails: row } })}>View</p></td>
>>>>>>> 438015db570e427bd60cc210e30a718ddb13669b
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={Object.keys(payrollData[0] || {}).length + 1} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
