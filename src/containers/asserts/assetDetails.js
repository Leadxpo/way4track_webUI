import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const AssetDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const location = useLocation();
  const assetDetailsFromState = location.state?.asset || {};
  console.log(location.state?.assetDetails, '{{{{{{{+++++++++');
  console.log(data, 'gggggg');

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

  const handleEditClick = (assetDetails) => {
    console.log(assetDetails, 'TESTTTTTTTSSSS');
    navigate('/edit-asset', { state: { assetDetails } });
  };

  const handleDeleteClick=async(id)=> {
    console.log(id,"mahesh")
    try {
      const response = await ApiService.post('/asserts/deleteAssertDetails', {
        id,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });
      if (response.status) {
        // setData(response.data || []);
        alert("Asset Delete successfully")
        navigate('/asserts')
      } else {
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching client details data:', error);
      alert('Failed to fetch client details data.');
    }
  }

  return (
    <div className="p-6">
      <div
        className="flex items-right space-x-4"
        style={{ textAlign: 'right' }}
      >
        <button
          className="bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg flex  shadow-lg"
          style={{
            backgroundColor: '#FFF504',
            borderRadius: '25px',
            fontSize: '15px',
            fontWeight: '500',
          }}
          onClick={() => navigate('/add-asset')}
        >
          <span className="text-black mr-2">➕</span> Add Asset
        </button>
      </div>
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 flex gap-4 items-center">
        <img
          src={data.assetPhoto}
          // src="https://res.cloudinary.com/dabzdwxet/image/upload/v1734614941/venue_profile-1_bpo7p8.jpg"
          alt={data.assertsName}
          className="w-40 h-40 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{data.assertsName}</h2>
          <p className="text-gray-500">{data.branchName}</p>
          <p className="text-gray-500">{data.status}</p>
          <p className="text-gray-500">₹{data.price}</p>
        </div>
        <div className="ml-auto">
          <button
            className="ml-auto bg-green-500 text-white px-4 py-2 m-1 rounded"
            onClick={() => handleEditClick(data)}
          >
            Edit Details
          </button>
          <button
            className="ml-auto bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => handleDeleteClick(data.id)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Amount Section */}
      <div
        className="rounded-lg py-4 mt-4 shadow-md"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '9px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p
          className="p-2"
          style={{
            color: '#575757',
            fontSize: '20px',
            fontWeight: '600',
            paddingLeft: '20px',
          }}
        >
          Asset Name: {data.assertsName}
        </p>
      </div>
      <div
        className="rounded-lg py-4 mt-4 shadow-md"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '9px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p
          className="p-2"
          style={{
            color: '#575757',
            fontSize: '20px',
            fontWeight: '600',
            paddingLeft: '20px',
          }}
        >
          Asset Amount: ₹{data.price}
        </p>
      </div>
      <div
        className="rounded-lg py-4 mt-4 shadow-md"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '9px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p
          className="p-2"
          style={{
            color: '#575757',
            fontSize: '20px',
            fontWeight: '600',
            paddingLeft: '20px',
          }}
        >
          Asset Type: {data.assetType}
        </p>
      </div>
      {/* <div
        className="rounded-lg py-4 mt-4 shadow-md"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '9px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p
          className="p-2"
          style={{
            color: '#575757',
            fontSize: '20px',
            fontWeight: '600',
            paddingLeft: '20px',
          }}
        >
          Price: ₹{data.assertsAmount}
        </p>
      </div> */}
      <div
        className="rounded-lg py-4 mt-4 shadow-md"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '9px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p
          className="p-2"
          style={{
            color: '#575757',
            fontSize: '20px',
            fontWeight: '600',
            paddingLeft: '20px',
          }}
        >
          Asset Quantity: {data.quantity}
        </p>
      </div>
      <div
        className="rounded-lg py-4 mt-4 shadow-md"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '9px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p
          className="p-2"
          style={{
            color: '#575757',
            fontSize: '20px',
            fontWeight: '600',
            paddingLeft: '20px',
          }}
        >
          Branch: {data.branchName}
        </p>
      </div>
      <div
        className="rounded-lg py-4 mt-4 shadow-md"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '9px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p
          className="p-2"
          style={{
            color: '#575757',
            fontSize: '20px',
            fontWeight: '600',
            paddingLeft: '20px',
          }}
        >
          Asset Description: {data.description}
        </p>
      </div>
      <div
        className="rounded-lg py-4 mt-4 shadow-md"
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '9px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <p
          className="p-2"
          style={{
            color: '#575757',
            fontSize: '20px',
            fontWeight: '600',
            paddingLeft: '20px',
          }}
        >
          Asset Purchase Date:{' '}
          {data?.purchaseDate ? data.purchaseDate.split('T')[0] : 'N/A'}
        </p>
      </div>
      {/* <div className="rounded-lg py-4 mt-4">
        <p className="bg-white shadow-md p-2">
          Assert Quantity: {data.quantity}
        </p>
      </div> */}
      {/* UPI Details */}
      {/* <div
        className="bg-gray-100 rounded-lg shadow-md p-4 mt-4"
        style={{ backgroundColor: '#E6E6E6' }}
      >
        <h3
          className="font-semibold"
          style={{ color: '#575757', fontSize: '20px', fontWeight: '600' }}
        >
          UPI Details
        </h3>
        <div
          className="space-y-2"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            UPI: {data.paymentType}
          </p>
        </div>
        <div
          className="rounded-lg py-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            Bank Name: {data.bankName}
          </p>
        </div>
      </div>

      
      <div
        className="bg-gray-100 rounded-lg shadow-md p-4 mt-4"
        style={{ backgroundColor: '#E6E6E6' }}
      >
        <h3
          className="font-semibold"
          style={{ color: '#575757', fontSize: '20px', fontWeight: '600' }}
        >
          Bank Details
        </h3>

        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            Bank Name: {data.bankName}
          </p>
        </div>
        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            Vender Name: {data.venderName}
          </p>
        </div>
        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            Account Number: {data.accountNumber}
          </p>
        </div>
        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            IFSC Code: {data.ifscCode}
          </p>
        </div>
        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            Branch Name: {data.branchName}
          </p>
        </div>
      </div>

      
      <div
        className="bg-gray-100 rounded-lg shadow-md p-4 mt-4"
        style={{ backgroundColor: '#E6E6E6' }}
      >
        <h3
          className="font-semibold"
          style={{ color: '#575757', fontSize: '20px', fontWeight: '600' }}
        >
          Card Details
        </h3>

        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            Card Number: {data.cardNumber}
          </p>
        </div>
        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            Bank Name: {data.bankName}
          </p>
        </div>
      </div>

      <div
        className="bg-gray-100 rounded-lg shadow-md p-4 mt-4"
        style={{ backgroundColor: '#E6E6E6' }}
      >
        <h3
          className="font-semibold"
          style={{ color: '#575757', fontSize: '20px', fontWeight: '600' }}
        >
          EMI Details
        </h3>

        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            Loan ID: {data.loanId}
          </p>
        </div>
        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            Principal Amount: {data.principalAmount}
          </p>
        </div>
        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            Interest Amount: {data.interestAmount}
          </p>
        </div>
        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            EMI Amount: {data.emiAmount}
          </p>
        </div>
        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className=" p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            term: {data.term}
          </p>
        </div>
      </div>

      <div
        className="bg-gray-100 rounded-lg shadow-md p-4 mt-4"
        style={{ backgroundColor: '#E6E6E6' }}
      >
        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            Starting Month: {data.startMonth}
          </p>
        </div>
        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            Ending Month: {data.endMonth}
          </p>
        </div>
        <div
          className="rounded-lg py-4 mt-4"
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '9px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          <p
            className="p-2"
            style={{ fontSize: '16px', fontWeight: '500', color: '#797979' }}
          >
            Status: {data.status}
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default AssetDetails;
