import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { formatString } from '../../common/commonUtils';
import { useLocation, useNavigate } from 'react-router';

const Payrolls = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [payrollData, setPayrollData] = useState([]);
  const [branches, setBranches] = useState([{ branchName: 'All' }]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const location = useLocation();
  const navigate = useNavigate();

  const [staffIdFilter, setStaffIdFilter] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const fetchPayrollData = async (branchName = 'All') => {
    console.log('selected data : ', selectedDate);
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        month: selectedDate.split('-')[1],
        year: selectedDate.split('-')[0],
      };
      // const payload = {
      //   companyCode: initialAuthState.companyCode,
      //   unitCode: initialAuthState.unitCode,
      //   date: selectedDate,
      // };

      if (branchName !== 'All') {
        payload.branch = branchName;
      }
      // const res = await ApiService.post('/dashboards/payRoll', payload);
      const res = await ApiService.post('/PAYROLL/getPayRollDetails', payload);
      if (res.status) {
        console.log('Formatted Payroll Data:', res.data);

        setPayrollData(res.data);
        if (branchName === 'All') {
          const uniqueBranches = Array.from(
            new Set(res.data.map((b) => b.branch).filter(Boolean)) // Filter out null values
          ).map((branch) => ({
            branchName: branch,
          }));
          setBranches([{ branchName: 'All' }, ...uniqueBranches]);
        }
      } else {
        // setPayrollData([]);
        if (branchName === 'All') setBranches([{ branchName: 'All' }]);
      }
    } catch (err) {
      console.error('Failed to fetch payroll data:', err);
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
        title: typeof key === 'string' ? formatString(key) : key, // Ensure key is a string
        dataIndex: key, // Use key instead of index for proper column mapping
      }))
    : [];
  useEffect(() => {
    fetchPayrollData(activeTab);
  }, [activeTab]);

  const payrollItem = {
    staffId: 'EMP123',
    staffName: 'John Doe',
    designation: 'Software Engineer',
    staffPhoto: 'https://via.placeholder.com/100',
    branch: 'Mumbai',
    salaryStatus: 'Paid',
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
    fetchPayrollData(branch); // Immediately fetch new data when a tab is clicked
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
  const columnOrder = [
    'staffId',
    'staffName',
    'branch',
    'designation',
    'year',
    'monthDays',
    'presentDays',
    'month',
    'actualSalary',
    'leaveDays',
    'lateDays',
    'lateDeductions',
    'totalLateMinutes',
    'carryForwardLeaves',
    'leaveEncashment',
    'perDaySalary',
    'perHourSalary',
    'plBikeNeedToPay',
    'plBikeAmount',
    'totalEarlyMinutes',
    'totalOTHours',
    'OTAmount',
    'daysOutLate6HoursOrMore',
    'extraHalfSalary',
    'incentives',
    'foodAllowance',
    'ActualEarnedMonthlySalary',
    'grossSalary',
    'ESIC_Employee',
    'ESIC_Employer',
    'PF_Employee',
    'PF_Employer1',
    'PF_Employer2',
    'professionalTax',
    'netSalary',
    'Advance',
    'paybleAmount',
    'salaryStatus',
  ];

  const filteredData = payrollData.filter((row) => {
    const matchesBranch =
      selectedBranch === 'All' || row.branch === selectedBranch;
    const matchesStaffId = row.staffId
      ?.toLowerCase()
      .includes(staffIdFilter.toLowerCase());
    const matchesBranchFilter = row.branch
      ?.toLowerCase()
      .includes(branchFilter.toLowerCase());

    return matchesBranch && matchesStaffId && matchesBranchFilter;
  });

  return (
    <div>
      {/* <p className='btn-primary' onClick={()=>navigate('/payroll-details', { state: { paySlipDetails: payrollItem } })}>View</p> */}
      {/* Tabs */}
      <div className="flex space-x-4 mb-4 border-b">
        {branches.map((branch) => (
          <button
            key={branch.branchName} // Use branchName as the key
            onClick={() => handleTabClick(branch.branchName)} // Set active tab and branch
            className={`pb-2 text-sm font-semibold ${
              activeTab === branch.branchName
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
        <input
          type="text"
          placeholder="Filter by Staff ID"
          value={staffIdFilter}
          onChange={(e) => setStaffIdFilter(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Filter by Branch Name"
          value={branchFilter}
          onChange={(e) => setBranchFilter(e.target.value)}
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
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </th>
                  ))}
                <th className="px-4 py-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`border ${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                  >
                    {columnOrder.map((value, colIndex) => {
                      if (value === 'ActualEarnedMonthlySalary') {
                        row['ActualEarnedMonthlySalary'] =
                          parseInt(row['incentives']) +
                          parseInt(row['foodAllowance']) +
                          parseInt(row['OTAmount']) +
                          parseInt(
                            row['extraHalfSalary'] +
                              parseInt(row['plBikeAmount'])
                          );
                      }
                      return (
                        <td
                          style={{ textWrap: 'wrap' }}
                          key={colIndex}
                          className="px-4 py-2 border text-center"
                        >
                          {row[value] ?? 'N/A'}
                        </td>
                      );
                    })}
                    <td className="ppx-4 py-2 border sticky left-0 bg-white shadow-md text-center">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={() =>
                          navigate('/payroll-details', {
                            state: { paySlipDetails: row },
                          })
                        }
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={Object.keys(payrollData[0] || {}).length + 1}
                    className="text-center py-4"
                  >
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

export default Payrolls;
