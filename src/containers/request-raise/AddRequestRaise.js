import React, { useState, useEffect } from 'react';
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
    requestType:'',
    requestFrom:'',
    requestTo:'',
    branch: '',
    requestFor:'',
    description:'',
    products:[{ product: '', amount: '' }],
    createdDate:'',
    status:'',
    fromDate:"",
    toDate:"",
    // subDealerId: Number(requestData.subDealerId) || '',
    requestId:'',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
  });
  
  
  const fetchStaffData = async () => {
    try {
      const response = await ApiService.post('/staff/getStaffNamesDropDown');
      if (response.status) {
        setStaffData(response.data);

        console.log("fetchStaffData fetchStaffData",response.data)
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
      alert('Error in fetching sub dealers');
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
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

if (userProfile && userProfile.Data && userProfile.Data.length > 0) {
    const { id, name } = userProfile?.Data[0];
    console.log("ID:", id);
    console.log("Name:", name);
} else {
    console.log("User profile data not found.");
}

    try {
      const payload = {
        requestType: formData.requestType,
        requestTo: Number(formData.requestTo),
        // requestFrom: Number(formData.requestFrom),
        requestFrom:Number(9),
        branch: formData.branch,
        description: formData.description,
        status: "pending",
        products:formData.requestType==="products"?formData.products:null,
        subDealerId: formData.subDealerId || 1,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        requestFor:formData.requestFor,
        fromDate:formData.fromDate,
        toDate:formData.toDate,
      };


      console.log("payload request 1234",payload);
      const response = await ApiService.post(
        '/requests/handleRequestDetails',
        payload
      );
      if (response.status) {
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


  const [rows, setRows] = useState([{ product: "", amount: "" }]);

 // Function to handle adding a new product row
const addRow = () => {
  setFormData((prevData) => ({
    ...prevData,
    products: [...prevData.products, { product: '', amount: '' }],
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
        <option value="assets">Asserts</option>
        <option value="money">Money</option>
        <option value="products">Product</option>
        <option value="personal">Personal</option>
        <option value="leaveRequest">Leave Request</option>
      </select>
          </div>
          {/* <div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Request By:</label>
              <select
                name="requestFrom"
                value={formData.requestFrom}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              >
                <option value="" disabled>
                  Select Request By
                </option>
                {staffData.map((staffMember) => (
                  <option key={staffMember.id} value={staffMember.id}>
                    {staffMember.name}
                  </option>
                ))}
              </select>
            </div>
          </div> */}
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
            {/* {subDealer.length > 0 && ( */}
              {/* <div className="flex flex-col">
                <label className="font-semibold mb-2">
                  Request To subDealer:
                </label>
                <select
                  name="subDealerId"
                  value={formData.subDealerId}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                >
                  <option value="" disabled>
                    Request To subDealer
                  </option>
                  {subDealer.map((staffMember) => (
                    <option key={staffMember.id} value={staffMember.id}>
                      {staffMember.name}
                    </option>
                  ))}
                </select>
              </div> */}
            {/* )} */}
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

          {/* Address */}
          <div>
            <p className="font-semibold mb-1">Description</p>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter Address"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>


          {formData.requestType === "products" ? (
  <>
   {formData.products.map((row, index) => (
  <div key={index} className="flex items-center space-x-4 mb-3 bg-white p-3 shadow-md rounded-md w-full max-w-2xl">
    
    {/* Product Field */}
    <div className="flex-1">
      <label className="font-semibold">Product:</label>
      <div className="flex items-center border rounded-md p-2 bg-gray-100">
        <input
          type="text"
          value={row.product}
          onChange={(e) => handleInputProductChange(index, "product", e.target.value)}
          placeholder="Enter Product"
          className="w-full bg-transparent outline-none"
        />
      </div>
    </div>

    {/* Amount Field */}
    <div className="flex-1">
      <label className="font-semibold">Amount:</label>
      <input
        type="number"
        value={row.amount}
        onChange={(e) => handleInputProductChange(index, "amount", e.target.value)}
        placeholder="Enter Amount"
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

{formData.requestType === "leaveRequest"&&(<><div className="mt-4">
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
</div></>)}

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
