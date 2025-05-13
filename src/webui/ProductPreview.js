import React from 'react';
import { FaPen } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPen } from '@fortawesome/free-solid-svg-icons';

const ProductPreview = () => {
  const location = useLocation();
  console.log('ffkjjh', location.state);
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto mt-10 px-4 space-y-4">
      {/* Education Details */}
      <div className="bg-gray-100 rounded-xl p-4 shadow-sm relative">
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-lg text-gray-800">
            Product Details
          </h2>
          <button
            onClick={() =>
              navigate('/EditProductDetails', {
                state: { product: location?.state?.product },
              })
            }
            className="flex items-center gap-1 bg-white rounded-xl px-3 py-1 shadow hover:bg-gray-50"
          >
            <FaPen />
            <span className="text-sm">Edit</span>
          </button>
        </div>
        {/* <div className="mt-2 text-gray-800">
          <strong>Qualification:</strong> SSC, <strong>Marks/CGPA:</strong> 888
        </div> */}
      </div>

      {/* Bank Details */}
      <div className="bg-gray-100 rounded-xl p-4 shadow-sm relative">
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-lg text-gray-800">
            Amenities Details
          </h2>
          <button
            onClick={() =>
              navigate('/EditAmenitiesDetails', {
                state: { product: location?.state?.product },
              })
            }
            className="flex items-center gap-1 bg-white rounded-xl px-3 py-1 shadow hover:bg-gray-50"
          >
            <FaPen />
            <span className="text-sm">Edit</span>
          </button>
        </div>
        {/* <div className="mt-2 text-gray-800">
          <strong>Bank Name:</strong> HDFC Bank, <strong>IFSC:</strong> HDFC0000123
        </div> */}
      </div>

      {/* Product Details */}
      <div className="bg-gray-100 rounded-xl p-4 shadow-sm relative">
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-lg text-gray-800">
            Application Details
          </h2>
          <button
            onClick={() =>
              navigate('/EditApplicationDetails', {
                state: { product: location?.state?.product },
              })
            }
            className="flex items-center gap-1 bg-white rounded-xl px-3 py-1 shadow hover:bg-gray-50"
          >
            <FaPen />
            <span className="text-sm">Edit</span>
          </button>
        </div>
        {/* <div className="mt-2 text-gray-800">
          <strong>Product:</strong> GPS Tracker, <strong>Model:</strong> GT-09
        </div> */}
      </div>

      {/* Amenities Info */}
      <div className="bg-gray-100 rounded-xl p-4 shadow-sm relative">
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-lg text-gray-800">
            Device Details
          </h2>
          <button
            onClick={() =>
              navigate('/EditDeviceDetails', {
                state: { product: location?.state?.product },
              })
            }
            className="flex items-center gap-1 bg-white rounded-xl px-3 py-1 shadow hover:bg-gray-50"
          >
            <FaPen />
            <span className="text-sm">Edit</span>
          </button>
        </div>
        {/* <div className="mt-2 text-gray-800">
          <strong>Wi-Fi:</strong> Available, <strong>Parking:</strong> Yes
        </div> */}
      </div>

      {/* Device Settings */}
      <div className="bg-gray-100 rounded-xl p-4 shadow-sm relative">
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-lg text-gray-800">
            productApp Details
          </h2>
          <button
            onClick={() =>
              navigate('/EditProductAppDetails', {
                state: { product: location.state.product },
              })
            }
            className="flex items-center gap-1 bg-white rounded-xl px-3 py-1 shadow hover:bg-gray-50"
          >
            <FaPen />
            <span className="text-sm">Edit</span>
          </button>
        </div>
        {/* <div className="mt-2 text-gray-800">
          <strong>Device ID:</strong> DVC123456, <strong>Status:</strong> Active
        </div> */}
      </div>
    </div>
  );
};

export default ProductPreview;
