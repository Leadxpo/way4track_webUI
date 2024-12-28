import React, { useState, useEffect } from 'react';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
const AddEditVendor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's vendor data passed through location.state
  const vendorData = location.state?.vendorDetails || {};

  // Initialize form data with existing vendor details if available
  const initialFormData = {
    name: vendorData.name || '',
    vendorPhoneNumber: vendorData.vendorPhoneNumber || '',
    alternatePhoneNumber: vendorData.alternatePhoneNumber || '',
    startingDate: vendorData.startingDate || '',
    emailId: vendorData.emailId || '',
    aadharNumber: vendorData.aadharNumber || '',
    address: vendorData.address || '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    photo: vendorData?.photo || null,
    productType: vendorData?.productType
  };

  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState(vendorData?.photo || '');
  // useEffect(() => {
  //   console.log(vendorData);
  //   if (vendorData) {
  //     setFormData(vendorData);
  //   }
  // }, [vendorData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  useEffect(() => {
    if (vendorData?.id || vendorData?.vendorId) {
      const fetchClientDetails = async () => {
        try {
          const response = await ApiService.post('/vendor/getVendorDetails', {
            vendorId: vendorData.vendorId,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          });
          const vendor = response.data?.[0];
          setFormData((prev) => ({
            ...prev,
            ...vendor,
          }));
          setImage(vendor?.photo || '');
        } catch (error) {
          console.error('Error fetching branch details:', error);
          alert('Failed to fetch branch details.');
        }
      };
      fetchClientDetails();
    }
  }, [vendorData]);

  const handleSave = async () => {

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'photo' && value instanceof File) {
        payload.append(key, value);
      } else {
        payload.append(key, value);
      }
    });
    console.log(payload, formData, "+++++++++++++++++++++++++")
    try {
      const endpoint = formData.id ? '/vendor/handleVendorDetails' : '/vendor/handleVendorDetails';
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status) {
        alert(formData.id ? 'vendor updated successfully!' : 'vendor added successfully!');
        navigate('/vendors');
      } else {
        alert('Failed to save employee details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving employee details:', error);
      alert('Failed to save employee details. Please try again.');
    }
  };


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

  const handleCancel = () => {
    navigate('/vendors');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            {vendorData.vendorName ? 'Edit Vendor' : 'Add Vendor'}
          </h1>
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
            name="photo"
            className="ml-4 border p-2 rounded"
            onChange={handleFileChange}
          />
          {formData.photo && (
            <button
              onClick={() => {
                setFormData({ ...formData, photo: null });
                setImage('');
              }}
              className="ml-2 text-red-500"
            >
              Remove
            </button>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Form field for Name */}
          <div>
            <p className="font-semibold mb-1">Vendor Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Vendor Number */}
          <div>
            <p className="font-semibold mb-1">Vendor Number</p>
            <input
              type="text"
              name="vendorPhoneNumber"
              value={formData.vendorPhoneNumber}
              onChange={handleInputChange}
              placeholder="Enter Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Vendor Number</p>
            <input
              type="text"
              name="alternatePhoneNumber"
              value={formData.alternatePhoneNumber}
              onChange={handleInputChange}
              placeholder="Enter Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">starting Date</p>
            <input
              type="date"
              name="startingDate"
              value={formData.startingDate}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Email */}
          <div>
            <p className="font-semibold mb-1">Email ID</p>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleInputChange}
              placeholder="Enter Email ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Aadhar */}
          <div>
            <p className="font-semibold mb-1">Aadhar Number</p>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleInputChange}
              placeholder="Enter Aadhar Number"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Address */}
          <div>
            <p className="font-semibold mb-1">Address</p>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter Address"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">product Type</p>
            <input
              type="text"
              name="productType"
              value={formData.productType}
              onChange={handleInputChange}
              placeholder="Enter productType"
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

export default AddEditVendor;
