import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';
import hasPermission from '../../common/permission'
const Branches = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [branches, setBranches] = useState([]);
  const [percentages, setPercentages] = useState([]);
  var permission = localStorage.getItem("userPermissions");
  // Fetch branches and percentages on component load
  useEffect(() => {
    // const perms = getPermissions('branch');
    // setPermissions(perms);
    const fetchBranchesAndPercentages = async () => {
      try {
        // Fetch branch names
        const branchResponse = await ApiService.post(
          '/branch/getBranchNamesDropDown'
        );
        if (branchResponse.status) {
          setBranches(branchResponse.data);
        } else {
          console.error('Failed to fetch branches');
        }

        // Fetch percentages
        const percentageResponse = await ApiService.post(
          '/dashboards/getLast30DaysCreditAndDebitPercentages',
          {
            companyCode: initialAuthState?.companyCode,
            unitCode: initialAuthState?.unitCode,
          }
        );
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

  // Combine branches and percentages
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
      await ApiService.post('/branch/deleteBranchDetails', {
        id: branchToDelete.id,
      });
      setBranches((prev) =>
        prev.filter((branch) => branch.id !== branchToDelete.id)
      );
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


  const handleMoreDetails = (branchDetails) => {
    navigate('/branch-details', { state: { branchDetails } });
  };

  return (
    <div className="">
      <div className="flex justify-end">
      {hasPermission(permission, "branch", "add") &&

        <button
          className={`px-4 py-2 text-white rounded-md transition 
            ${hasPermission(permission, "branch", "add") ? 'bg-green-700 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
          onClick={() => navigate('/add-branch')}
           disabled={!hasPermission(permission, "branch", "add")}
        >
          Add Branch
        </button>
}
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
                  <span>Receivables Percentage:</span>
                  <span className="ml-2">{branch.creditPercentage}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-6">
                  <div
                    className="bg-green-600 h-6 rounded-full"
                    style={{ width: `${branch.creditPercentage}%` }}
                  ></div>
                </div>

                <div className="text-red-500 flex items-center text-xl font-bold">
                  <span>Payable Percentage:</span>
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
              {hasPermission(permission, "branch", "edit") &&

                <button
                  className={`px-4 py-2 text-white rounded-md transition 
              ${hasPermission(permission, "branch", "edit") ? 'bg-green-700 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
                  onClick={() => handleEdit(branch)}
                  disabled={!hasPermission(permission, "branch", "edit")}
                >
                  Edit
                </button>
}
{hasPermission(permission, "branch", "delete") &&
                <button
                  className={`px-4 py-2 text-white rounded-md transition 
                    ${hasPermission(permission, "branch", "delete") ? 'bg-red-600 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
                  onClick={() => handleDeleteClick(branch)}
                   disabled={!hasPermission(permission, "branch", "delete")}
                >
                  Delete
                </button>}

                {hasPermission(permission, "branch", "view") &&
                                              <button
                  className={`text-gray-400 rounded-md px-1 py-1 border border-gray-300 hover:bg-gray-200 ${hasPermission(permission, "branch", "view") ? '' : 'cursor-not-allowed opacity-50'}`}
                  onClick={() => handleMoreDetails(branch)}
                   disabled={!hasPermission(permission, "branch", "view")}
                >
                  More Details
                </button>
                               }
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center mt-10 text-xl text-gray-700">
          No branches available.
        </div>
      )}

      {showPopup && (
        <div className="fixed inset-0 top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg pb-4 w-full max-w-md">
            <div className="flex justify-between items-center bg-red-500 p-2">
              <h2 className="text-white font-bold text-xl text-center flex-grow">
                Alert
              </h2>
              <button
                onClick={handleClosePopup}
                className="text-white hover:text-gray-800"
              >
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
