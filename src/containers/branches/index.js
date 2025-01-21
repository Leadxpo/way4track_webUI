import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const Branches = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [branches, setBranches] = useState([]);
  const [percentages, setPercentages] = useState([]);

  useEffect(() => {
    const fetchBranchesAndPercentages = async () => {
      try {
        const branchResponse = await ApiService.post('/branch/getBranchNamesDropDown');
        if (branchResponse.status) {
          setBranches(branchResponse.data);
        } else {
          console.error('Failed to fetch branches');
        }

        const percentageResponse = await ApiService.post('/dashboards/getLast30DaysCreditAndDebitPercentages', {
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        });
        if (percentageResponse.status) {
          setPercentages(percentageResponse.data);
        } else {
          console.error('Failed to fetch percentages');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBranchesAndPercentages();
  }, []);

  const combinedBranches = branches.map((branch) => {
    const percentageData = percentages.find((p) => p.id === branch.id) || {};
    return {
      ...branch,
      creditPercentage: percentageData.creditPercentage || 0,
      debitPercentage: percentageData.debitPercentage || 0,
    };
  });

  const handleEdit = (branchDetails) => {
    navigate('/edit-branch', { state: { branchDetails } });
  };

  const handleDeleteClick = (branch) => {
    setBranchToDelete(branch);
    setShowPopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await ApiService.post('/branch/deleteBranchDetails', { id: branchToDelete.id });
      setBranches((prev) => prev.filter((branch) => branch.id !== branchToDelete.id));
      alert('Branch deleted successfully');
    } catch (error) {
      console.error('Error deleting branch:', error);
      alert('Failed to delete branch.');
    } finally {
      setShowPopup(false);
      setBranchToDelete(null);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setBranchToDelete(null);
  };
  const getLast30DaysCreditAndDebitPercentages = async () => {
    try {
      const response = await ApiService.post('/dashboards/getLast30DaysCreditAndDebitPercentages', {
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });
      if (response.status) {
        setPercentage(response.data);
      } else {
        alert(response.message || 'Failed to fetch branch list.');
      }
    } catch (error) {
      console.error('Error fetching branch list:', error);
      alert('Failed to fetch branch list.');
    }
  };

  useEffect(() => {
    getLast30DaysCreditAndDebitPercentages();
  }, []);

  return (
    <div className="">
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-yellow-400 text-white font-bold rounded-md hover:cursor-pointer"
          onClick={() => navigate('/add-branch')}
        >
          Add Branch
        </button>
      </div>

      {combinedBranches.length > 0 ? (
        combinedBranches.map((branch) => (
          <div className="flex justify-center mt-10" key={branch.id}>
            <div
              className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              style={{ width: '80%' }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="absolute -top-6 left-4">
                  <img
                    src="/logo-square.png"
                    alt="Branch Logo"
                    className="w-14 h-14 rounded-md shadow-md bg-white"
                  />
                </div>
                <span className="text-2xl font-semibold text-gray-800 mt-4">
                  {branch.branchName}
                </span>
              </div>

              <div className="space-y-4">
                <div className="text-green-600 flex items-center text-xl font-bold">
                  <span>Credit Percentage:</span>
                  <span className="ml-2">{branch.creditPercentage}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-green-600 h-6 rounded-full"
                    style={{ width: `${branch.creditPercentage}%` }}
                  ></div>
                </div>

                <div className="text-red-500 flex items-center text-xl font-bold">
                  <span>Debit Percentage:</span>
                  <span className="ml-2">{branch.debitPercentage}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-red-600 h-6 rounded-full"
                    style={{ width: `${branch.debitPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-6 flex justify-center space-x-4">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-blue-600"
                  onClick={() => handleEdit(branch)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={() => handleDeleteClick(branch)}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-gray-600"
                  onClick={() => navigate('/branch-details', { state: { branch } })}
                >
                  More Details
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-10 text-xl text-gray-700">No branches available.</div>
      )}

      {showPopup && (
        <div className="fixed inset-0 top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg pb-4 w-full max-w-md">
            <div className="flex justify-between items-center bg-red-500 p-2">
              <h2 className="text-white font-bold text-xl text-center flex-grow">Alert</h2>
              <button onClick={handleClosePopup} className="text-white hover:text-gray-800">
                &#10005;
              </button>
            </div>
            <p className="mt-4 text-gray-700 text-center">
              Are you sure you want to delete the branch "
              <strong>{branchToDelete?.branchName}</strong>"?
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Branches;
