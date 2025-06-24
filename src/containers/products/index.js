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
  {
    id: 1,
    staffId: '7664FG462G',
    staffName: 'Praveen',
    product: '7664FG462G',
    quantity: 5342,
    date: '5342',
  },
  {
    id: 2,
    staffId: '7664FG462G',
    staffName: 'Praveen',
    product: '7664FG462G',
    quantity: 3423,
    date: '3423',
  },
  {
    id: 3,
    staffId: '7664FG462G',
    staffName: 'Praveen',
    product: '7664FG462G',
    quantity: 234,
    date: '234',
  },
  {
    id: 4,
    staffId: '7664FG462G',
    staffName: 'Praveen',
    product: '7664FG462G',
    quantity: 3412,
    date: '3412',
  },
  {
    id: 5,
    staffId: '7664FG462G',
    staffName: 'Praveen',
    product: '7664FG462G',
    quantity: 3322,
    date: '3322',
  },
];

const Products = () => {
  const [selected, setSelected] = useState(() => {
    const role = localStorage.getItem('role'); // adjust the key if needed
    if (role === 'Branch Manager') return 'branchstock';
    if (role === 'sub dealer') return 'subDealerStock';
    // if (role === 'subDealer') return 'subDealerStock';
    if (role === 'CEO') return '';
    return ''; // default fallback
  });

  const localStorageBranchName = localStorage.getItem('branchName');
  const localStorageSubdealerId = localStorage.getItem('userId');
  const localStorageStaffId = localStorage.getItem('userId');

  console.log(localStorageSubdealerId, 'local storage sub dealer id');

  const [branchStock, setBranchStock] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [inHandStock, setInHandStock] = useState([]);
  const [inhandList, setInhandList] = useState([]);
  const [subDealerStock, setSubDealerStock] = useState([]);
  const [subDealerList, setSubDealerList] = useState([]);
  const [subDealerNames, setSubDealerNames] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [stock, setStock] = useState(null);
  const [allProductsStock, setAllProductsStock] = useState(null);
  const [unassignedData, setUnassignedData] = useState([]);
  // if (branchStock) {
  //   console.log('++++++++ R', branchStock);
  // }
  console.log('Selected:', selected);

  console.log(branchStock, 'branchStock');
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const [filters, setFilters] = useState({
    staffId: '',
    staffName: '',
    productName: '',
    fromDate: '',
    toDate: '',
  });

  const navigate = useNavigate();
  const loggedinRoll = localStorage.getItem('role');
  const [selectedBranch, setSelectedBranch] = useState(
    loggedinRoll === 'Branch Manager' ? localStorageBranchName : ''
  );

  const [searchData, setSearchData] = useState({
    productName: '',
    branchName: '',
    staffName: '',
    subDealerName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isGridView, setIsGridView] = useState(true);
  const [products, setProducts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [assignPermissions, setAssignPermissions] = useState({});
  // const [searchData, setSearchData] = useState({
  //   productId: '',
  //   productName: '',
  //   location: '',
  // });
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
      if (payload.role === 'Technician' || payload.role === 'Sales Man') {
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
    const assignPerms = getPermissions('productassign');
    setPermissions(perms);
    setAssignPermissions(assignPerms);
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
        response = await ApiService.post(
          '/dashboards/getSearchDetailProductAssign',
          payload
        );
      } else {
        response = await ApiService.post(
          '/products/getSearchDetailProduct',
          payload
        );
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
        alert(
          response?.data?.internalMessage || 'Failed to fetch product details.'
        );
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      alert('Failed to fetch product details.');
    }
  }, [searchData, initialAuthState.companyCode, initialAuthState.unitCode]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setSearchData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleSearch = () => {
  //   const searchQuery = searchData.name.toLowerCase().trim();

  //   if (searchQuery === '') {
  //     setBranchStock(branchStock); // Reset to original data
  //   } else {
  //     const filteredData = branchStock.filter((item) =>
  //       item.name.toLowerCase().includes(searchQuery)
  //     );
  //     setBranchStock(filteredData);
  //   }
  // };

  // const handleSearch = () => {
  //   const productSearch = searchData.productName?.toLowerCase() ?? '';

  //   if (selected === 'branchstock') {
  //     const branchSearch = searchData.branchName?.toLowerCase() ?? '';
  //     const filtered = branchStock.filter(
  //       (item) =>
  //         (item?.productName ?? '').toLowerCase().includes(productSearch) &&
  //         (item?.branchName ?? '').toLowerCase().includes(branchSearch)
  //     );
  //     setFilteredBranchStock(filtered);
  //   }

  //   if (selected === 'handstock') {
  //     const staffSearch = searchData.staffName?.toLowerCase() ?? '';
  //     const filtered = handStock.filter(
  //       (item) =>
  //         (item?.productName ?? '').toLowerCase().includes(productSearch) &&
  //         (item?.staffName ?? '').toLowerCase().includes(staffSearch)
  //     );
  //     setInHandStock(filtered); // if you have a separate `filteredInHandStock`, use that
  //   }

  //   if (selected === 'subDealerStock') {
  //     const dealerSearch = searchData.subDealerName?.toLowerCase() ?? '';
  //     const filtered = subDealerStock.filter(
  //       (item) =>
  //         (item?.productName ?? '').toLowerCase().includes(productSearch) &&
  //         (item?.subDealerName ?? '').toLowerCase().includes(dealerSearch)
  //     );
  //     setFilteredSubdealerStock(filtered);
  //   }
  // };

  // const filteredBranchStock = selectedBranch
  //   ? branchStock.filter((item) => item.branchName === selectedBranch)
  //   : branchStock;

  // const filteredSubdealerStock =
  //   loggedinRoll === 'sub dealer'
  //     ? subDealerStock.filter(
  //         (item) => item.subDealerId === localStorageSubdealerId
  //       )
  //     : subDealerStock;

  // console.log(filteredSubdealerStock, 'filtered stockkkkk');

  // const filteredStaffStock = selectedBranch
  //   ? branchStock.filter((item) => item.branchName === selectedBranch)
  //   : branchStock;

  const filteredStock = stock?.filter((item) =>
    item?.productName
      ?.toLowerCase()
      .includes(searchData.productName.toLowerCase())
  );

  const filteredBranchStock = branchStock.filter((item) => {
    const matchesProduct = item?.productName
      ?.toLowerCase()
      .includes(searchData.productName.toLowerCase());

    const branchToCompare = searchData.branchName || selectedBranch;
    const matchesBranch = item?.branchName
      ?.toLowerCase()
      .includes(branchToCompare.toLowerCase());

    return matchesProduct && matchesBranch;
  });

  const filteredInHandStock = inHandStock.filter(
    (item) =>
      item?.productName
        ?.toLowerCase()
        .includes(searchData.productName.toLowerCase()) &&
      item?.staffName
        ?.toLowerCase()
        .includes(searchData.staffName.toLowerCase())
  );

  const filteredSubdealerStock = subDealerStock.filter(
    (item) =>
      item?.productName
        ?.toLowerCase()
        .includes(searchData.productName.toLowerCase()) &&
      item?.subDealerName
        ?.toLowerCase()
        .includes(searchData.subDealerName.toLowerCase()) &&
      (loggedinRoll === 'sub dealer'
        ? item?.subDealerId === localStorageSubdealerId
        : true)
  );

  const handleSearch = () => {
    console.log('Search triggered with:', searchData);
  };

  // Choose which data to display based on the selected stock type
  const displayedData =
    selected === 'branchstock'
      ? filteredBranchStock
      : selected === 'handstock'
        ? filteredInHandStock
        : filteredSubdealerStock;

  useEffect(() => {
    getSearchDetailProduct();
  }, [getSearchDetailProduct]);

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
  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const getUassignedProducts = async () => {
    const payload = {
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
    };

    const response = await ApiService.post(
      '/products/getSearchDetailProduct',
      payload
    );

    if (response.status) {
      setUnassignedData(response.data);
      console.log(response.data, 'unassigned proucts');
    } else {
      alert('feiled');
    }
  };

  const fetchAllProductStock = async () => {
    try {
      const response = await ApiService.post('/products/productAssignDetails', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        branchName:localStorage.getItem("branchName")
      });
      if (response.data) {
        setBranchList(response.data.branchList);
        setBranchStock(response.data.branchDetails);
        setInhandList(response.data.staffList);
        setInHandStock(response.data.staffDetails);
        setSubDealerList(response.data.subDealerList);
        setSubDealerStock(response.data.subDealerDetails);
        setAllProductsStock(response.data);
        console.log('qazwsxedc', response.data);
      } else {
        console.error('Invalid API response');
      }
    } catch (error) {
      console.error('Error fetching product types:', error);
    } finally {
    }
  };

  const fetchStock = async () => {
    try {
      const response = await ApiService.post(
        '/products/getSearchDetailProduct',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      if (response.data) {
        setStock(response.data);
        console.log('qazwsxedc', response.data);
      } else {
        console.error('Invalid API response');
      }
    } catch (error) {
      console.error('Error fetching product types:', error);
    } finally {
    }
  };

  const fetchSubDealerDropDown = async () => {
    try {
      const response = await ApiService.post(
        '/subdealer/getSubDealerNamesDropDown',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      if (response.data) {
        setSubDealerNames(response.data);
        console.log(response.data, 'sub delear');
      } else {
        console.error('Invalid API:');
      }
    } catch (error) {
      console.error('Error fetching sub delears names:', error);
    }
  };

  useEffect(() => {
    fetchAllProductStock();
    fetchStock();
    fetchSubDealerDropDown();
    getUassignedProducts();
  }, []);

  // console.log(branchList, 'kisyd');

  const totalUnassignedStock = unassignedData.reduce((total, item) => {
    const present = parseInt(item.notAssignedStock || '0', 10);
    // const hand = parseInt(item.handStock || '0', 10);
    return total + present;
  }, 0);

  // console.log(tableData, 'table');

  console.log(totalUnassignedStock, 'total un assigned stock');

  const totalBranchStock = filteredBranchStock.reduce((total, item) => {
    const present = parseInt(item.presentStock || '0', 10);
    const hand = parseInt(item.handStock || '0', 10);
    return total + present + hand;
  }, 0);

  const totalHandStock = inHandStock.reduce((total, item) => {
    const hand = parseInt(item.handStock || '0', 10);
    return total + hand;
  }, 0);

  const totalSubDealerStock = filteredSubdealerStock.reduce((total, item) => {
    const present = parseInt(item.presentStock || '0', 10);

    return total + present;
  }, 0);

  return (
    <div className="m-2">
      <div className="flex justify-between items-center py-6 border-b border-gray-300 mb-4">
        <h2 className="text-3xl font-bold text-gray-900">Products</h2>

        <div className="flex items-center space-x-4">
          {['ceo', 'inventory Operational Analyst', 'warehouse manager', 'accountant'].includes(
            loggedinRoll.toLowerCase()
          ) && (
              <button
                className="flex items-center space-x-2 bg-yellow-400 hover:bg-yellow-800 text-white px-5 py-2.5 rounded-lg transition duration-300 ease-in-out"
                onClick={() => setSelected('')}
              >
                <span className="font-medium">Refresh</span>
              </button>
            )}

          <button
            className={`flex items-center space-x-2 text-white px-5 py-2.5 rounded-lg transition duration-300 ease-in-out ${permissions.add
              ? 'bg-green-700 hover:bg-green-800 shadow-md'
              : 'bg-gray-400 cursor-not-allowed opacity-50'
              }`}
            onClick={() => navigate('/add-product')}
            disabled={!permissions.add}
          >
            <span className="font-medium">Add Product</span>
          </button>
          <button
            className={`flex items-center space-x-2 text-white px-5 py-2.5 rounded-lg transition duration-300 ease-in-out ${permissions.edit
              ? 'bg-blue-700 hover:bg-blue-800 shadow-md'
              : 'bg-blue-400 cursor-not-allowed opacity-50'
              }`}
            onClick={() => navigate('/add-product-assign')}
            disabled={!permissions.edit}
          >
            <span className="font-medium">Add Product Assign</span>
          </button>
          <button
            className={`flex items-center space-x-2 text-white px-5 py-2.5 rounded-lg transition duration-300 ease-in-out ${permissions.edit
              ? 'bg-orange-500 hover:bg-orange-600 shadow-md'
              : 'bg-gray-400 cursor-not-allowed opacity-50'
              }`}
            onClick={() => navigate('/add-inhand-product')}
            disabled={!permissions.edit}
          >
            <span className="font-medium">In hand Products</span>
          </button>
        </div>
      </div>
      {role !== 'CEO' ||
        role !== 'Accountant' ||
        role !== 'sub dealer' ||
        role !== 'Inventory Operational Analyst' ||
        role !== 'Warehouse Manager' || (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 m-6">
            {role !== 'CEO' && role !== 'Sales Man' && (
              <div
                className="bg-red-400 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:scale-105 transition"
                onClick={() => setSelected('branchstock')}
              >
                <div className="bg-white shadow-inner rounded-md p-2 w-3/4">
                  <span className="text-gray-800 font-medium">
                    Total Products
                  </span>
                </div>
                <div className="text-white text-5xl font-extrabold mt-6">
                  {totalBranchStock}
                </div>
              </div>
            )}

            {/* <div
              className="bg-green-400 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:scale-105 transition"
              onClick={() => setSelected('handstock')}
            >
              <div className="bg-white shadow-inner rounded-md p-2 w-3/4">
                <span className="text-gray-800 font-medium">
                  In Hand Products
                </span>
              </div>
              <div className="text-white text-5xl font-extrabold mt-6">220</div>
            </div> */}

            {/* <div
            className="bg-green-400 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:scale-105 transition"
            onClick={() => setSelected('subDealerStock')}
          >
            <div className="bg-white shadow-inner rounded-md p-2 w-3/4">
              <span className="text-gray-800 font-medium">Sub Dealers</span>
            </div>
            <div className="text-white text-5xl font-extrabold mt-6">100</div>
          </div>

          <div
            className="bg-green-400 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:scale-105 transition"
            onClick={() => setSelected('handstock')}
          >
            <div className="bg-white shadow-inner rounded-md p-2 w-3/4">
              <span className="text-gray-800 font-medium">
                In Hand Products
              </span>
            </div>
            <div className="text-white text-5xl font-extrabold mt-6">220</div>
          </div> */}
          </div>
        )}
      {role !== 'CEO' ||
        role !== 'Accountant' ||
        role !== 'Branch Manager' ||
        role !== 'Inventory Operational Analyst' ||
        role !== 'Warehouse Manager' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 m-6">
            {/* {role !== 'CEO' && role !== 'Sales Man' && (
            <div
              className="bg-red-400 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:scale-105 transition"
              onClick={() => setSelected('branchstock')}
            >
              <div className="bg-white shadow-inner rounded-md p-2 w-3/4">
                <span className="text-gray-800 font-medium">
                  Total Products
                </span>
              </div>
              <div className="text-white text-5xl font-extrabold mt-6">500</div>
            </div>
          )} */}

            <div
              className="bg-green-400 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:scale-105 transition"
              onClick={() => setSelected('subDealerStock')}
            >
              <div className="bg-white shadow-inner rounded-md p-2 w-3/4">
                <span className="text-gray-800 font-medium">
                  Total Products
                </span>
              </div>
              <div className="text-white text-5xl font-extrabold mt-6">
                {totalSubDealerStock}
              </div>
            </div>

            {/* <div
            className="bg-green-400 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:scale-105 transition"
            onClick={() => setSelected('handstock')}
          >
            <div className="bg-white shadow-inner rounded-md p-2 w-3/4">
              <span className="text-gray-800 font-medium">
                In Hand Products
              </span>
            </div>
            <div className="text-white text-5xl font-extrabold mt-6">220</div>
          </div> */}
          </div>
        )}
      {(role === 'CEO' ||
        role === 'Warehouse Manager' ||
        role === 'Branch Manager' ||
        role === 'Inventory Operational Analyst' ||
        role === 'Accountant') && (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 m-6">
            {role !== 'Technician' && role !== 'Sales Man' && (
              <>
                <div
                  className="bg-red-400 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:scale-105 transition"
                  onClick={() => setSelected('branchstock')}
                >
                  <div className="bg-white shadow-inner rounded-md p-2 w-3/4">
                    <select
                      name="branchName"
                      disabled={!permissions.add}
                      value={searchData.branchName}
                      onChange={handleInputChange}
                      className="w-full p-1 text-gray-700 rounded focus:outline-none"
                    >
                      <option value="">Select Branch</option>
                      {branchList.map((branch, index) => (
                        <option key={index} value={branch.branchName}>
                          {branch.branchName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-white text-5xl font-extrabold mt-6">
                    {selected === 'branchstock'
                      ? totalBranchStock
                      : totalUnassignedStock}
                  </div>
                </div>
              </>
            )}
              <div
                className="bg-green-400 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:scale-105 transition"
                onClick={() => setSelected('subDealerStock')}
              >
                <div className="bg-white shadow-inner rounded-md p-2 w-3/4">
                  <span className="text-gray-800 font-medium">Sub Dealers</span>
                </div>
                <div className="text-white text-5xl font-extrabold mt-6">
                  {totalSubDealerStock}
                </div>
              </div>

              <div
                className="bg-green-400 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:scale-105 transition"
                onClick={() => setSelected('handstock')}
              >
                <div className="bg-white shadow-inner rounded-md p-2 w-3/4">
                  <span className="text-gray-800 font-medium">
                    In Hand Products
                  </span>
                </div>
                <div className="text-white text-5xl font-extrabold mt-6">
                  {totalHandStock}
                </div>
              </div>
          </div>

        )}
      {selected == !'branchstock' &&
        selected == !'handstock' &&
        selected == !'subDealerStock' && (
          <>
            <div className="flex flex-wrap gap-4 mb-6">
              <input
                type="text"
                name="productName"
                placeholder="Search by Name"
                value={searchData.productName}
                onChange={handleInputChange}
                className="flex-grow h-12 border border-gray-300 rounded-md px-3 shadow-sm focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSearch}
                className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center shadow-md hover:bg-green-800 transition"
              >
                <FaSearch className="mr-2" /> Search
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold">
                      S.No.
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold">
                      Present Stock
                    </th>
                    {/* <th className="px-6 py-3 text-left text-sm font-bold">
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {filteredStock?.length > 0 ? (
                    filteredStock?.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                          } hover:bg-gray-50`}
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <td className="px-6 py-4">{item.productName}</td>
                        <td className="px-6 py-4">{item.notAssignedStock}</td>
                        {/* <td className="px-6 py-4 text-center relative dropdown-container">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(index);
                            }}
                            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                          >
                            <FaEllipsisV className="text-gray-600" />
                          </button>

                          {dropdownOpen === index && (
                            <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md w-40 z-50">
                              <ul className="text-left">
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                                  Edit
                                </li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                                  Delete
                                </li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                                  More Details
                                </li>
                              </ul>
                            </div>
                          )}
                        </td> */}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-4 text-gray-500"
                      >
                        No product types found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

      {(selected === 'branchstock' ||
        selected === 'handstock' ||
        selected === 'subDealerStock') && (
          <>
            <div className="flex flex-wrap gap-4 mb-6">
              <input
                type="text"
                name="productName"
                placeholder="Search Product Name"
                value={searchData.productName}
                onChange={handleInputChange}
                className="flex-grow h-12 border border-gray-300 rounded-md px-3 shadow-sm"
              />

              {/* {selected === 'branchstock' && (
              <input
                type="text"
                name="branchName"
                placeholder="Search Branch Name"
                value={searchData.branchName}
                onChange={handleInputChange}
                className="flex-grow h-12 border border-gray-300 rounded-md px-3 shadow-sm"
              />
            )} */}

              {selected === 'handstock' && (
                <input
                  type="text"
                  name="staffName"
                  placeholder="Search Staff Name"
                  value={searchData.staffName}
                  onChange={handleInputChange}
                  className="flex-grow h-12 border border-gray-300 rounded-md px-3 shadow-sm"
                />
              )}

              {selected === 'subDealerStock' && (
                <input
                  type="text"
                  name="subDealerName"
                  placeholder="Search Sub Dealer Name"
                  value={searchData.subDealerName}
                  onChange={handleInputChange}
                  className="flex-grow h-12 border border-gray-300 rounded-md px-3 shadow-sm"
                />
              )}

              <button
                onClick={handleSearch}
                className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center shadow-md hover:bg-green-800"
              >
                <FaSearch className="mr-2" /> Search
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold">
                      {selected === 'branchstock' && 'Branch'}
                      {selected === 'subDealerStock' && 'Sub Dealer'}
                      {selected === 'handstock' && 'Staff Name'}
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold">
                      Stock
                    </th>

                    {/* <th className="px-6 py-3 text-left text-sm font-bold">
                    IMEI
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-bold">
                    Sim Number
                  </th> */}
                    {/* <th className="px-6 py-3 text-left text-sm font-bold">
                    Date
                  </th> */}
                    {/* <th className="px-6 py-3 text-left text-sm font-bold">
                    Action
                  </th> */}
                  </tr>
                </thead>
                <tbody>
                  {(selected === 'branchstock'
                    ? filteredBranchStock
                    : selected === 'subDealerStock'
                      ? filteredSubdealerStock
                      : filteredInHandStock
                  ).map((item, index) => (
                    <tr
                      key={item.id || index}
                      className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-50`}
                    >
                      <td className="px-6 py-4">{item.productName || '-'}</td>

                      {selected === 'handstock' && (
                        <>
                          <td className="px-6 py-4">{item.staffName}</td>
                          <td className="px-6 py-4">{item.handStock}</td>
                        </>
                      )}

                      {selected === 'branchstock' && (
                        <>
                          <td className="px-6 py-4">{item.branchName}</td>
                          <td className="px-6 py-4">{item.presentStock}</td>
                        </>
                      )}
                      {selected === 'subDealerStock' && (
                        <>
                          <td className="px-6 py-4">{item.subDealerName}</td>
                          <td className="px-6 py-4">{item.presentStock}</td>
                        </>
                      )}

                      {/* Staff Name for in-hand */}
                      {/* {selected === 'handstock' && (
                      <td className="px-6 py-4">{item.staffName}</td>
                    )} */}

                      {/* Date - optional fallback */}
                      {/* <td className="px-6 py-4">{item.date || '-'}</td> */}

                      {/* Actions */}
                      {/* <td className="px-6 py-4 text-center relative">
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        <FaEllipsisV className="text-gray-600" />
                      </button>

                      {dropdownOpen === item.id && (
                        <div className="absolute right-0 bg-white shadow-md border rounded-md w-40 z-50 mt-2">
                          <ul className="text-left">
                            <li className="p-2 hover:bg-gray-100 cursor-pointer">
                              Edit
                            </li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer">
                              Delete
                            </li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer">
                              More Details
                            </li>
                          </ul>
                        </div>
                      )}
                    </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
    </div>
  );
};

export default Products;
