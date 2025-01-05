import React from 'react';

const AddAmount = () => {
  const handleSave = () => {};
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">Add Amount</h1>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Account Holder Name */}
          <div>
            <p className="font-semibold mb-1">Type</p>
            <input
              type="text"
              name="type"
              placeholder="Type"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">UPI</p>
            <input
              type="text"
              name="upi"
              placeholder="UPI"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Transaction ID</p>
            <input
              type="text"
              name="transactionId"
              placeholder="Transaction ID"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Amount</p>
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-red-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-red-600 transition-all"
            >
              Add Amount
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAmount;
