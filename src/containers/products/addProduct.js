import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { useNavigate, useLocation } from 'react-router';
const AddProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Check if data is available from the location state
  const employeeData = location.state?.staffDetails || {};

  // Initialize form data, using employeeData if available
  const initialFormData = {
    name: employeeData.name || '',
    number: employeeData.number || '',
    staffId: employeeData.staffId || '',
    designation: employeeData.designation || '',
    branch: employeeData.branch || '',
    dob: employeeData.dob || '',
    email: employeeData.email || '',
    aadhar: employeeData.aadhar || '',
    address: employeeData.address || '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isBulk, setIsBulk] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    validateFile(selectedFile);
  };

  const validateFile = async (selectedFile) => {
    if (
      selectedFile &&
      selectedFile.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      setFile(selectedFile);
      setError('');
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await ApiService.post(
          'products/bulk-upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        console.log('File uploaded successfully:', response);
      } catch (error) {
        console.error('File upload failed:', error);
        setError('Failed to upload the file. Please try again.');
      }
    } else {
      setError('Only Excel files (.xlsx) are allowed.');
      setFile(null);
    }
  };
  useEffect(() => {
    // If employee data is present, update form data
    if (employeeData) {
      setFormData(employeeData);
    }
  }, [employeeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Handle save action
    navigate('/staff');
  };

  const handleCancel = () => {
    // Handle cancel action
    navigate('/staff');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {isBulk ? (
        <div className="flex flex-col items-center p-5">
          <h2 className="text-2xl font-semibold mb-4">
            Bulk Upload (Excel File)
          </h2>
          <div
            className="border-2 border-dashed border-gray-400 rounded-lg w-96 h-48 flex flex-col items-center justify-center cursor-pointer mb-4"
            onClick={() => document.getElementById('fileInput').click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
              accept=".xlsx"
            />
            <div className="text-4xl mb-2">📁</div>
            <p className="text-gray-500">Drag & Drop Here</p>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex gap-4">
            <button
              className="bg-red-500 text-white py-2 px-6 rounded-lg shadow hover:bg-red-600 transition"
              onClick={() =>
                alert(file ? 'File Uploaded!' : 'No file selected')
              }
            >
              OK
            </button>
            <button
              className="bg-black text-white py-2 px-6 rounded-lg shadow hover:bg-gray-800 transition"
              onClick={() => setFile(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <h1 className="text-3xl font-bold">
              {employeeData.name ? 'Edit Product' : 'Add Product'}
            </h1>
          </div>

          {/* Photo Section */}

          <div className="flex justify-between items-center space-x-6">
            {/* Left side with image, Add Photo, and Remove */}
            <div className="flex items-center space-x-4">
              <img
                src={
                  employeeData.name
                    ? 'https://i.pravatar.cc/150?img=5'
                    : 'placeholder.png'
                }
                alt="Product"
                className="w-24 h-24 rounded-full object-cover"
              />
              <button className="ml-4 border p-2 rounded">Add Photo</button>
              <button className="ml-2 text-red-500">Remove</button>
            </div>

            {/* Right side with Bulk Upload */}
            <button
              className="bg-red-500 p-2 text-white rounded-md"
              onClick={() => setIsBulk(true)}
            >
              Bulk Upload
            </button>
          </div>
          {/* Form Fields */}
          <div className="space-y-4">
            {/* Form field for Name */}
            <div>
              <p className="font-semibold mb-1">Product Name</p>
              <input
                type="text"
                name="prouct_name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Name"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            {/* Other fields follow the same pattern */}
            {/* Number */}
            <div>
              <p className="font-semibold mb-1">EMI Number</p>
              <input
                type="text"
                name="emi_number"
                value={formData.number}
                onChange={handleInputChange}
                placeholder="Enter Number"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            {/* Staff ID */}
            <div>
              <p className="font-semibold mb-1">Date of Purchase</p>
              <input
                type="date"
                name="date"
                value={formData.staffId}
                onChange={handleInputChange}
                placeholder="Enter Staff ID"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            {/* Designation */}
            <div>
              <p className="font-semibold mb-1">Vendor Name</p>
              <input
                type="text"
                name="vendor_name"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Enter Designation"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <p className="font-semibold mb-1">Vendor Number</p>
              <input
                type="text"
                name="vendor_number"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Enter Designation"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            {/* Branch */}
            <div>
              <p className="font-semibold mb-1">Vendor Address</p>
              <input
                type="text"
                name="address"
                value={formData.branch}
                onChange={handleInputChange}
                placeholder="Enter Branch"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            {/* Email */}
            <div>
              <p className="font-semibold mb-1">Vendor Email ID</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter Email ID"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            {/* Aadhar */}
            <div>
              <p className="font-semibold mb-1">IMEI Number</p>
              <input
                type="text"
                name="imei_number"
                value={formData.aadhar}
                onChange={handleInputChange}
                placeholder="Enter Aadhar Number"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            {/* Address */}
            <div>
              <p className="font-semibold mb-1">Category Name</p>
              <input
                type="text"
                name="category"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter Address"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <p className="font-semibold mb-1">Price</p>
              <input
                type="text"
                name="price"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter Address"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <p className="font-semibold mb-1">Product Description</p>
              <input
                type="text"
                name="product_des"
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
      )}
    </div>
  );
};

export default AddProductForm;
