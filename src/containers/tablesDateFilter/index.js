import React, { useEffect, useState, useCallback } from 'react';
import Table from '../../components/Table';
import { FaSearch, FaEye, FaDownload } from 'react-icons/fa';
import estimatesData from '../../mockData/mockEstimates.json';
import invoicesData from '../../mockData/mockInvoices.json';
import paymentsData from '../../mockData/mockPayments.json';
import requestData from '../../mockData/mockRequests.json';
import { pageTitles } from '../../common/constants';
import { initialAuthState } from '../../services/ApiService';
import ApiService from '../../services/ApiService';
import { useNavigate, useLocation } from 'react-router-dom';
import * as XLSX from 'xlsx';
import DateConvert from '../../components/dateConvert';

const TableWithDateFilter = ({
  type,
  onEdit,
  onDelete,
  onDetails,
  showCreateBtn = true,
  showStatusFilter = false,
  showBranchFilter = false,
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
  const [requestList, setRequestList] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/branch/getBranchNamesDropDown'
        );
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

  const [searchSubdealer, setSearchSubdealer] = useState('');
  const [searchInvoice, setSearchInvoice] = useState('');
  const [subdealerList, setSubdealerList] = useState([]);
  const [invoiceList, setInvoiceList] = useState([]);

useEffect(()=>{
  handleSearchSubdealer()
},[subdealerList])

  const handleSearchSubdealer = () => {
    const searchQuery = searchSubdealer.toLowerCase().trim();

    if (searchQuery === '') {
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

  const parseEstimateDate = (rawDateStr) => {
    if (!rawDateStr) return null;
  
    try {
      const [datePart] = rawDateStr.split(';'); // e.g., "19/07/25"
      const [day, month, shortYear] = datePart.split('/');
  
      const year = parseInt(shortYear, 10);
      const fullYear = year < 50 ? 2000 + year : 1900 + year; // e.g., "25" → 2025
  
      return new Date(fullYear, parseInt(month, 10) - 1, parseInt(day, 10)); // month is 0-based
    } catch (err) {
      return null;
    }
  };
  
const handleSearchInvoice = () => {
  const searchQuery = searchInvoice.toLowerCase().trim();
  const fromDate = dateFrom ? new Date(dateFrom) : null;
  const toDate = dateTo ? new Date(dateTo) : null;

  const filtered = invoiceList.filter((item) => {
    const matchesSearch =
      searchQuery === '' ||
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchQuery)
      );

    const estimateDate = item.date ? parseEstimateDate(item.date) : null;

    const matchesDate =
      (!fromDate || (estimateDate && estimateDate >= fromDate)) &&
      (!toDate || (estimateDate && estimateDate <= toDate));

      console.log("rrr:",matchesSearch)

    return matchesSearch && matchesDate;
  });

  setFilteredData(filtered);
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
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      if (response.status) {
        const branchId = localStorage.getItem("branch_id")
        // Remove null values and format data
        const formattedData = response.data.map(
          ({
            phoneNumber,
            joiningDate,
            ...rest
          }) => ({
            ...rest, // Spread remaining properties first (except joiningDate)
            name: rest.name, // Ensure 'name' comes first
            phoneNumber, // Place 'phoneNumber' explicitly after 'name'
            // joiningDate
            joiningDate: joiningDate
              ? new Date(joiningDate).toLocaleDateString('en-GB')
              : '',
          })
        );
        console.log("formattedData :",formattedData);
        if (branchId) {
          const rrr = formattedData.filter((item) => (String(item.branch) === String(branchId)))
          setSubdealerList(rrr);
          setFilteredData(rrr);
        }else{
          setSubdealerList(formattedData);
        }
      } else {
        alert(response.data.message || 'Failed to fetch sub-dealer details.');
      }
    } catch (error) {
      console.error('Error fetching sub-dealer details:', error);
      alert('Failed to fetch sub-dealer details.');
    }
  }, [subdealerList]);

  const getEstimateData = useCallback(async () => {
    try {
      const response = await ApiService.post('/dashboards/getEstimates', {
        fromDate: dateFrom,
        toDate: dateTo,
        branch:branchFilter,
        status: statusFilter,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      if (response.status) {
        const filteredData = response.data.map(
          ({ productDetails,estimateDate, expiryDate, ...rest }) => ({...rest,estimateDate:DateConvert(estimateDate),expiryDate:DateConvert(expiryDate)})
        );
        setFilteredData(filteredData);
      } else {
        alert(response.data.message || 'Failed to fetch estimate details.');
      }
    } catch (error) {
      console.error('Error fetching estimate details:', error);
      alert('Failed to fetch estimate details.');
    }
  }, [dateFrom, dateTo, statusFilter,branchFilter]);

  const warehouseManagerId = localStorage.getItem('id');
  // const warehouseManagerId=43;

  const getRequestsData = useCallback(async () => {
    try {
      const requestBody = {
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
        role: localStorage.getItem('role'),
      };

      if (
        requestBody.role === 'Technician' ||
        requestBody.role === 'Sales Man'
      ) {
        requestBody.staffId = localStorage.getItem('userId');
      }

      if (requestData.branchName) {
        requestBody.branchName = requestData.branchName;
      }

      const response = await ApiService.post(
        '/requests/getRequestsBySearch',
        requestBody
      );

      // if (response?.length) {
      const cleanedData = response
        .filter((item) => item.req_request_to === Number(warehouseManagerId))
        .map((item) => ({
          requestId: item.requestId,
          requestNumber: item.requestNumber,
          branchName: item.branchName,
          requestType: item.requestType,
          RequestFrom: item.RequestFrom,
          status: item.status,
        }));

      setRequestList(cleanedData);
      setFilteredData(cleanedData);
      // } else {
      //   console.warn(
      //     'Request failed:',
      //     response?.data?.message || 'No data found'
      //   );
      // }
    } catch (error) {
      console.error('Error fetching request details:', error);
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
      const response = await ApiService.post(
        '/estimate/getAllEstimateDetails',
        {
          fromDate: dateFrom,
          toDate: dateTo,
          status: statusFilter,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );
      if (response.status) {
        const rrr = response?.data?.map(item => ({
          id: item.id,
          invoiceId: item.invoiceId,
          // estimateId: item.estimateId,
          clientName: item.clientName,
          PhoneNumber: item.clientPhoneNumber,
          branchName: item.branchName,
          date: DateConvert(item.estimateDate) ,
          estimateAmount: item.totalAmount,
          shippingAddress: item.shippingAddress
        }));

        setInvoiceList(rrr); // Assuming the structure is as expected
        setFilteredData(rrr); // Assuming the structure is as expected
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

  const handleDownload = (type) => {
    let data;
    let filename;

    switch (type) {
      case 'sub_dealers':
        data = filteredData;
        filename = 'sub_dealers.xlsx';
        break;
      case 'estimate':
        data = filteredData;
        filename = 'estimate.xlsx';
        break;
      case 'payments':
        data = filteredData;
        filename = 'payments.xlsx';
        break;
      case 'requests':
        data = filteredData;
        filename = 'requests.xlsx';
        break;
      case 'invoice':
        data = filteredData;
        filename = 'requests.xlsx';
        break;
      case 'vendors':
        data = filteredData;
        filename = 'vendors.xlsx';
        break;
      default:
        alert('Invalid type selected.');
        return;
    }

    if (!data || data.length === 0) {
      alert('No data available to download.');
      return;
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, type);
      XLSX.writeFile(workbook, filename);
    } catch (error) {
      console.error('Error generating Excel file:', error);
      alert('Failed to generate the Excel file. Please try again.');
    }
  };

  useEffect(() => {
    let dataSource = [];

    if (type === 'invoice') {
      dataSource = filteredData.filter((item) => !!item.invoiceId);
    } else {
      dataSource = filteredData;
    }

    setPageTitle(pageTitles[type]);

    const allKeys = Object.keys(dataSource[0] || {});
    const visibleKeys =
      type === 'invoice'
        ? allKeys.filter((key) => key.toLowerCase() !== 'products')
        : allKeys;

    setColumns(visibleKeys);
    setColumnNames(visibleKeys);
    setData(dataSource);

    // ✅ Only update if different
    setFilteredData((prev) =>
      JSON.stringify(prev) !== JSON.stringify(dataSource) ? dataSource : prev
    );

    const uniqueStatuses = [...new Set(dataSource.map((item) => item.status))];
    setStatuses(uniqueStatuses);
  }, [type, filteredData]); // ← still safe with diff check

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

    if (!requestList || !Array.isArray(requestList)) return;

    const filtered = requestList.filter(
      (item) => !selectedBranch || item.branchId === Number(selectedBranch)
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
     {showDetails && <div className="flex justify-between items-center">
        <button
          onClick={() => handleDownload(type)}
          className="bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-800 transition duration-200"
        >
          <FaDownload className="text-white" />
          Download {type} Excel Sheet
        </button>
      </div>}
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
 
      {type === 'sub_dealers' && (
        <div className="flex mb-4">
          <div className="flex-grow mx-2">
            <input
              type="text"
              name="name"
              placeholder="Search by Subdealer Id or Name"
              value={searchSubdealer}
              onChange={(e) => setSearchSubdealer(e.target.value)}
              className="h-12 block w-full border-gray-300 rounded-md shadow-sm border px-1"
            />
          </div>
          <button
            onClick={handleSearchSubdealer}
            className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
          >
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
      )}
      {type === 'invoice' && (
        <div className="flex mb-4">
          <div className="flex-grow mx-2">
            <input
              type="text"
              name="name"
              placeholder="Search by Client Id / Name / Branch"
              value={searchInvoice}
              onChange={(e) => setSearchInvoice(e.target.value)}
              className="h-12 block w-full border-gray-300 rounded-md shadow-sm border px-1"
            />
          </div>
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

          <button
            onClick={handleSearchInvoice}
            className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
          >
            <FaSearch className="mr-2" /> Search
          </button>
        </div>
      )}

      {/* Filters Row */}
      {type === 'sub_dealers' || type === 'invoice' ? (
        ''
      ) : (
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
            {showStatusFilter &&
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
 } { showBranchFilter &&
              <div className="flex items-center space-x-2 mb-4">
                <label className="text-gray-700 font-bold whitespace-nowrap">
                  Search by Branch :
                </label>
                <select
                  value={branchFilter}
                  onChange={handleBranchFilter}
                  className="h-12 w-[250px] border border-gray-300 rounded-md px-3 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">All Branches</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.branchName}
                    </option>
                  ))}
                </select>
              </div>
            }
          </div>
          {(showBranchFilter||showDateFilters||showStatusFilter)&&<button
            onClick={handleSearch}
            className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
          >
            <FaSearch className="mr-2" /> Search
          </button>}
        </div>
      )}

      {/* Table Row */}
      <div className="mt-8">
        <Table
          columns={columns}
          columnNames={columnNames}
          data={filteredData}
          onEdit={onEdit}
          onDelete={onDelete}
          onDetails={onDetails}
          showEdit={showEdit} // Ensure Edit button is always visible
          showDelete={showDelete} // Ensure Delete button is always visible
          showDetails={showDetails} // Ensure Details button is always visible
          showActionColumn={type !== 'payments'}
          editText={editText} // Custom edit button text
          deleteText={deleteText} // Custom delete button text
          detailsText={detailsText} // Custom details button text
        />
      </div>
    </div>
  );
};

export default TableWithDateFilter;
