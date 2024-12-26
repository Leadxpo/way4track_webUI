import React, { useState } from 'react';
import { FaFileCirclePlus } from 'react-icons/fa6';
const PAYMENT_MODES = ['Cash', 'UPI', 'Bank', 'Cheque', 'EMI', 'Card'];
const dropdownOptions = {
  role: ['Manager', 'Accountant', 'Staff'],
  amountGoingTo: ['Account A', 'Account B', 'Account C'],
  bankFrom: ['Bank A', 'Bank B', 'Bank C'],
  bankTo: ['Bank X', 'Bank Y', 'Bank Z'],
};
const paymentModeFields = {
  Cash: [
    { name: 'cashAmount', label: 'Amount' },
    { name: 'price', label: 'Price' },
    { name: 'addAsset', label: 'Add Asset Invoice', type: 'file' },
  ],
  UPI: [
    { name: 'upiId', label: 'UPI ID' },
    {
      name: 'bank',
      label: 'Bank',
      type: 'dropdown',
      options: dropdownOptions.bankFrom,
    },
    { name: 'cashAmount', label: 'Amount' },
    { name: 'price', label: 'Price' },
    { name: 'addAsset', label: 'Add Asset Invoice', type: 'file' },
  ],
  Bank: [
    { name: 'bankName', label: 'Bank Name' },
    { name: 'branch', label: 'Branch' },
    { name: 'ifscNumber', label: 'IFSC Number' },
    { name: 'accountNumber', label: 'Account Number' },
    { name: 'cashAmount', label: 'Amount' },
    { name: 'price', label: 'Price' },
    { name: 'addAsset', label: 'Add Asset Invoice', type: 'file' },
  ],
  Cheque: [
    { name: 'chequeNumber', label: 'Cheque Number' },
    {
      name: 'bank',
      label: 'Bank',
      type: 'dropdown',
      options: dropdownOptions.bankFrom,
    },
    { name: 'cashAmount', label: 'Amount' },
    { name: 'price', label: 'Price' },
    { name: 'addAsset', label: 'Add Asset Invoice', type: 'file' },
  ],
  EMI: [
    { name: 'incisionPayment', label: 'Incision Payment' },
    { name: 'numberOfEmi', label: 'Number Of EMI' },
    { name: 'emi', label: 'EMI' },
    { name: 'startingMonth', label: 'Starting Month' },
    { name: 'endingMonth', label: 'Ending Month' },
    { name: 'cashAmount', label: 'Amount' },
    { name: 'price', label: 'Price' },
    { name: 'addAsset', label: 'Add Asset Invoice', type: 'file' },
  ],
  Card: [
    { name: 'cardNumber', label: 'Card Number' },
    { name: 'cardHaulNumber', label: 'Card Haul Number' },
    { name: 'cashAmount', label: 'Amount' },
    { name: 'price', label: 'Price' },
    { name: 'addAsset', label: 'Add Asset Invoice', type: 'file' },
  ],
};
const AddAsset = () => {
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Cash');
  const handleInputChange = () => {};
  const handleSave = () => {};
  const handleCancel = () => {};
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-2xl w-4/5 max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <h1 className="text-3xl font-bold">Add Asset</h1>
        </div>

        {/* Photo Section */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="p-8 bg-gray-200 rounded-full">
            <FaFileCirclePlus className="text-gray-800" size={30} />
          </div>
          <button className="ml-4 border p-2 rounded">Add Photo</button>
          <button className="ml-2 text-red-500">Remove</button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Form field for Name */}
          <div>
            <p className="font-semibold mb-1">Asset Name</p>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              placeholder="Enter Name"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Vendor Number */}
          <div>
            <p className="font-semibold mb-1">Asset Amount</p>
            <input
              type="text"
              name="amount"
              onChange={handleInputChange}
              placeholder="Enter Amount"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Staff ID */}
          <div>
            <p className="font-semibold mb-1">Asset Type</p>
            <input
              type="text"
              name="type"
              onChange={handleInputChange}
              placeholder="Enter Asset Type"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Designation */}
          <div>
            <p className="font-semibold mb-1">Price</p>
            <input
              type="text"
              name="price"
              onChange={handleInputChange}
              placeholder="Enter Price"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Branch */}
          <div>
            <p className="font-semibold mb-1">Quantity</p>
            <input
              type="text"
              name="quantity"
              onChange={handleInputChange}
              placeholder="Enter Quantity"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Branch</p>
            <select
              name="branch"
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            >
              <option value="">Select Branch</option>
              <option value="Vishakapatnam">Vishakapatnam</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Vijayawada">Vijayawada</option>
              <option value="Kakinada">Kakinada</option>
            </select>
          </div>
          <div>
            <p className="font-semibold mb-1">Description</p>
            <input
              type="text"
              name="des"
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Email */}
          <div>
            <p className="font-semibold mb-1">Purchase Date</p>
            <input
              type="date"
              name="date"
              onChange={handleInputChange}
              placeholder="select date"
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            />
          </div>
          {/* Payment Mode Section */}

          <h3 className="font-bold mb-2">Payment Mode</h3>

          <div className="flex space-x-2 mb-4">
            {PAYMENT_MODES.map((mode) => (
              <button
                key={mode}
                className={`px-4 py-2 rounded ${selectedPaymentMode === mode ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedPaymentMode(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        {/* Dynamic Payment Mode Fields */}
        <div>
          {paymentModeFields[selectedPaymentMode]?.map((field) => (
            <div key={field.name} className="mb-2">
              <label className="block font-semibold">{field.label}</label>
              {field.type === 'dropdown' ? (
                <select
                  name={field.name}
                  value={''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={''}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleSave}
            className="bg-red-600 text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-red-600 transition-all"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-black text-white font-bold py-3 px-8 rounded-md shadow-lg hover:bg-gray-800 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
