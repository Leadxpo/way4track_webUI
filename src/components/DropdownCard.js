import React from 'react';

const DropdownCard = ({
  bgColor,
  title,
  count,
  assertType,
  setAssertType,
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
    <>
    {/* Internal styles using <style> tag */}
    <style>
      {`
        .hoverable {
          cursor: pointer; /* Changes the cursor to a pointer on hover */
          transition: all 0.3s ease; /* Smooth transition for the effect */
        }

        .hoverable:hover {
          background-color: #aaaaaa; /* Background color on hover */
          color: #007bff; /* Text color on hover */
          padding:10px;pointer;
        }

        .hoverable span {
          margin-bottom: 10px;
          font-weight: bold;
          font-size: 20px;
          color: #333333;
          margin-right: 10px;
        }
      `}
    </style>
    <div className={`${bgClass} rounded-xl shadow-lg p-3 w-80`} style={{width: "50%",...bgColorStyle,margin: "5px"}}>
        <div className="bg-white rounded-md flex justify-between items-center px-4 py-2">
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="h-6 w-full text-gray-700 rounded-md focus:outline-none" style={{}}
        >
          {branches?.map((branch) => (
            <option key={branch.branchName} value={branch.branchName}>
              {branch.branchName}
            </option>
          ))}
        </select>
        
      </div>
      <div className="text-xl font-bold mt-6 text-white hoverable" onClick={()=>setAssertType(assertType)}> <span style={{marginBottom:10, fontWeight:'bold',fontSize:20,color:'#333333',marginRight:10}}>{title} -</span>
      {count}</div>
    </div>
    </>
  );
};

export default DropdownCard;
