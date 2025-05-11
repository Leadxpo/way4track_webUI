import React, { useCallback, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { pageTitles } from '../../common/constants';
import Table from '../../components/Table';
import totalExpenses from '../../mockData/mockExpenses.json';
import ledgerData from '../../mockData/mockLedger.json';
import receiptsData from '../../mockData/mockReceipts.json';
import totalPurchases from '../../mockData/mockTotalPurchases.json';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';
const TableWithSearchFilter = ({
  type,
  onCreateNew,
  onEdit,
  onDetails,
  onDelete = null,
  showCreateBtn = true,
  showStatusFilter = true,
  showEdit = true,
  showDelete = true,
  showDetails = true,
  showActionColumn=true,
  editText = 'Edit',
  deleteText = 'Delete',
  detailsText = 'More Details',
}) => {
  const navigate = useNavigate();
  const [pageTitle, setPageTitle] = useState('');
  const [searchID, setSearchID] = useState('');
  const [searchName, setSearchName] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [status, setStatus] = useState();
  const location = useLocation();
  const clientData = location.state?.clientDetails || {};
  const workData = location.state?.workData || {};
  const [columnNames,setColumnNames]=useState([])
  const [qualifiedCount, setQualifiedCount] = useState(0);
  useEffect(() => {
    const countQualified = filteredData.filter(
      (item) => item.status === 'Qualified'
    ).length;
    setQualifiedCount(countQualified);
  }, []);
  const ticketData = location.state?.ticketsData || {};
  const hiringData = location.state?.hiringData || {};
  if (hiringData) {
    console.log('fgsgs hiringData', hiringData);
  }
  const voucherData = location.state?.voucherData || {};
  const getSearchDetailClient = useCallback(async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getSearchDetailClient',
        {
          clientId: searchID,
          branchName: clientData?.branchName,
          name: searchName,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );

      console.log("tttttrrr ",response.data)

      if (response.status) {
        setFilteredData(response.data); // Assuming the structure is as expected
        // const filteredClients = response.data.map(client => ({
        //   clientId: client.clientId,
        //   name: client.name,
        //   email: client.email,
        //   phoneNumber: client.phoneNumber,
        // }));
  
        // setFilteredData(filteredClients);
      } else {
        alert(response.data.message || 'Failed to fetch client details.');
      }
    } catch (error) {
      console.error('Error fetching client details:', error);
      alert('Failed to fetch client details.');
    }
  }, [searchID, searchName, clientData?.branchName]);

  // const getHiringSearchDetails = useCallback(async () => {
  //   try {
  //     const response = await ApiService.post('/hiring/getHiringSearchDetails', {
  //       hiringId: searchID,
  //       candidateName: searchName,
  //       status: status,
  //       companyCode: initialAuthState?.companyCode,
  //       unitCode: initialAuthState?.unitCode,
  //     });
  // console.log("jkl",response);
  //     // console.log("qazwsxedc",searchID, searchName, hiringData?.status);
  //     if (response.status) {
  //       console.log(response.data, 'Response Data'); // Log data to verify it
  //       const filteredData = response.data.map(
  //         ({ qualifications, ...rest }) => rest
  //       );
  //       setFilteredData(filteredData);
  //     } else {
  //       alert(response.data.message || 'Failed to fetch client details.');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching client details:', error);
  //     alert('Failed to fetch client details.');
  //   }
  // }, [searchID, searchName, status]);

  const getHiringSearchDetails = useCallback(async () => {
    try {
      const response = await ApiService.post('/hiring/getHiringSearchDetails', {
        hiringId: searchID,
        candidateName: searchName,
        status: status,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });
  
      if (response.status) {
        const filteredData = response.data.map(({ qualifications, ...rest }) => ({
          ...rest,
          dateOfUpload: rest.dateOfUpload?.split('T')[0], // Extract just the date
        }));
        setFilteredData(filteredData);
      } else {
        alert(response.data.message || 'Failed to fetch client details.');
      }
    } catch (error) {
      console.error('Error fetching client details:', error);
      alert('Failed to fetch client details.');
    }
  }, [searchID, searchName, status, initialAuthState]);
  
 

  const getTicketDetailsAgainstSearch = useCallback(async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
        ticketId: searchID,
        staffId: ticketData?.staffId,
        branchName: ticketData?.branchName,
      };

      // Conditionally add staffId only if role is 'Technician' or 'Sales Man'
      if (payload.role === 'Technician' || payload.role === 'Sales Man') {
        payload.staffId = localStorage.getItem('userId');
      }

      const response = await ApiService.post(
        '/dashboards/getTicketDetailsAgainstSearch',
        payload
      );
      if (response.status) {
        console.log(response.data, 'Response Data');
        setFilteredData(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch vendor details.');
      }
    } catch (error) {
      console.error('Error fetching vendor details:', error);
      alert('Failed to fetch vendor details.');
    }
  }, [searchID, searchName, ticketData?.branchName]);

  const getVoucherDetailsAgainstSearch = useCallback(async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        role: localStorage.getItem('role'),
        voucherId: searchID,
        branchName: ticketData?.branchName,
      };

      // Conditionally add staffId only if role is 'Technician' or 'Sales Man'
      if (payload.role === 'Technician' || payload.role === 'Sales Man') {
        payload.staffId = localStorage.getItem('userId');
      }

      const response = await ApiService.post(
        '/dashboards/getAllVouchers',
        payload
      );
      if (response.status) {
        console.log(response.data, 'Response Data');
        setFilteredData(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch voucher details.');
      }
    } catch (error) {
      console.error('Error fetching vendor details:', error);
      alert('Failed to fetch vendor details.');
    }
  }, [searchID, searchName, voucherData?.branchName]);

  const getReceiptDetailsAgainstSearch = useCallback(async () => {
    try {
      const response = await ApiService.post('/dashboards/getReceiptData', {
        voucherId: searchID,
        clientName: searchName,
        branchName: ticketData?.branchName,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });
      if (response.status) {
        console.log(response.data, 'Response Data');
        setFilteredData(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch voucher details.');
      }
    } catch (error) {
      console.error('Error fetching vendor details:', error);
      alert('Failed to fetch vendor details.');
    }
  }, [searchID, searchName, voucherData?.branchName]);

  const getWorkDetailsAgainstSearch = useCallback(async () => {
    try {
      const response = await ApiService.post(
        '/work-allocations/getWorkAllocation',
        {
          clientName: searchName,
          workAllocationNumber: workData?.workAllocationNumber,
          serviceOrProduct: workData?.serviceOrProduct,
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        }
      );
      if (response.status) {
        console.log(response.data, 'Response Data');
        setFilteredData(response.data);
      } else {
        alert(response.data.message || 'Failed to fetch voucher details.');
      }
    } catch (error) {
      console.error('Error fetching vendor details:', error);
      alert('Failed to fetch vendor details.');
    }
  }, [workData?.serviceOrProduct, searchName, workData?.workAllocationNumber]);
  
  useEffect(() => {
    switch (type) {
      case 'tickets':
        getTicketDetailsAgainstSearch();
        break;
      case 'hiring':
        getHiringSearchDetails();
        break;
      case 'clients':
        getSearchDetailClient();
        break;
      case 'vouchers':
        getVoucherDetailsAgainstSearch();
        break;
      case 'receipts':
        getReceiptDetailsAgainstSearch();
        break;
      case 'work-allocations':
        getWorkDetailsAgainstSearch();
        break;
      default:
        return;
    }
  }, [type]);

  useEffect(() => {
    let dataSource = [];
    switch (type) {
      case 'vouchers':
        dataSource = filteredData; // Example mock data, replace with actual API integration if needed
        break;
      case 'work-allocations':
        dataSource = filteredData;
        break;
      case 'ledger':
        dataSource = ledgerData;
        break;
      case 'tickets':
        dataSource = filteredData;
        break;
      case 'hiring':
        dataSource = filteredData;
        break;
      case 'receipts':
        dataSource = filteredData;
        break;
      case 'Expenses':
        dataSource = totalExpenses;
        break;
      case 'Total Purchases':
        dataSource = totalPurchases;
        break;
      case 'clients':
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

    const uniqueStatuses = [...new Set(dataSource.map((item) => item.Status))];
    setStatuses(uniqueStatuses);
  }, [type, filteredData]);

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

  const handleStatus = (e) => {
    console.log('Selected status:', e.target.value);
    setStatus(e.target.value);
  };

  const handleQualified = () => {
    setStatus('Qualified');
    // handleSearch();
  };

  if (status) {
    console.log('statusssqqqqqqqqqqqqqqqqq', status);
  }

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);

    const filtered = data.filter(
      (item) => selectedStatus === '' || item.status === selectedStatus
    );
    setFilteredData(filtered);
  };


  const handleHiringSearch = (e) => {
    const inputName = e.target.value;
    setStatusFilter(inputName);
  
    const filtered = data.filter(
      (item) =>
        inputName === '' ||
        item.candidateName.toLowerCase().includes(inputName.toLowerCase())
    );
  
    setFilteredData(filtered);
  };
  const handleSearch = async () => {
    switch (type) {
      case 'clients':
        await getSearchDetailClient();
        break;
      case 'hiring':
        await getHiringSearchDetails();
        break;
      case 'tickets':
        getTicketDetailsAgainstSearch();
        break;
      case 'vouchers':
        getVoucherDetailsAgainstSearch();
        break;
      case 'receipts':
        getReceiptDetailsAgainstSearch();
        break;
      case 'work-allocations':
        getWorkDetailsAgainstSearch();
        break;
    }
  };

  const handleCreateNew = () => {
    switch (type) {
      case 'clients':
        navigate('/add-client');
        break;
      case 'hiring':
        navigate('/add-hiring');
        break;
      case 'tickets':
        onCreateNew();
        break;
      default:
        break;
    }
  };

  // const onDelete = () => {
  //   switch (type) {
  //     case 'clients':
  //       navigate('/delete-client');
  //       break;
  //     case 'hiring':
  //       navigate('/delete-hiring');
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <div className="p-10">
      <p className="font-bold text-xl">{pageTitle}</p>
      {/* Create New Button Row */}

      <div className="flex justify-end mb-4">
      {type==="staff"&&(
     <button
     className="h-10 px-4 bg-teal-500 text-white font-semibold text-sm rounded-lg hover:bg-teal-600 hover:cursor-pointer relative"
     onClick={handleQualified}
   >
     Add Staff
     
     <span className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
       {qualifiedCount}
     </span>
   </button>)}
        
      </div>
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
      <div className="flex mb-4">
        {/* Search by Client ID or Ticket ID */}
        <div className="flex-grow mr-2">
          <input
            type="text"
            value={searchID}
            // placeholder={
            //   type === 'tickets'
            //     ? 'Search with Ticket ID'
            //     : 'Search with Client ID'
            // }

            placeholder={
              type === 'tickets'
                ? 'Search with Ticket ID'
                : type === 'hiring'
                  ? 'Search with Hire Id'
                  : 'Search with Client ID'
            }
            onChange={(e) => setSearchID(e.target.value)}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            style={{ paddingLeft: '8px' }}
          />
        </div>
        {/* Search by Name */}
        
        <div className="flex-grow mx-2">
          <input
            type="text"
            value={searchName}
            // placeholder={
            //   type === 'tickets'
            //     ? 'Search with Client Name'
            //     : 'Search with Name'
            // }
            placeholder={
              type === 'tickets'
                ? 'Search with Client Name'
                : type === 'hiring'
                  ? 'Search with Name'
                  : 'Search with Name'
            }
            onChange={(e) => setSearchName(e.target.value)}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            style={{ paddingLeft: '8px' }}
          />
        </div>
        {type==="hiring"&&
        <div className="flex-grow mx-2">
          {showStatusFilter ? (
            // <select
            //   value={statusFilter}
            //   onChange={handleStatusChange}
            //   className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            // >
            //   <option value="">All Statuses</option>
            //   {statuses.map((status, index) => (
            //     <option key={index} value={status}>
            //       {status}
            //     </option>
            //   ))}
            // </select>

            <select
              value={status}
              onChange={handleStatus}
              className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            >
              <option value="">All Statuses</option>
              {[
                'pending',
                'Rejected',
                'Qualified',
                'APPLIED',
                'INTERVIEWED',
              ].map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          ) : (
            <select
              value={statusFilter}
              onChange={type==="hiring"?handleHiringSearch:handleStatusChange}
              className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            >
              <option value="" disabled>
                Select a Branch
              </option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.branchName}>
                  {branch.branchName}
                </option>
              ))}
            </select>
          )}
        </div>}
        <button
          onClick={handleSearch}
          className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      <div className="mt-8">
        <Table
          columns={columns}
          columnNames={columnNames}
          data={filteredData}
          onEdit={onEdit}
          onDetails={onDetails}
          onDelete={onDelete}
          showEdit={showEdit}
          showDelete={showDelete}
          showDetails={showDetails}
          editText={editText}
          deleteText={deleteText}
          showActionColumn={showActionColumn}
          detailsText={detailsText}
        />
      </div>
    </div>
  );
};

export default TableWithSearchFilter;
