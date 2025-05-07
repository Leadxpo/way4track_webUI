
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';


const RequestDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState([]);
  const [subDealer, setSubDealer] = useState([]);
  const [branch, setBranch] = useState([]);

  const requestData = location.state?.requestDetails || {};
  

  const [formData, setFormData] = useState({
    requestType: '',
    requestFrom: '',
    requestTo: '', branch: '',
    requestFor: '',
    description: '',
    products: [{ product: '', amount: '' }],
    createdDate: '',
    status: '',
    fromDate: "",
    toDate: "",
    // subDealerId: Number(requestData.subDealerId) || '',
    requestId: '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
  });


  // getRequestDetails
  const fetchStaffData = async () => {
    try {
      const response = await ApiService.post('/staff/getStaffNamesDropDown');
      if (response.status) {
        setStaffData(response.data);

        console.log("fetchStaffData fetchStaffData", response.data)
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

  const handleBranchChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRequestToChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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


  useEffect(() => {
    if (requestData.requestId) {
      fetchRequestRaiseById();
    }
  }, [requestData.requestId]);



  const fetchRequestRaiseById = async () => {
    if (!requestData.requestId) return;

    try {
      const response = await ApiService.post('/requests/getRequestDetails', {
        id: requestData.requestId,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      if (response.status) {
        console.log("10th class", response.data)
        const data = response.data;
        setFormData({
          id: data.requestId || '',
          requestType: data.requestType || '',
          description: data.description || '',
          requestFor: data.requestFor || '',
          fromDate: data?.fromDate || '',
          toDate: data?.toDate || '',
          requestTo:data?.requestTo.id
          ,
          branch:data?.branchId
          .id,
          
          products: data.products || '',

        });
      } else {
        console.error('Error fetching request details');
      }
    } catch (error) {
      console.error('Error fetching request details:', error);
    }
  };




  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">
          View Request Details
          </h1>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">

          <div>
            <p className="font-semibold mb-1">Request Type</p>
            <select
            disabled
              name="requestType"
              value={formData.requestType}
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
          
          <div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2">Request To:</label>
              <select
              disabled
                name="requestTo"
                value={formData.requestTo}
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
              disabled
                name="branch"
                value={formData.branch}
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
              placeholder="Enter Address"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>


          {formData?.requestType === "products" ? (
            <>
              {formData?.products?.map((row, index) => (
                <div key={index} className="flex items-center space-x-4 mb-3 bg-white p-3 shadow-md rounded-md w-full max-w-2xl">

                  {/* Product Field */}
                  <div className="flex-1">
                    <label className="font-semibold">Product:</label>
                    <div className="flex items-center border rounded-md p-2 bg-gray-100">
                      <input
                        type="text"
                        value={row?.product}
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
                      value={row?.amount}
                      placeholder="Enter Amount"
                      className="w-full border rounded-md p-2 bg-gray-100"
                    />
                  </div>

             
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
                  placeholder="Enter Request For"
                  className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
              </div>
            )}

          {formData?.requestType === "leaveRequest" && (<><div className="mt-4">
            <p className="font-semibold mb-1">Leave From Date</p>
            <input
              type="date"
              name="fromDate"
              value={formData?.fromDate.slice(0, 10) || ""}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>

            <div className="mt-4">
              <p className="font-semibold mb-1">Leave To Date</p>
              <input
                type="date"
                name="toDate"
                value={formData?.toDate.slice(0, 10) || ""}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              />
            </div></>)}

        </div>
      
      </div>
    </div>
  );
};

export default RequestDetails;

