import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const AddBranchForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const branchData = location.state?.branchDetails;

  // Define initial states
  const [formData, setFormData] = useState({
    branchName: branchData?.branchName || '',
    branchNumber: branchData?.branchNumber || '',
    branchAddress: branchData?.branchAddress || '',
    addressLine1: branchData?.addressLine1 || '',
    addressLine2: branchData?.addressLine2 || '',
    city: branchData?.city || '',
    state: branchData?.state || '',
    pincode: branchData?.pincode || '',
    branchOpening: branchData?.branchOpening || '',
    email: branchData?.email || '',
    photo: branchData?.photo || null,
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
  });

  const [image, setImage] = useState(branchData?.photo || '');
  const [branchList, setBranchList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 

  // Fetch branch list
  const fetchBranchList = async () => {
    try {
      const response = await ApiService.post('/branch/getBranchDetails', {
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });
      if (response.status) {
        setBranchList(response.data.data);
      } else {
        alert(response.data.message || 'Failed to fetch branch list.');
      }
    } catch (error) {
      console.error('Error fetching branch list:', error);
      alert('Failed to fetch branch list.');
    }
  };

  useEffect(() => {
    fetchBranchList();
  }, []);

  // Handle file change (image)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFormData((prev) => ({
        ...prev,
        photo: selectedFile, // Save the file object directly in `formData`
      }));
    }
  };

  const handleSubmit = async () => {

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'photo' && value instanceof File) {
        payload.append(key, value);
      } else {
        payload.append(key, value);
      }
    });

    try {
      const endpoint = formData.id
        ? `/branch/saveBranchDetails` // Edit branch
        : `/branch/saveBranchDetails`; // Add branch (same endpoint)

      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status) {
        alert(
          formData.id
            ? 'Branch updated successfully!'
            : 'Branch added successfully!'
        );
        navigate('/branches');
      } else {
        alert('Failed to save branch details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving branch details:', error);
      alert('Failed to save branch details. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        <div className="flex items-center space-x-4 mb-8">
          <img
            src="logo-square.png"
            alt="Logo"
            className="w-20 h-20 rounded shadow-lg"
          />
          <h1 className="text-3xl font-bold text-green-600">
            {branchData ? 'Edit Branch' : 'New Branch'}
          </h1>
        </div>
        <div className="space-y-6">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block font-bold mb-1">Branch Name</label>
              <input
                type="text"
                name="branchName"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                value={formData.branchName}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1">
              <label className="block font-bold mb-1">Branch Number</label>
              <input
                type="text"
                name="branchNumber"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                value={formData.branchNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <p className="font-semibold mb-1">Designation</p>
            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            >
              <option value="">Select designation</option>
              <option value="CEO">CEO</option>
              <option value="HR">HR</option>
              <option value="Accountant">Accountant</option>
              <option value="BranchManager">Branch Manager</option>
              <option value="SubDealer">Sub Dealer</option>
              <option value="Technician">Technician</option>
              <option value="SalesMan">Sales Man</option>
              <option value="CallCenter">Call Center</option>
              <option value="Warehouse Manager">Warehouse Manager</option>
            </select>
          </div>
          {/* Address */}
          <div>
            <label className="block font-bold mb-1">Branch Address</label>
            <textarea
              name="branchAddress"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={formData.branchAddress}
              onChange={handleChange}
            />
          </div>
          {/* Address Line 1 */}
          <div className="flex-1">
            <label className="block font-bold mb-1">Address Line 1</label>
            <input
              type="text"
              name="addressLine1"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={formData.addressLine1}
              onChange={handleChange}
            />
          </div>

          {/* Address Line 2 */}
          <div className="flex-1">
            <label className="block font-bold mb-1">Address Line 2</label>
            <input
              type="text"
              name="addressLine2"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={formData.addressLine2}
              onChange={handleChange}
            />
          </div>

          {/* City */}
          <div className="flex-1">
            <label className="block font-bold mb-1">City</label>
            <input
              type="text"
              name="city"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          {/* State */}
          <div className="flex-1">
            <label className="block font-bold mb-1">State</label>
            <input
              type="text"
              name="state"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          {/* Pincode */}
          <div className="flex-1">
            <label className="block font-bold mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Branch Opening Date</label>
            <input
              type="date"
              name="branchOpening"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={formData.branchOpening}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Upload Branch Photo</label>
            <input
              type="file"
              accept="image/*"
              name="photo"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              onChange={handleFileChange}
            />
            {image && (
              <img src={image} alt="Branch" className="w-32 h-32 mt-4" />
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => navigate('/branches')}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBranchForm;
