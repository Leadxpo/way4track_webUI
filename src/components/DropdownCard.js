import React, { useState } from 'react';

const DropdownCard = ({
  bgColor,
  count,
  title,
  selectedBranch,
  setSelectedBranch,
}) => {
  const branches = [
    'All Branches',
    'Vishakapatnam',
    'Hyderabad',
    'Vijayawada',
    'Kakinada',
  ];
  const bgClass =
    {
      red: 'bg-red-300',
      green: 'bg-green-300',
      purple: 'bg-purple-300',
    }[bgColor] || 'bg-gray-300';
  return (
    <div className={`${bgClass} rounded-2xl shadow-lg p-6 w-80`}>
      <p className="text-2xl font-bold mb-1 text-white">{title}</p>
      <div className="bg-white rounded-md flex justify-between items-center px-4 py-2">
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="h-6 w-full text-gray-700 rounded-md focus:outline-none "
        >
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>
      <div className="text-6xl font-bold mt-4 text-white">{count}</div>
    </div>
  );
};

export default DropdownCard;
