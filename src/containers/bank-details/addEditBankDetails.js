import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import ApiService, { initialAuthState } from '../../services/ApiService';

const AddEditBankDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [formData, setFormData] = useState({ branch: '' });
  const [branches, setBranches] = useState([]);
  // Check if there's bank data passed through location.state
  const bankData = location.state?.bankDetails || {};

console.log("aaa :",bankData)
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchResponse = await ApiService.post('/branch/getBranchNamesDropDown');
        if (branchResponse.status) {
          setBranches(branchResponse.data); // Assuming data is an array of branch names or objects
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

  // Initialize form data with existing bank details if available
  const initialFormData = {
    id: bankData?.ac_id || null,
    accountHolderName: bankData.ac_name || '',
    name: bankData.ac_account_name || '',
    totalAmount: bankData.ac_total_amount || 0,
    accountType: bankData.ac_account_type || '',
    accountNumber: bankData.ac_account_number || '',
    branch: bankData.ac_branch_id || '',
    ifscCode: bankData.ac_ifsc_code || '',
    bankPhoneNumber: bankData.ac_phone_number || '',
    bankAddress: bankData.ac_address || '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {

    const payload = {
      ...formData,
      branchId: formData.branch,
    };

    try {
      const endpoint = formData.id
        ? '/account/createAccount'
        : '/account/createAccount';
      const response = await ApiService.post(endpoint, payload);

      if (response.status) {
        alert(
          formData.id
            ? 'account updated successfully!'
            : 'account created successfully!'
        );
        // navigate('/bank-details');
        navigate('/bank-details-dashboard');

      } else {
        alert('Failed to save account details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving account details:', error);
      alert('Failed to save account details. Please try again.');
    }
  };



  const handleCancel = () => {
    navigate('/bank-details-dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            {bankData.ac_account_number
              ? 'Edit Bank Details'
              : 'Add Bank Details'}
          </h1>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Account Holder Name */}
          <div>
            <p className="font-semibold mb-1">Bank Name</p>
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleInputChange}
              placeholder="Enter Account Holder Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Account Holder Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Account Holder Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Account Type */}
          <div>
            <p className="font-semibold mb-1">Account Type</p>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            >
              <option value="">Select accountType</option>
              <option value="savings">savings</option>
              <option value="current">current</option>
            </select>
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

          <div>
            <p className="font-semibold mb-1">Branch</p>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            >
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.branchName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="font-semibold mb-1">Amount</p>
            <input
              type="number"
              name="totalAmount"
              value={formData.totalAmount}
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
