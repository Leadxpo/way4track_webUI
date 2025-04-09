import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';
const CustomerForm = ({ editData }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: editData?.customerName || '',
    group: editData?.under || '',
    state: editData?.state || '',
    country: editData?.country || '',
    panNumber: editData?.panNumber || '',
    registrationType: editData?.registrationType || '',
    tcsDeductable: editData?.tcsDeductable || '',
    tdsDeductable: editData?.tdsDeductable || '',


    gstNumber: editData?.gstNumber || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        name: formData.customerName,
        group: formData.group,
        state: formData.state,
        country: formData.country,
        panNumber: formData.panNumber,
        registrationType: formData.registrationType,
        tcsDeductable: formData.tcsDeductable || 'no',
        tdsDeductable: formData.tdsDeductable || 'no',
        gstNumber: formData.gstNumber,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      };
      

    const url = editData ? '/ledger/updateStatus' : '/ledger/handleLedgerDetails';

    try {
      const response = await ApiService.post(url, payload);

      if (response.status) {
        alert(`Ledger ${editData ? 'updated' : 'created'} successfully!`);
        navigate('/ledger'); // ✅ Navigate to Ledger list page
      } else {
        alert(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('Failed to save ledger. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-start">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">{editData ? 'Edit Ledger' : 'Add Ledgers'}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Enter Name"
              required
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Group</label>
            <input
              type="text"
              name="group"
              value={formData.group}
              onChange={handleChange}
              placeholder="Group"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter State"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter Country"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Tcs Deductable</label>
            <input
              type="text"
              name="tcsDeductable"
              value={formData.tcsDeductable}
              onChange={handleChange}
              placeholder="Enter Tcs Deductable"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Tds Deductable</label>
            <input
              type="text"
              name="tdsDeductable"
              value={formData.tdsDeductable}
              onChange={handleChange}
              placeholder="Enter Tcs Deductable"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Pan Number</label>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="Enter PAN Number"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Registration Type</label>
            <select
              name="registrationType"
              value={formData.registrationType}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="">Select</option>
              <option value="registered">unknown</option>
              <option value="unregistered">composition</option>
              <option value="composition">regular</option>
              <option value="composition">unregistered</option>

            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">GST / UIN no.</label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="Enter GST / UIN"
              className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
            >
              {editData ? 'Update Ledger' : 'Add Ledger'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
