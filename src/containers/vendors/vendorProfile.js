import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const VendorProfile = () => {
  const location = useLocation();
  const vendorDetailsFromState = location.state?.vendorDetails || {};

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
            state: vendor.state,
            bankDetails: vendor.bankDetails,
            alternatePhoneNumber: vendor.alternatePhoneNumber,
            aadharNumber: vendor.aadharNumber,
            GSTNumber: vendor.GSTNumber,
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
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
        <img
          src={vendorDetails.vendorPhoto}
          alt="Vendor"
          className="w-36 h-36 rounded-full object-cover shadow-md"
        />

        <div className="w-full space-y-3">
          <h2 className="text-2xl font-semibold text-gray-900">
            {vendorDetails.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-gray-700 text-sm">
            <div>
              <span className="font-medium">📞 Phone:</span> {vendorDetails.phone}
            </div>
            <div>
              <span className="font-medium">📧 Email:</span> {vendorDetails.email}
            </div>
            <div>
              <span className="font-medium">📱 Alternate Phone:</span> {vendorDetails.alternatePhoneNumber || "N/A"}
            </div>
            <div>
              <span className="font-medium">🆔 Aadhar:</span> {vendorDetails.aadharNumber || "N/A"}
            </div>
            <div>
              <span className="font-medium">🧾 GST:</span> {vendorDetails.GSTNumber || "N/A"}
            </div>
            <div>
              <span className="font-medium">🏦 Bank:</span> {vendorDetails.bankDetails || "N/A"}
            </div>
            <div className="md:col-span-2">
              <span className="font-medium">📍 Address:</span> {vendorDetails.address || "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      {/* <div className="flex space-x-4">
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
      </div> */}

      {/* Vendor Pitchers Table */}
      {/* <p className="font-bold text-xl">Vendor Pitchers</p>
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
      </div> */}

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
