import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const AddEditRequestForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState([]);
  const [subDealer, setSubDealer] = useState([])
  const [branch, setBranches] = useState([])
  // Check if data is available from the location state
  const requestData = location.state?.requestDetails || {};

  // Initialize form data, using employeeData if available
  const initialFormData = {
    requestType: requestData.requestType || '',
    // requestBy: requestData.requestBy || '',
    requestFrom: requestData.requestFrom || '',
    requestTo: requestData.requestTo || '',
    branch: requestData.branch || '',
    description: requestData.description || '',
    // amount: requestData.amount || '',
    createdDate: requestData.createdDate || '',
    status: requestData.status || '',
    subDealerId: requestData.subDealerId || '',
    requestId: requestData.requestId || '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode
  };

  const [formData, setFormData] = useState(initialFormData);


  useEffect(() => {
    try {
      const response = ApiService.post('/staff/getStaffNamesDropDown');
      if (response.status) {
        setStaffData(response.data);
      } else {
        console.error('Error');
      }
    } catch (e) {
      console.error('error');
    }
  }, [staffData]);

  useEffect(() => {
    try {
      const response = ApiService.post('/subdealer/getSubDealerNamesDropDown');
      if (response.status) {
        setSubDealer(response.data);
      } else {
        console.error('Error');
      }
    } catch (e) {
      console.error('error');
    }
  }, [subDealer]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/branch/getBranchNamesDropDown'
        );
        if (response.status) {
          setBranches(response.data); // Set branches to state
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

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
            {requestData.requestId ? 'Edit Request' : 'Add Request'}
          </h1>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Form field for Name */}
          <div>
            <p className="font-semibold mb-1">Request Type</p>
            <input
              type="text"
              name="requestType"
              value={formData.requestType}
              onChange={handleInputChange}
              placeholder="Enter Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>

            <div className="flex flex-col">
              <label className="font-semibold mb-2">Request By:</label>
              <select
                name="requestFrom"
                value={formData.requestFrom}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="" disabled>
                  Request By
                </option>
                {staffData.map((staffMember) => (
                  <option
                    key={staffMember.id}
                    value={staffMember.staffId}
                  >
                    {staffMember.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Branch */}
          {branch.length > 0 && (
            <div className="space-y-4">
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
                  {branch.map((br) => (
                    <option key={br.id} value={br.id}>
                      {br.branchName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div>
            <p className="font-semibold mb-1">status</p>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            >
              <option value="" disabled>
                Select a status
              </option>
              <option value="accepted">accepted</option>
              <option value="rejected">rejected</option>
              <option value="expire">expire</option>
              <option value="sent">sent</option>
              <option value="declined">declined</option>
              <option value="pending">pending</option>
            </select>
          </div>
          <div>

            <div className="flex flex-col">
              <label className="font-semibold mb-2">Request To:</label>
              <select
                name="requestTo"
                value={formData.requestTo}
                onChange={handleInputChange}

                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="" disabled>
                  Request To
                </option>
                {staffData.map((staffMember) => (
                  <option
                    key={staffMember.id}
                    value={staffMember.staffId}
                  >
                    {staffMember.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
          <div>
            {subDealer.length > 0 && (
              <div className="flex flex-col">
                <label className="font-semibold mb-2">Request To subDealer:</label>
                <select
                  name="subDealerId"
                  value={formData.subDealerId}
                  onChange={handleInputChange}

                  className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                >
                  <option value="" disabled>
                    Request To subDealer
                  </option>
                  {subDealer.map((staffMember) => (
                    <option
                      key={staffMember.id}
                      value={staffMember.id}
                    >
                      {staffMember.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Address */}
          <div>
            <p className="font-semibold mb-1">Description</p>
            <input
              type="text"
              name="description"
              value={formData.description}
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
