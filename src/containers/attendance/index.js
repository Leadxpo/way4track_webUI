import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';
import hasPermission from '../../common/permission'
import * as XLSX from "xlsx";
import { FaPlus, FaSearch, FaEllipsisV, FaFileDownload } from 'react-icons/fa';
const Attendance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  var permission = localStorage.getItem("userPermissions");
  const employeeData = location.state?.staffDetails || {};
  const branchData = location.state?.branchDetails || {};
  const [previewData, setPreviewData] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [staffId, setStaffId] = useState(employeeData.staffId || '');
  const [fromDate, setFromDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);

  const [branchName, setBranchName] = useState(branchData.branchName || '');

  const timeFormate = (decimalTime) => {
    // Check if it's a valid decimal number
    const num = parseFloat(decimalTime);
  
    // Only format if it's a number AND a valid fractional day (less than 1)
    if (!isNaN(num) && num > 0 && num < 1) {
      const totalSeconds = Math.round(num * 24 * 60 * 60);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  
    // Not a valid decimal time – return original input
    return decimalTime;
  };
  
  const fetchAttendanceDetails = async () => {
    try {
      const response = await ApiService.post('/attendance/getStaffAttendance', {
        staffId,
        companyCode: initialAuthState.companyCode,
        fromDate,
        toDate,
        branchName,
        unitCode: initialAuthState.unitCode,
      });

      if (response?.status && Array.isArray(response.data)) {
        const rrr=response.data?.map((item)=>({
          ...item,
          inTime: timeFormate(item.inTime),
          outTime: timeFormate(item.outTime),
          inTimeRemark: timeFormate(item.inTimeRemark),
          outTimeRemark: timeFormate(item.outTimeRemark)
        }
        ))
        setProfiles(rrr); // Update with new data
      } else {
        setProfiles([]); // Reset to empty array if no data found
      }
    } catch (error) {
      console.error('Error fetching attendance details:', error);
      setProfiles([]); // Reset state in case of error
      alert('Failed to fetch attendance details.');
    }
  };
  const handlePreview = () => {
    if (profiles.length === 0) {
      alert("No group data available to preview.");
      return;
    }
    setPreviewData(profiles);
    setIsPreviewOpen(true);
  };
  const handleDownload = () => {
    if (!previewData || previewData.length === 0) {
      alert("No data available to download.");
      return;
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(previewData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Group_Data");
      XLSX.writeFile(workbook, "Filtered_Groups.xlsx");

      setIsPreviewOpen(false);
    } catch (error) {
      console.error("Error generating Excel file:", error);
      alert("Failed to generate the Excel file. Please try again.");
    }
  };


  useEffect(() => {
    fetchAttendanceDetails();
  }, [fromDate, toDate]);

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
      <button
          onClick={handlePreview}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          <FaFileDownload className="mr-2" /> Download
        </button>
      {hasPermission(permission, "attendance", "add") &&
        <button
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition h-10"
          onClick={() => navigate('/attendance-upload')}
        >
          Bulk Upload Update
        </button>
}
      </div>
      <div className="mb-6 p-6 bg-white shadow-md rounded-xl border border-gray-200 w-full max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-center text-gray-900 mb-4">
          Search Attendance Records
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* From Date */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* To Date */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Staff ID */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              Employee ID
            </label>
            <input
              type="text"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              placeholder="Enter Employee ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
            />
          </div>

          {/* Branch Name */}
          <div className="flex flex-col">
            <label className="text-xs font-medium text-gray-700 mb-1">
              Branch Name
            </label>
            <input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Enter Branch Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center mt-6">
          {/* Search Button */}
          <button
            className="bg-blue-600 text-white text-sm font-medium px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            onClick={fetchAttendanceDetails} // Call function when button is clicked
          >
            Search
          </button>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Date</th>
            <th className="border p-2">Employee ID</th>
            <th className="border p-2">Employee Name</th>
            <th className="border p-2">Branch</th>
            
            <th className="border p-2">In Time</th>
            <th className="border p-2">Out Time</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {[...profiles]
            .sort((a, b) => String(a.day).localeCompare(String(b.day)))
            .map((att) => {
              return (
                <tr key={att.id} className="text-center">
                  <td className="border p-2">
                    {new Date(att.day).toLocaleDateString()}
                  </td>
                  <td className="border p-2">{att.staffId}</td>
                  <td className="border p-2">{att.staffName.trim()}</td>
                  <td className="border p-2">{att.branchName}</td>
                  
                  <td className="border p-2">{att.inTime}</td>
                  <td className="border p-2">{att.outTime}</td>
                  <td className="border p-2">{att.status}</td>
                  <td className="border p-2">
                  {hasPermission(permission, "attendance", "edit") &&
                   <button
                      onClick={() =>
                        navigate('/attendance-edit', {
                          state: { attendanceDetails: att },
                        })
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                     >
                      Edit Details
                    </button>
            }
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <h4 className="text-xl font-semibold mb-4">Preview Data</h4>
            <div className="overflow-x-auto max-h-60 border border-gray-300 rounded-lg">
              <table className="min-w-full border">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    {Object.keys(previewData[0]).map((key, index) => (
                      <th key={index} className="p-2 text-left border">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}>
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="p-2 border">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Download Excel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Attendance;
