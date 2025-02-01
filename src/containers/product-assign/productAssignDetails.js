import React, { useState, useEffect } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { useLocation } from 'react-router-dom';

const ProductAssignDetails = () => {
  const location = useLocation();
  const productAssign = location.state?.productAssignDetails || {};
  const [productAssignData, setProductAssignData] = useState({});

  useEffect(() => {
    const productAssignDetails = async () => {
      try {
        const response = await ApiService.post('/product-assign/getProductAssign', {
          id: productAssign.id,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          console.log(response.data, "fhbgbjh")
          setProductAssignData(response.data || {});
        } else {
          setProductAssignData({});
        }
      } catch (error) {
        console.error('Error fetching product assign details:', error);
        alert('Failed to fetch product assign details.');
      }
    };

    productAssignDetails();
  }, [productAssign.id]);

  return (
    <div className="p-6 space-y-8">
      {/* Staff Details */}
      <div className="flex items-start space-x-8 bg-white p-6 rounded-lg shadow-md">
        <img
          src={productAssignData.staffId?.staffPhoto} // Correct the image field path
          alt="Staff Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
        <div className="space-y-2 w-full">
          <p className="bg-gray-200 p-2 rounded">
            Staff Name: {productAssignData.staffId?.name}
          </p>
          <p className="bg-gray-200 p-2 rounded">
            Phone number: {productAssignData.staffId?.phoneNumber}
          </p>
          <p className="bg-gray-200 p-2 rounded">
            Email: {productAssignData.staffId?.email}
          </p>
          <p className="bg-gray-200 p-2 rounded">
            Staff Branch: {productAssignData.branchId?.branchName}
          </p>
          <p className="bg-gray-200 p-2 rounded">
            Date of Birth: {productAssignData.staffId?.dob}
          </p>
          <p className="bg-gray-200 p-2 rounded">
            Address: {productAssignData.staffId?.address}
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
        <p className="bg-gray-200 p-2 rounded">
          Product Type: {productAssignData.productId?.categoryName}
        </p>
        <p className="bg-gray-200 p-2 rounded">
          Product Name: {productAssignData.productId?.productName}
        </p>
        <p className="bg-gray-200 p-2 rounded">
          Date of Purchase: {productAssignData.productId?.dateOfPurchase}
        </p>
        <p className="bg-gray-200 p-2 rounded">
          Number of Products Assigned: {productAssignData.numberOfProducts}
        </p>
      </div>

      {/* Branch Details */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
        <p className="bg-gray-200 p-2 rounded">
          Branch Name: {productAssignData.branchId?.branchName}
        </p>
        <p className="bg-gray-200 p-2 rounded">
          Branch Address: {productAssignData.branchId?.branchAddress}
        </p>
        <p className="bg-gray-200 p-2 rounded">
          Branch City: {productAssignData.branchId?.city}
        </p>
        <p className="bg-gray-200 p-2 rounded">
          Branch State: {productAssignData.branchId?.state}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-2">
        <p className="bg-gray-200 p-2 rounded">
          product Assign Photo: {productAssignData.productAssignPhoto}
        </p>
        <p className="bg-gray-200 p-2 rounded">
          imei Number From: {productAssignData.imeiNumberFrom}
        </p>
        <p className="bg-gray-200 p-2 rounded">
          imei Number To: {productAssignData.imeiNumberTo}
        </p>
      </div>
    </div>
  );
};

export default ProductAssignDetails;
