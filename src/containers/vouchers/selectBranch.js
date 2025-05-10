import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const SelectBranch = () => {
  const navigate = useNavigate();

  const [branches, setBranches] = useState([]);

  const [selectedBranch, setSelectedBranch] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleBranchClick = (Id, Name) => {
    localStorage.setItem('branchId', Id);
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
    navigate(`/forms/${item}`, {
      state: {
        selectedBranch: selectedBranch,
      },
    });
    console.log('1234567', item);
  };

  // Fetch branch data from API
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/branch/getBranchNamesDropDown',
          {
            companyCode: initialAuthState?.companyCode,
            unitCode: initialAuthState?.unitCode,
          }
        );
        if (response.status) {
          setBranches(response.data); // Set branches to state
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

  return (
    <div className="p-10">
      {branches?.map((branch) => (
        <div key={branch.id}>
          <p
            onClick={() => handleBranchClick(branch.id, branch.branchName)}
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[99999]">
          <div className="bg-white p-6 rounded-lg w-1/2 shadow-lg relative z-[100000]">
            <ul>
              {branchData.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className="mb-4 ml-5 text-lg font-semibold cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={handleClosePopup}
              className="mt-5 ml-5 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
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
