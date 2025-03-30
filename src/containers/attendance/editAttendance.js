import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';

const EditAttendance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const attendanceDetails = location.state?.attendanceDetails || {};

  const [formData, setFormData] = useState({
    id: attendanceDetails.id || null,
    staffId: attendanceDetails.staffId || '',
    day: attendanceDetails.day || '',
    branchName: attendanceDetails.branchName || '',
    inTime: attendanceDetails.inTime || '',
    outTime: attendanceDetails.outTime || '',
    inTimeRemark: attendanceDetails.inTimeRemark || '',
    staffName: attendanceDetails.staffName || '',
    outTimeRemark: attendanceDetails.outTimeRemark || '',
    status: attendanceDetails.status || '',
    remarks: attendanceDetails.remarks || '',
  });

  useEffect(() => {
    if (attendanceDetails) {
      setFormData({
        ...attendanceDetails,
        day: attendanceDetails.day ? formatDate(attendanceDetails.day) : '',
      });
    }
  }, [attendanceDetails]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      day: formatDate(formData.day), // Ensure date is properly formatted before sending
    };

    try {
      const response = await ApiService.post('/attendance/updateAttendanceDetails', updatedFormData);

      if (response.status) {
        alert('Attendance updated successfully!');
        navigate('/attendance');
      } else {
        alert('Failed to update attendance. Please try again.');
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('Failed to update attendance. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Staff Attendance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block font-semibold capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type="text"
              name={key}
              value={formData[key] || ''}
              onChange={handleChange}
              placeholder="Enter"
              className="w-full p-2 mt-1 border rounded-lg bg-gray-200"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditAttendance;
