import React, { useEffect, useState, useCallback } from 'react';
import Table from '../../components/Table';
import { FaSearch } from 'react-icons/fa';
import estimatesData from '../../mockData/mockEstimates.json';
import invoicesData from '../../mockData/mockInvoices.json';
import paymentsData from '../../mockData/mockPayments.json';
import requestData from '../../mockData/mockRequests.json';
import { pageTitles } from '../../common/constants';
import { initialAuthState } from '../../services/ApiService';
import ApiService from '../../services/ApiService';
import { useNavigate, useLocation } from 'react-router-dom';

const TableWithDateFilter = ({
  type,
  onEdit,
  onDelete,
  onDetails,
  showCreateBtn = true,
  showStatusFilter = false,
  showDateFilters = true,
  showEdit = true,
  showDelete = true,
  showDetails = true,
  editText = 'Edit',
  deleteText = 'Delete',
  detailsText = 'More Details',
}) => {
  const [pageTitle, setPageTitle] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [branches, setBranches] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const vendorData = location.state?.vendorsData || {};
  const subDealerData = location.state?.subDealersData || {};
  const requestData = location.state?.requestData || {};
  const [columnNames, setColumnNames] = useState([]);
  const [branchFilter, setBranchFilter] = useState('');
  useEffect(() => {
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
  }, []);


  const [searchSubdealer, setSearchSubdealer] = useState("");
  const [subdealerList, setSubdealerList] = useState([]);

  const handleSearchSubdealer = () => {
    const searchQuery = searchSubdealer.toLowerCase().trim();
  
    if (searchQuery === "") {
      setFilteredData(subdealerList); // Reset to original data
    } else {
      const filteredData = subdealerList.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery)
        )
      );
      setFilteredData(filteredData);
    }
  };
  

  const getVendorData = useCallback(async () => {
    try {
      const response = await ApiService.post('/dashboards/getVendorData', {
        fromDate: dateFrom,
        toDate: dateTo,
        paymentStatus: vendorData?.paymentStatus,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      if (response.status) {
        console.log(response.data, 'Response Data'); // Log data to verify it
        setFilteredData(response.data); // Assuming the structure is as expected
      } else {
        alert(response.data.message || 'Failed to fetch vendor details.');
      }
    } catch (error) {
      console.error('Error fetching vendor details:', error);
      alert('Failed to fetch vendor details.');
    }
  }, [dateFrom, dateTo, vendorData?.paymentStatus]);

  const getSubDealerData = useCallback(async () => {
    try {
      const response = await ApiService.post('/dashboards/getSubDealerData', {
        fromDate: dateFrom,
        toDate: dateTo,
        paymentStatus: subDealerData?.paymentStatus,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      if (response.status) {
        console.log(response.data, 'Response Data'); // Log data to verify it

        // Remove null values and format data
        const formattedData = response.data.map(
          ({
            paymentStatus,
            amount,
            voucherId,
            phoneNumber,
            joiningDate,
            ...rest
          }) => ({
            ...rest, // Spread remaining properties first (except joiningDate)
            name: rest.name, // Ensure 'name' comes first
            phoneNumber, // Place 'phoneNumber' explicitly after 'name'
            joiningDate, // Place 'joiningDate' after 'phoneNumber'
          })
        );
        setSubdealerList(formattedData);
        setFilteredData(formattedData);
      } else {
        alert(response.data.message || 'Failed to fetch sub-dealer details.');
      }
    } catch (error) {
      console.error('Error fetching sub-dealer details:', error);
      alert('Failed to fetch sub-dealer details.');
    }
  }, [dateFrom, dateTo, subDealerData?.paymentStatus]);

  const getEstimateData = useCallback(async () => {
    try {
      const response = await ApiService.post('/dashboards/getEstimates', {
        fromDate: dateFrom,
        toDate: dateTo,
        status: statusFilter,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      if (response.status) {
        const filteredData = response.data.map(
          ({ productDetails, ...rest }) => rest
        );
        setFilteredData(filteredData);
      } else {
        alert(response.data.message || 'Failed to fetch estimate details.');
      }
    } catch (error) {
      console.error('Error fetching estimate details:', error);
      alert('Failed to fetch estimate details.');
    }
  }, [dateFrom, dateTo, statusFilter]);

  const getRequestsData = useCallback(async () => {
    try {
      const requestBody = {
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
        role: localStorage.getItem('role'),
      };

      // Add staffId if role is Technician or Sales Man
      if (
        requestBody.role === 'Technician' ||
        requestBody.role === 'Sales Man'
      ) {
        requestBody.staffId = localStorage.getItem('userId');
      }

      // Add branchName only if defined
      if (requestData.branchName) {
        requestBody.branchName = requestData.branchName;
      }

      const response = await ApiService.post(
        '/requests/getRequestsBySearch',
        requestBody
      );
  console.log("yyyyyy request",response);
      // Check if response contains data and update state
      if (response?.length) {
        setFilteredData(response); // Ensure you're setting the correct data
      } else {
        console.warn(
          'Request failed:',
          response?.data?.message || 'No data found'
        );
      }
    } catch (error) {
      console.error('Error fetching request details:', error);
      // Optionally, handle errors by setting an error state or notifying the user
    }
  }, [
    requestData.branchName,
    initialAuthState?.companyCode,
    initialAuthState?.unitCode,
  ]);

  const getPaymentsData = useCallback(async () => {
    try {
      const response = await ApiService.post('/dashboards/getPaymentData', {
        fromDate: dateFrom,
        toDate: dateTo,
        status: statusFilter,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
        // staffId: localStorage.getItem('userId'),
      });

      if (response.status) {
        console.log(response.data, 'Response Data'); // Log data to verify it
        setFilteredData(response.data); // Assuming the structure is as expected
      } else {
        alert(response.data.message || 'Failed to fetch estimate details.');
      }
    } catch (error) {
      console.error('Error fetching estimate details:', error);
      alert('Failed to fetch estimate details.');
    }
  }, [dateFrom, dateTo, statusFilter]);

  const getInvoiceData = useCallback(async () => {
    try {
      const response = await ApiService.post('/dashboards/getVoucherData', {
        fromDate: dateFrom,
        toDate: dateTo,
        status: statusFilter,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      if (response.status) {
        console.log(response.data, 'Response Data'); // Log data to verify it
        setFilteredData(response.data); // Assuming the structure is as expected
      } else {
        alert(response.data.message || 'Failed to fetch request details.');
      }
    } catch (error) {
      console.error('Error fetching request details:', error);
      alert('Failed to fetch request details.');
    }
  }, [dateFrom, dateTo, statusFilter]);
  useEffect(() => {
    switch (type) {
      case 'sub_dealers':
        getSubDealerData();
        break;
      case 'estimate':
        getEstimateData();
        break;
      case 'payments':
        getPaymentsData();
        break;
      case 'requests':
        getRequestsData();
        break;
      case 'invoice':
        getInvoiceData();
        break;
      case 'vendors':
        getVendorData();
        break;
      default:
        break;
    }
  }, [type]);

  useEffect(() => {
    let dataSource = [];
    switch (type) {
      case 'estimate':
        dataSource = filteredData;
        break;
      case 'invoice':
        dataSource = filteredData;
        break;
      case 'payments':
        dataSource = filteredData;
        break;
      case 'requests':
        dataSource = filteredData;
        break;
      case 'vendors':
        dataSource = filteredData;
        break;
      case 'sub_dealers':
        dataSource = filteredData;
        break;
      default:
        dataSource = [];
    }
    setPageTitle(pageTitles[type]);
    setColumns(Object.keys(dataSource[0] || {}));
    setColumnNames(Object.keys(dataSource[0] || {}));
    setData(dataSource);
    setFilteredData(dataSource);

    // Extract unique statuses
    const uniqueStatuses = [...new Set(dataSource.map((item) => item.status))];
    setStatuses(uniqueStatuses);
  }, [type, filteredData]);

  // Handle status filter change
  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);

    const filtered = data.filter(
      (item) => selectedStatus === '' || item.status === selectedStatus
    );
    setFilteredData(filtered);
  };

  const handleBranchFilter = (e) => { 
    const selectedBranch = e.target.value; 
    setBranchFilter(selectedBranch);
  
    if (!data || !Array.isArray(data)) return;
  
    const filtered = data.filter(item => 
      !selectedBranch || item.branchName === selectedBranch
    );
  
    setFilteredData(filtered);
  };



  const handleSearch = async () => {
    switch (type) {
      case 'vendors':
        await getVendorData();
        break;
      case 'sub_dealers':
        await getSubDealerData();
        break;
      case 'estimate':
        await getEstimateData();
        break;
      case 'requests':
        await getRequestsData();
        break;
      case 'payments':
        await getPaymentsData();
        break;
      case 'invoice':
        await getInvoiceData();
        break;
      default:
        break;
    }
  };

  const handleCreateNew = () => {
    switch (type) {
      case 'vendors':
        navigate('/add-vendor');
        break;
      case 'sub_dealers':
        navigate('/add-sub-dealer');
        break;
      case 'estimate':
        navigate('/add-estimate');
        break;
      case 'invoice':
        navigate('/add-invoice');
        break;
      case 'requests':
        navigate('/add-request');
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-10">
      <p className="font-bold text-xl">{pageTitle}</p>
      {/* Create New Button Row */}
      <div className="flex justify-end mb-4">
        {showCreateBtn && (
          <button
            className="h-12 px-4 bg-yellow-400 text-white font-bold rounded-md hover:cursor-pointer"
            onClick={handleCreateNew}
          >
            Create New
          </button>
        )}
      </div>

{type==="sub_dealers"&&
      <div className="flex mb-4">
              <div className="flex-grow mx-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Search by Subdealer Id or Name"
                  value={searchSubdealer}
                  onChange={(e)=>setSearchSubdealer(e.target.value)}
                  className="h-12 block w-full border-gray-300 rounded-md shadow-sm border px-1"
                />
              </div>
              <button
                onClick={handleSearchSubdealer}
                className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
              >
                <FaSearch className="mr-2" /> Search
              </button>
            </div>}

      {/* Filters Row */}
      {type==="sub_dealers"?"":
      <div className="flex mb-4">
        {showDateFilters && (
          <div className="flex-grow mr-2">
            <input
              type="date"
              id="dateFrom"
              value={dateFrom}
              placeholder="From"
              onChange={(e) => setDateFrom(e.target.value)}
              className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
              style={{ paddingLeft: '8px' }}
            />
          </div>
        )}
        {showDateFilters && (
          <div className="flex-grow mx-2">
            <input
              type="date"
              id="dateTo"
              value={dateTo}
              placeholder="To"
              onChange={(e) => setDateTo(e.target.value)}
              className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
              style={{ paddingLeft: '8px' }}
            />
          </div>
        )}
        <div className="flex-grow mx-2">
          {showStatusFilter ? (
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            >
              <option value="">All Statuses</option>
              {statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          ) : (
            
            <select
              value={branchFilter}
              onChange={handleBranchFilter}
              className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            >
              <option value="" disabled>
                Select a Branch
              </option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.branchName}
                </option>
              ))}
            </select>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </div>}

      {/* Table Row */}
      <div className="mt-8">
        <Table
          columns={columns}
          columnNames={columnNames}
          data={filteredData}
          onEdit={onEdit}
          onDelete={onDelete}
          onDetails={onDetails}
          showEdit={true} // Ensure Edit button is always visible
          showDelete={true} // Ensure Delete button is always visible
          showDetails={true} // Ensure Details button is always visible
          editText={editText} // Custom edit button text
          deleteText={deleteText} // Custom delete button text
          detailsText={detailsText} // Custom details button text
        />
      </div>
    </div>
  );
};

export default TableWithDateFilter;
