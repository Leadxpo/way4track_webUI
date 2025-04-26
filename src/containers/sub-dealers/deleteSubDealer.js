import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const DeleteSubDealer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subDealerDetails = location.state?.subDealerDetails || null;
  const deleteSubDealerDetails = async () => {
    if (!subDealerDetails) {
      alert('No subDealer details available.');
      return;
    }

    try {
      const payload = {
        subDealerId:subDealerDetails.SubDealerId,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      const res = await ApiService.post(
        '/subdealer/deleteSubDealerDetails',
        payload
      );

      if (res.status) {
        alert('SubDealer deleted successfully.');
        navigate(-1); // Go back to the previous page after deletion
      } else {
        alert('Failed to delete subDealer.');
      }
    } catch (err) {
      console.error('Failed to delete subDealer:', err);
      alert('An error occurred while deleting the subDealer.');
    }
  };

  useEffect(() => {
    if (!location.state?.subDealerDetails) {
      alert('No subDealer selected to delete.');
      navigate(-1); // Navigate back if no subDealer details are found
    }
  }, [location.state?.subDealerDetails, navigate]);

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
          Are you sure you want to delete this Sub Dealer?
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={deleteSubDealerDetails}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSubDealer;
