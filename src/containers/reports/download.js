import React, { useState } from 'react';
import { useLocation } from 'react-router';
const DownloadComponent = () => {
  const location = useLocation();
  const { name } = location.state || { name: 'Default Name' };
  const [selectedBranch, setSelectedBranch] = useState("All Branch's");
  const branches = [
    "All Branch's",
    'Vishakapatnam',
    'Hyderabad',
    'Vijayawada',
    'Kakinada',
  ];

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleDownload = () => {
    const fileUrl = 'way4tracklogo.png';
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'DayBook.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md ml-auto mr-4">
      {/* Title */}
      <h1 className="text-xl font-bold mb-4">Download by {name}</h1>

      {/* Date Pickers */}
      <div className="flex gap-4 mb-4">
        <div className="flex items-center border rounded-lg px-3 py-2 w-full">
          <input
            type="date"
            className="w-full border-none focus:outline-none text-gray-600"
            placeholder="From"
          />
        </div>
        <div className="flex items-center border rounded-lg px-3 py-2 w-full">
          <input
            type="date"
            className="w-full border-none focus:outline-none text-gray-600"
            placeholder="To"
          />
        </div>
      </div>

      {/* Branch Dropdown */}
      <div className="mb-4">
        <select
          value={selectedBranch}
          onChange={handleBranchChange}
          className="w-full bg-green-500 text-white font-bold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          {branches.map((branch, index) => (
            <option key={index} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>

      {/* Download Button */}
      <div className="flex justify-end">
        <button
          className="bg-green-500 text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default DownloadComponent;
