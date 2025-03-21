
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';

const Attendance = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const employeeData = location.state?.staffDetails || {};
  const branchData = location.state?.branchDetails || {};

  const [profiles, setProfiles] = useState([]);
  const [staffId, setStaffId] = useState(employeeData.staffId || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [branchName, setBranchName] = useState(branchData.branchName || '');

  const fetchAttendanceDetails = async () => {
    try {
      const response = await ApiService.post('/attendance/getStaffAttendance', {
        staffId,
        companyCode: initialAuthState.companyCode,
        date,
        branchName,
        unitCode: initialAuthState.unitCode,
      });

      if (response?.status && Array.isArray(response.data)) {
        setProfiles(response.data); // Update with new data
      } else {
        setProfiles([]); // Reset to empty array if no data found
      }
    } catch (error) {
      console.error('Error fetching attendance details:', error);
      setProfiles([]); // Reset state in case of error
      alert('Failed to fetch attendance details.');
    }
  };


  useEffect(() => {
    fetchAttendanceDetails();
  }, [date]);

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition h-10"
          onClick={() => navigate('/attendance-upload')}
        >
          Bulk Upload Update
        </button>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-center mb-4">Search Attendance Records</h2>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            placeholder="Staff ID"
            className="w-full px-2 h-10 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-2 h-10 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            placeholder="Branch Name"
            className="w-full px-2 h-10 border border-gray-300 rounded-md"
          />
          <button
            onClick={fetchAttendanceDetails}
            className="bg-green-600 text-white font-semibold rounded-md w-full hover:bg-green-700 h-10"
          >
            Search
          </button>
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Staff ID</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Branch</th>
            <th className="border p-2">In Time</th>
            <th className="border p-2">Out Time</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Staff Name</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>

          {profiles.map((att) => (
            <tr key={att.id} className="text-center">
              <td className="border p-2">{att.staffId}</td>
              <td className="border p-2">{new Date(att.day).toLocaleDateString()}</td>
              <td className="border p-2">{att.branchName}</td>
              <td className="border p-2">{att.inTimeRemark}</td>
              <td className="border p-2">{att.outTimeRemark}</td>
              <td className="border p-2">{att.status}</td>
              <td className="border p-2">{att.staffName.trim()}</td>
              <td className="border p-2">
                  {/* <button
                    onClick={() => navigate('/attendance-details', { state: { attendanceDetails: att } })}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                  >
                    More Details
                  </button> */}
                  <button
                    onClick={() => navigate('/attendance-edi', { state: { attendanceDetails: att } })}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit Details
                  </button>
                </td>
              </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Attendance;