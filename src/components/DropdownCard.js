import React from 'react';

const DropdownCard = ({
  bgColor,
  title,
  count,
  branches,
  selectedBranch,
  setSelectedBranch,
}) => {
  const bgClass = {
    red: 'bg-red-300',
    green: '',
    purple: '',
    blue: 'bg-blue-300',  // Added another color
    yellow: 'bg-yellow-300', // Added another color
  }[bgColor] || 'bg-gray-300';
  
  const bgColorStyle = 
    bgColor === 'green' ? { backgroundColor: '#7FE65A' } :
    bgColor === 'purple' ? { backgroundColor: '#A36AFF' } : 
    bgColor === 'pink' ? { backgroundColor: '#FFC0CB' } : 
    {};
  console.log(branches);
  return (
    <div className={`${bgClass} rounded-2xl shadow-lg p-6 w-80`} style={{width: "50%",height: "190px",...bgColorStyle,margin: "5px"}}>
      {/* <p className="text-2xl font-bold mb-1 text-white">{title}</p> */}
      <div className="bg-white rounded-md flex justify-between items-center px-4 py-2">
        {/* <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="h-6 w-full text-gray-700 rounded-md focus:outline-none"
        >
          {branches.map((branch) => (
            <option key={branch.branchName} value={branch.branchName}>
              {branch.branchName}
            </option>
          ))}
        </select> */}
        <p>{title}</p>
        
      </div>
      <div className="text-6xl font-bold mt-6 text-white">{count}</div>
    </div>
  );
};

export default DropdownCard;
