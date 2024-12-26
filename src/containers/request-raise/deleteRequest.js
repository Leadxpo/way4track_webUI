import React from 'react';

const DeleteRequest = () => {
  return (
    <div className="min-h-screen flex items-start justify-center pt-10">
      <div className="bg-white shadow-lg pb-4 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center bg-red-500 p-2">
          <h2 className="text-white font-bold text-xl text-center flex-grow">
            Alert
          </h2>
          {/* <button className="text-white hover:text-gray-800">&#10005;</button> */}
        </div>

        {/* Message */}
        <p className="mt-4 text-gray-700 text-center">
          Are you sure you want to delete this Request?
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
            Delete
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteRequest;
