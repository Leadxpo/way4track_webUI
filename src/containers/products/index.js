import React, { useState, useEffect } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FaList, FaTh, FaPlus } from 'react-icons/fa';
import DropdownCard from '../../components/DropdownCard';
import { useNavigate } from 'react-router';
import ApiService, { initialAuthState } from '../../services/ApiService';
import Table from '../../components/Table';
const Products = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [totalBranch, setTotalBranch] = useState('All Branches');
  const [inHandBranch, setInHandBranch] = useState('All Branches');
  const [installationBranch, setInstallationBranch] = useState('All Branches');
  const [products, setProducts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const handleSelectChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  useEffect(() => {
    const getAllproductDetails = async () => {
      try {
        const response = await ApiService.post(
          '/products/getAllproductDetails',
          {
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        if (response.status) {
          console.log(response.data, 'res++++++++++++++');
          const filteredData = response.data.map(
            ({ vendorId, ...rest }) => rest
          );
          setTableData(filteredData);
          setColumns(Object.keys(filteredData[0]));
          setProducts(response.data || []);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching staff details:', error);
        alert('Failed to fetch staff details.');
      }
    };
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/branch/getBranchNamesDropDown'
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

    getAllproductDetails();
  }, []);

  const truncateString = (str) =>
    str.length <= 80 ? str : str.slice(0, 80) + '...';
  return (
    <div className="m-2">
      <div className="flex justify-between items-center py-4">
        {/* Left: Staff Details Heading */}
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>

        {/* Right: Icons and Add Staff Button */}
        <div className="flex items-center space-x-4">
          {/* List View Icon */}
          <button
            className={`p-2 cursor-pointer ${!isGridView && 'border border-black'}`}
            onClick={() => setIsGridView(false)}
          >
            <FaList size={18} />
          </button>

          {/* Grid View Icon */}
          <button
            className={`p-2 cursor-pointer ${isGridView && 'border border-black'}`}
            onClick={() => setIsGridView(true)}
          >
            <FaTh size={18} />
          </button>

          {/* Add Staff Button */}
          <button
            className="flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => navigate('/in-hand-product')}
          >
            <span>In-Hand Products</span>
          </button>
          <button
            className="flex items-center space-x-2 bg-green-700 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={() => navigate('/add-product')}
          >
            <span>Add Product</span>
          </button>
        </div>
      </div>
      <div className="flex justify-between mx-6">
        <DropdownCard
          bgColor="red"
          title="Total Products"
          count={500}
          branches={branches}
          selectedBranch={totalBranch}
          setSelectedBranch={setTotalBranch}
        />
        <DropdownCard
          bgColor="green"
          title="In Hand Products"
          count={220}
          branches={branches}
          selectedBranch={inHandBranch}
          setSelectedBranch={setInHandBranch}
        />
        <DropdownCard
          bgColor="purple"
          title="Installation Products"
          count={280}
          branches={branches}
          selectedBranch={installationBranch}
          setSelectedBranch={setInstallationBranch}
        />
      </div>
      <div className="flex space-x-4 my-4">
        <input
          placeholder="Product ID"
          className="h-12 w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <input
          placeholder="Product Name"
          className="h-12 w-full block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
        <select
          value={selectedBranch}
          onChange={handleSelectChange}
          className="h-12 w-full block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none "
        >
          <option value="" disabled>
            Select Branch
          </option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.branchName}>
              {branch.branchName}
            </option>
          ))}
        </select>
        <button className="h-12 w-full bg-green-700 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-green-800 focus:outline-none focus:ring focus:ring-green-500">
          Search
        </button>
      </div>

      {isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {products.map((profile, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-400"
            >
              {/* Static 3 dots */}
              <div className="absolute top-4 right-4 text-gray-400 cursor-pointer">
                <FaEllipsisVertical />
              </div>

              {/* Profile Picture */}
              <img
                className="rounded-full mx-auto h-24 w-24 object-cover"
                src={`https://i.pravatar.cc/150?img=${index + 1}`} // Placeholder image source
                alt="Profile"
              />

              {/* Name and Description */}
              <div className="text-center mt-4">
                <h2 className="text-lg font-semibold">{profile.productName}</h2>
                <p className="text-sm text-gray-500">
                  {profile.productDescription || ''}
                </p>
              </div>

              {/* Button */}
              <div className="mt-4 flex justify-center">
                <button className="px-2 py-1 border border-gray-400 rounded-[3px] text-gray-400 hover:cursor-pointer">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Table
          columns={columns}
          data={tableData}
          onEdit={(profile) => console.log('Edit:', profile)}
          onDetails={(profile) => console.log('Details:', profile)}
        />
      )}
    </div>
  );
};

export default Products;
