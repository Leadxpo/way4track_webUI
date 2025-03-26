import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';

const EditBankDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("bankkkkkk", location.state)
  const [data, setData] = useState({

    staffId: '',
    accountNumber: '',
    bankName: '',
    ifscCode: '',
    accountBranch: '',
    accountType: '',
  });

  useEffect(() => {
    if (location.state?.data) {
      setData(location.state.data);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const endpoint = "/staff/handleStaffDetails";
      let payload = new FormData()
      payload = {
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode, ...data
      }
      const response = await ApiService.post(endpoint, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.status) {
        alert("Bank details updated successfully!");
        return response.data;
      } else {
        alert("Failed to update bank details.");
        return null;
      }
    } catch (error) {
      console.error("Error updating bank details:", error);
      alert("An error occurred while updating bank details.");
      return null;
    }
  };


  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-6">
      <h3 className="text-3xl font-semibold mb-6 text-center">Edit Bank Details</h3>
      <div className="space-y-6">
        {['accountNumber', 'bankName', 'ifscCode', 'accountBranch'].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1 capitalize">
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type="text"
              name={field}
              value={data[field] || ''}
              onChange={handleChange}
              placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').trim()}`}
              className="w-full p-4 bg-gray-200 rounded-lg focus:outline-none text-gray-700"
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Account Type</label>
          <select
            name="accountType"
            value={data.accountType || ''}
            onChange={handleChange}
            className="w-full p-4 bg-gray-200 rounded-lg focus:outline-none text-gray-700"
          >
            <option value="">Select Account Type</option>
            {['savings', 'current'].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white p-4 rounded-lg text-lg font-semibold hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditBankDetails;