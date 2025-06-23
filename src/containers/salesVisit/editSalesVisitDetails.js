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
  let parsedRequirements = [];
  let parsedServices = [];

  try {
    parsedRequirements = JSON.parse(visitDetails.requirementDetails || '[]');
  } catch (e) { }

  try {
    parsedServices = JSON.parse(visitDetails.service || '[]');
  } catch (e) { }

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
        {['clientPhoto', 'visitingCard'].map((title, index) => {
          console.log("rrr :", title);
          return (
            <div key={index} className="w-1/2">
              <h3 className="font-bold text-center text-lg">{title}</h3>
              <div className="p-4 border rounded-lg items-center justify-center">
                <div className=" h-[150px] flex items-center justify-center">
                  <img
                    src={visitDetails[title]}
                    alt="Way4Track Logo"
                    className="object-contain h-full w-full"
                  />
                </div>
              </div>

            </div>
          )
        })}
      </div>

      {parsedRequirements.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Requirements</h3>
          <div className="space-y-4 bg-gray-200 p-4 rounded-lg">
            {parsedRequirements.map((req, index) => (
              <div key={index} className="flex space-x-4">
                <input
                  type="text"
                  value={req.productName || ''}
                  placeholder="Product Name"
                  className="w-1/2 p-2 border rounded"
                  readOnly
                />
                <input
                  type="text"
                  value={req.quantity || ''}
                  placeholder="Quantity"
                  className="w-1/2 p-2 border rounded"
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {parsedServices.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Services</h3>
          <div className="space-x-4 bg-gray-200 p-4 rounded-lg">
            {parsedServices.map((srv, index) => (
              <div key={index} className="flex space-x-4">
                <input
                  type="text"
                  value={srv.services || ''}
                  placeholder="Service Name"
                  className="w-full p-2 border rounded"
                  readOnly
                />
                <input
                  type="text"
                  value={srv.description || ''}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      )}

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
