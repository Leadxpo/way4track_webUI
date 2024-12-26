import React, { useState, useEffect } from 'react';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router';

const AddEditVendor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's vendor data passed through location.state
  const vendorData = location.state?.vendorDetails || {};

  // Initialize form data with existing vendor details if available
  const initialFormData = {
    name: vendorData.vendorName || '',
    number: vendorData.number || '',
    staffId: vendorData.staffId || '',
    designation: vendorData.designation || '',
    branch: vendorData.branch || '',
    dob: vendorData.dob || '',
    email: vendorData.email || '',
    aadhar: vendorData.aadhar || '',
    address: vendorData.address || '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    console.log(vendorData);
    if (vendorData) {
      setFormData(vendorData);
    }
  }, [vendorData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Handle save action (e.g., API call or state update)
    navigate('/vendors');
  };

  const handleCancel = () => {
    navigate('/vendors');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            {vendorData.vendorName ? 'Edit Vendor' : 'Add Vendor'}
          </h1>
        </div>

        {/* Photo Section */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-8 bg-gray-200 rounded-full">
            {vendorData.vendorName ? (
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
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Form field for Name */}
          <div>
            <p className="font-semibold mb-1">Vendor Name</p>
            <input
              type="text"
              name="name"
              value={formData.vendorName}
              onChange={handleInputChange}
              placeholder="Enter Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Vendor Number */}
          <div>
            <p className="font-semibold mb-1">Vendor Number</p>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              placeholder="Enter Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Staff ID */}
          <div>
            <p className="font-semibold mb-1">Staff ID</p>
            <input
              type="text"
              name="staffId"
              value={formData.staffId}
              onChange={handleInputChange}
              placeholder="Enter Staff ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Designation */}
          <div>
            <p className="font-semibold mb-1">Designation</p>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              placeholder="Enter Designation"
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
          {/* Date of Birth */}
          <div>
            <p className="font-semibold mb-1">Date of Birth</p>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Email */}
          <div>
            <p className="font-semibold mb-1">Email ID</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Aadhar */}
          <div>
            <p className="font-semibold mb-1">Aadhar Number</p>
            <input
              type="text"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleInputChange}
              placeholder="Enter Aadhar Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Address */}
          <div>
            <p className="font-semibold mb-1">Address</p>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter Address"
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

export default AddEditVendor;
