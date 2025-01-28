import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Table from '../../components/Table';
import ApiService, { initialAuthState } from '../../services/ApiService';

const ProductAssign = () => {
  const navigate = useNavigate();
  const handleCreateNew = () => {
    navigate('/add-product-assign');
  };
  const onEdit = (product) => {
    navigate('/add-product-assign', { state: { productAssignDetails: product } });
  };
  const onDelete = () => {
    navigate('/delete-product-assign');
  };
  const onDetails = (appt) => {
    navigate('/product-assign-details', {
      state: { productAssignDetails: appt },
    });
  };
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [product, setproduct] = useState([]);
  const [branches, setBranches] = useState([{ branchName: 'All' }]);
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post('/api/branch/getBranchNamesDropDown');
        if (response.status) {
          setBranches(response.data);
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };
    fetchBranches();
  }, []);


  const productAssignDetails = async (branchName = 'All') => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      if (branchName !== 'All') {
        payload.branchName = branchName;
      }

      const res = await ApiService.post('/api/dashboards/productAssignDetails', payload);

      if (res.status) {
        setproduct(res.data.rawResults);
        if (branchName === 'All') {
          const branchOptions = [
            { branchName: 'All' },
            ...res.data.result.map((branch) => ({
              branchName: branch.branchName,
            })),
          ];
          setBranches(branchOptions);
        }
      } else {
        setproduct([]);
        if (branchName === 'All') setBranches([{ branchName: 'All' }]);
      }
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
      setproduct([]);
    }
  };
  const handleBranchSelection = (branch) => {
    setSelectedBranch(branch);
  };
  useEffect(() => {
    productAssignDetails(selectedBranch);
  }, [selectedBranch]);

  return (
    <div className="p-10">
      <p className="font-bold text-xl">Product Assign</p>
      {/* Create New Button Row */}
      <div className="flex justify-end mb-4">
        <button
          className="h-12 px-4 bg-yellow-400 text-white font-bold rounded-md hover:cursor-pointer"
          onClick={handleCreateNew}
        >
          Create New
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="branchDropdown" className="font-medium mr-2">
          Select Branch:
        </label>
        <select
          id="branchDropdown"
          value={selectedBranch}
          onChange={(e) => handleBranchSelection(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          {branches.map((branch) => (
            <option key={branch.branchName} value={branch.branchName}>
              {branch.branchName}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        <Table
          columns={product.length > 0 ? Object.keys(product[0]) : []}  // Ensure product is not empty
          data={product}
          onEdit={onEdit}
          onDetails={onDetails}
          onDelete={onDelete}
        />

      </div>
    </div>
  );
};

export default ProductAssign
