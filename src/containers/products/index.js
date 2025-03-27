import React, { useState, useEffect, useCallback } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FaList, FaTh, FaPlus, FaSearch, FaEllipsisV } from 'react-icons/fa';
import DropdownCard from '../../components/DropdownCard';
import { useNavigate } from 'react-router';
import ApiService, { initialAuthState } from '../../services/ApiService';
import Table from '../../components/Table';
import { getPermissions } from '../../common/commonUtils';

const data = [
  { id: '01', name: 'Bike GPS Tracker', stock: 5342 },
  { id: '02', name: 'Car GPS Tracker', stock: 3423 },
  { id: '03', name: 'Fuel Monitoring System', stock: 234 },
  { id: '04', name: 'Bike GPS Tracker', stock: 3412 },
  { id: '05', name: 'Car GPS Tracker', stock: 3322 },
  { id: '06', name: 'Fuel Monitoring System', stock: 3421 },
  { id: '07', name: 'Bike GPS Tracker', stock: 0 },
];

const data1 = [
  { id: 1, staffId: "7664FG462G", staffName: "Praveen", product: "7664FG462G", quantity: 5342, date: "5342" },
  { id: 2, staffId: "7664FG462G", staffName: "Praveen", product: "7664FG462G", quantity: 3423, date: "3423" },
  { id: 3, staffId: "7664FG462G", staffName: "Praveen", product: "7664FG462G", quantity: 234, date: "234" },
  { id: 4, staffId: "7664FG462G", staffName: "Praveen", product: "7664FG462G", quantity: 3412, date: "3412" },
  { id: 5, staffId: "7664FG462G", staffName: "Praveen", product: "7664FG462G", quantity: 3322, date: "3322" },
];

const Products = () => {
  const [selected, setSelected] = useState("branchstock");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const [filters, setFilters] = useState({
    staffId: "",
    staffName: "",
    productName: "",
    fromDate: "",
    toDate: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };
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

      if (payload.role === 'Technician' || payload.role === 'Sales Man') {
        payload.staffId = localStorage.getItem('userId');
      }

      let response;
      if (payload.staffId) {
        response = await ApiService.post('/dashboards/getSearchDetailProductAssign', payload);
      } else {
        response = await ApiService.post('/products/getSearchDetailProduct', payload);
      }

      if (response?.status) {
        const filteredData = response.data.map((item) => ({
          productId: item.id,
          productName: item.productName || 'N/A',
          productDescription: item.productDescription || 'N/A',
          vendorName: item.vendorName || (item.vendorId?.name ?? 'N/A'),
          imeiNumber: item.imeiNumber || 'N/A',
          presentStock: item.quantity || 0, // Assuming stock is quantity
        }));

        setTableData(filteredData);
        setColumns(Object.keys(filteredData[0] || {})); // Corrected empty object
        setProducts(response.data || []);
      } else {
        alert(response?.data?.internalMessage || 'Failed to fetch product details.');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      alert('Failed to fetch product details.');
    }
  }, [searchData, initialAuthState.companyCode, initialAuthState.unitCode]);

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
          <button
            className={`flex items-center space-x-2 text-white px-4 py-2 rounded-md cursor-pointer ${permissions.add ? 'bg-green-700' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
            onClick={() => navigate('/add-product')}
            disabled={!permissions.add}
          >
            <span>Add Product</span>
          </button>
          <button
  className={`flex items-center space-x-2 text-white px-4 py-2 rounded-md cursor-pointer shadow-md ${
    permissions.add ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400 cursor-not-allowed opacity-50'
  }`}
  onClick={() => navigate('/add-inhand-product')}
  disabled={!permissions.add}
>
  <span>In hand Products</span>
</button>

        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 m-6">
  {/* Conditionally render based on role */}
  {role !== 'Technician' && role !== 'Sales Man' && (
    <div className="bg-red-400 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
    onClick={() => setSelected("branchstock")}>
      <div className="bg-white shadow-md rounded-md p-2 w-3/4">
        <span className="text-gray-800 font-medium">Branch Stack</span>
      </div>
      <div className="text-white text-6xl font-bold mt-4">500</div>
    </div>
  )}

  {/* Always display In Hand Products card */}
  <div className="bg-green-400 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
  onClick={() => setSelected("handstock")}>
    <div className="bg-white shadow-md rounded-md p-2 w-3/4">
      <span className="text-gray-800 font-medium">In Hand Products</span>
    </div>
    <div className="text-white text-6xl font-bold mt-4">220</div>
  </div>
</div>


      {/* Search and Table */}
      {selected==="branchstock"&&(<>
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

      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-6 py-3 text-left text-sm font-bold">No.</th>
            <th className="px-6 py-3 text-left text-sm font-bold">Product Name</th>
            <th className="px-6 py-3 text-left text-sm font-bold">Present Stock</th>
            <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={`border-b ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}
            >
              <td className="px-6 py-4">{item.id}</td>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.stock}</td>
              <td className="border p-2 text-center relative">
  <button 
    onClick={() => toggleDropdown(item.id)} 
    className="p-2 bg-white rounded-md focus:outline-none"
  >
    <FaEllipsisV className="cursor-pointer text-gray-700" />
  </button>

  {dropdownOpen === item.id && (
    <div className="absolute right-0 bg-white shadow-md border rounded-md w-32 z-10">
      <ul className="text-left">
        <li className="p-2 hover:bg-gray-100 cursor-pointer">Edit</li>
        <li className="p-2 hover:bg-gray-100 cursor-pointer">Delete</li>
        <li className="p-2 hover:bg-gray-100 cursor-pointer">More Details</li>
      </ul>
    </div>
  )}
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div></>)}

    {selected==="handstock"&&(<>
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

      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-6 py-3 text-left text-sm font-bold">Staff Id</th>
            <th className="px-6 py-3 text-left text-sm font-bold">Staff Name</th>
            <th className="px-6 py-3 text-left text-sm font-bold">Product</th>
            <th className="px-6 py-3 text-left text-sm font-bold"> Quantity</th>
            <th className="px-6 py-3 text-left text-sm font-bold">  Date</th>
            <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {data1.map((item, index) => (
            <tr
              key={item.id}
              className={`border-b ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}
            >
              <td className="px-6 py-4">{item.staffId}</td>
              <td className="px-6 py-4">{item.staffName}</td>
              <td className="px-6 py-4">{item.product}</td>
              <td className="px-6 py-4">{item.quantity}</td>
              <td className="px-6 py-4">{item.date}</td>
              <td className="border p-2 text-center relative">
  <button 
    onClick={() => toggleDropdown(item.id)} 
    className="p-2 bg-white rounded-md focus:outline-none"
  >
    <FaEllipsisV className="cursor-pointer text-gray-700" />
  </button>

  {dropdownOpen === item.id && (
    <div className="absolute right-0 bg-white shadow-md border rounded-md w-32 z-10">
      <ul className="text-left">
        <li className="p-2 hover:bg-gray-100 cursor-pointer">Edit</li>
        <li className="p-2 hover:bg-gray-100 cursor-pointer">Delete</li>
        <li className="p-2 hover:bg-gray-100 cursor-pointer">More Details</li>
      </ul>
    </div>
  )}
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div></>)}




    </div>
  );


};

export default Products;
