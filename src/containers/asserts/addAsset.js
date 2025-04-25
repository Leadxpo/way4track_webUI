import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { BiImageAdd } from 'react-icons/bi';
const AddAsset = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const assetData = location.state?.assetDetails || {};

  const [voucherList, setVoucherList] = useState([]);
  const [branches, setBranches] = useState([]);
  const [image, setImage] = useState(assetData?.photo || '');

  const initialFormData = {
    // id: assetData.id,
    // branchId: assetData.branchId || '',
    assetType: assetData.assetType || '',
    voucherId: assetData.voucherId || '',
    branchId: assetData.branchName || '',
    description: assetData.description || '',
    companyCode: initialAuthState.companyCode,
    photo: assetData?.photo || null,
    unitCode: initialAuthState.unitCode,
    assertsName: assetData.assertsName,
    quantity: assetData.quantity,
    assertsAmount: assetData.assertsAmount,
  };

  const [formData, setFormData] = useState(initialFormData);




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

    // for (let pair of payload.entries()) {
    //   console.log(pair[0], pair[1]);
    // }
    

    try {
      const endpoint = formData.id
        ? '/asserts/create'
        : '/asserts/create'; 
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status) {
        alert(
          formData.id
            ? 'Asset updated successfully!'
            : 'Asset added successfully!'
        );
        navigate('/asserts');
      } else {
        alert('Failed to save asset details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving asset details:', error);
      alert('Failed to save asset details. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/asserts');
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Convert image to preview URL
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    // <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="bg-white rounded-2xl p-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <h1 className="text-3xl font-bold">Add Asserts</h1>
      </div>

      {/* Photo Section */}
      {/* <div className="flex items-center space-x-4 mb-6">
        <img
          src={image || 'https://i.pravatar.cc/150?img=5'}
          alt="Employee"
          className="w-24 h-24 rounded-full object-cover"
        />
        <button>
          <input
            type="file"
            accept="image/*"
            name="file"
            className="ml-4 border p-2 rounded"
            onChange={handleFileChange}
          />
        </button>
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
      </div> */}

      <div className="flex items-center space-x-4">
        {/* Circular Image Upload Placeholder */}
        <label htmlFor="imageUpload" className="cursor-pointer">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-200 shadow-md"
            style={{
              backgroundColor: '#C4C4C4',
              width: '120px',
              height: '120px',
            }}
          >
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <BiImageAdd
                className="text-gray-600"
                style={{ width: '50px', height: '50px' }}
              />
            )}
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Add Photo Button */}
        <label htmlFor="imageUpload">
          <button
            className="px-4 py-2 border rounded-lg text-gray-800 shadow-sm"
            style={{
              borderRadius: '9px',
              borderWidth: '2px',
              borderColor: '#646464',
              backgroundColor: '#FFFFFF',
              width: '180px',
              height: '50px',
              marginLeft: '20px',
            }}
          >
            Add Photo
          </button>
        </label>

        {/* Remove Button */}
        {image && (
          <button
            onClick={handleRemoveImage}
            className="text-gray-700 font-medium"
            style={{
              borderRadius: '9px',
              borderWidth: '1px',
              borderColor: '#646464',
              backgroundColor: '#FFFFFF',
              width: '180px',
              height: '50px',
            }}
          >
            Remove
          </button>
        )}
      </div>
      <div>
        <p className="font-semibold mb-1">Assert Name</p>
        <input
          type="text"
          name="assertsName"
          value={formData.assertsName}
          placeholder="Enter Name"
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          style={{ fontWeight: '500', fontSize: '15px', color: '#646464' }}
        />
        {/* <select
          name="assetType"
          value={formData.assetType}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        >
          <option value="">Select assetType</option>
          <option value="office asset">OFFICE_ASSET</option>
          <option value="transport asset">TRANSPORT_ASSET</option>
        </select> */}

        <p className="font-semibold mb-1">Assert Amount</p>
        <input
          type="text"
          name="assertsAmount"
          placeholder="Enter Amount"
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          style={{ fontWeight: '500', fontSize: '15px', color: '#646464' }}
        />
        {/* <select
          name="assetType"
          value={formData.assetType}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        >
          <option value="">Select assetType</option>
          <option value="office asset">OFFICE_ASSET</option>
          <option value="transport asset">TRANSPORT_ASSET</option>
        </select> */}

        <p className="font-semibold mb-1">Asset Type</p>
        {/* <input
          type="text"
          name="assetType"
          placeholder="Enter Assert Type"
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          style={{ fontWeight: '500', fontSize: '15px', color: '#646464' }}
        /> */}
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

        {/* <p className="font-semibold mb-1">Price</p>
        <input
          type="text"
          name="price"
          placeholder="Enter price"
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          style={{ fontWeight: '500', fontSize: '15px', color: '#646464' }}
        /> */}
        {/* <select
          name="assetType"
          value={formData.assetType}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        >
          <option value="">Select assetType</option>
          <option value="office asset">OFFICE_ASSET</option>
          <option value="transport asset">TRANSPORT_ASSET</option>
        </select> */}

        <div>
          <p className="font-semibold mb-1">Quantity</p>
          <input
            type="text"
            name="quantity"
            placeholder="Enter Quantity"
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            style={{ fontWeight: '500', fontSize: '15px', color: '#646464' }}
          />
        </div>
      </div>
      <div>
        {branches.length > 0 && (
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">Branch</p>
              {/* <input
                type="text"
                name="branch"
                placeholder="Enter Branch"
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                style={{
                  fontWeight: '500',
                  fontSize: '15px',
                  color: '#646464',
                }}
              /> */}
              <select
                name="branchId"
                value={formData.branchId}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                style={{
                  fontWeight: '500',
                  fontSize: '15px',
                  color: '#646464',
                }}
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
                  <option key={branch.id} value={branch.id}>
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
          placeholder="Enter Description"
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          style={{ fontWeight: '500', fontSize: '15px', color: '#646464' }}
        />
      </div>
      <div>
        <p className="font-semibold mb-1">Purchase</p>
        <input
          type="date"
          name="purchaseDate"
          placeholder="Enter Purchase Date"
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          style={{ fontWeight: '500', fontSize: '15px', color: '#646464' }}
        />
      </div>
      {/* <div>
        <p className="font-semibold mb-1">Amount</p>
        <input
          type="text"
          name="amount"
          placeholder="Enter Amount"
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
          style={{ fontWeight: '500', fontSize: '15px', color: '#646464' }}
        />
      </div> */}
      {/* <div>
        <p className="font-semibold mb-1">Quantity</p>
        <input
          type="number"
          name="quantity"
          onChange={handleInputChange}
          className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
        />
      </div> */}
      {/* Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={handleSave}
          className="bg-red-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-red-600 transition-all"
          style={{
            backgroundColor: '#15A753',
            borderRadius: '63px',
            width: '220px',
            height: '60px',
            fontSize: '24px',
            fontWeight: '600',
          }}
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-black text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-gray-800 transition-all"
          style={{
            backgroundColor: '#020202',
            borderRadius: '63px',
            width: '220px',
            height: '60px',
            fontSize: '24px',
            fontWeight: '600',
          }}
        >
          Cancel
        </button>
      </div>
    </div>
    // </div >
  );
};

export default AddAsset;
