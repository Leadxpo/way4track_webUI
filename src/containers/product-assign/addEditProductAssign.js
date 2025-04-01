import React, { useState, useEffect } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { useNavigate, useLocation } from 'react-router';

const AddEditProductAssign = () => {


  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's product data passed through location.state
  const productAssign = location.state?.productAssignDetails || {};
  console.log(location.state?.productAssignDetails, ")))))))))))")
  // Initialize form data with existing product details if available
  const initialFormData = {
    id: productAssign?.productId || null,
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
    assignTime: productAssign.assignTime,
    inHands: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [branches, setBranches] = useState([]);
  const [request, setRequest] = useState([]);
  const [image, setImage] = useState(productAssign?.file || '');
  const [staff, setStaff] = useState([]);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getProductNamesDropDown = async () => {
      try {
        const response = await ApiService.post('/products/getProductNamesDropDown');
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product names:', error);
      }
    };
    getProductNamesDropDown();
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post('/branch/getBranchNamesDropDown');
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
        const res = await ApiService.post('/staff/getStaffNamesDropDown');
        setStaff(res.data || []);
      } catch (err) {
        console.error('Failed to fetch staff:', err);
        setStaff([]);
      }
    };
    fetchStaff();
  }, []);

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
    const selectedProductId = parseInt(e.target.value, 10); // Parse the selected ID from the event
    console.log(selectedProductId, "selectedProductId");

    // Find the selected product directly
    const selectedProduct = product.find((pr) => pr.id === selectedProductId);
    console.log(selectedProduct, "selectedProduct");

    // Update the form data state
    setFormData((prev) => ({
      ...prev,
      productId: selectedProduct?.id || '',
      productName: selectedProduct?.productName || '',
      imeiNumberFrom: selectedProduct?.imeiNumber || '',
      imeiNumberTo: selectedProduct?.imeiNumber || '', // Assuming this is a range scenario
      productType: selectedProduct?.productType || '', // If `productType` exists
    }));
  };

  // const getActiveStatus = async (productAssignId) => {
  //   const payload = { productAssignId };
  //   const res = await ApiService.post('/product-assign/markIsAssign', payload);
  //   if (res.status) {
  //     alert(res.internalMessage);
  //     handleSave();
  //   } else {
  //     alert('Failed to update assignment status.');
  //   }
  // };

  // const getActiveStatusInHands = async (productAssignId) => {
  //   const payload = { productAssignId };
  //   const res = await ApiService.post('/product-assign/markInHands', payload);
  //   if (res.status) {
  //     alert(res.internalMessage);
  //     handleSave();
  //   } else {
  //     alert('Failed to update in-hands status.');
  //   }
  // };



  // const switchStatus = (record) => {
  //   getActiveStatus(record.id);
  // }


  // const switchInHandsStatus = (record) => {
  //   getActiveStatusInHands(record.id);
  // }





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
      const endpoint = formData.id
        ? '/product-assign/handleProductDetails'
        : '/product-assign/handleProductDetails';
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status) {
        alert(formData.id ? 'Product updated successfully!' : 'Product added successfully!');
        navigate('/products_assign');
      } else {
        alert('Failed to save product details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving product details:', error);
      alert('Failed to save product details. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/products_assign');
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
            {location.state?.productDetails ? 'Edit Product Assign' : 'Add Product Assign'}
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
          {/* Branch Selection */}
          {branches.length > 0 && (
            <div>
              <p className="font-semibold mb-1">Branch</p>
              <select
                name="branchId"
                value={formData.branchId}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="" disabled>Select a Branch</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Staff Selection */}
          {staff.length > 0 && (
            <div>
              <p className="font-semibold mb-1">Person</p>
              <select
                name="staffId"
                value={formData.staffId}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="" disabled>Select Staff</option>
                {staff.map((staffMember) => (
                  <option key={staffMember.id} value={staffMember.id}>
                    {staffMember.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Product Selection */}
          {product.length > 0 && (
            <div>
              <p className="font-semibold mb-1">Product</p>
              <select
                name="product"
                value={formData.product}
                onChange={handleProductChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="" disabled>Select a product</option>
                {product.map((pa) => (
                  <option key={pa.id} value={pa.id}>
                    {pa.productName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Request Selection */}
          {request.length > 0 && (
            <div>
              <p className="font-semibold mb-1">Request</p>
              <select
                name="requestId"
                value={formData.requestId}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="" disabled>Select a request</option>
                {request.map((re) => (
                  <option key={re.id} value={re.id}>
                    {re.requestId}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Other Input Fields */}
          {renderField('Product Type', 'productType')}
          {renderField('Name', 'name')}
          {renderField('IMEI Number From', 'imeiNumberFrom')}
          {renderField('IMEI Number To', 'imeiNumberTo')}
          {renderField('Assign Time', 'assignTime', 'date')}

          {/* Boolean Fields */}
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <span className="text-gray-700">In Hands:</span>
              <input
                type="checkbox"
                name="inHands"
                checked={formData.inHands === true}
                onChange={handleInputChange}
                className="w-5 h-5"
              />
            </label>

            <label className="flex items-center space-x-2">
              <span className="text-gray-700">Is Assign:</span>
              <input
                type="checkbox"
                name="isAssign"
                checked={formData.isAssign === true}
                onChange={handleInputChange}
                className="w-5 h-5"
              />
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-green-700 transition-all"
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

  // return (
  //   <div className="min-h-screen flex flex-col items-center justify-center">
  //     <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
  //       {/* Header */}
  //       <div className="flex items-center space-x-4 mb-8">
  //         <h1 className="text-3xl font-bold">
  //           {location.state?.productDetails
  //             ? 'Edit Product Assign'
  //             : 'Add Product Assign'}
  //         </h1>
  //       </div>

  //       {/* Photo Section */}
  //       <div className="flex items-center space-x-2 mb-6">
  //         <img
  //           src={image || 'https://i.pravatar.cc/150?img=5'}
  //           alt="Employee"
  //           className="w-24 h-24 rounded-full object-cover"
  //         />
  //         <input
  //           type="file"
  //           accept="image/*"
  //           name="file"
  //           className="ml-4 border p-2 rounded"
  //           onChange={handleFileChange}
  //         />
  //         {formData.file && (
  //           <button
  //             onClick={() => {
  //               setFormData({ ...formData, file: null });
  //               setImage('');
  //             }}
  //             className="ml-2 text-red-500"
  //           >
  //             Remove
  //           </button>
  //         )}
  //       </div>

  //       {/* Form Fields */}
  //       <div className="space-y-4">
  //         <div>
  //           <div className="flex mb-4">
  //             {branches.length > 0 && (
  //               <div className="space-y-4">
  //                 <div>
  //                   <p className="font-semibold mb-1">Branch</p>
  //                   <select
  //                     name="branchId"
  //                     value={formData.branchId}
  //                     onChange={handleInputChange}
  //                     className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
  //                   >
  //                     <option value="" disabled>Select a Branch</option>
  //                     {branches.map((branch) => (
  //                       <option key={branch.id} value={branch.id}>
  //                         {branch.branchName}
  //                       </option>
  //                     ))}
  //                   </select>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //           {staff.length > 0 && (
  //             <div className="flex flex-col">
  //               <label className="font-semibold mb-2">Person:</label>
  //               <select
  //                 name="staffId"
  //                 value={formData.staffId}
  //                 onChange={handleInputChange}
  //                 className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
  //               >
  //                 <option value="" disabled>
  //                   Select Staff
  //                 </option>
  //                 {staff.map((staffMember) => (
  //                   <option key={staffMember.id} value={staffMember.id}>
  //                     {staffMember.name}
  //                   </option>
  //                 ))}
  //               </select>
  //             </div>
  //           )}
  //           <div className="flex mb-4">
  //             {product.length > 0 && (
  //               <div className="space-y-4">
  //                 <div>
  //                   <p className="font-semibold mb-1">product</p>
  //                   <select
  //                     name="product"
  //                     value={formData.product}
  //                     onChange={handleProductChange}
  //                     className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
  //                   >
  //                     <option value="" disabled>Select a product</option>
  //                     {product.map((pa) => (
  //                       <option key={pa.id} value={pa.id}>
  //                         {pa.productName
  //                         }
  //                       </option>
  //                     ))}
  //                   </select>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //           <div className="flex mb-4">
  //             {request.length > 0 && (
  //               <div className="space-y-4">
  //                 <div>
  //                   <p className="font-semibold mb-1">request</p>
  //                   <select
  //                     name="requestId"
  //                     value={formData.requestId}
  //                     onChange={handleInputChange}
  //                     className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
  //                   >
  //                     <option value="" disabled>Select a request</option>
  //                     {request.map((re) => (
  //                       <option key={re.id} value={re.id}>
  //                         {re.requestId}
  //                       </option>
  //                     ))}
  //                   </select>
  //                 </div>
  //               </div>
  //             )}

  //           </div>
  //           {renderField('product Type', 'productType')}
  //           {/* {renderField('Is Assign', 'isAssign', 'boolean')} */}
  //           {/* {renderField('In Hands', 'inHands', 'boolean')} */}
  //           {renderField('name', 'name')}
  //           {renderField('IMEI Number from', 'imeiNumberFrom')}
  //           {renderField('IMEI Number To', 'imeiNumberTo')}
  //           {/* {renderField('assigned Qty', 'assignedQty')} */}
  //           {renderField('assign Time', 'assignTime', 'date')}

  //           {/* {renderField('numberOfProducts', 'numberOfProducts')} */}

  //           <label className="block">
  //             <span className="block text-gray-700">In Hands:</span>
  //             <input
  //               type="checkbox"
  //               name="inHands"
  //               checked={formData.inHands === true}  // ensure it is boolean true or false
  //               onChange={handleInputChange}
  //               className="w-full p-2 border rounded-md"
  //             />
  //           </label>

  //           <label className="block">
  //             <span className="block text-gray-700">Is Assign:</span>
  //             <input
  //               type="checkbox"
  //               name="isAssign"
  //               checked={formData.isAssign === true}  // ensure it is boolean true or false
  //               onChange={handleInputChange}
  //               className="w-full p-2 border rounded-md"
  //             />
  //           </label>


  //         </div>
  //       </div>

  //       {/* Buttons */}
  //       <div className="flex justify-center space-x-4 mt-6">
  //         <button
  //           onClick={handleSave}
  //           className="bg-green-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-red-600 transition-all"
  //         >
  //           Save
  //         </button>
  //         <button
  //           onClick={handleCancel}
  //           className="bg-black text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-gray-800 transition-all"
  //         >
  //           Cancel
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default AddEditProductAssign;
