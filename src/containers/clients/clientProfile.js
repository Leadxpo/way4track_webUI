import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
const ClientProfile = () => {
  const location = useLocation();
  const clientDetailsFromState = location.state?.clientDetails || {};
  console.log(location.state?.clientDetails, ":::::::")

  console.log(clientDetailsFromState, ":::::::")
  const [clientDetails, setClientDetails] = useState([]);
  const [clientDetailsData, setClientDetailsData] = useState([]);

  useEffect(() => {
    const fetchClientDetailsData = async () => {
      try {
        const response = await ApiService.post('/technician/getClientDataForTechniciansTable', {
          clientId: clientDetailsFromState.clientId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        console.log('Client Details Data:', response.data.data);
        setClientDetailsData(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error('Error fetching client details data:', error);
        setClientDetailsData([]); // Fallback to an empty array
      }
    };
    fetchClientDetailsData();
  }, [clientDetailsFromState.clientId]);


  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await ApiService.post('/client/getClientDetailsById', {
          clientId: clientDetailsFromState.clientId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          const client = response.data;
          setClientDetails({
            ...client,
            name: client.name,
            phoneNumber: client.phoneNumber,
            email: client.email,
            branch: client.branch.branchName,
            dob: client.dob,
            address: client.address,
            gstNumber: client.gstNumber,
            clientPhoto: client.clientPhoto
          });
        } else {
          setClientDetails({})
        }

      } catch (error) {
        console.error('Error fetching branch details:', error);
        alert('Failed to fetch branch details.');
      }
    };
    fetchClientDetails();

  }, [clientDetailsFromState.clientId]);

  return (
    <div className="p-6 space-y-8">
      {/* Vendor Information */}
      <p className="font-bold text-xl">Customer ID : {clientDetails.clientId}</p>
      <div className="flex items-start space-x-8 bg-white p-6 rounded-lg shadow-md">
        <img
          src={clientDetails.clientPhoto}
          alt="Vendor"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="space-y-2">
          <p className="text-gray-800 font-bold text-xl">
            Customer Name : {clientDetails.name}
          </p>
          <p className="text-gray-800">Phone number : {clientDetails.phoneNumber}</p>
          <p className="text-gray-800">Email : {clientDetails.email}</p>
          <p className="text-gray-800">Customer Branch : {clientDetails.branch}</p>
          <p className="text-gray-800">GST Number : {clientDetails.gstNumber}</p>
          <p className="text-gray-800">Date of Birth : {clientDetails.dob}</p>
          <p className="text-gray-800">Address : {clientDetails.address}</p>
        </div>
      </div>

      {/* Client Pitchers Table */}
      <p className="font-bold text-xl">Customer Pitchers</p>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-4">Work Id</th>
              <th className="py-2 px-4">Product Type</th>
              <th className="py-2 px-4">Vehicle Number</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(clientDetailsData) && clientDetailsData.length > 0 ? (
              clientDetailsData.map((pitcher, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4 text-center">{pitcher.workId}</td>
                  <td className="py-2 px-4 text-center">{pitcher.productType}</td>
                  <td className="py-2 px-4 text-center">{pitcher.vehicleNumber}</td>
                  <td className="py-2 px-4 text-center">{pitcher.quantity}</td>
                  <td className="py-2 px-4 text-center">{pitcher.amount}</td>
                  <td className="py-2 px-4 text-center">{pitcher.paymentStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No data available</td>
              </tr>
            )}

          </tbody>

        </table>
      </div>

    </div>
  );
};

export default ClientProfile;
