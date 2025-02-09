import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Table from '../../components/Table';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';
const ProductAssign = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  const handleCreateNew = () => {
    navigate('/add-product-assign');
  };
  const onEdit = (product) => {
    navigate('/add-product-assign', {
      state: { productAssignDetails: product },
    });
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

  const productAssignDetails = async (branchName = 'All') => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      if (branchName !== 'All') {
        payload.branchName = branchName;
      }

      const res = await ApiService.post(
        '/dashboards/productAssignDetails',
        payload
      );

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
    const perms = getPermissions('productassign');
    setPermissions(perms);
    productAssignDetails(selectedBranch);
  }, [selectedBranch]);

  return (
    <div className="p-10">
      <p className="font-bold text-xl">Product Assign</p>
      {/* Create New Button Row */}
      <div className="flex justify-end mb-4">
        <button
          className={`h-12 px-4 text-white font-bold rounded-md hover:cursor-pointer ${permissions.add ? 'bg-yellow-400 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
          onClick={handleCreateNew}
          disabled={!permissions.add}
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
          columns={product.length > 0 ? Object.keys(product[0]) : []} // Ensure product is not empty
          data={product}
          onEdit={onEdit}
          onDetails={onDetails}
          onDelete={onDelete}
          showDelete={permissions.delete}
          showEdit={permissions.edit}
          showDetails={permissions.view}
        />
      </div>
    </div>
  );
};

export default ProductAssign;
