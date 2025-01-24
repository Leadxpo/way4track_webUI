import React, { useState, useEffect } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router';

const AddEditProductAssign = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [branches, setBranches] = useState([]);
  const [image, setImage] = useState(productAssign?.file || '');
  const [staff, setStaff] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // Check if there's sub-dealer data passed through location.state
  const productAssign = location.state?.productDetails || {};
  const [product, setProduct] = useState([])

  // Initialize form data with existing sub-dealer details if available
  const initialFormData = {
    staffId: productAssign.staffId || '',
    assignTo: productAssign.staffName || '',
    name: productAssign.name || '',
    productId: productAssign.productId || '',
    branchId: productAssign.branchId || '',
    imeiNumberFrom: productAssign.imeiNumberFrom || '',
    imeiNumberTo: productAssign.imeiNumberTo || '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    file: productAssign?.file || null,
    branch: productAssign.branchName || '',
    productName: productAssign.productName || '',
    productType: productAssign.productType || '',
    numberOfProducts: productAssign.numberOfProducts,
    branchOrPerson: productAssign.branchOrPerson,
    assignedQty: productAssign.assignedQty,
    isAssign: productAssign.isAssign,
    assignTime: productAssign.assignTime,
    inHands: productAssign.inHands
  };

  useEffect(() => {
    const getProductNamesDropDown = async () => {
      try {
        const response = await ApiService.post('/products/getProductNamesDropDown');
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
      }
    };
    getProductNamesDropDown();
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post('/branch/getBranchNamesDropDown');
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFormData((prev) => ({
        ...prev,
        file: selectedFile,
      }));
    }
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await ApiService.post('/staff/getStaffNamesDropDown');
        setStaff(res.data || []);
      } catch (err) {
        console.error('Failed to fetch staff:', err);
        setStaff([]);
      }
    };
    fetchStaff();
  }, []);

  const handleProductChange = (e) => {
    const selectProduct = product.find((pa) => pa.id === e.target.value);
    setFormData((prev) => ({
      ...prev,
      productId: selectProduct?.productId || '',
      productName: selectProduct?.productName || '',
      imeiNumberFrom: selectProduct?.imeiNumberFrom || '',
      imeiNumberTo: selectProduct?.imeiNumberTo || '',
      productType: selectProduct?.productType || '',
    }));
  };

  const handleSave = async () => {

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'file' && value instanceof File) {
        payload.append(key, value);
      } else {
        payload.append(key, value);
      }
    });
    try {
      const endpoint = formData.id ? '/product-assign/handleProductDetails' : '/product-assign/handleProductDetails';
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status) {
        alert(formData.id ? 'product updated successfully!' : 'product added successfully!');
        navigate('/product_assign');
      } else {
        alert('Failed to save employee details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving employee details:', error);
      alert('Failed to save employee details. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/product_assign');
  };

  const renderField = (label, name, type = 'text', placeholder = '') => (
    <div>
      <p className="font-semibold mb-1">{label}</p>
      <input
        type={type}
        name={name}
        value={formData[name] || ''}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
      />
    </div>
  );

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

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <div className="flex mb-4">
              {branches.length > 0 && (
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-1">Branch</p>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    >
                      <option value="" disabled>Select a Branch</option>
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.branchName}>
                          {branch.branchName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
            {staff.length > 0 && (
              <div className="flex flex-col">
                <label className="font-semibold mb-2">Assign To:</label>
                <select
                  name="staffId"
                  value={formData.staffId}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                >
                  <option value="" disabled>
                    Select Staff
                  </option>
                  {staff.map((staffMember) => (
                    <option key={staffMember.staffId} value={staffMember.staffId}>
                      {staffMember.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex mb-4">
              {product.length > 0 && (
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-1">product</p>
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleProductChange}
                      className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    >
                      <option value="" disabled>Select a Branch</option>
                      {product.map((pa) => (
                        <option key={pa.id} value={pa.productName}>
                          {pa.productName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
            {renderField('product Type', 'productType')}
            {renderField('Product Name', 'productName')}
            {renderField('name', 'name')}
            {renderField('IMEI Number from', 'imeiNumberFrom')}
            {renderField('IMEI Number To', 'imeiNumberTo')}
            {renderField('numberOfProducts', 'numberOfProducts')}


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
