import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RequestDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Check if data is available from the location state
  const requestData = location.state?.requestDetails || {};

  // Initialize form data, using requestData if available
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
    // If requestData is present, update form data
    if (requestData) {
      setFormData(requestData);
    }
  }, [requestData]);

  const handleCancel = () => {
    // Handle cancel action
    navigate('/requests');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">Request Details</h1>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <p className="font-semibold mb-1">Request Type</p>
            <input
              type="text"
              name="requestType"
              value={formData.requestType}
              disabled
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Request By</p>
            <select
              name="requestBy"
              value={formData.requestBy}
              disabled
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
              name="requestFor"
              value={formData.requestFor}
              disabled
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Branch</p>
            <select
              name="branch"
              value={formData.branch}
              disabled
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
              name="requestTo"
              value={formData.requestTo}
              disabled
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
          <div>
            <p className="font-semibold mb-1">Description</p>
            <input
              type="text"
              name="description"
              value={formData.description}
              disabled
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
