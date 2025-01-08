import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
const ClientProfile = () => {
  const location = useLocation();
  const clientDetailsFromState = location.state?.clientDetails || {};
  const [clientDetails, setClientDetails] = useState({});
  const [clientDetailsData, setClientDetailsData] = useState([]);

  useEffect(() => {
    const fetchClientDetailsData = async () => {
      try {
        const response = await ApiService.post('/dashboards/getDetailClientData', {
          clientId: clientDetailsFromState.clientId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          // Ensure client details data is an array
          setClientDetailsData(response.data || []);
        } else {
          setClientDetailsData([]);
        }
      } catch (error) {
        console.error('Error fetching client details data:', error);
        alert('Failed to fetch client details data.');
      }
    };
    fetchClientDetailsData();
  }, [clientDetailsFromState.clientId]);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const response = await ApiService.post('/client/getClientDetails', {
          clientId: clientDetailsFromState.clientId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          const client = response.data?.[0];
          setClientDetails({
            ...client,
            name: client.name,
            phone: client.phoneNumber,
            email: client.email,
            branch: client.branchName,
            dob: client.dob,
            address: client.address,
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
      <p className="font-bold text-xl">Client ID</p>
      <div className="flex items-start space-x-8 bg-white p-6 rounded-lg shadow-md">
        <img
          src={clientDetails.clientPhoto}
          alt="Vendor"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="space-y-2">
          <p className="text-gray-800 font-bold text-xl">
            Client Name : {clientDetails.name}
          </p>
          <p className="text-gray-800">Phone number : {clientDetails.phone}</p>
          <p className="text-gray-800">Email : {clientDetails.email}</p>
          <p className="text-gray-800">Client Branch : {clientDetails.branch}</p>
          <p className="text-gray-800">Date of Birth : {clientDetails.dob}</p>
          <p className="text-gray-800">Address : {clientDetails.address}</p>
        </div>
      </div>

      {/* Client Pitchers Table */}
      <p className="font-bold text-xl">Client Pitchers</p>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-4">Voucher Id</th>
              <th className="py-2 px-4">Voucher Name</th>
              <th className="py-2 px-4">Product Type</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {clientDetailsData.map((pitcher, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 text-center">{pitcher.voucherId}</td>
                <td className="py-2 px-4 text-center">{pitcher.voucherName}</td>
                <td className="py-2 px-4 text-center">{pitcher.productType}</td>
                <td className="py-2 px-4 text-center">{pitcher.quantity}</td>
                <td className="py-2 px-4 text-center">{pitcher.amount}</td>
                <td className="py-2 px-4 text-center">{pitcher.paymentStatus}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Save and Cancel Buttons */}
      <div className="flex justify-center space-x-4">
        <button className="px-8 py-2 bg-red-500 text-white rounded-md font-bold hover:bg-red-600">
          Save
        </button>
        <button className="px-8 py-2 bg-gray-300 text-gray-700 rounded-md font-bold hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ClientProfile;
