import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const AssetDetails = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const assetDetailsFromState = location.state?.assetDetails || {};
  console.log(location.state?.assetDetails, "{{{{{{{+++++++++")

  useEffect(() => {
    const getAssertDetails = async () => {
      try {
        const response = await ApiService.post('/asserts/getAssertDetails', {
          id: assetDetailsFromState.id,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        if (response.status) {
          setData(response.data || []);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching client details data:', error);
        alert('Failed to fetch client details data.');
      }
    };
    getAssertDetails();
  }, [assetDetailsFromState.id]);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 flex gap-4 items-center">
        <img
          src={data.assetPhoto}
          alt={data.assertsName}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{data.assertsName}</h2>
          <p className="text-gray-500">{data.branchName}</p>
        </div>
        {/* <button className="ml-auto bg-green-500 text-white px-4 py-2 rounded">
          More Details
        </button> */}
      </div>

      {/* Amount Section */}
      <div className="rounded-lg py-4 mt-4">
        <p className="bg-white shadow-md p-2">Assert Amount: {data.price}</p>
      </div>
      <div className="rounded-lg py-4 mt-4">
        <p className="bg-white shadow-md p-2">
          Assert Quantity: {data.quantity}
        </p>
      </div>
      {/* UPI Details */}
      <div className="bg-gray-100 rounded-lg shadow-md p-4 mt-4">
        <h3 className="font-semibold">Payment Details Details</h3>
        <div className="space-y-2">
          <p className="bg-white rounded-lg p-2">
            Payment Details: {data.paymentType}
          </p>
        </div>
        <div className="rounded-lg py-4 mt-4">
          <p className="bg-white shadow-md p-2">
            Assert description: {data.description}
          </p>
        </div>

        <div className="rounded-lg py-4 mt-4">
          <p className="bg-white shadow-md p-2">
            Assert purchaseDate: {data.purchaseDate}
          </p>
        </div>

        <div className="rounded-lg py-4 mt-4">
          <p className="bg-white shadow-md p-2">
            Assert voucherId: {data.voucherId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
