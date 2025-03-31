import React from 'react';

const SalesVisitDetails = () => {
  return (
    <div className="p-8 space-y-6 mx-auto p-6 bg-white rounded-lg">
      <h2
        className="text-2xl font-bold mb-10 "
        style={{ fontSize: '32px', fontWeight: '600' }}
      >
        Visit Details
      </h2>
      <div className="space-y-12 text-lg">
        <p style={{ fontSize: '25px', fontWeight: '500' }}>
          Visit ID : 4984TW4
        </p>
        <p style={{ fontSize: '25px', fontWeight: '500' }}>Name : Praveen</p>
        <p style={{ fontSize: '25px', fontWeight: '500' }}>
          Phone Number : +91 9884344345
        </p>
        <p style={{ fontSize: '25px', fontWeight: '500' }}>
          Email : Way4track@2323gmail.com
        </p>
        <p style={{ fontSize: '25px', fontWeight: '500' }}>
          Visit Staff : Praveen
        </p>
        <p style={{ fontSize: '25px', fontWeight: '500' }}>
          Company Name : Way4track
        </p>
        <p style={{ fontSize: '25px', fontWeight: '500' }}>
          Address : Visakhapatnam
        </p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="w-1/2">
          <h3
            className="font-bold"
            style={{ textAlign: 'center', fontSize: '25px', fontWeight: '600' }}
          >
            Entrance Card
          </h3>
          <div
            className="p-4 border rounded-lg text-center"
            style={{ height: '153px' }}
          >
            <img
              src="/way4track-logo.png"
              alt="Way4Track Logo"
              className="mx-auto my-2"
            />
            <p className="text-green-600 font-semibold">Track Anywhere</p>
          </div>
        </div>
        <div className="w-1/2">
          <h3
            className="font-bold"
            style={{ textAlign: 'center', fontSize: '25px', fontWeight: '600' }}
          >
            Visit Card
          </h3>
          <div
            className="p-4 border rounded-lg text-center"
            style={{ height: '153px' }}
          >
            <img
              src="/way4track-logo.png"
              alt="Way4Track Logo"
              className="mx-auto my-2"
            />
            <p className="text-green-600 font-semibold">Track Anywhere</p>
          </div>
        </div>
      </div>

      <div
        className="flex space-x-2 mt-6"
        style={{ backgroundColor: '#D9D9D9' }}
      >
        <input
          type="text"
          placeholder="Type of Product"
          className="w-1/3 p-2 border rounded m-2 mt-4  mb-4"
          style={{
            height: '55px',
            color: '#808080',
            fontSize: '12px',
            fontWeight: '500',
            width: '33%',
          }}
        />
        <input
          type="text"
          placeholder="Product/Service"
          className="w-1/3 p-2 border rounded m-2 mt-4  mb-4"
          style={{
            height: '55px',
            color: '#808080',
            fontSize: '12px',
            fontWeight: '500',
            width: '33%',
          }}
        />
        <input
          type="text"
          placeholder="Quantity"
          className="w-1/3 p-2 border rounded m-2 mt-4 mb-4"
          style={{
            height: '55px',
            color: '#808080',
            fontSize: '12px',
            fontWeight: '500',
            width: '33%',
          }}
        />
      </div>

      <p
        className="text-sm text-gray-500 mt-4"
        style={{ fontSize: '14px', fontWeight: '500', color: '#000000' }}
      >
        <strong>Description:</strong>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo
        ligula eget dolor.
      </p>

      <div style={{ textAlign: 'center' }}>
        <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg">
          Create Estimate
        </button>
      </div>
    </div>
  );
};

export default SalesVisitDetails;
