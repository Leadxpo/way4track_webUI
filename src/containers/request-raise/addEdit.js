import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const AddEditRequestForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState([]);
  const [subDealer, setSubDealer] = useState([]);
  const [branch, setBranches] = useState([]);
  // Check if data is available from the location state
  const requestData = location.state?.requestDetails || {};

  // Initialize form data, using employeeData if available
  const initialFormData = {
    id: requestData.requestId || null,
    requestType: requestData.requestType || '',
    // requestBy: requestData.requestBy || '',
    requestFrom: Number(requestData.requestFrom) || null,
    requestTo: Number(requestData.requestTo) || null,
    branch: Number(requestData.branch) || null,

    description: requestData.description || '',
    // amount: requestData.amount || '',
    createdDate: requestData.createdDate || '',
    status: requestData.status || '',
    subDealerId: Number(requestData.subDealerId) || null,
    requestId: requestData.requestNumber || '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await ApiService.post('/staff/getStaffNamesDropDown');
        if (response.status) {
          setStaffData(response.data);
        } else {
          console.error('Error fetching staff data');
        }
      } catch (e) {
        console.error('Error fetching staff data', e);
      }
    };

    const fetchSubDealers = async () => {
      try {
        const response = await ApiService.post(
          '/subdealer/getSubDealerNamesDropDown'
        );
        if (response.status) {
          setSubDealer(response.data);
        } else {
          alert('Error in fetching sub dealers');
          console.error('Error fetching sub dealers');
        }
      } catch (e) {
        alert('Error in fetching sub dealers');
        console.error('Error fetching sub dealers', e);
      }
    };
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

    fetchSubDealers();
    fetchStaffData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSave = async () => {
    const payload = {
      ...formData,
    };

    try {
      const endpoint = formData.id
        ? '/requests/handleRequestDetails'
        : '/requests/handleRequestDetails';
      const response = await ApiService.post(endpoint, payload);

      if (response.data.status) {
        alert(
          formData.id
            ? 'requests updated successfully!'
            : 'requests created successfully!'
        );
        navigate('/requests');
      } else {
        alert('Failed to save appointment details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving appointment details:', error);
      alert('Failed to save appointment details. Please try again.');
    }
  };
  // const handleSave = async () => {
  //   try {
  //     const payload = {
  //       requestType: formData.requestType,
  //       requestTo: Number(formData.requestTo),
  //       requestFrom: Number(formData.requestFrom),
  //       branch: Number(formData.branch),
  //       description: formData.description,
  //       status: formData.status,
  //       subDealerId: formData.subDealerId || 1,
  //       companyCode: initialAuthState.companyCode,
  //       unitCode: initialAuthState.unitCode,
  //     };
  //     const response = await ApiService.post(
  //       '/requests/handleRequestDetails',
  //       payload
  //     );
  //     if (response.status) {
  //       navigate('/requests');
  //     } else {
  //       alert('failed to raise request');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert('failed to raise request');
  //   }
  // };

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
            {requestData.requestNumber ? 'Edit Request' : 'Add Request'}
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
              {/* <input
                type="text"
                name="requestType"
                value={formData.requestFrom}
                onChange={handleInputChange}
                placeholder="Enter Name"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                disabled
              /> */}
              <select
                name="requestFrom"
                value={formData.requestFrom}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="" disabled>
                  Select Staff
                </option>
                {staffData.map((staffMember) => (
                  <option key={staffMember.id} value={staffMember.id}>
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
                  value={formData.branchName}
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
            <p className="font-semibold mb-1">Status</p>
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
                  <option key={staffMember.id} value={staffMember.id}>
                    {staffMember.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            {subDealer.length > 0 && (
              <div className="flex flex-col">
                <label className="font-semibold mb-2">
                  Request To subDealer:
                </label>
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
                    <option key={staffMember.id} value={staffMember.id}>
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
        <div>
          <p className="font-semibold mb-1">created Date</p>
          <input
            type="date"
            name="createdDate"
            value={formData.createdDate}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          />
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
