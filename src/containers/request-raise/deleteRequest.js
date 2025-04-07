import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';

const DeleteRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const requestNumber = location.state?.requestDetails?.requestId;
  const handleDelete = async () => {
    console.log(location.state?.requestDetails?.requestId);
    try {
      const response = await ApiService.post('/requests/deleteRequestDetails', {
        id:location.state?.requestDetails?.requestId,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      if (response?.status) {
        alert('Request deleted successfully');
        navigate('/requests'); // Redirect to requests list or relevant page
      } else {
        alert('Failed to delete request');
      }
    } catch (error) {
      console.error('Error deleting request:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-10">
      <div className="bg-white shadow-lg pb-4 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center bg-red-500 p-2">
          <h2 className="text-white font-bold text-xl text-center flex-grow">
            Alert
          </h2>
        </div>

        {/* Message */}
        <p className="mt-4 text-gray-700 text-center">
          Are you sure you want to delete this request?
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRequest;
