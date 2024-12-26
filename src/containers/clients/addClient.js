import React, { useState, useEffect } from 'react';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router-dom';

const AddEditClient = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's client data passed through location.state
  const clientData = location.state?.clientDetails || {};

  // Initialize form data with existing client details if available
  const initialFormData = {
    name: clientData.client || '',
    phoneNumber: clientData.phoneNumber || '',
    clientId: clientData.clientId || '',
    branch: clientData.branch || '',
    dob: clientData.dob || '',
    emailId: clientData.emailId || '',
    address: clientData.address || '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (clientData) {
      setFormData(clientData);
    }
  }, [clientData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log('Form Data Submitted:', formData);
    // Handle save action (e.g., API call or state update)
    navigate('/clients');
  };

  const handleCancel = () => {
    navigate('/clients');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            {clientData.name ? 'Edit Client' : 'Add Client'}
          </h1>
        </div>

        {/* Photo Section */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-8 bg-gray-200 rounded-full">
            {clientData.name ? (
              <img
                src="placeholder-image.png"
                alt="Client"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <FaFileCirclePlus className="text-gray-800" size={30} />
            )}
          </div>
          <button className="ml-4 border px-4 py-2 rounded-md">
            Add Photo
          </button>
          <button className="ml-2 text-red-500">Remove</button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <p className="font-semibold mb-1">Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Phone Number */}
          <div>
            <p className="font-semibold mb-1">Phone Number</p>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter Phone Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Client ID */}
          <div>
            <p className="font-semibold mb-1">Client ID</p>
            <input
              type="text"
              name="clientId"
              value={formData.clientId}
              onChange={handleInputChange}
              placeholder="Enter Client ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Branch */}
          <div>
            <p className="font-semibold mb-1">Branch</p>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            >
              <option value="">Select Branch</option>
              <option value="Vishakapatnam">Vishakapatnam</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Vijayawada">Vijayawada</option>
              <option value="Kakinada">Kakinada</option>
            </select>
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
          {/* Email ID */}
          <div>
            <p className="font-semibold mb-1">Email ID</p>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleInputChange}
              placeholder="Enter Email ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Address */}
          <div>
            <p className="font-semibold mb-1">Address</p>
            <textarea
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

export default AddEditClient;
