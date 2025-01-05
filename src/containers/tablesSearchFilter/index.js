import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { FaSearch } from 'react-icons/fa';
import vouchersData from '../../mockData/mockVouchers.json';
import workAllocationData from '../../mockData/mockWorkAllocation.json';
import ledgerData from '../../mockData/mockLedger.json';
import ticketsData from '../../mockData/mockTickets.json';
import hiringData from '../../mockData/mockHiring.json';
import receiptsData from '../../mockData/mockReceipts.json';
import totalExpenses from '../../mockData/mockExpenses.json';
import totalPurchases from '../../mockData/mockTotalPurchases.json';
import { useNavigate } from 'react-router';
import { pageTitles } from '../../common/constants';
import requestData from '../../mockData/mockRequests.json';
const TableWithSearchFilter = ({
  type,
  onCreateNew,
  onEdit,
  onDelete,
  onDetails,
  showCreateBtn = true,
  showStatusFilter = false,
  showEdit = true,
  showDelete = true,
  showDetails = true,
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
  const branches = ['Vishakapatnam', 'Hyderabad', 'Vijayawada', 'Kakinada'];
  useEffect(() => {
    let dataSource;
    switch (type) {
      case 'vouchers':
        dataSource = vouchersData;
        break;
      case 'work allocation':
        dataSource = workAllocationData;
        break;
      case 'ledger':
        dataSource = ledgerData;
        break;
      case 'tickets':
        dataSource = ticketsData;
        break;
      case 'hiring':
        dataSource = hiringData;
        break;
      case 'receipts':
        dataSource = receiptsData;
        break;
      case 'Expenses':
        dataSource = totalExpenses;
        break;
      case 'Total Purchases':
        dataSource = totalPurchases;
        break;
      case 'clients':
        dataSource = receiptsData;
        break;
      default:
        dataSource = [];
    }
    setPageTitle(pageTitles[type]);
    setColumns(Object.keys(dataSource[0] || {}));
    setData(dataSource);
    setFilteredData(dataSource);

    const uniqueStatuses = [...new Set(dataSource.map((item) => item.Status))];
    setStatuses(uniqueStatuses);
  }, [type]);

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);

    const filtered = data.filter(
      (item) => selectedStatus === '' || item.status === selectedStatus
    );
    setFilteredData(filtered);
  };

  const handleSearch = () => {
    const filtered = data.filter((item) => {
      const matchesID =
        searchID === '' || item['ID'].toString().includes(searchID);
      const matchesName =
        searchName === '' ||
        item['Name'].toLowerCase().includes(searchName.toLowerCase());
      return matchesID && matchesName;
    });
    setFilteredData(filtered);
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
  //   }
  // };
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
      <div className="flex mb-4">
        <div className="flex-grow mr-2">
          <input
            type="text"
            value={searchID}
            placeholder="Search with ID"
            onChange={(e) => setSearchID(e.target.value)}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            style={{ paddingLeft: '8px' }}
          />
        </div>
        <div className="flex-grow mx-2">
          <input
            type="text"
            value={searchName}
            placeholder="Search with Name"
            onChange={(e) => setSearchName(e.target.value)}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            style={{ paddingLeft: '8px' }}
          />
        </div>
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
              value={statusFilter}
              onChange={handleStatusChange}
              className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            >
              <option value="">All Branches</option>
              {branches.map((status, index) => (
                <option key={index} value={status}>
                  {status}
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
      </div>

      <div className="mt-8">
        <Table
          columns={columns}
          data={filteredData}
          onEdit={onEdit}
          onDetails={onDetails}
          onDelete={onDelete}
          showEdit={showEdit} // Hide Edit button
          showDelete={showDelete} // Show Delete button
          showDetails={showDetails} // Show Details button
          editText={editText} // Custom edit button text
          deleteText={deleteText} // Custom delete button text
          detailsText={detailsText} // Custom details button text
        />
      </div>
    </div>
  );
};

export default TableWithSearchFilter;
