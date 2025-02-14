import React, { useState, useEffect, useCallback } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FaList, FaTh, FaPlus, FaSearch } from 'react-icons/fa';
import DropdownCard from '../../components/DropdownCard';
import { useNavigate } from 'react-router';
import ApiService, { initialAuthState } from '../../services/ApiService';
import Table from '../../components/Table';
import { getPermissions } from '../../common/commonUtils';
const Products = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [products, setProducts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [searchData, setSearchData] = useState({
    productId: '',
    productName: '',
    location: '',
  });
  const [productCounts, setProductCounts] = useState({
    totalAssignedQty: 0,
    totalInHandsQty: 0,
    totalQty: 0,
  });
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);



  // const fetchData = async (branchName) => {
  //   try {
  //     const payload = {
  //       companyCode: initialAuthState.companyCode,
  //       unitCode: initialAuthState.unitCode,
  //       staffId: localStorage.getItem('userId'),
  //     };
  //     if (branchName && branchName !== 'All') {
  //       payload.branch = branchName;
  //     }

  //     const res = await ApiService.post(
  //       '/dashboards/getProductAssignmentSummary',
  //       payload
  //     );
  //     if (res.status) {
  //       const { groupedBranches, totalAssignedQty, totalInHandsQty, totalQty } =
  //         res.data;

  //       setBranches([
  //         { branchName: 'All' },
  //         ...groupedBranches.map((b) => ({ branchName: b.branchName })),
  //       ]);
  //       setProductCounts({
  //         totalAssignedQty,
  //         totalInHandsQty,
  //         totalQty,
  //       });
  //     }
  //   } catch (err) {
  //     console.error('Failed to fetch data:', err);
  //   }
  // };


  const fetchData = async (branchName) => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
      };

      // Conditionally add staffId only if role is 'Technician' or 'Sales Man'
      if (
        payload.role === 'Technician' || payload.role === 'Sales Man'
      ) {
        payload.staffId = localStorage.getItem('userId');
      }

      if (branchName && branchName !== 'All') {
        payload.branch = branchName;
      }

      const res = await ApiService.post(
        '/dashboards/getProductAssignmentSummary',
        payload
      );
      if (res.status) {
        const { groupedBranches, totalAssignedQty, totalInHandsQty, totalQty } =
          res.data;

        setBranches([
          { branchName: 'All' },
          ...groupedBranches.map((b) => ({ branchName: b.branchName })),
        ]);
        setProductCounts({
          totalAssignedQty,
          totalInHandsQty,
          totalQty,
        });
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  useEffect(() => {
    const perms = getPermissions('product');
    setPermissions(perms);
    fetchData(selectedBranch);
  }, [selectedBranch]);

  const getSearchDetailProduct = useCallback(async () => {
    try {
      const payload = {
        ...searchData,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
      };

      if (
        payload.role === 'Technician' || payload.role === 'Sales Man'
      ) {
        payload.staffId = localStorage.getItem('userId');
      }

      const response = await ApiService.post(
        '/dashboards/getSearchDetailProductAssign', payload);

      if (response.status) {
        const filteredData = response.data.map((item) => ({
          productId: item.id,
          productName: item.productName || 'N/A',
          productDescription: item.productDescription || 'N/A',
          vendorName: item.vendorName || (item.vendorId?.name ?? 'N/A'),
          imeiNumber: item.imeiNumber || 'N/A',
          presentStock: item.quantity || 0, // Assuming stock is quantity
        }));

        setTableData(filteredData);
        setColumns(Object.keys(filteredData[0] || []));
        setProducts(response.data || []);
      } else {
        alert(
          response.data.internalMessage || 'Failed to fetch staff details.'
        );
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
      alert('Failed to fetch staff details.');
    }
  }, [searchData]); // ✅ Fix applied here

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getSearchDetailProduct();
  }, [getSearchDetailProduct]);

  const handleSearch = async () => {
    getSearchDetailProduct();
  };

  // Navigate to details page
  const handleMoreDetails = () => {
    navigate('/product-details');
  };
  const truncateString = (str) =>
    str.length <= 80 ? str : str.slice(0, 80) + '...';

  useEffect(() => {
    const perms = getPermissions('product');
    setPermissions(perms);
    fetchData(selectedBranch);
  }, [selectedBranch]);

  // Check role and conditionally render the cards
  const role = localStorage.getItem('role');

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
          <button
            className={`flex items-center space-x-2 text-white px-4 py-2 rounded-md cursor-pointer ${permissions.add ? 'bg-green-700' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
            onClick={() => navigate('/add-product')}
            disabled={!permissions.add}
          >
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Conditional Cards Display */}
      <div className="flex justify-between mx-6">
        {/* Conditionally render based on role */}
        {role !== 'Technician' && role !== 'Sales Man' && (
          <>
            <DropdownCard
              bgColor="red"
              title="Total Products"
              count={productCounts.totalQty}
              branches={branches}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
            />
            <DropdownCard
              bgColor="purple"
              title="Assigned Products"
              count={productCounts.totalAssignedQty}
              branches={branches}
              selectedBranch={selectedBranch}
              setSelectedBranch={setSelectedBranch}
            />
          </>
        )}

        {/* Always display In Hand Products card */}
        <DropdownCard
          bgColor="green"
          title="In Hand Products"
          count={productCounts.totalInHandsQty}
          branches={branches}
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
        />
      </div>

      {/* Search and Table */}
      <div className="flex mb-4">
        <div className="flex-grow mr-2">
          <input
            type="text"
            name="productId"
            placeholder="Search with ID"
            value={searchData.productId}
            onChange={handleInputChange}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            style={{ paddingLeft: '8px' }}
          />
        </div>
        <div className="flex-grow mx-2">
          <input
            type="text"
            name="productName"
            placeholder="Search with Name"
            value={searchData.productName}
            onChange={handleInputChange}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            style={{ paddingLeft: '8px' }}
          />
        </div>
        <div className="flex-grow mx-2">
          <input
            type="text"
            name="location"
            placeholder="Search with location"
            value={searchData.location}
            onChange={handleInputChange}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            style={{ paddingLeft: '8px' }}
          />
        </div>
        <button
          onClick={handleSearch}
          className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      {/* Grid View or Table */}
      {isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {products.map((profile, index) => (
            <div
              key={index}
              className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-400"
            >
              <div className="absolute top-4 right-4 text-gray-400 cursor-pointer">
                <FaEllipsisVertical />
              </div>

              {/* Profile Picture */}
              <img
                className="rounded-full mx-auto h-24 w-24 object-cover"
                src={`https://i.pravatar.cc/150?img=${index + 1}`} // Placeholder image source
                alt="Profile"
              />

              <div className="text-center mt-4">
                <h2 className="text-lg font-semibold">{profile.productName}</h2>
                <p className="text-sm text-gray-500">
                  {truncateString(profile.productDescription || '')}
                </p>
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  className={`px-2 py-1 border border-gray-400 rounded-[3px] text-gray-400 hover:cursor-pointer  ${permissions.add ? '' : 'cursor-not-allowed opacity-50'}`}
                  onClick={handleMoreDetails}
                  disabled={!permissions.view}
                >
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
          showEdit={false}
          showDelete={permissions.delete}
          showDetails={permissions.view}
          onDetails={handleMoreDetails}
        />
      )}
    </div>
  );


  // return (
  //   <div className="m-2">
  //     <div className="flex justify-between items-center py-4">
  //       {/* Left: Staff Details Heading */}
  //       <h2 className="text-2xl font-semibold text-gray-800">Products</h2>

  //       {/* Right: Icons and Add Staff Button */}
  //       <div className="flex items-center space-x-4">
  //         {/* List View Icon */}
  //         <button
  //           className={`p-2 cursor-pointer ${!isGridView && 'border border-black'}`}
  //           onClick={() => setIsGridView(false)}
  //         >
  //           <FaList size={18} />
  //         </button>

  //         {/* Grid View Icon */}
  //         <button
  //           className={`p-2 cursor-pointer ${isGridView && 'border border-black'}`}
  //           onClick={() => setIsGridView(true)}
  //         >
  //           <FaTh size={18} />
  //         </button>
  //         <button
  //           className={`flex items-center space-x-2 text-white px-4 py-2 rounded-md cursor-pointer ${permissions.add ? 'bg-green-700' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
  //           onClick={() => navigate('/add-product')}
  //           disabled={!permissions.add}
  //         >
  //           <span>Add Product</span>
  //         </button>
  //       </div>
  //     </div>
  //     <div className="flex justify-between mx-6">
  //       <DropdownCard
  //         bgColor="red"
  //         title="Total Products"
  //         count={productCounts.totalQty}
  //         branches={branches}
  //         selectedBranch={selectedBranch}
  //         setSelectedBranch={setSelectedBranch}
  //       />
  //       <DropdownCard
  //         bgColor="green"
  //         title="In Hand Products"
  //         count={productCounts.totalInHandsQty}
  //         branches={branches}
  //         selectedBranch={selectedBranch}
  //         setSelectedBranch={setSelectedBranch}
  //       />
  //       <DropdownCard
  //         bgColor="purple"
  //         title="Assigned Products"
  //         count={productCounts.totalAssignedQty}
  //         branches={branches}
  //         selectedBranch={selectedBranch}
  //         setSelectedBranch={setSelectedBranch}
  //       />
  //     </div>

  //     <div className="flex mb-4">
  //       <div className="flex-grow mr-2">
  //         <input
  //           type="text"
  //           name="productId"
  //           placeholder="Search with ID"
  //           value={searchData.productId}
  //           onChange={handleInputChange}
  //           className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
  //           style={{ paddingLeft: '8px' }}
  //         />
  //       </div>
  //       <div className="flex-grow mx-2">
  //         <input
  //           type="text"
  //           name="productName"
  //           placeholder="Search with Name"
  //           value={searchData.productName}
  //           onChange={handleInputChange}
  //           className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
  //           style={{ paddingLeft: '8px' }}
  //         />
  //       </div>
  //       <div className="flex-grow mx-2">
  //         <input
  //           type="text"
  //           name="location"
  //           placeholder="Search with location"
  //           value={searchData.location}
  //           onChange={handleInputChange}
  //           className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
  //           style={{ paddingLeft: '8px' }}
  //         />
  //       </div>
  //       <button
  //         onClick={handleSearch}
  //         className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
  //       >
  //         <FaSearch className="mr-2" /> Search
  //       </button>
  //     </div>

  //     {isGridView ? (
  //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
  //         {products.map((profile, index) => (
  //           <div
  //             key={index}
  //             className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-400"
  //           >
  //             {/* Static 3 dots */}
  //             <div className="absolute top-4 right-4 text-gray-400 cursor-pointer">
  //               <FaEllipsisVertical />
  //             </div>

  //             {/* Profile Picture */}
  //             <img
  //               className="rounded-full mx-auto h-24 w-24 object-cover"
  //               src={`https://i.pravatar.cc/150?img=${index + 1}`} // Placeholder image source
  //               alt="Profile"
  //             />

  //             {/* Name and Description */}
  //             <div className="text-center mt-4">
  //               <h2 className="text-lg font-semibold">{profile.productName}</h2>
  //               <p className="text-sm text-gray-500">
  //                 {truncateString(profile.productDescription || '')}
  //               </p>
  //             </div>

  //             {/* Button */}
  //             <div className="mt-4 flex justify-center">
  //               <button
  //                 className={`px-2 py-1 border border-gray-400 rounded-[3px] text-gray-400 hover:cursor-pointer  ${permissions.add ? '' : 'cursor-not-allowed opacity-50'}`}
  //                 onClick={handleMoreDetails}
  //                 disabled={!permissions.view}
  //               >
  //                 View Details
  //               </button>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     ) : (
  //       <Table
  //         columns={columns}
  //         data={tableData}
  //         // onEdit={(profile) => console.log('Edit:', profile)}
  //         showEdit={false}
  //         showDelete={permissions.delete}
  //         showDetails={permissions.view}
  //         onDetails={handleMoreDetails}
  //       />
  //     )}
  //   </div>
  // );
};

export default Products;
