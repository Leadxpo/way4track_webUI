import React from 'react';

const ViewStaffDetails = ({ formData, onEdit }) => {
  return (
    <div className="m-6">
      <h3 className="text-2xl font-bold mb-6">Submitted Details</h3>

      {/* Personnel Details Card */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg">
          <h4 className="text-xl font-semibold">Personnel Details</h4>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => onEdit('personnelDetails')}
          >
            Edit
          </button>
        </div>
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <p className="text-lg">
            <span className="font-semibold">First Name:</span> {formData.personnelDetails?.firstName}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Last Name:</span> {formData.personnelDetails?.lastName}
          </p>
        </div>
      </div>

      {/* Education Details Card */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg">
          <h4 className="text-xl font-semibold">Education Details</h4>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => onEdit('educationDetails')}
          >
            Edit
          </button>
        </div>
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <p className="text-lg">
            <span className="font-semibold">Degree:</span> {formData.educationDetails?.degree}
          </p>
          <p className="text-lg">
            <span className="font-semibold">University:</span> {formData.educationDetails?.university}
          </p>
        </div>
      </div>

      {/* Bank Details Card */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg">
          <h4 className="text-xl font-semibold">Bank Details</h4>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => onEdit('bankDetails')}
          >
            Edit
          </button>
        </div>
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <p className="text-lg">
            <span className="font-semibold">Account Number:</span> {formData.bankDetails?.accountNumber}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Bank Name:</span> {formData.bankDetails?.bankName}
          </p>
        </div>
      </div>

      {/* Employer Details Card */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-lg">
          <h4 className="text-xl font-semibold">Employer Details</h4>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => onEdit('employerDetails')}
          >
            Edit
          </button>
        </div>
        <div className="p-4 bg-gray-50 rounded-b-lg">
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {formData.employerDetails?.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Age:</span> {formData.employerDetails?.age}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewStaffDetails;
