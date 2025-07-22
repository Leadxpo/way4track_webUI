import React, { useState, useEffect } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router';
import * as XLSX from 'xlsx';

const AddEditProductAssign = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('role');
  console.log(role, 'Role');

  const [imeiList, setImeiList] = useState([]);
  const [showDropdown, setShowDropdown] = useState({
    from: false,
    to: false,
  });

  // Check if there's product data passed through location.state
  const productAssign = location.state?.productAssignDetails || {};

  // Initialize form data with existing product details if available
  const initialFormData = {
    staffId: productAssign.staffId || '',
    assignTo: productAssign.assignTo || '',
    name: productAssign.name || '',
    productId: productAssign.productId || '',
    branchId: productAssign.branchId || '',
    requestId: productAssign.requestId || '',
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
    isAssign: false,
    assignTime: productAssign.assignTime||"",
    inHands: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [branches, setBranches] = useState([]);
  const [request, setRequest] = useState([]);
  const [image, setImage] = useState(productAssign?.file || '');
  const [staff, setStaff] = useState([]);
  const [product, setProduct] = useState([]);
  const [subDealerNames, setSubDealerNames] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getProductNamesDropDown = async () => {
      try {
        const response = await ApiService.post(
          'productType/getProductTypeNamesDropDown'
        );
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product names:', error);
      }
    };
    getProductNamesDropDown();
  }, []);

  useEffect(() => {
    const fetchSubDealerDropDown = async () => {
      try {
        const response = await ApiService.post(
          '/subdealer/getSubDealerNamesDropDown',
          {
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        if (response.data) {
          setSubDealerNames(response.data);
          console.log(response.data, 'sub delear');
        } else {
          console.error('Invalid API:');
        }
      } catch (error) {
        console.error('Error fetching sub delears names:', error);
      }
    };

    fetchSubDealerDropDown();
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/branch/getBranchNamesDropDown'
        );
        if (response.status) {
          setBranches(response.data);
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
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post('/requests/getRequestsDropDown');
        if (response.status) {
          setRequest(response.data);
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
    const fetchStaff = async () => {
      try {
        const branchId = localStorage.getItem('branch_id');
        console.log(branchId, 'local');

        const res = await ApiService.post('/dashboards/getStaffSearchDetails', {
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        });
        const allStaff = res.data || [];
        console.log(allStaff, 'allStaff');

        // Filter staff by branch_id and designation
        const filteredStaff = allStaff.filter(
          (staff) =>
            Number(staff.branch_id) === Number(branchId) &&
            staff.designation === 'Technician'
        );

        setStaff(filteredStaff);

      } catch (err) {
        console.error('Failed to fetch staff:', err);
        setStaff([]);
      }
    };

    fetchStaff();
  }, []);

  const handleNumberInputChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      numberOfProducts: value,
    });
  };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
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

  const handleProductChange = (e) => {
    const selectedProductId = Number(e.target.value); // Ensure number
    console.log(selectedProductId, 'selectedProductId');

    // Check if product array exists and has items
    if (!Array.isArray(product) || product.length === 0) {
      console.error('Product list is empty or not an array');
      return;
    }

    // Find the selected product
    const selectedProduct = product.find(
      (pr) => Number(pr.id) === selectedProductId
    );
    console.log(selectedProduct, 'selectedProduct');

    if (!selectedProduct) {
      console.error('No matching product found');
      return;
    }

    // Update form data
    setFormData((prev) => ({
      ...prev,
      productTypeId: selectedProduct.id,
      // productName: selectedProduct.name || '', // Use `.name` instead of `productName` if needed
      imeiNumberFrom: selectedProduct.imeiNumber || '',
      imeiNumberTo: selectedProduct.imeiNumber || '',
      productType: selectedProduct.name || '',
    }));
  };

  const handleSave = async () => {
    const newErrors = {};

    if (!formData.assignTo) {
      newErrors.assignTo = 'Please select a branch or subdealer.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const payload = new FormData();
    payload.append('isReturn',false);

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'file' && value instanceof File) {
        payload.append(key, value);
      } else {
        payload.append(key, value);
      }
    });

      try {
      const endpoint =  '/products/bulk-upload';
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status) {
        alert('Product assigned successfully!');
        // navigate('/products');
      } else {
        alert('Failed to save product details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving product details:', error);
      alert('Failed to save product details. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/products');
  };

  // Handle Focus
  const handleFocus = async (field) => {
    setShowDropdown((prev) => ({ ...prev, [field]: true }));

    if (imeiList.length === 0) {
      const res = await ApiService.post('/products/getAllproductDetails', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });
      const list =
        res.data
          ?.filter((i) => i.imeiNumber)
          .map((i) => ({ id: i.id, imeiNumber: i.imeiNumber })) || [];
      setImeiList(list);
    }
  };

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setShowDropdown((prev) => ({
      ...prev,
      [name === 'imeiNumberFrom' ? 'from' : 'to']: true,
    }));
  };

  // Handle Select
  const handleSelect = (field, imei) => {
    setFormData((prev) => ({ ...prev, [field]: imei }));
    setShowDropdown((prev) => ({
      ...prev,
      [field === 'imeiNumberFrom' ? 'from' : 'to']: false,
    }));
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

  const generateExcel = () => {
    const worksheetData = [
      {
        'IMEI Number': '',
        'SIM Number': '',
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sample Format');

    XLSX.writeFile(workbook, 'SampleProductAssignXlFormat.xlsx');
  };

  const unifiedData = [
    ...subDealerNames.map((dealer) => ({
      id: `sub-${dealer.id}`,
      label: dealer.name,
      type: 'subdealer',
      original: dealer,
    })),
    ...branches.map((branch) => ({
      id: `branch-${branch.id}`,
      label: branch.branchName,
      type: 'branch',
      original: branch,
    })),
  ];

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

        <div className="space-y-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
            onClick={generateExcel}
          >
            Download Sample format
          </button>
          {/* Branch Selection */}
          {role !== 'Branch Manager' && (
            <div>
              <p className="font-semibold mb-1">Assign To</p>
              <select
                value={formData.assignTo}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selected = unifiedData.find(
                    (item) => item.id === selectedId
                  );

                  if (selected?.type === 'branch') {
                    setFormData((prev) => ({
                      ...prev,
                      assignTo: selected.id,
                      branchId: selected.id.split('-')[1], // extract numeric ID
                      staffId: '', // clear staffId
                      branchOrPerson: 'Branch',
                    }));
                  } else if (selected?.type === 'subdealer') {
                    setFormData((prev) => ({
                      ...prev,
                      assignTo: selected.id,
                      subDealerId: selected.id.split('-')[1], // extract numeric ID
                      branchId: '', // clear branchId
                      branchOrPerson: 'Subdealer',
                    }));
                  }
                  setErrors((prev) => ({ ...prev, assignTo: '' }));
                }}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="">Select Branch or Subdealer</option>
                {unifiedData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.type === 'branch'
                      ? `🏢 Branch: ${item.label}`
                      : `👤 Subdealer: ${item.label}`}
                  </option>
                ))}
              </select>
              {errors.assignTo && (
                <p className="text-red-500 text-sm mt-1">{errors.assignTo}</p>
              )}
            </div>
          )}

          {role === 'Branch Manager' && (
            <div>
              <p className="font-semibold mb-1">Select Staff</p>
              <select
                name="staffId"
                value={formData.staffId}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="">Select Staff</option>
                {staff.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.staffName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Product Selection */}
          {product?.length > 0 && (
            <div>
              <p className="font-semibold mb-1">Product Type</p>
              <select
                name="product"
                value={formData.product}
                onChange={handleProductChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="">
                  Select a product type
                </option>
                {product
                  .filter((pa) => pa.type === 'PRODUCT')
                  .map((pa) => (
                    <option key={pa.id} value={pa.id}>
                      {pa.name}
                    </option>
                  ))}
              </select>
            </div>
          )}
        </div>
        {/* Assign Time */}
        <div>
          <label className="block text-sm font-medium">Assign Time</label>
          <input
            type="date"
            name="assignTime"
            value={formData.assignTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Photo Section */}
        <div>
          <label className="font-semibold mb-1 block">Bulk Upload File</label>
          
          <input
            type="file"
            name="file"
            className="border p-2 rounded"
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

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-green-700 transition-all"
          >
            Products Assinge
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
