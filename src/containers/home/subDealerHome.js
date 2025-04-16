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
        console.log("work cardsss",response.data?.subDealer)
        setWorkCards(response.data.subDealer[0]);
      } else {
        console.error("No subDealer data found");
      }
    } catch (error) {
      console.error("Error fetching work status cards:", error);
    }
  };



  const fetchSubdealerWorks = async () => {
    const id = Number(localStorage.getItem('id'));
    try {
      const response = await ApiService.post(
        '/technician/getBackendSupportWorkAllocation',
        {
          subDealerId:id,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      setSubdealerWorks(response.data || []);
      // setSubdealerWorks(
      //   [
      //     {
      //       "id": 101,
      //       "service": "GPS Installation",
      //       "paymentStatus": "PENDING",
      //       "startDate": "2025-04-10T09:00:00.000Z",
      //       "staffName": "Anil Kumar",
      //       "backSupportterName": "Priya Mehra",
      //       "email": "anil.kumar@tracker.com",
      //       "address": "12 Green Street",
      //       "workStatus": "Processing",
      //       "productName": "TrackMaster",
      //       "imeiNumber": "123456789012345",
      //       "vehicleType": "Car",
      //       "description": "Installing GPS tracker",
      //       "clientName": "Roadrunner Logistics",
      //       "phoneNumber": "9876543210",
      //       "simNumber": "899110120000123456",
      //       "endDate": null,
      //       "serviceOrProduct": "Service",
      //       "branchName": "Delhi Branch",
      //       "amount": 1200,
      //       "installationAddress": "Block B, Tech Park",
      //       "technicianNumber": "TECH-001"
      //     },
      //     {
      //       "id": 102,
      //       "service": "GPS Uninstallation",
      //       "paymentStatus": "COMPLETED",
      //       "startDate": "2025-04-11T10:00:00.000Z",
      //       "staffName": "Rekha Singh",
      //       "backSupportterName": "Amit Das",
      //       "email": "rekha.singh@gpscorp.com",
      //       "address": "54 River View",
      //       "workStatus": "pending",
      //       "productName": "SpeedyTrack",
      //       "imeiNumber": "234567890123456",
      //       "vehicleType": "Truck",
      //       "description": "Removing old GPS unit",
      //       "clientName": "Fleet Cargo",
      //       "phoneNumber": "9123456789",
      //       "simNumber": "899110120000234567",
      //       "endDate": null,
      //       "serviceOrProduct": "Service",
      //       "branchName": "Mumbai Hub",
      //       "amount": 800,
      //       "installationAddress": "Yard 7, Transport Nagar",
      //       "technicianNumber": "TECH-002"
      //     },
      //     {
      //       "id": 103,
      //       "service": "Device Relocation",
      //       "paymentStatus": "PENDING",
      //       "startDate": "2025-04-12T11:00:00.000Z",
      //       "staffName": "Rajiv Bansal",
      //       "backSupportterName": "Sunita Rao",
      //       "email": "rajiv.b@trackzone.com",
      //       "address": "23 Tech Colony",
      //       "workStatus": "pending",
      //       "productName": "TrackElite",
      //       "imeiNumber": "345678901234567",
      //       "vehicleType": "Van",
      //       "description": "Relocating device to new vehicle",
      //       "clientName": "QuickShuttle",
      //       "phoneNumber": "9800112233",
      //       "simNumber": "899110120000345678",
      //       "endDate": null,
      //       "serviceOrProduct": "Service",
      //       "branchName": "Bangalore Central",
      //       "amount": 950,
      //       "installationAddress": "Garage 3, Main Road",
      //       "technicianNumber": "TECH-003"
      //     },
      //     {
      //       "id": 104,
      //       "service": "SIM Replacement",
      //       "paymentStatus": "COMPLETED",
      //       "startDate": "2025-04-13T12:00:00.000Z",
      //       "staffName": "Deepa Reddy",
      //       "backSupportterName": "Ajay Nair",
      //       "email": "deepa.r@gpsupdate.com",
      //       "address": "66 Market Lane",
      //       "workStatus": "completed",
      //       "productName": "LocatorX",
      //       "imeiNumber": "456789012345678",
      //       "vehicleType": "SUV",
      //       "description": "Replacing faulty SIM",
      //       "clientName": "Drive India",
      //       "phoneNumber": "9090909090",
      //       "simNumber": "899110120000456789",
      //       "endDate": null,
      //       "serviceOrProduct": "Service",
      //       "branchName": "Chennai South",
      //       "amount": 400,
      //       "installationAddress": "Depot 2, Hill Road",
      //       "technicianNumber": "TECH-004"
      //     },
      //     {
      //       "id": 105,
      //       "service": "Device Firmware Update",
      //       "paymentStatus": "PENDING",
      //       "startDate": "2025-04-14T14:00:00.000Z",
      //       "staffName": "Kiran Dev",
      //       "backSupportterName": "Vineeta Jain",
      //       "email": "kiran.dev@gpsfixers.com",
      //       "address": "101 Central Park",
      //       "workStatus": "completed",
      //       "productName": "Tracker Pro",
      //       "imeiNumber": "567890123456789",
      //       "vehicleType": "Bike",
      //       "description": "Updating firmware",
      //       "clientName": "Swift Couriers",
      //       "phoneNumber": "9988776655",
      //       "simNumber": "899110120000567890",
      //       "endDate": null,
      //       "serviceOrProduct": "Service",
      //       "branchName": "Hyderabad",
      //       "amount": 500,
      //       "installationAddress": "Basement 1, Hitech Plaza",
      //       "technicianNumber": "TECH-005"
      //     },
      //     {
      //       "id": 106,
      //       "service": "Battery Replacement",
      //       "paymentStatus": "COMPLETED",
      //       "startDate": "2025-04-15T15:30:00.000Z",
      //       "staffName": "Tina Paul",
      //       "backSupportterName": "Manoj Pillai",
      //       "email": "tina.p@fleetgear.com",
      //       "address": "77 Ashok Nagar",
      //       "workStatus": "pending",
      //       "productName": "GeoSecure",
      //       "imeiNumber": "678901234567890",
      //       "vehicleType": "Auto",
      //       "description": "Battery replaced for device",
      //       "clientName": "City Rides",
      //       "phoneNumber": "9977665544",
      //       "simNumber": "899110120000678901",
      //       "endDate": null,
      //       "serviceOrProduct": "Service",
      //       "branchName": "Pune North",
      //       "amount": 300,
      //       "installationAddress": "Parking Lot 3, Center Mall",
      //       "technicianNumber": "TECH-006"
      //     },
      //     {
      //       "id": 107,
      //       "service": "OBD Check-up",
      //       "paymentStatus": "PENDING",
      //       "startDate": "2025-04-16T16:45:00.000Z",
      //       "staffName": "Arvind Mehta",
      //       "backSupportterName": "Nisha Khurana",
      //       "email": "arvind.m@obdsolutions.com",
      //       "address": "33 Lake View",
      //       "workStatus": "completed",
      //       "productName": "SmartOBD",
      //       "imeiNumber": "789012345678901",
      //       "vehicleType": "Car",
      //       "description": "Checking OBD sensor output",
      //       "clientName": "DriveEase",
      //       "phoneNumber": "9966554433",
      //       "simNumber": "899110120000789012",
      //       "endDate": null,
      //       "serviceOrProduct": "Service",
      //       "branchName": "Noida HQ",
      //       "amount": 600,
      //       "installationAddress": "Lane 5, Sector 62",
      //       "technicianNumber": "TECH-007"
      //     },
      //     {
      //       "id": 108,
      //       "service": "Device Testing",
      //       "paymentStatus": "COMPLETED",
      //       "startDate": "2025-04-17T17:00:00.000Z",
      //       "staffName": "Pooja Saini",
      //       "backSupportterName": "Karan Mistry",
      //       "email": "pooja.s@gpscheck.com",
      //       "address": "91 Industrial Area",
      //       "workStatus": "pending",
      //       "productName": "RouteSafe",
      //       "imeiNumber": "890123456789012",
      //       "vehicleType": "Truck",
      //       "description": "Testing all device functions",
      //       "clientName": "CargoMate",
      //       "phoneNumber": "9123445566",
      //       "simNumber": "899110120000890123",
      //       "endDate": null,
      //       "serviceOrProduct": "Service",
      //       "branchName": "Ahmedabad East",
      //       "amount": 750,
      //       "installationAddress": "Main Warehouse, Gate 4",
      //       "technicianNumber": "TECH-008"
      //     },
      //     {
      //       "id": 109,
      //       "service": "Sensor Calibration",
      //       "paymentStatus": "PENDING",
      //       "startDate": "2025-04-18T18:00:00.000Z",
      //       "staffName": "Mohit Chawla",
      //       "backSupportterName": "Neha Kapoor",
      //       "email": "mohit.c@smartfleet.com",
      //       "address": "Lotus Garden, Block C",
      //       "workStatus": "completed",
      //       "productName": "ProSensor",
      //       "imeiNumber": "901234567890123",
      //       "vehicleType": "Van",
      //       "description": "Calibrating GPS sensor",
      //       "clientName": "FleetWorks",
      //       "phoneNumber": "9811223344",
      //       "simNumber": "899110120000901234",
      //       "endDate": null,
      //       "serviceOrProduct": "Service",
      //       "branchName": "Indore Zone",
      //       "amount": 850,
      //       "installationAddress": "Zone C, Tech Industrial Estate",
      //       "technicianNumber": "TECH-009"
      //     },
      //     {
      //       "id": 110,
      //       "service": "Network Issue Fix",
      //       "paymentStatus": "COMPLETED",
      //       "startDate": "2025-04-19T19:00:00.000Z",
      //       "staffName": "Sneha Iyer",
      //       "backSupportterName": "Arjun Singh",
      //       "email": "sneha.iyer@trackassist.com",
      //       "address": "Hilltop Towers",
      //       "workStatus": "Processing",
      //       "productName": "FixNet GPS",
      //       "imeiNumber": "012345678901234",
      //       "vehicleType": "SUV",
      //       "description": "Resolved SIM signal issue",
      //       "clientName": "RideOn Corp",
      //       "phoneNumber": "9900112233",
      //       "simNumber": "899110120000012345",
      //       "endDate": null,
      //       "serviceOrProduct": "Service",
      //       "branchName": "Coimbatore",
      //       "amount": 650,
      //       "installationAddress": "Level 2, GPS Tower",
      //       "technicianNumber": "TECH-010"
      //     }
      //   ]


      // )
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

      <div className="grid grid-cols-4 gap-6 m-6">

        <div className="bg-white-100 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
          onClick={() => setSelected("totalworks")}>

          <span className="text-gray-800 font-medium">Total Install Works</span>

          <div className="text-gray-800 text-6xl font-bold mt-4">{workCards.totalInstallWork||0}
          </div>
        </div>

        {/* Always display In Hand Products card */}
        <div className="bg-blue-100 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
          onClick={() => setSelected("workinprograss")}>

          <span className="text-gray-800 font-medium">Work In Prograss</span>

          <div className="text-gray-800 text-6xl font-bold mt-4">{workCards.totalActivateWork||0}</div>
        </div>
        <div className="bg-yellow-100 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
          onClick={() => setSelected("pendingworks")}>

          <span className="text-gray-800 font-medium">Pending Works</span>

          <div className="text-gray-800 text-6xl font-bold mt-4">{workCards.totalPendingWork||0}</div>
        </div>
        <div className="bg-green-100 rounded-2xl p-6 shadow-lg flex flex-col justify-between"
          onClick={() => setSelected("completedworks")}>

          <span className="text-gray-800 font-medium">Completed Works</span>
          <div className="text-gray-800 text-6xl font-bold mt-4">{workCards.totalCompletedWork||0}</div>
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
                subdealerWorks?.map((item, index) => (
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
                    No product types found
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
                subdealerWorks?.filter(item => item.workStatus === 'Processing').map((item, index) => (
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
                    No product types found
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
                    No product types found
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