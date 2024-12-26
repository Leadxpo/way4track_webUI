import React, { useState, useEffect } from 'react';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router';

const AddEditProductAssign = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's sub-dealer data passed through location.state
  const subDealerData = location.state?.productDetails || {};

  // Initialize form data with existing sub-dealer details if available
  const initialFormData = {
    name: subDealerData.subDealerName || '',
    number: subDealerData.number || '',
    alternateNumber: subDealerData.alternateNumber || '',
    gstNumber: subDealerData.gstNumber || '',
    productTypes: subDealerData.productTypes || '',
    startDate: subDealerData.startDate || '',
    email: subDealerData.email || '',
    aadhar: subDealerData.aadhar || '',
    address: subDealerData.address || '',
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (subDealerData) {
      setFormData(subDealerData);
    }
  }, [subDealerData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Handle save action (e.g., API call or state update)
    navigate('/sub_dealer');
  };

  const handleCancel = () => {
    navigate('/sub_dealer');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            {location.state?.productDetails
              ? 'Edit Product Assign'
              : 'Add Product Assign'}
          </h1>
        </div>

        {/* Photo Section */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-8 bg-gray-200 rounded-full">
            {subDealerData.subDealerName ? (
              <img
                src="logo-square.png"
                className="w-24 h-24 rounded-full object-cover"
                alt="Sub Dealer"
              />
            ) : (
              <FaFileCirclePlus className="text-gray-800" size={30} />
            )}
          </div>
          <button className="ml-4 border p-2 rounded">Add Photo</button>
          <button className="ml-2 text-red-500">Remove</button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div className="flex mb-4">
            <div className="flex-grow flex items-center justify-center">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="option"
                  value="branch"
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span>Branch</span>
              </label>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="option"
                  value="product"
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <span>Product</span>
              </label>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-1">Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Branch ID</p>
            <input
              type="text"
              name="id"
              value={formData.number}
              onChange={handleInputChange}
              placeholder="Enter Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Product Type</p>
            <input
              type="text"
              name="alternateNumber"
              value={formData.alternateNumber}
              onChange={handleInputChange}
              placeholder="Enter Alternate Mobile Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Product Name</p>
            <input
              type="text"
              name="product_name"
              value={formData.gstNumber}
              onChange={handleInputChange}
              placeholder="Enter GST Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <p className="font-semibold mb-1">IMEI Number</p>
          <div className="flex mb-4 gap-2">
            <div className="flex-grow flex items-center">
              <input
                type="text"
                name="number_products"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="From"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            <div className="flex-grow flex items-center justify-center">
              <input
                type="text"
                name="number_products"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="To"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <p className="font-semibold mb-1">Number of Products</p>
            <input
              type="text"
              name="number_products"
              value={formData.address}
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
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-red-600 transition-all"
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

export default AddEditProductAssign;
