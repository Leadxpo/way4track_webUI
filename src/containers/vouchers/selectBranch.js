import React, { useState } from 'react';

const SelectBranch = () => {
  const branches = [
    { id: 1, branchName: 'Visakhapatnam' },
    { id: 2, branchName: 'Hyderabad' },
    { id: 3, branchName: 'Vijayawada' },
    { id: 4, branchName: 'Kakinada' },
  ];

  const [selectedBranch, setSelectedBranch] = useState('');

  const handleChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  return (
    <div className="p-10">
      {/* <label htmlFor="branchSelect">Select a Branch:</label> */}
      {/* <select id="branchSelect" value={selectedBranch} onChange={handleChange}>
        <option value="" disabled>
          Select...
        </option>
        {branches.map((branch) => (
          <option key={branch.id} value={branch.branchName}>
            {branch.branchName}
          </option>
        ))}
      </select>
      {selectedBranch && <p>You selected: {selectedBranch}</p>} */}

      {branches.map((branch) => (
        <div key={branch.id} value={branch.branchName}>
          <p
            style={{
              backgroundColor: '#12A651',
              color: '#FFFFFF',
              margin: '10px',
              height: '55px',
              paddingLeft: '20px',
              fontSize: '28px',
              fontWeight: '600',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {branch.branchName}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SelectBranch;
