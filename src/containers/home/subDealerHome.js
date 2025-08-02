import React, { useState, useEffect, useCallback } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { FaList, FaTh, FaPlus, FaSearch, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';


const SubDealerHome = () => {
  const [selected, setSelected] = useState("totalworks");
  const [branchStock, setBranchStock] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [subdealerWorks, setSubdealerWorks] = useState([]);
  const [workCards, setWorkCards] = useState([]);

  if (branchStock) {
    console.log("++++++++ R", branchStock)
  }

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


  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState('');
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

  const handleSearch = () => {
    const searchQuery = searchData.name.toLowerCase().trim();

    if (searchQuery === "") {
      setBranchStock(branchStock); // Reset to original data
    } else {
      const filteredData = branchStock.filter((item) =>
        item.name.toLowerCase().includes(searchQuery)
      );
      setBranchStock(filteredData);
    }
  };

  useEffect(() => {
    getSearchDetailProduct();
  }, [getSearchDetailProduct]);

  // const handleSearch = async () => {
  //   getSearchDetailProduct();
  // };

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

  const fetchWorkCards = async () => {
    const id = Number(localStorage.getItem('id'));
    try {
      const response = await ApiService.post("/technician/getWorkStatusCards", {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        subDealerId: id
      });

      if (response.data?.subDealer?.length > 0) {
        console.log("work cardsss", response.data?.subDealer);
        const subdealerID = await localStorage.getItem("userId");
        const rrr = response.data?.subDealer.find((item) => item.subDealerId === subdealerID.toString());
        if (rrr) {
          console.log("exist :", rrr)
          setWorkCards(rrr);
        } else {
          console.log("not exist :", rrr)

          const aaa = {
            "subDealerId": subdealerID,
            "totalInstallWork": "0",
            "totalAcceptWork": "0",
            "totalActivateWork": "0",
            "totalPendingWork": "0",
            "totalCompletedWork": "0"
          }
          setWorkCards(aaa);
        }
      } else {
        console.error("No subDealer data found");
      }
    } catch (error) {
      console.error("Error fetching work status cards:", error);
    }
  };


  const idSub = localStorage.getItem('userId');
  console.log("jjjj sub home ", idSub);
  const fetchSubdealerWorks = async () => {

    try {
      const response = await ApiService.post(
        '/technician/getBackendSupportWorkAllocation',
        {
          subDealerId: idSub,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      setSubdealerWorks(response.data || []);
      console.log("sub delar works ,>", response.data)
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setSubdealerWorks([]);
    }
  };

  useEffect(() => {
    fetchWorkCards();
    fetchSubdealerWorks();
  }, []);

  return (
    <div className="m-2">
      <div className="flex justify-between items-center py-4">
        {/* Left: Staff Details Heading */}
        <h2 className="text-2xl font-semibold text-gray-800">Sub Dealer Home</h2>
      </div>

      <div className="grid grid-cols-5 gap-6 m-6">

        <div className="bg-white-100 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
          onClick={() => setSelected("totalworks")}>

          <span className="text-gray-800 font-medium">Total Install Works</span>

          <div className="text-gray-800 text-6xl font-bold mt-4">{workCards.totalInstallWork || 0}
          </div>
        </div>

        {/* Always display In Hand Products card */}
        <div className="bg-blue-100 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
          onClick={() => setSelected("workinprograss")}>

          <span className="text-gray-800 font-medium">Work In Prograss</span>

          <div className="text-gray-800 text-6xl font-bold mt-4">{workCards.totalActivateWork || 0}</div>
        </div>


        <div className="bg-blue-100 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
          onClick={() => setSelected("totalAcceptWork")}>

          <span className="text-gray-800 font-medium">Total Accept Works</span>

          <div className="text-gray-800 text-6xl font-bold mt-4">{workCards.totalAcceptWork || 0}</div>
        </div>







        <div className="bg-yellow-100 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
          onClick={() => setSelected("pendingworks")}>

          <span className="text-gray-800 font-medium">Pending Works</span>

          <div className="text-gray-800 text-6xl font-bold mt-4">{workCards.totalPendingWork || 0}</div>
        </div>
        <div className="bg-green-100 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
          onClick={() => setSelected("completedworks")}>

          <span className="text-gray-800 font-medium">Completed Works</span>
          <div className="text-gray-800 text-6xl font-bold mt-4">{workCards.totalCompletedWork || 0}</div>
        </div>
      </div>


      {/* Search and Table */}
      {selected === "totalworks" && (<>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-sm font-bold">S.No.</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Service</th>

                <th className="px-6 py-3 text-left text-sm font-bold">back Supportter Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {subdealerWorks?.length > 0 ? (
                subdealerWorks?.filter(item => item.workStatus === 'install').map((item, index) => (
                  <tr key={item.id} className={`border-b ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.service}</td>
                    <td className="px-6 py-4">{item.backSupportterName}</td>
                    <td className="px-6 py-4 text-center relative dropdown-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(index);
                        }}
                        className="p-2 bg-white rounded-md focus:outline-none"
                      >
                        <FaEllipsisV className="cursor-pointer text-gray-700" />
                      </button>

                      {dropdownOpen === index && (
                        <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md min-w-[150px] z-50">
                          <ul className="text-left">
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" >Edit</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer"  >Delete</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" >More Details</li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Details found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div></>


      )}

      {selected === "workinprograss" && (<>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-sm font-bold">S.No.</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Service</th>

                <th className="px-6 py-3 text-left text-sm font-bold">back Supportter Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {subdealerWorks?.length > 0 ? (
                subdealerWorks?.filter(item => item.workStatus === 'activate').map((item, index) => (
                  <tr key={item.id} className={`border-b ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.service}</td>
                    <td className="px-6 py-4">{item.backSupportterName}</td>
                    <td className="px-6 py-4 text-center relative dropdown-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(index);
                        }}
                        className="p-2 bg-white rounded-md focus:outline-none"
                      >
                        <FaEllipsisV className="cursor-pointer text-gray-700" />
                      </button>

                      {dropdownOpen === index && (
                        <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md min-w-[150px] z-50">
                          <ul className="text-left">
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" >Edit</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer"  >Delete</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" >More Details</li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Details found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div></>


      )}



      {selected === "totalAcceptWork" && (<>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-sm font-bold">S.No.</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Service</th>

                <th className="px-6 py-3 text-left text-sm font-bold">back Supportter Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {subdealerWorks?.length > 0 ? (
                subdealerWorks?.filter(item => item.workStatus === 'accept').map((item, index) => (
                  <tr key={item.id} className={`border-b ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.service}</td>
                    <td className="px-6 py-4">{item.backSupportterName}</td>
                    <td className="px-6 py-4 text-center relative dropdown-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(index);
                        }}
                        className="p-2 bg-white rounded-md focus:outline-none"
                      >
                        <FaEllipsisV className="cursor-pointer text-gray-700" />
                      </button>

                      {dropdownOpen === index && (
                        <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md min-w-[150px] z-50">
                          <ul className="text-left">
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" >Edit</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer"  >Delete</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" >More Details</li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Details found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div></>

      )}
      {selected === "pendingworks" && (<>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-sm font-bold">S.No.</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Service</th>

                <th className="px-6 py-3 text-left text-sm font-bold">back Supportter Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {subdealerWorks?.length > 0 ? (
                subdealerWorks?.filter(item => item.workStatus === 'pending').map((item, index) => (
                  <tr key={item.id} className={`border-b ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.service}</td>
                    <td className="px-6 py-4">{item.backSupportterName}</td>
                    <td className="px-6 py-4 text-center relative dropdown-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(index);
                        }}
                        className="p-2 bg-white rounded-md focus:outline-none"
                      >
                        <FaEllipsisV className="cursor-pointer text-gray-700" />
                      </button>

                      {dropdownOpen === index && (
                        <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md min-w-[150px] z-50">
                          <ul className="text-left">
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" >Edit</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer"  >Delete</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" >More Details</li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Details found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div></>


      )}

      {selected === "completedworks" && (<>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-sm font-bold">S.No.</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Service</th>

                <th className="px-6 py-3 text-left text-sm font-bold">back Supportter Name</th>
                {/* <th className="px-6 py-3 text-left text-sm font-bold">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {subdealerWorks?.length > 0 ? (
                subdealerWorks?.filter(item => item.workStatus === 'completed').map((item, index) => (
                  <tr key={item.id} className={`border-b ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.service}</td>
                    <td className="px-6 py-4">{item.backSupportterName}</td>
                    {/* <td className="px-6 py-4 text-center relative dropdown-container">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(index);
                        }}
                        className="p-2 bg-white rounded-md focus:outline-none"
                      >
                        <FaEllipsisV className="cursor-pointer text-gray-700" />
                      </button>

                      {dropdownOpen === index && (
                        <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md min-w-[150px] z-50">
                          <ul className="text-left">
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" >Edit</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer"  >Delete</li>
                            <li className="p-2 hover:bg-gray-100 cursor-pointer" >More Details</li>
                          </ul>
                        </div>
                      )}
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Details found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div></>
      )}
    </div>
  );


};

export default SubDealerHome;