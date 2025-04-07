import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectBranch = () => {
  const navigate = useNavigate();

  const branches = [
    { id: 1, branchName: 'Visakhapatnam' },
    { id: 2, branchName: 'Hyderabad' },
    { id: 3, branchName: 'Vijayawada' },
    { id: 4, branchName: 'Kakinada' },
  ];

  const [selectedBranch, setSelectedBranch] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleBranchClick = (branchName) => {
    setSelectedBranch(branchName);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const branchData = [
    'Purchase',
    'Payments',
    'Sale',
    'Receipts',
    'Journals',
    'Contra',
    'DebitNote',
    'CreditNote',
  ];

  const handleItemClick = (item) => {
    navigate(`/forms/${item}`);
    // navigate('/receipt-form')
  };

  return (
    <div className="p-10">
      {branches.map((branch) => (
        <div key={branch.id}>
          <p
            onClick={() => handleBranchClick(branch.branchName)}
            style={{
              backgroundColor: '#12A651',
              color: '#FFFFFF',
              marginTop: '15px',
              marginBottom: '15px',
              height: '55px',
              paddingLeft: '20px',
              paddingRight: '20px',
              fontSize: '28px',
              fontWeight: '600',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            {branch.branchName}
            <span style={{ fontSize: '18px', marginLeft: '10px' }}>↓</span>
          </p>
        </div>
      ))}

      {isPopupOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              width: '50%',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* <h2>{selectedBranch} - Details</h2> */}
            <ul>
              {branchData.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleItemClick(item)}
                  style={{
                    marginBottom: '15px',
                    marginLeft: '20px',
                    fontSize: '18px',
                    fontWeight: '600',
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={handleClosePopup}
              style={{
                backgroundColor: '#12A651',
                color: '#FFFFFF',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '20px',
                marginLeft: '20px',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectBranch;
