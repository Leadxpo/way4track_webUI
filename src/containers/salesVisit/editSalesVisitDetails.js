import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const EditSalesVisitDetails = () => {
  const location = useLocation();
  const salesVisitData = location.state?.visit || {};

  const [visitDetails, setVisitDetails] = useState({
    visitId: '',
    name: '',
    phone: '',
    email: '',
    visitStaff: '',
    companyName: '',
    address: '',
    productType: '',
    productService: '',
    quantity: '',
  });

  useEffect(() => {
    if (Object.keys(salesVisitData).length > 0) {
      setVisitDetails(salesVisitData);
    }
  }, [salesVisitData]);

  const handleChange = (e) => {
    setVisitDetails({ ...visitDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8 space-y-6 mx-auto bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-10 text-gray-800">Visit Details</h2>

      <div className="space-y-6 text-lg">
        {[
           { label: 'Id', name: 'id' },
          { label: 'Visit ID', name: 'visitingNumber' },
          { label: 'Name', name: 'name' },
          { label: 'Phone Number', name: 'phoneNumber' },
          
          { label: 'Date of Visit', name: 'date' },
          { label: 'Estimate Date', name: 'estimateDate' },
         
        ].map(({ label, name, type = 'text' }) => (
          <div key={name} className="flex flex-col">
            <label className="text-gray-600">{label}</label>
            <input
              type={type}
              name={name}
              value={visitDetails[name] || ''}
              onChange={handleChange}
              className="px-4 py-2 border rounded-lg bg-gray-50"
            />
          </div>
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
        {[
          { name: 'productType', placeholder: 'Type of Product' },
          { name: 'productService', placeholder: 'Product/Service' },
          { name: 'quantity', placeholder: 'Quantity' },
        ].map(({ name, placeholder }) => (
          <input
            key={name}
            type="text"
            name={name}
            value={visitDetails[name] || ''}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-1/3 p-2 border rounded"
          />
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-4">
        <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </p>

      <div className="text-center">
        <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditSalesVisitDetails;
