import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddEditRequestForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Check if data is available from the location state
  const requestData = location.state?.requestDetails || {};

  // Initialize form data, using employeeData if available
  const initialFormData = {
    requestType: requestData.requestType || '',
    requestBy: requestData.requestBy || '',
    requestFor: requestData.requestFor || '',
    requestTo: requestData.requestTo || '',
    branch: requestData.branch || '',
    description: requestData.description || '',
    amount: requestData.amount || '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // If employee data is present, update form data
    if (requestData) {
      setFormData(requestData);
    }
  }, [requestData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Handle save action
    navigate('/requests');
  };

  const handleCancel = () => {
    // Handle cancel action
    navigate('/requests');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            {requestData.amount ? 'Edit Request' : 'Add Request'}
          </h1>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Form field for Name */}
          <div>
            <p className="font-semibold mb-1">Request Type</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Request By</p>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            >
              <option value="" disabled>
                Select Request By:
              </option>
              <option value="Visakhapatnam">Visakhapatnam</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Vijayawada">Vijayawada</option>
              <option value="Kakinada">Kakinada</option>
            </select>
          </div>
          <div>
            <p className="font-semibold mb-1">Request For</p>
            <input
              type="text"
              name="staffId"
              value={formData.staffId}
              onChange={handleInputChange}
              placeholder="Enter Staff ID"
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
              <option value="" disabled>
                Select a Branch
              </option>
              <option value="Visakhapatnam">Visakhapatnam</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Vijayawada">Vijayawada</option>
              <option value="Kakinada">Kakinada</option>
            </select>
          </div>
          <div>
            <p className="font-semibold mb-1">Request To</p>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            >
              <option value="" disabled>
                Select Request To:
              </option>
              <option value="Visakhapatnam">Visakhapatnam</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Vijayawada">Vijayawada</option>
              <option value="Kakinada">Kakinada</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <p className="font-semibold mb-1">Description</p>
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

export default AddEditRequestForm;
