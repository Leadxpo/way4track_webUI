import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';

const EditAttendance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const attendanceDetails = location.state?.attendanceDetails || {};

  const [formData, setFormData] = useState({
    staffName: attendanceDetails.staffName || '',
    // designation: attendanceDetails.designation || '',
    branchName: attendanceDetails.branchName || '',
    day: attendanceDetails.day || '',
    inTime: attendanceDetails.inTime || '',
    outTime: attendanceDetails.outTime || '',
    inTimeRemark: attendanceDetails.inTimeRemark || '',
    outTimeRemark: attendanceDetails.outTimeRemark || '',
    status: attendanceDetails.status || '',
    // remarks: attendanceDetails.remarks || '',
  });

  const [error, setError] = useState('');

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); 
  };

  const formatDateForBackend = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (attendanceDetails) {
      setFormData({
        ...attendanceDetails,
        day: attendanceDetails.day
          ? formatDateForInput(attendanceDetails.day)
          : '',
      });
    }
  }, [attendanceDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const updatedFormData = {
      ...formData,
      day: formatDateForBackend(formData.day),
    };

    try {
      const response = await ApiService.post(
        '/attendance/updateAttendanceDetails',
        updatedFormData
      );

      if (response.status) {
        alert('Attendance updated successfully!');
        navigate('/attendance');
      } else {
        setError('Failed to update attendance. Please try again.');
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
      setError('Failed to update attendance. Please try again.');
    }
  };

  const fieldLabels = {
    staffName: 'Name of the Employee',
    // designation: 'Designation',
    branchName: 'Branch Name',
    day: 'Date',
    inTime: 'In Time',
    outTime: 'Out Time',
    inTimeRemark: 'In Time Remarks',
    outTimeRemark: 'Out Time Remarks',
    status: 'Status',
    // remarks: 'Remarks',
  };

  const orderedFields = [
    'staffName',
    // 'designation',
    'branchName',
    'day',
    'inTime',
    'outTime',
    'inTimeRemark',
    'outTimeRemark',
    'status',
    // 'remarks',
  ];

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Employee Attendance</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {fieldLabels.map((key) => (
          <div key={key}>
            <label className="block font-semibold mb-1">
              {fieldLabels[key]}
            </label>
            <input
              type={key === 'day' ? 'datetime-local' : 'text'}
              name={key}
              value={formData[key] || ''}
              onChange={handleChange}
              disabled={['staffName', 'designation', 'branchName'].includes(
                key
              )}
              className="w-full p-2 border rounded-lg bg-gray-200 disabled:opacity-70"
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
