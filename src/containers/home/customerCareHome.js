import React, { useState } from 'react';
import Table from '../../components/Table';
const CustomerCareHome = () => {
  const [isPurchaseSelected, setIsPurchaseSelected] = useState('');
  const getElement = () => {
    switch (isPurchaseSelected) {
      case 'purchase':
        return <Table />;
      case 'remaining':
        return (
          <div className="border border-green-500 rounded-md p-6">
            <p>
              <strong>Invoice:</strong>
            </p>
            <p>
              <strong>Number of Items:</strong>
            </p>
            <p>
              <strong>Mode of payment:</strong>
            </p>
            <p>
              <strong>Amount:</strong>
            </p>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <select className="border rounded-md px-4 py-2">
            <option>All</option>
            <option>Visakhapatnam</option>
          </select>
          <input
            type="text"
            placeholder="Total Tickets :340"
            disabled
            className="border rounded-md px-4 py-2 w-48 text-center"
          />
          <input
            type="text"
            placeholder="Pending's : 200"
            disabled
            className="border rounded-md px-4 py-2 w-48 text-center"
          />
          <input
            type="text"
            placeholder="Client Phone no"
            className="bg-green-600 text-white px-2 outline-none rounded-md"
          />
        </div>
      </div>

      {/* Customer Details */}
      <div className="border border-green-500 rounded-md p-6 flex justify-between items-center">
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> Praveen
          </p>
          <p>
            <strong>Phone Number:</strong> +91 99887 66554
          </p>
          <p>
            <strong>Address:</strong> *******************************
          </p>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-green-100 text-green-700 rounded-md"
              onClick={() => setIsPurchaseSelected('purchase')}
            >
              Purchase
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={() => setIsPurchaseSelected('remaining')}
            >
              Remaining Order
            </button>
          </div>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/150"
            alt="Customer"
            className="rounded-md border w-32 h-32 object-cover"
          />
        </div>
      </div>

      {/* Invoice Details */}
      {getElement()}

      {/* Description */}
      <p className="text-gray-600">
        <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
        sociis natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus.
      </p>
    </div>
  );
};

export default CustomerCareHome;
