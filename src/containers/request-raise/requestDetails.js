import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';

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
    requestTo: requestData.RequestTo || '',
    branch: requestData.branchName || '',
    description: requestData.description || '',
    amount: requestData.amount || '',
    id: requestData.requestNumber || '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    console.log(location.state.requestDetails);
    if (requestData) {
      const getRequestDetails = async () => {
        try {
          const response = await ApiService.post(
            '/requests/getRequestDetails',
            {
              id: location.state?.requestDetails.requestNumber,
              companyCode: initialAuthState.companyCode,
              unitCode: initialAuthState.unitCode,
            }
          );
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      };
      getRequestDetails();
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
            <input
              type="text"
              name="requestType"
              value={formData.requestType}
              disabled
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Status</p>
            <input
              type="text"
              name="requestFor"
              value={formData.status}
              disabled
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Branch</p>
            <input
              type="text"
              name="requestType"
              value={formData.branchName}
              disabled
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Request To</p>
            <input
              type="text"
              name="requestType"
              value={formData.RequestTo}
              disabled
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
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
