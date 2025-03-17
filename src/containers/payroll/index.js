import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { formatString } from '../../common/commonUtils';


const Payroll = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [payrollData, setPayrollData] = useState([]);
  const [branches, setBranches] = useState([{ branchName: 'All' }]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]
  );

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

        // if (branchName === "All") {
        //   const uniqueBranches = Array.from(
        //     new Set(res.data.map((b) => b.branch))
        //   ).map((branch) => ({
        //     branchName: branch,
        //   }));
        //   setBranches([{ branchName: "All" }, ...uniqueBranches]);
        // }
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

  // const columns = [
  //   { title: "Staff ID", dataIndex: "staffId", key: "staffId" },
  //   { title: "Staff Name", dataIndex: "staffName", key: "staffName" },
  //   { title: "Branch", dataIndex: "branch", key: "branch", render: (val) => val ?? "N/A" },
  //   { title: "Designation", dataIndex: "designation", key: "designation" },
  //   { title: "Year", dataIndex: "year", key: "year", render: (val) => val ?? "N/A" },
  //   { title: "Month", dataIndex: "month", key: "month", render: (val) => val ?? "N/A" },
  //   { title: "Month Days", dataIndex: "monthDays", key: "monthDays" },
  //   { title: "Present Days", dataIndex: "presentDays", key: "presentDays" },
  //   { title: "Leave Days", dataIndex: "leaveDays", key: "leaveDays" },
  //   { title: "Actual Salary", dataIndex: "actualSalary", key: "actualSalary" },
  //   { title: "Total Early Minutes", dataIndex: "totalEarlyMinutes", key: "totalEarlyMinutes" },
  //   { title: "Total Late Minutes", dataIndex: "totalLateMinutes", key: "totalLateMinutes" },
  //   { title: "Late Days", dataIndex: "lateDays", key: "lateDays" },
  //   { title: "Per Day Salary", dataIndex: "perDaySalary", key: "perDaySalary", render: (val) => val ?? "N/A" },
  //   { title: "Per Hour Salary", dataIndex: "perHourSalary", key: "perHourSalary", render: (val) => val ?? "N/A" },
  //   { title: "Total OT Hours", dataIndex: "totalOTHours", key: "totalOTHours" },
  //   { title: "OT Amount", dataIndex: "OTAmount", key: "OTAmount", render: (val) => val ?? "N/A" },
  //   { title: "Late Deductions", dataIndex: "lateDeductions", key: "lateDeductions", render: (val) => val ?? "N/A" },
  //   { title: "Gross Salary", dataIndex: "grossSalary", key: "grossSalary", render: (val) => val ?? "N/A" },
  //   { title: "ESIC Employee", dataIndex: "ESIC_Employee", key: "ESIC_Employee", render: (val) => val ?? "N/A" },
  //   { title: "ESIC Employer", dataIndex: "ESIC_Employer", key: "ESIC_Employer", render: (val) => val ?? "N/A" },
  //   { title: "PF Employee", dataIndex: "PF_Employee", key: "PF_Employee" },
  //   { title: "PF Employer 1", dataIndex: "PF_Employer1", key: "PF_Employer1" },
  //   { title: "PF Employer 2", dataIndex: "PF_Employer2", key: "PF_Employer2" },
  //   { title: "Extra Half Salary", dataIndex: "extraHalfSalary", key: "extraHalfSalary", render: (val) => val ?? "N/A" },
  //   { title: "Days Out Late (6+ hrs)", dataIndex: "daysOutLate6HoursOrMore", key: "daysOutLate6HoursOrMore" },
  //   { title: "Net Salary", dataIndex: "netSalary", key: "netSalary", render: (val) => val ?? "N/A" },
  //   { title: "Salary Status", dataIndex: "salaryStatus", key: "salaryStatus" },
  // ];

  // Fetch data on initial render
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
      <Table
        columns={columns}
        data={payrollData.filter(
          (row) => activeTab === 'All' || row.branch === activeTab
        )}
        onEdit={handleChangePayroll}
        onDetails={() => { }}
        showDelete={false}
      />


    </div>
  );
};

export default Payroll;
