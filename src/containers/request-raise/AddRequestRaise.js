import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { FaPlus, FaTrash } from 'react-icons/fa';

const AddRequestRaise = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState([]);
  const [subDealer, setSubDealer] = useState([]);
  const [branch, setBranch] = useState([]);

  const [formData, setFormData] = useState({
    requestType: '',
    requestFrom: '',
    requestTo: '',
    branch: '',
    requestFor: '',
    products: [{ productType: '', quantity: 0 }],
    createdDate: '',
    status: '',
    fromDate: null,
    toDate: null,
    photo: '',
    requestId: '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);        // Ref to trigger file input

  const fetchStaffData = async () => {
    try {
      const response = await ApiService.post('/staff/getStaffNamesDropDown');
      if (response.status) {
        setStaffData(response.data);

      } else {
        console.error('Error fetching staff data');
      }
    } catch (e) {
      console.error('Error fetching staff data', e);
    }
  };

  const fetchSubDealers = async () => {
    try {
      const response = await ApiService.post(
        '/subdealer/getSubDealerNamesDropDown'
      );
      if (response.status) {
        setSubDealer(response.data);
      } else {
        alert('Error in fetching sub dealers');
        console.error('Error fetching sub dealers');
      }
    } catch (e) {
      // alert('Error in fetching sub dealers');
      console.error('Error fetching sub dealers', e);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await ApiService.post(
        '/branch/getBranchNamesDropDown'
      );
      if (response.status) {
        setBranch(response.data); // Set branches to state
      } else {
        console.error('Failed to fetch branches');
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };


  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      photo: [...prev.photo, ...files],
    }));

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleReplaceImage = (index) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData((prev) => {
          const updated = [...prev.photo];
          updated[index] = file;
          return { ...prev, photo: updated };
        });
        setImagePreviews((prev) => {
          const updated = [...prev];
          updated[index] = URL.createObjectURL(file);
          return updated;
        });
      }
    };
    fileInput.click();
  };

  const removeImage = (index) => {
    const updatedImages = [...formData.photo];
    updatedImages.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      photo: updatedImages,
    }));
  };

  useEffect(() => {
    fetchBranches();
    fetchSubDealers();
    fetchStaffData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const requestFrom = JSON.parse(localStorage.getItem('id'));

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('requestType', formData.requestType);
      formDataToSend.append('requestTo', formData.requestTo);
      formDataToSend.append('requestFrom', requestFrom);
      formDataToSend.append('branch', formData.branch);
      formDataToSend.append('companyCode', initialAuthState.companyCode);
      formDataToSend.append('unitCode', initialAuthState.unitCode);
      formDataToSend.append('requestFor', formData.requestFor);
      formDataToSend.append('fromDate', formData.fromDate);
      formDataToSend.append('toDate', formData.toDate);

      if (formData.photo) {
        formData.photo.forEach((file) => formDataToSend.append('photo', file)); // 👈 use field name your backend expects
      }

      if (formData.requestType === 'products' && formData.products) {
        formDataToSend.append('products', JSON.stringify(formData.products));
      }

      const response = await ApiService.post(
        '/requests/handleRequestDetails',
        formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status) {
        alert('Request saved successfully');
        navigate('/requests');
      } else {
        alert('failed to raise request');
      }
    } catch (error) {
      console.error(error);
      alert('failed to raise request');
    }
  };

  const handleCancel = () => {
    // Handle cancel action
    navigate('/requests');
  };


  const [rows, setRows] = useState([{ productType: "", quantity: 0 }]);

  // Function to handle adding a new product row
  const addRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      products: [...prevData.products, { productType: '', quantity: 0 }],
    }));
  };

  // Function to remove a product row
  const removeRow = (index) => {
    setFormData((prevData) => {
      if (prevData.products.length > 1) {
        const updatedProducts = prevData.products.filter((_, i) => i !== index);
        return { ...prevData, products: updatedProducts };
      }
      return prevData;
    });
  };


  const handleInputProductChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedProducts = [...prevData.products];
      updatedProducts[index][field] = value;
      return { ...prevData, products: updatedProducts };
    });
  };

  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await ApiService.post(
        '/productType/getProductTypeDetails'
      );
      if (response.data) {
        setProductTypes(response.data);
      } else {
        console.error('Invalid API response');
      }
    } catch (error) {
      console.error('Error fetching product types:', error);
    } finally {
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
            Add Request
          </h1>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Form field for Name */}
          <div>
            <p className="font-semibold mb-1">Request Type</p>
            <select
              name="requestType"
              value={formData.requestType}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            >
              <option value="">Select Request Type</option>
              <option value="assets">Assets</option>
              <option value="money">Money</option>
              <option value="products">Product</option>
              <option value="personal">Personal</option>
              <option value="leaveRequest">Leave Request</option>
            </select>
          </div>
          <div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Request To:</label>
              <select
                name="requestTo"
                value={formData.requestTo}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="" disabled>
                  Select Request To
                </option>
                {staffData.map((staffMember) => (
                  <option key={staffMember.id} value={staffMember.id}>
                    {staffMember.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
          </div>


          <div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="" disabled>
                  Select Branch
                </option>
                {branch.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {formData.requestType === "products" ? (
            <>
              {formData?.products?.map((row, index) => (
                <div key={index} className="flex items-center space-x-4 mb-3 bg-white p-3 shadow-md rounded-md w-full max-w-2xl">

                  {/* Product Field */}
                  <div className="flex-1">
                    <h1 className='m-3' style={{fontWeight:'bold'}}>Request For</h1>
                    <label className="font-semibold">Product:</label>
                    <div className="flex items-center border rounded-md p-2 bg-gray-100">
                      <select
                        name="productTypeId"
                        className="border p-2 rounded-md w-full"
                        // onChange={handleInputChange}
                        onChange={(e) => { handleInputProductChange(index, "productType", e.target.value) }}
                        value={row.productType}
                      >
                        <option value="">Select a product type</option>
                        {productTypes
                          .filter((type) => type.type === 'PRODUCT')
                          .map((type) => (
                            <option key={type.id} value={type.name}>
                              {type.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* quantity Field */}
                  <div className="flex-1">
                    <label className="font-semibold">Quantity:</label>
                    <input
                      type="number"
                      value={row.quantity}
                      onChange={(e) => handleInputProductChange(index, "quantity", parseInt(e.target.value))}
                      placeholder="Enter quantity"
                      className="w-full border rounded-md p-2 bg-gray-100"
                    />
                  </div>

                  {/* Add Row Button - Only in the first row */}
                  {index === 0 && (
                    <button onClick={addRow} className="bg-green-500 text-white p-2 rounded-md shadow-md flex items-center mt-2">
                      <FaPlus className="mr-1" />
                    </button>
                  )}

                  {/* Delete Button - Only for additional rows */}
                  {index !== 0 && (
                    <button onClick={() => removeRow(index)} className="text-red-500 p-2">
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}

            </>
          ) :
            (
              <div>
                <p className="font-semibold mb-1">Request For</p>
                <input
                  type="text"
                  name="requestFor"
                  value={formData.requestFor}
                  onChange={handleInputChange}
                  placeholder="Enter Request For"
                  className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
              </div>
            )}
                
          {formData.requestType === "leaveRequest" && (
            <>
              <div className="mt-4">
                <p className="font-semibold mb-1">Leave From Date</p>
                <input
                  type="date"
                  name="fromDate"
                  value={formData.fromDate || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <p className="font-semibold mb-1">Leave To Date</p>
                <input
                  type="date"
                  name="toDate"
                  value={formData.toDate || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
              </div>
            </>)
          }
                <div className="flex flex-col">
                  <label className="font-semibold mb-2">Package Images:</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                  />
                  <div className="flex flex-wrap gap-4 mt-4">
                    {imagePreviews.map((src, index) => (
                      <div key={index} className="relative">
                        <img
                          src={src}
                          alt={`Preview ${index}`}
                          className="w-24 h-24 object-cover rounded-md cursor-pointer"
                          onClick={() => handleReplaceImage(index)}
                        />
                        <span className="text-xs absolute bottom-1 left-1 bg-white/80 px-1 rounded-sm">
                          Click to Replace
                        </span>
                      </div>
                    ))}
                  </div>
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

export default AddRequestRaise;
