import React from 'react';
import { useLocation } from 'react-router-dom';

const SalesVisitDetails = () => {
  const location = useLocation();
  const visitDetails = location.state?.visit || {};

  return (
    <div className="p-8 space-y-6 mx-auto bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-10 text-gray-800">Visit Details</h2>

      <div className="space-y-4 text-lg">
        {[
          'id',
          'visitId',
          'name',
          'phone',
          'email',
          'visitStaff',
          'companyName',
          'address',
        ].map((key) => (
          <p key={key} className="text-lg font-medium">
            {key.replace(/([A-Z])/g, ' $1').trim()} :{' '}
            {visitDetails[key] || 'N/A'}
          </p>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        {['Entrance Card', 'Visit Card'].map((title, index) => (
          <div key={index} className="w-1/2">
            <h3 className="font-bold text-center text-lg">{title}</h3>
            <div className="p-4 border rounded-lg text-center h-[153px]">
              <img
                src="/way4track-logo.png"
                alt="Way4Track Logo"
                className="mx-auto my-2"
              />
              <p className="text-green-600 font-semibold">Track Anywhere</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-4 mt-6 bg-gray-200 p-4 rounded-lg">
        {['productType', 'productService', 'quantity'].map((key) => (
          <input
            key={key}
            type="text"
            value={visitDetails[key] || ''}
            placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
            className="w-1/3 p-2 border rounded"
            readOnly
          />
        ))}
      </div>

      <p className="text-sm text-gray-700 mt-4">
        <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </p>

      <div className="text-center">
        <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg">
          Create Estimate
        </button>
      </div>
    </div>
  );
};

export default SalesVisitDetails;
