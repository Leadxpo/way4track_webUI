import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const UserDeleteRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    requestType: '',
    staffID: '',
    branchId: '',
    description: '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const payload = { ...formData };
      const response = await ApiService.post('/requests/handleRequestDetails', payload);
      if (response.data.status) {
        alert('Request created successfully!');
        navigate('/requests');
      } else {
        alert('Failed to create request. Please try again.');
      }
    } catch (error) {
      console.error('Error saving request:', error);
      alert('Failed to save request. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/requests');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        <h1 className="text-3xl font-bold mb-8">Add Request</h1>
        <div className="space-y-4">
          <div>
            <p className="font-semibold mb-1">Request Type</p>
            <input
              type="text"
              name="requestType"
              value={formData.requestType}
              onChange={handleInputChange}
              placeholder="Enter Request Type"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Staff ID</p>
            <input
              type="text"
              name="staffID"
              value={formData.staffID}
              onChange={handleInputChange}
              placeholder="Enter Staff ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Branch ID</p>
            <input
              type="text"
              name="branchId"
              value={formData.branchId}
              onChange={handleInputChange}
              placeholder="Enter Branch ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Description</p>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter Description"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-red-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-red-700 transition-all"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-black text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-gray-800 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default  UserDeleteRequest;
