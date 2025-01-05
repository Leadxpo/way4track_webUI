import React, { useState, useEffect } from 'react';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router';

const AddEditBankDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's bank data passed through location.state
  const bankData = location.state?.bankDetails || {};

  // Initialize form data with existing bank details if available
  const initialFormData = {
    accountHolderName: bankData.accountHolderName || '',
    accountType: bankData.accountType || '',
    accountNumber: bankData.accountNumber || '',
    branch: bankData.branch || '',
    ifscCode: bankData.ifscCode || '',
    bankPhoneNumber: bankData.bankPhoneNumber || '',
    bankNumber: bankData.bankNumber || '',
    bankAddress: bankData.bankAddress || '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (bankData) {
      setFormData(bankData);
    }
  }, [bankData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Handle save action (e.g., API call or state update)
    navigate('/bank-details');
  };

  const handleCancel = () => {
    navigate('/bank-details');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            {bankData.accountHolderName
              ? 'Edit Bank Details'
              : 'Add Bank Details'}
          </h1>
        </div>

        {/* Photo Section */}
        {/* <div className="flex items-center space-x-2 mb-6">
          <div className="p-8 bg-gray-200 rounded-full">
            {bankData.accountHolderName ? (
              <img
                src="logo-square.png"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <FaFileCirclePlus className="text-gray-800" size={30} />
            )}
          </div>
          <button className="ml-4 border p-2 rounded">Add Photo</button>
          <button className="ml-2 text-red-500">Remove</button>
        </div> */}

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Account Holder Name */}
          <div>
            <p className="font-semibold mb-1">Account Holder Name</p>
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleInputChange}
              placeholder="Enter Account Holder Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Account Type */}
          <div>
            <p className="font-semibold mb-1">Account Type</p>
            <input
              type="text"
              name="accountType"
              value={formData.accountType}
              onChange={handleInputChange}
              placeholder="Enter Account Type"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Account Number */}
          <div>
            <p className="font-semibold mb-1">Account Number</p>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              placeholder="Enter Account Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Branch */}
          <div>
            <p className="font-semibold mb-1">Branch</p>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              placeholder="Enter Branch"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* IFSC Code */}
          <div>
            <p className="font-semibold mb-1">IFSC Code</p>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleInputChange}
              placeholder="Enter IFSC Code"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Bank Phone Number */}
          <div>
            <p className="font-semibold mb-1">Bank Phone Number</p>
            <input
              type="text"
              name="bankPhoneNumber"
              value={formData.bankPhoneNumber}
              onChange={handleInputChange}
              placeholder="Enter Bank Phone Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Bank Number */}
          <div>
            <p className="font-semibold mb-1">Bank Number</p>
            <input
              type="text"
              name="bankNumber"
              value={formData.bankNumber}
              onChange={handleInputChange}
              placeholder="Enter Bank Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Bank Address */}
          <div>
            <p className="font-semibold mb-1">Bank Address</p>
            <input
              type="text"
              name="bankAddress"
              value={formData.bankAddress}
              onChange={handleInputChange}
              placeholder="Enter Bank Address"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-red-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-red-600 transition-all"
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

export default AddEditBankDetails;
