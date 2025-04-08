import React, { useState, useEffect } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { useNavigate, useLocation } from 'react-router';

const AddProductForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeData = location.state?.staffDetails || {};

  const initialFormData = {
    productName: '',
    dateOfPurchase: '',
    vendorId: '',
    imeiNumber: '',
    categoryName: '',
    price: '',
    productDescription: '',
    voucherId: '',
    companyCode: '',
    unitCode: '',
    vendorPhoneNumber: '',
    vendorName: '',
    vendorAddress: '',
    vendorEmailId: '',
    quantity: '',
    supplierName: '',
    serialNumber: '',
    primaryNo: '',
    secondaryNo: '',
    primaryNetwork: '',
    secondaryNetwork: '',
    simStatus: '',
    planName: '',
    remarks1: '',
    remarks2: '',
    remarks3: '',
    deviceModel: '',
    BASKET_NAME: '',
    SIM_IMSI: '',
    SIM_NO: '',
    MOBILE_NUMBER: '',
    productTypeId:null,
    file: null,
    ...employeeData,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [vendors, setVendors] = useState([]);
  const [image, setImage] = useState(null);
  const [bulkFile, setBulkFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch vendors
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await ApiService.post(
          '/vendor/getVendorNamesDropDown'
        );
        console.log('res', response.data, '{{{{{{{{');
        const modifiedData = response.data.map((item) => ({
          ...item,
          vendorName: item.name,
          name: undefined,
        }));
        setVendors(modifiedData);
      } catch (error) {
        console.error('Failed to fetch vendors:', error);
      }
    };
    fetchVendors();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file inputs
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setFormData((prev) => ({ ...prev, file: selectedFile }));
    }
  };

  const handleBulkFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setBulkFile(selectedFile);
    }
  };

  // Save product or bulk upload
  const handleSave = async () => {
    setIsLoading(true);

    if (bulkFile) {
      // Bulk upload logic
      const bulkPayload = new FormData();
      bulkPayload.append('file', bulkFile);
      bulkPayload.append('productTypeId', formData.productTypeId);
      bulkPayload.append('companyCode', initialAuthState.companyCode);
      bulkPayload.append('unitCode', initialAuthState.unitCode);
      try {
        const response = await ApiService.post('/products/bulk-upload', bulkPayload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.status) {
          alert('Bulk upload successful!');
          navigate('/products');
        } else {
          alert('Bulk upload failed. Please try again.');
        }
      } catch (error) {
        console.error('Error during bulk upload:', error);
        alert('Failed to upload bulk file. Please check your input.');
      }
    } else {
      // Single product save logic
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      try {
        const response = await ApiService.post('/api/products/createOrUpdateProduct', payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (response.data.status) {
          alert('Product saved successfully!');
          navigate('/staff');
        } else {
          alert('Failed to save product. Please try again.');
        }
      } catch (error) {
        console.error('Error saving product:', error);
        alert('Failed to save the product. Please check your input.');
      }
    }

    setIsLoading(false);
  };

  // Vendor selection
  const handleVendorChange = (e) => {
    const selectedVendor = vendors.find(
      (vendor) => vendor.vendorId === e.target.value
    );
    setFormData((prev) => ({
      ...prev,
      vendorId: selectedVendor?.vendorId || '',
      vendorName: selectedVendor?.vendorName || '',
      vendorAddress: selectedVendor?.vendorAddress || '',
      vendorEmailId: selectedVendor?.vendorEmailId || '',
      vendorPhoneNumber: selectedVendor?.vendorPhoneNumber || '',
    }));
    console.log(selectedVendor, '{{{{{{{{{{{{');
  };

  // Render form fields dynamically
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



  const [productTypes, setProductTypes] = useState([]);


  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await ApiService.post("/productType/getProductTypeDetails");
      if (response.data) {
        setProductTypes(response.data);
        console.log("qazwsxedc",response.data)
      } else {
        console.error("Invalid API response");
      }
    } catch (error) {
      console.error("Error fetching product types:", error);
    } finally {
      
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Add Product</h1>

      <form className="space-y-4 w-1/2">
        <div>
          {/* <label className="font-semibold mb-1 block">Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} /> */}
          {image && (
            <img src={image} alt="Preview" className="mt-4 w-24 h-24 rounded" />
          )}
        </div>

        {vendors.length > 0 && (
          <div>
            <p className="font-semibold mb-1">Vendor</p>
            <select
              name="vendorName"
              value={formData.vendorId}
              onChange={handleVendorChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            >
              <option value="" disabled>
                Select a Vendor
              </option>
              {vendors.map((vendor) => (
                <option key={vendor.vendorId} value={vendor.vendorId}>
                  {vendor.vendorName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* {renderField('Date of Purchase', 'dateOfPurchase', 'date')}
        {renderField('Product Name', 'productName')}
        {renderField('Description', 'productDescription')}
        {renderField('IMEI Number', 'imeiNumber')}
        {renderField('Price', 'price', 'number')}
        {renderField('Quantity', 'quantity', 'number')}
        {renderField('Supplier Name', 'supplierName')}
        {renderField('Serial Number', 'serialNumber')}
        {renderField('Primary Number', 'primaryNo')}
        {renderField('Secondary Number', 'secondaryNo')}
        {renderField('Primary Network', 'primaryNetwork')}
        {renderField('Secondary Network', 'secondaryNetwork')}
        {renderField('SIM Status', 'simStatus')}
        {renderField('Plan Name', 'planName')}
        {renderField('Remarks 1', 'remarks1')}
        {renderField('Remarks 2', 'remarks2')}
        {renderField('Device Model', 'deviceModel')}
        {renderField('Category Name', 'categoryName')}
        {renderField('Remarks 3', 'remarks3')}
        {renderField('BASKET_NAME', 'BASKET_NAME')}
        {renderField('SIM_IMSI', 'SIM_IMSI')}
        {renderField('SIM_NO', 'SIM_NO')}
        {renderField('MOBILE_NUMBER', 'MOBILE_NUMBER')} */}
       

       <div>
      <label className="font-semibold mb-1 block">Select Product Type</label>
      <select
      name="productTypeId"
        className="border p-2 rounded-md w-full"
        onChange={handleInputChange}
        value={formData.productTypeId}
      >
        <option value="">Select a product type</option>
        {productTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
     
    </div>

        <div>
          <label className="font-semibold mb-1 block">Bulk Upload File</label>
          <input type="file" accept=".csv, .xlsx, .xls" onChange={handleBulkFileChange} />
        </div>

        <div>
          <button
            type="button"
            onClick={handleSave}
            className="p-3 bg-blue-500 text-white rounded-md w-full"
            disabled={isLoading}
          >
            {isLoading
              ? 'Processing...'
              : bulkFile
                ? 'Upload Bulk File'
                : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
