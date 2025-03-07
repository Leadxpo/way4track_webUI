import React, { useState } from 'react';
import { FaUpload, FaCheck, FaTimes } from 'react-icons/fa';

const AttendanceUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg w-[500px] text-center">
        <h2 className="text-lg font-semibold mb-4">
          Upload Update Attendance{' '}
          <span className="text-gray-500">(Excel File)</span>
        </h2>

        {/* File Upload Button */}
        <label
          htmlFor="file-upload"
          className="border-2 border-dashed border-gray-400 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer hover:border-gray-600 transition"
        >
          <FaUpload size={32} className="text-gray-500 mb-2" />
          <p className="text-gray-500">
            {selectedFile ? selectedFile.name : 'Click to Upload'}
          </p>
          <input
            id="file-upload"
            type="file"
            accept=".xlsx, .xls"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button className="bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
            <FaCheck /> OK
          </button>
          <button className="bg-black text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-800 transition flex items-center gap-2">
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceUpload;
