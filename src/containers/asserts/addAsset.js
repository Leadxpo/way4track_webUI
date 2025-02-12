import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { FaFileCirclePlus } from 'react-icons/fa6';
const AddAsset = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const assetData = location.state?.assetsData || {};
  const [voucherList, setVoucherList] = useState([]);
  const [branches, setBranches] = useState([]);
  const [image, setImage] = useState(assetData?.photo || '');

  const initialFormData = {
    id: assetData.id,
    // branchId: assetData.branchId || '',
    assetType: assetData.assetType || '',
    voucherId: assetData.voucherId || '',
    branchId: assetData.branchName || '',
    description: initialAuthState.description || '',
    companyCode: initialAuthState.companyCode,
    photo: assetData?.photo || null,
    unitCode: initialAuthState.unitCode,
    assertName: assetData.assertName,
    quantity: assetData.quantity,
    assertAmount: assetData.assertAmount
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input (photo)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFormData((prev) => ({
        ...prev,
        photo: selectedFile,
      }));
    }
  };

  // Fetch branch data from API
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
  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await ApiService.post(
          '/voucher/getVoucherNamesDropDown'
        );
        if (response.status) {
          setVoucherList(response.data);
        } else {
          console.error('Failed to fetch voucher');
        }
      } catch (error) {
        console.error('Error fetching voucher:', error);
      }
    };

    fetchVoucher();
  }, []);

  const handleSave = async () => {
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      // Do not include 'id' if it is null
      if (key === 'id' && !value) return;

      if (key === 'photo' && value instanceof File) {
        payload.append(key, value);
      } else {
        payload.append(key, value);
      }
    });

    try {
      const endpoint = formData.id
        ? '/asserts/update' // Use an update endpoint if 'id' exists
        : '/asserts/create'; // Use a create endpoint if 'id' is null
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status) {
        alert(
          formData.id
            ? 'Asset updated successfully!'
            : 'Asset added successfully!'
        );
        navigate('/add-assets');
      } else {
        alert('Failed to save asset details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving asset details:', error);
      alert('Failed to save asset details. Please try again.');
    }
  };


  const handleCancel = () => {
    navigate('/add-assets');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">Add Asset</h1>
        </div>

        {/* Photo Section */}
        <div className="flex items-center space-x-2 mb-6">
          <img
            src={image || 'https://i.pravatar.cc/150?img=5'}
            alt="Employee"
            className="w-24 h-24 rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            name="file"
            className="ml-4 border p-2 rounded"
            onChange={handleFileChange}
          />
          {formData.file && (
            <button
              onClick={() => {
                setFormData({ ...formData, file: null });
                setImage('');
              }}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          )}
        </div>
        <div>
          <p className="font-semibold mb-1">Asset Type</p>
          <select
            name="assetType"
            value={formData.assetType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          >
            <option value="">Select assetType</option>
            <option value="office asset">OFFICE_ASSET</option>
            <option value="transport asset">TRANSPORT_ASSET</option>
          </select>
        </div>
        <div>
          {branches.length > 0 && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Branch</p>
                <select
                  name="branchId"
                  value={formData.branchId}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                >
                  <option value="" disabled>
                    Select a Branch
                  </option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.branchName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        <div>
          {voucherList.length > 0 && (
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Voucher Id</p>
                <select
                  name="voucherId"
                  value={formData.voucherId}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                >
                  <option value="" disabled>
                    Select a voucherId
                  </option>
                  {voucherList.map((branch) => (
                    <option key={branch.voucherId} value={branch.voucherId}>
                      {branch.voucherId}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        <div>
          <p className="font-semibold mb-1">Description</p>
          <input
            type="text"
            name="description"
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          />
        </div>
        <div>
          <p className="font-semibold mb-1">Quantity</p>
          <input
            type="number"
            name="quantity"
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
    </div >
  );
};

export default AddAsset;
