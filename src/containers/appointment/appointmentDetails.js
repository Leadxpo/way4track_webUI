import React from 'react';
import { useLocation } from 'react-router-dom';

const AppointmentDetails = () => {
  const location = useLocation();
  const appointmentDetails = location.state?.appointmentDetails || {};

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-lg ">
      <h2 className="text-2xl font-semibold mb-6">Appointment Details</h2>

      {/* Header Section */}
      <div className="flex items-center gap-6 mb-6 shadow-md p-6">
        {/* Image Section */}
        <div className="flex-shrink-0 flex items-center justify-center h-full">
          <img
            src={appointmentDetails.image || 'https://via.placeholder.com/100'}
            alt="Assigned Person"
            className="w-36 h-36 rounded-full object-cover border border-gray-300"
          />
        </div>

        {/* Fields Section */}
        <div className="flex-grow grid grid-cols-1 gap-4">
          <div className="bg-gray-200 p-4 rounded-md">
            Select Type : {appointmentDetails.type || ''}
          </div>
          <div className="bg-gray-200 p-4 rounded-md">
            Assign to : {appointmentDetails.assignPerson || ''}
          </div>
          <div className="bg-gray-200 p-4 rounded-md">
            Type : {appointmentDetails.type || ''}
          </div>
          <div className="bg-gray-200 p-4 rounded-md">
            Branch : {appointmentDetails.branch || ''}
          </div>
        </div>
      </div>

      {/* Slot Section */}
      <div className="mb-4 bg-gray-200 p-4 rounded-md">
        Slot : {appointmentDetails.slot || ''}
      </div>

      {/* Product Section */}
      <div className="mb-4 bg-gray-200 p-4 rounded-md">
        Product : {appointmentDetails.product || ''}
      </div>

      {/* Client Details */}
      <div className="mb-4 bg-gray-200 p-4 rounded-md">
        Client Number : {appointmentDetails.clientNumber || ''}
      </div>
      <div className="mb-4 bg-gray-200 p-4 rounded-md">
        Client Name : {appointmentDetails.clientName || ''}
      </div>

      {/* Address Section */}
      <div className="mb-4 bg-gray-200 p-4 rounded-md">
        Address : {appointmentDetails.address || ''}
      </div>

      {/* Description Section */}
      <div className="mb-4 bg-gray-200 p-4 rounded-md">
        Description : {appointmentDetails.description || ''}
      </div>
    </div>
  );
};

export default AppointmentDetails;
