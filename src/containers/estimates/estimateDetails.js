import React from 'react';

const EstimateDetails = () => {
  const estimateData = {
    company: {
      name: 'SHARON TELEMATICS PRIVATE LIMITED',
      logo: 'https://via.placeholder.com/100', // Replace with your logo URL
      address:
        '21-27, Double road, Viman Nagar, Kakani Nagar, Visakhapatnam, Andhra Pradesh 530009',
      gstin: '37ABCA5445RIZV',
      cin: 'U74999AP2018PTC108597',
    },
    billTo: {
      name: 'Krishnan',
      phone: '9898989898',
      email: 'krishnan@gmail.com',
      address:
        '21-27, Double road, Viman Nagar, Kakani Nagar, Visakhapatnam, Andhra Pradesh 530009',
    },
    estimateDetails: {
      number: '0001',
      date: '01-10-2024',
      expiryDate: '03-10-2024',
      amount: '₹20000/-',
    },
    products: [
      {
        id: 1,
        name: 'Bike GPS Tracker',
        description:
          'Way4Track offers tracking and monitoring services for your personal vehicle. Best GPS tracking device for bike.',
        amount: '₹5000/-',
      },
      {
        id: 2,
        name: 'Car GPS Tracker',
        description:
          'Way4Track offers tracking and monitoring services for your personal vehicle.',
        amount: '₹10000/-',
      },
      {
        id: 3,
        name: 'Fuel Monitoring System',
        description:
          'Basically, fuel is very important, and the cost of fuel is always a fear when it comes to cost-effectiveness and profit and hence fuel monitoring GPS fuel monitoring system is an inevitable factor in fleet management to gain fuel efficiency.',
        amount: '₹5000/-',
      },
    ],
    terms: 'Other Information / Terms & Conditions',
  };

  return (
    <div className="p-8 max-w-4xl mx-auto shadow-md rounded-md bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {/* Logo and Company Details */}
        <div className="">
          <img
            src={estimateData.company.logo}
            alt="Company Logo"
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold">{estimateData.company.name}</h1>
          </div>
        </div>

        {/* Estimate Title and Number */}
        <div className="text-right">
          <h2 className="text-2xl font-semibold">ESTIMATE</h2>
          <p className="text-lg">#{estimateData.estimateDetails.number}</p>
        </div>
      </div>

      {/* Address and Dates */}
      <div className="flex justify-between mb-6">
        {/* Address - 60% Width */}
        <div className="w-2/3 mr-4">
          <p className="text-gray-600">{estimateData.company.address}</p>
          <p className="text-gray-600">
            <strong>GSTIN:</strong> {estimateData.company.gstin} |{' '}
            <strong>CIN:</strong> {estimateData.company.cin}
          </p>
        </div>

        {/* Dates and Amount - 40% Width */}
        <div className="w-1/3 text-sm">
          <div className="flex">
            <span className="w-32 text-gray-600">Estimate Date:</span>
            <span className="text-gray-600">
              {estimateData.estimateDetails.date}
            </span>
          </div>
          <div className="flex">
            <span className="w-32 text-gray-600">Expiry Date:</span>
            <span className="text-gray-600">
              {estimateData.estimateDetails.expiryDate}
            </span>
          </div>
          <div className="flex">
            <span className="w-32 text-gray-600">Amount:</span>
            <span className="text-black font-bold">
              {estimateData.estimateDetails.amount}
            </span>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="mb-6">
        <p className="text-gray-600">Bill To:</p>
        <p className="font-bold">{estimateData.billTo.name}</p>
        <p className="font-bold">{estimateData.billTo.phone}</p>
        <p className="font-bold">{estimateData.billTo.email}</p>
        <p>{estimateData.billTo.address}</p>
      </div>

      {/* Product Table */}
      <table className="w-full rounded-md mb-6">
        <thead className="rounded-md">
          <tr className="bg-gray-200 rounded-md">
            <th className=" px-4 py-2 text-left">#</th>
            <th className=" px-4 py-2 text-left">Product / Service</th>
            <th className=" px-4 py-2 text-left">Description</th>
            <th className=" px-4 py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="rounded-md">
          {estimateData.products.map((product) => (
            <tr key={product.id}>
              <td className=" px-4 py-2">{product.id}</td>
              <td className=" px-4 py-2">{product.name}</td>
              <td className=" px-4 py-2">{product.description}</td>
              <td className=" px-4 py-2 text-right">{product.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Terms and Conditions */}
      <div className="text-gray-600 mb-6">
        <p>{estimateData.terms}</p>
      </div>

      {/* Footer Buttons */}
      <div className="flex items-center justify-center space-x-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
          Save & Send
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
          Save
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default EstimateDetails;
