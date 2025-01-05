import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
const ClientProfile = () => {
  const location = useLocation();
  const clientDetailsFromState = location.state?.clientDetails || {};
  const [clientDetails, setClientDetails] = useState({});

  // const clientInfo = {
  //   name: 'K Praveen Sai',
  //   phone: '77788 77788',
  //   email: 'Way4track@gmail.com',
  //   branch: 'Visakhapatnam',
  //   dob: '03 Mar 1970',
  //   address: '***********************',
  // };

  const pitchers = [
    {
      no: '01',
      date: '01-03-2025',
      product: 'Car GPS Tracker',
      items: 12,
      price: '₹2099',
      status: 'Paid',
    },
    {
      no: '02',
      date: '01-03-2025',
      product: 'Fuel Monitoring System',
      items: 34,
      price: '₹5469',
      status: 'Pending',
    },
    {
      no: '03',
      date: '01-03-2025',
      product: 'Car GPS Tracker',
      items: 56,
      price: '₹2099',
      status: 'Paid',
    },
    {
      no: '04',
      date: '01-03-2025',
      product: 'Fuel Monitoring System',
      items: 87,
      price: '₹5469',
      status: 'Pending',
    },
  ];

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
            name: client.branchName,
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
              <th className="py-2 px-4">NO.</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Srvice/Product</th>
              <th className="py-2 px-4">Items</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {pitchers.map((pitcher, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="py-2 px-4 text-center">{pitcher.no}</td>
                <td className="py-2 px-4 text-center">{pitcher.date}</td>
                <td className="py-2 px-4 text-center">{pitcher.product}</td>
                <td className="py-2 px-4 text-center">{pitcher.items}</td>
                <td className="py-2 px-4 text-center">{pitcher.price}</td>
                <td
                  className={`py-2 px-4 text-center font-semibold ${pitcher.status === 'Paid' ? 'text-green-500' : 'text-red-500'}`}
                >
                  {pitcher.status}
                </td>
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
