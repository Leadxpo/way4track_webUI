import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { FaSearch } from 'react-icons/fa';
import estimatesData from '../../mockData/mockEstimates.json';
import invoicesData from '../../mockData/mockInvoices.json';
import paymentsData from '../../mockData/mockPayments.json';
import requestData from '../../mockData/mockRequests.json';
import vendorsData from '../../mockData/mockVendors.json';
import subDealersData from '../../mockData/mockSubDealers.json';
import { pageTitles } from '../../common/constants';
import { useNavigate } from 'react-router';

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
  const [filteredData, setFilteredData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const navigate = useNavigate();
  const branches = ['Vishakapatnam', 'Hyderabad', 'Vijayawada', 'Kakinada'];
  // Populate columns and data based on the type
  useEffect(() => {
    let dataSource;
    switch (type) {
      case 'estimate':
        dataSource = estimatesData;
        break;
      case 'invoice':
        dataSource = invoicesData;
        break;
      case 'payments':
        dataSource = paymentsData;
        break;
      case 'requests':
      case 'clients':
      case 'products_assign':
        dataSource = requestData;
        break;
      case 'vendors':
        dataSource = vendorsData;
        break;
      case 'sub_dealers':
        dataSource = subDealersData;
        break;
      default:
        dataSource = [];
    }
    setPageTitle(pageTitles[type]);
    setColumns(Object.keys(dataSource[0] || {}));
    setData(dataSource);
    setFilteredData(dataSource);

    // Extract unique statuses
    const uniqueStatuses = [...new Set(dataSource.map((item) => item.status))];
    setStatuses(uniqueStatuses);
  }, [type]);

  // Handle status filter change
  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setStatusFilter(selectedStatus);

    const filtered = data.filter(
      (item) => selectedStatus === '' || item.status === selectedStatus
    );
    setFilteredData(filtered);
  };

  const handleSearch = () => {
    // Implement your date-based filtering here
    console.log('Filtering with:', { dateFrom, dateTo });
  };

  const handleCreateNew = () => {
    switch (type) {
      case 'clients':
        navigate('/add-client');
        break;
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

      {/* Filters Row */}
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

      {/* Table Row */}
      <div className="mt-8">
        <Table
          columns={columns}
          data={filteredData}
          onEdit={onEdit}
          onDelete={onDelete}
          onDetails={onDetails}
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

export default TableWithDateFilter;
