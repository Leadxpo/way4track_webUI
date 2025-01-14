import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const SubDealerDetails = () => {
  const location = useLocation();
  const subDealerDetailsFromState = location.state?.subDealerDetails || {};
  const [subDealerDetails, setSubDealerDetails] = useState({});
  const [subDealerDetailsData, setSubDealerDetailsData] = useState([]);
  const [photoData, setPhotoData] = useState([]);


  useEffect(() => {
    const fetchSubDealerDetails = async () => {
      try {
        const response = await ApiService.post('/subdealer/getSubDealerDetails', {
          subDealerId: subDealerDetailsFromState.subDealerId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          const subDealer = response.data?.[0];
          setSubDealerDetails({
            ...subDealer,
            name: subDealer.name,
            phone: subDealer.subDealerPhoneNumber,
            email: subDealer.emailId,
            alternatePhoneNumber: subDealer.alternatePhoneNumber,
            aadharNumber: subDealer.aadharNumber,
            address: subDealer.address,
            subDealerPhoto: subDealer.subDealerPhoto,
            branch: subDealer.branchName
          });
        } else {
          setSubDealerDetails({})
        }

      } catch (error) {
        console.error('Error fetching branch details:', error);
        alert('Failed to fetch branch details.');
      }
    };
    fetchSubDealerDetails();

  }, [subDealerDetailsFromState.subDealerId]);


  useEffect(() => {
    const fetchSubDealerDetailsData = async () => {
      try {
        const response = await ApiService.post('/dashboards/getDetailSubDealerData', {
          subDealerId: subDealerDetailsFromState.subDealerId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          // Ensure subDealer details data is an array
          setSubDealerDetailsData(response.data || []);
        } else {
          setSubDealerDetailsData([]);
        }
      } catch (error) {
        console.error('Error fetching subDealer details data:', error);
        alert('Failed to fetch subDealer details data.');
      }
    };
    fetchSubDealerDetailsData();
  }, [subDealerDetailsFromState.subDealerId]);


  useEffect(() => {
    const getProductsPhotos = async () => {
      try {
        const response = await ApiService.post('/dashboards/getProductsPhotos', {
          subDealerId: subDealerDetailsFromState.subDealerId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          // Ensure vendor details data is an array
          setPhotoData(response.data || []);
        } else {
          setPhotoData([]);
        }
      } catch (error) {
        console.error('Error fetching vendor details data:', error);
        alert('Failed to fetch vendor details data.');
      }
    };
    getProductsPhotos();
  }, [subDealerDetailsFromState.subDealerId]);

  return (
    <div className="p-6 space-y-8">
      {/* SubDealer Information */}
      <p className="font-bold text-xl">Sub Dealer ID</p>
      <div className="flex items-start space-x-8 bg-white p-6 rounded-lg shadow-md">
        <img
          src={subDealerDetails.subDealerPhoto}
          alt="subDealer"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="space-y-2">
          <p className="text-gray-800 font-bold text-xl">
            SubDealer Name : {subDealerDetails.name}
          </p>
          <p className="text-gray-800">Phone number : {subDealerDetails.phone}</p>
          <p className="text-gray-800">Email : {subDealerDetails.email}</p>
          <p className="text-gray-800">SubDealer Branch : {subDealerDetails.branch}</p>
          <p className="text-gray-800">Date of Birth : {subDealerDetails.dob}</p>
          <p className="text-gray-800">Address : {subDealerDetails.address}</p>
        </div>
      </div>

      {/* Product Cards */}
      <div className="flex space-x-4">
        {photoData.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 w-48 text-center"
          >
            <img
              src={product.productPhoto}
              alt={product.productName}
              className="w-20 h-20 mx-auto rounded-full object-cover"
            />
            <p className="mt-4 text-gray-800 font-medium">{product.productName}</p>
          </div>
        ))}
      </div>

      {/* sub dealer subDealerDetailsData Table */}
      <p className="font-bold text-xl">Dealer Punchers</p>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-4">Voucher Id</th>
              <th className="py-2 px-4">product Type</th>
              <th className="py-2 px-4">voucher Name</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">quantity</th>
              <th className="py-2 px-4">generation Date</th>
              <th className="py-2 px-4">payment Status</th>
            </tr>
          </thead>
          <tbody>
            {subDealerDetailsData.map((pitcher, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="py-2 px-4 text-center">{pitcher.voucherId}</td>
                <td className="py-2 px-4 text-center">{pitcher.productType}</td>
                <td className="py-2 px-4 text-center">{pitcher.voucherName}</td>
                <td className="py-2 px-4 text-center">{pitcher.amount}</td>
                <td className="py-2 px-4 text-center">
                  {pitcher.quantity}
                </td>
                <td className="py-2 px-4 text-center">{pitcher.generationDate}</td>
                <td
                  className={`py-2 px-4 text-center font-semibold ${pitcher.paymentStatus === 'Paid' ? 'text-green-500' : 'text-red-500'}`}
                >
                  {pitcher.paymentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-bold text-xl">Dealer Business</p>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="py-2 px-4">No.</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Business</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {subDealerDetailsData.map((pitcher, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="py-2 px-4 text-center">{pitcher.no}</td>
                <td className="py-2 px-4 text-center">{pitcher.date}</td>
                <td className="py-2 px-4 text-center">{pitcher.business}</td>
                <td className="py-2 px-4 text-center">{pitcher.amount}</td>
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

export default SubDealerDetails;
