import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { useNavigate, useLocation } from 'react-router';

const AddProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeData = location.state?.staffDetails || {};

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
    vendorNumber: '',
    category: '',
    price: '',
    productDescription: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isBulk, setIsBulk] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await ApiService.post(
          '/vendor/getVendorNamesDropDown'
        );
        setVendors(response.data);
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
      }
    };

    fetchVendors();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
  };
  // const handleFileUpload = (info) => {
  //   if (info.file.status === 'done') {
  //     setBulkFile(info.file.originFileObj);
  //     message.success(`${info.file.name} file uploaded successfully.`);
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    validateFile(selectedFile);
    setIsBulk(false);
  };

  const validateFile = (selectedFile) => {
    if (
      selectedFile &&
      selectedFile.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      setFile(selectedFile);
      setError('');
      setFileUploaded(true);
    } else {
      setError('Only Excel files (.xlsx) are allowed.');
      setFile(null);
      setFileUploaded(false);
    }
  };

  useEffect(() => {
    if (employeeData && Object.keys(employeeData).length > 0) {
      setFormData((prevFormData) => {
        if (JSON.stringify(prevFormData) !== JSON.stringify(employeeData)) {
          return { ...employeeData };
        }
        return prevFormData;
      });
    }
  }, [employeeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVendorChange = (e) => {
    const {  value } = e.target;
    const selectedVendorId = parseInt(e.target.value, 10);
    const vendor = vendors.find((v) => v.id === selectedVendorId);
    setSelectedVendor(vendor);
    setFormData((prev) => ({
      ...prev,
      vendorEmailId: value,
      vendorName: selectedVendor ? selectedVendor.name : '',
    }));
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();

      if (file) {
        formDataToSend.append('file', file);
      }

      formDataToSend.append(
        'productDto',
        JSON.stringify({
          productName: formData.name,
          emiNumber: formData.number,
          vendorId: formData.designation,
          dateOfPurchase: formData.staffId,
          imeiNumber: formData.aadhar,
          categoryName: formData.category,
          price: formData.price,
          productDescription: formData.productDescription,
          vendorPhoneNumber: formData.vendorNumber,
          vendorName: formData.designation,
          vendorAddress: formData.branch,
          vendorEmailId: formData.email,
        })
      );

      const endpoint = isBulk ? '/products/bulkUploadProducts' : '/products/createOrUpdateProduct';
      const response = await ApiService.post(endpoint, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response);
      navigate('/staff');
    } catch (error) {
      console.error('Error saving product:', error);
      setError('Failed to save the product. Please check your input.');
    }
  };

  const handleCancel = () => {
    setIsBulk(false);
  };

  const handleOk = () => {
    setIsBulk(false);
    setFileUploaded(false);
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
          {fileUploaded && (
            <p className="text-green-500 mb-4">File uploaded successfully!</p>
          )}
          <div className="flex gap-4">
            <button
              className="bg-red-500 text-white py-2 px-6 rounded-lg shadow hover:bg-red-600 transition"
              onClick={handleOk}
            >
              OK
            </button>
            <button
              className="bg-black text-white py-2 px-6 rounded-lg shadow hover:bg-gray-800 transition"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
          <div className="flex items-center space-x-4 mb-8">
            <h1 className="text-3xl font-bold">
              {employeeData.name ? 'Edit Product' : 'Add Product'}
            </h1>
          </div>
          <div className="flex justify-between items-center space-x-6">
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
            <button
              className="bg-red-500 p-2 text-white rounded-md"
              onClick={() => setIsBulk(true)}
            >
              Bulk Upload
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-1">Product Name</p>
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
              <p className="font-semibold mb-1">EMI Number</p>
              <input
                type="text"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                placeholder="Enter Number"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <p className="font-semibold mb-1">Date of Purchase</p>
              <input
                type="date"
                name="staffId"
                value={formData.staffId}
                onChange={handleInputChange}
                placeholder="Enter Staff ID"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <p className="font-semibold mb-1">Vendor Name</p>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleVendorChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="">Select Vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="font-semibold mb-1">Vendor Number</p>
              <input
                type="text"
                name="vendorNumber"
                value={formData.vendorNumber || ''}
                onChange={handleInputChange}
                placeholder="Enter Vendor Number"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                readOnly
              />
            </div>
            <div>
              <p className="font-semibold mb-1">Vendor Address</p>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                placeholder="Enter Branch"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
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
            <div>
              <p className="font-semibold mb-1">IMEI Number</p>
              <input
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleInputChange}
                placeholder="Enter Aadhar Number"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <p className="font-semibold mb-1">Category Name</p>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Enter Category Name"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <p className="font-semibold mb-1">Price</p>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter Price"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
            <div>
              <p className="font-semibold mb-1">Product Description</p>
              <input
                type="text"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                placeholder="Enter Product Description"
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div>
          </div>
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
