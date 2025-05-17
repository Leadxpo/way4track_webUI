import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const VendorProfile = () => {
  const location = useLocation();
  const vendorDetailsFromState = location.state?.vendorDetails || {};
  console.log(vendorDetailsFromState, "+============")
  const [vendorDetails, setVendorDetails] = useState({});
  const [vendorDetailsData, setVendorDetailsData] = useState([]);
  const [photoData, setPhotoData] = useState([]);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await ApiService.post('/vendor/getVendorDetailsById', {
          vendorId: vendorDetailsFromState?.vendorId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });

        if (response.status && response.data) {
          const vendor = response.data; // No need for [0], since it's an object
          setVendorDetails({
            name: vendor.name,
            phone: vendor.vendorPhoneNumber,
            email: vendor.emailId,
            alternatePhoneNumber: vendor.alternatePhoneNumber,
            aadharNumber: vendor.aadharNumber,
            address: vendor.address,
            vendorPhoto: vendor.vendorPhoto,
            branch: vendor.branchName,
          });
        } else {
          setVendorDetails({});
        }
      } catch (error) {
        console.error('Error fetching vendor details:', error);
        alert('Failed to fetch vendor details.');
      }
    };
    fetchVendorDetails();
  }, [vendorDetailsFromState?.vendorId]);


  useEffect(() => {
    const getProductsPhotos = async () => {
      try {
        const response = await ApiService.post(
          '/dashboards/getProductsPhotos',
          {
            vendorId: vendorDetailsFromState?.vendorId,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
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
  }, [vendorDetailsFromState?.vendorId]);

  useEffect(() => {
    const fetchVendorDetailsData = async () => {
      try {
        const response = await ApiService.post(
          '/dashboards/getDetailVendorData',
          {
            vendorId: vendorDetailsFromState?.vendorId,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        if (response.status) {
          setVendorDetailsData(Array.isArray(response.data) ? response.data : []);

          // Ensure vendor details data is an array
          // setVendorDetailsData(response.data || []);
        } else {
          setVendorDetailsData([]);
        }
      } catch (error) {
        console.error('Error fetching vendor details data:', error);
        alert('Failed to fetch vendor details data.');
      }
    };
    fetchVendorDetailsData();
  }, [vendorDetailsFromState?.vendorId]);

  return (
    <div className="p-6 space-y-8">
      {/* Vendor Information */}
      <p className="font-bold text-xl">Vendor ID: {vendorDetailsData[0]?.vendorId || 'N/A'}</p>
      <div className="flex items-start space-x-8 bg-white p-6 rounded-lg shadow-md">
        <img
          src={vendorDetails.vendorPhoto}
          alt="Vendor"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="space-y-2">
          <p className="text-gray-800 font-bold text-xl">
            Vendor Name : {vendorDetails.name}
          </p>
          <p className="text-gray-800">Phone number : {vendorDetails.phone}</p>
          <p className="text-gray-800">Email : {vendorDetails.email}</p>
          <p className="text-gray-800">
            Alternate Phone number : {vendorDetails.alternatePhoneNumber}
          </p>
          {/* <p className="text-gray-800">Branch : {vendorDetails.branch}</p> */}
          <p className="text-gray-800">
            Aadhar Number : {vendorDetails.aadharNumber}
          </p>
          <p className="text-gray-800">Address : {vendorDetails.address}</p>
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
            <p className="mt-4 text-gray-800 font-medium">
              {product.productName}
            </p>
          </div>
        ))}
      </div>

      {/* Vendor Pitchers Table */}
      <p className="font-bold text-xl">Vendor Pitchers</p>
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
            {vendorDetailsData.map((pitcher, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="py-2 px-4 text-center">{pitcher.voucherId || 'N/A'}</td>
                <td className="py-2 px-4 text-center">{pitcher.amount !== null ? pitcher.amount : 'N/A'}</td>
                <td className="py-2 px-4 text-center">{pitcher.paymentStatus || 'N/A'}</td>

                <td className="py-2 px-4 text-center">{pitcher.amount}</td>
                <td className="py-2 px-4 text-center">{pitcher.quantity}</td>
                <td className="py-2 px-4 text-center">
                  {pitcher.generationDate}
                </td>
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

      {/* Save and Cancel Buttons */}
      {/* <div className="flex justify-center space-x-4">
        <button className="px-8 py-2 bg-red-500 text-white rounded-md font-bold hover:bg-red-600">
          Save
        </button>
        <button className="px-8 py-2 bg-gray-300 text-gray-700 rounded-md font-bold hover:bg-gray-400">
          Cancel
        </button>
      </div> */}
    </div>
  );
};

export default VendorProfile;
