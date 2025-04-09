import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';

const RequestDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const requestData = location.state?.requestDetails || {};



  const [formData, setFormData] = useState({

  });

  if (formData) {
    console.log("formDataaaaaaaa aaaaaa", formData)
  }



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
          fromDate: data.fromDate || '',
          toDate: data.toDate || '',
          requestTo: requestData?.RequestTo,
          branch: requestData?.branchName,
          
products:data.products || '',

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
        <h1 className="text-3xl font-bold">Request Raise Details</h1>

        <div className="space-y-4">

          <div>
            <label className="font-semibold">Request Type</label>
            <input type="text" name="requestType" value={formData?.requestType} className="w-full p-3 border rounded-md bg-white" />
          </div>


          <div>
            <label className="font-semibold">Request To</label>
            <input type="text" name="requestTo" value={formData?.requestTo} className="w-full p-3 border rounded-md bg-white" />
          </div>

          <div>
            <label className="font-semibold">Branch</label>
            <input type="text" name="branch" value={formData.branch} className="w-full p-3 border rounded-md bg-white" />
          </div>

          <div>
            <label className="font-semibold">Description</label>
            <input type="text" name="description" value={formData.description} className="w-full p-3 border rounded-md bg-white" />
          </div>

          <div>
            <label className="font-semibold">Request For</label>
            <input type="text" name="requestFor" value={formData.requestFor} className="w-full p-3 border rounded-md bg-white" />
          </div>

          {formData.requestType === "products" &&(
  <>
          {formData?.products?.map((row, index) => (
            <div key={index} className="flex items-center space-x-4 mb-3 bg-white p-3 shadow-md rounded-md w-full max-w-2xl">
              {/* Product Field */}
              <div className="flex-1">
                <label className="font-semibold">Product:</label>
                <div className="flex items-center border rounded-md p-2 bg-gray-100">
                  <input
                    type="text"
                    value={row.product}
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
                  placeholder="Enter Amount"
                  className="w-full border rounded-md p-2 bg-gray-100"
                />
              </div>
          

            </div>
          ))}</>)}

          {formData?.requestType==="leaveRequest"&&(<> <div>
            <label className="font-semibold">From Leave</label>
            <input type="date" name="fromDate" value={formData.fromDate.slice(0, 10)} className="w-full p-3 border rounded-md bg-white" />
          </div>

          <div>
            <label className="font-semibold">To leave</label>
            <input type="date" name="toDate" value={formData.toDate.slice(0, 10)} className="w-full p-3 border rounded-md bg-white" />
          </div></>)}

        
        </div>


      </div>
    </div>
  );
};

export default RequestDetails;
