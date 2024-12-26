import React from 'react';

const AssetDetails = () => {
  const data = {
    image: 'https://via.placeholder.com/150', // Replace with actual image
    name: 'Motorbike',
    location: 'Visakhapatnam',
    pendingEMI: '2 EMI Pending',
    amountDue: '₹50000/-',
    assetAmount: '₹100000/-',
    cashAmount: '₹50000/-',
    upiDetails: {
      upi: 'Sai@434',
      bankName: '',
      amount: '₹50000/-',
    },
    bankDetails: {
      bankName: '',
      vendorName: '',
      accountNumber: '',
      ifscCode: '',
      branchName: '',
    },
    cardDetails: {
      cardNumber: '',
      bankName: '',
      amount: '₹80000/-',
    },
    emiDetails: {
      loanId: '',
      principalAmount: '',
      interestAmount: '',
      emiAmount: '',
      stream: '',
      startingMonth: '',
      endingMonth: '',
      status: '',
    },
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-md p-6 flex gap-4 items-center">
        <img
          src={data.image}
          alt={data.name}
          className="w-32 h-32 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{data.name}</h2>
          <p className="text-gray-500">{data.location}</p>
          <p className="text-red-500">{data.pendingEMI}</p>
          <p className="font-semibold">{data.amountDue}</p>
        </div>
        <button className="ml-auto bg-green-500 text-white px-4 py-2 rounded">
          More Details
        </button>
      </div>

      {/* Amount Section */}
      <div className="rounded-lg py-4 mt-4">
        <p className="bg-white shadow-md p-2">
          Assert Amount: {data.assetAmount}
        </p>
        <p className="bg-white shadow-md mt-2 p-2">Cash: {data.cashAmount}</p>
      </div>

      {/* UPI Details */}
      <div className="bg-gray-100 rounded-lg shadow-md p-4 mt-4">
        <h3 className="font-semibold">UPI Details</h3>
        <div className="space-y-2">
          <p className="bg-white rounded-lg p-2">UPI: {data.upiDetails.upi}</p>
          <p className="bg-white rounded-lg p-2">
            Bank Name: {data.upiDetails.bankName}
          </p>
          <p className="bg-white rounded-lg p-2">
            Amount: {data.upiDetails.amount}
          </p>
        </div>
      </div>

      {/* Bank Details */}
      <div className="bg-gray-100 rounded-lg shadow-md p-4 mt-4">
        <h3 className="font-semibold">Bank Details</h3>
        <div className="space-y-2">
          <p className="bg-white rounded-lg p-2">
            Bank Name: {data.bankDetails.bankName}
          </p>
          <p className="bg-white rounded-lg p-2">
            Vendor Name: {data.bankDetails.vendorName}
          </p>
          <p className="bg-white rounded-lg p-2">
            Account Number: {data.bankDetails.accountNumber}
          </p>
          <p className="bg-white rounded-lg p-2">
            IFSC Code: {data.bankDetails.ifscCode}
          </p>
          <p className="bg-white rounded-lg p-2">
            Branch Name: {data.bankDetails.branchName}
          </p>
        </div>
      </div>

      {/* Card Details */}
      <div className="bg-gray-100 rounded-lg shadow-md p-4 mt-4">
        <h3 className="font-semibold">Card Details</h3>
        <div className="space-y-2">
          <p className="bg-white rounded-lg p-2">
            Card Number: {data.cardDetails.cardNumber}
          </p>
          <p className="bg-white rounded-lg p-2">
            Bank Name: {data.cardDetails.bankName}
          </p>
          <p className="bg-white rounded-lg p-2">
            Amount: {data.cardDetails.amount}
          </p>
        </div>
      </div>

      {/* EMI Details */}
      <div className="bg-gray-100 rounded-lg shadow-md p-4 mt-4">
        <h3 className="font-semibold">EMI Details</h3>
        <div className="space-y-2">
          <p className="bg-white rounded-lg p-2">
            Loan ID: {data.emiDetails.loanId}
          </p>
          <p className="bg-white rounded-lg p-2">
            Principal Amount: {data.emiDetails.principalAmount}
          </p>
          <p className="bg-white rounded-lg p-2">
            Interest Amount: {data.emiDetails.interestAmount}
          </p>
          <p className="bg-white rounded-lg p-2">
            EMI Amount: {data.emiDetails.emiAmount}
          </p>
          <p className="bg-white rounded-lg p-2">
            Stream: {data.emiDetails.stream}
          </p>
          <p className="bg-white rounded-lg p-2">
            Starting Month: {data.emiDetails.startingMonth}
          </p>
          <p className="bg-white rounded-lg p-2">
            Ending Month: {data.emiDetails.endingMonth}
          </p>
          <p className="bg-white rounded-lg p-2">
            Status: {data.emiDetails.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
