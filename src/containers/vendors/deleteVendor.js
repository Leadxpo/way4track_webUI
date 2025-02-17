import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const DeleteVendor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const vendorDetails = location.state?.vendorDetails || null;

  const deleteVendorDetails = async () => {
    if (!vendorDetails) {
      alert('No vendor details available.');
      return;
    }

    try {
      const payload = {
        vendorId: vendorDetails.vendorId,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      const res = await ApiService.post('/vendor/deleteVendorDetails', payload);

      if (res.status) {
        alert('SubDealer deleted successfully.');
        navigate(-1); // Go back to the previous page after deletion
      } else {
        alert('Failed to delete vendor.');
      }
    } catch (err) {
      console.error('Failed to delete vendor:', err);
      alert('An error occurred while deleting the vendor.');
    }
  };

  useEffect(() => {
    console.log(location.state?.vendorDetails);
    if (!location.state?.vendorDetails?.vendorId) {
      alert('No vendor selected to delete.');
      navigate(-1); // Navigate back if no vendor details are found
    }
  }, [location.state?.vendorDetails, navigate]);
  return (
    <div className="min-h-screen flex items-start justify-center pt-10">
      <div className="bg-white shadow-lg pb-4 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center bg-red-500 p-2">
          <h2 className="text-white font-bold text-xl text-center flex-grow">
            Alert
          </h2>
          {/* <button className="text-white hover:text-gray-800">&#10005;</button> */}
        </div>

        {/* Message */}
        <p className="mt-4 text-gray-700 text-center">
          Are you sure you want to delete this Vendor?
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={deleteVendorDetails}
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

export default DeleteVendor;
