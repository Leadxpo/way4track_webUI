import React, { useState, useEffect, useCallback } from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { FaEllipsisV } from 'react-icons/fa';

const RequestRaise = () => {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [myRequestList, setMyRequestList] = useState([]);
  const [filterMyRequests, setFilterMyRequests] = useState([]);
  const warehouseManagerId = localStorage.getItem('id');
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

      // if (requestData.branchName) {
      //   requestBody.branchName = requestData.branchName;
      // }

      const response = await ApiService.post(
        '/requests/getRequestsBySearch',
        requestBody
      );

      // if (response?.length) {
      console.log('jkl', response);
      const cleanedData = response
        .filter((item) => item.req_request_from === Number(warehouseManagerId))
        .map((item) => ({
          requestId: item.requestId,
          requestNumber: item.requestNumber,
          branchName: item.branchName,
          branchId: item.req_branch_id,
          requestType: item.requestType,
          status: item.status,
        }));

      console.log(';;;;;', cleanedData);
      setMyRequestList(cleanedData);
      // setFilteredData(cleanedData);
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
    // requestData.branchName,
    initialAuthState?.companyCode,
    initialAuthState?.unitCode,
  ]);

  useEffect(() => {
    getRequestsData();
  }, [getRequestsData]);
  const [requestRecords, setRequestRecords] = useState([]);
  const [activeTab, setActiveTab] = useState('myRequests');
  const [branchFilter, setBranchFilter] = useState('');
  const [branches, setBranches] = useState([]);
  const [requestStatusFilter, setRequestStatusFilter] = useState('');

  const fetchBranchRecords = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };
      const response = await ApiService.post(
        '/branch/getBranchNamesDropDown',
        payload
      );
      setBranches(response?.data || []);
    } catch (error) {
      console.error('Error fetching branch stock details:', error);
      setBranches([]);
    }
  };

  useEffect(() => {
    fetchBranchRecords();
  }, [setBranchFilter]);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleBranchFilter = (e) => {
    setBranchFilter(e.target.value);
  };

  const filteredRecords = requestRecords.filter((record) => {
    const matchesBranch =
      !branchFilter || Number(record.branchId) === Number(branchFilter);
    const matchesStatus =
      !requestStatusFilter || record.requestStatus === requestStatusFilter;

    return matchesBranch && matchesStatus;
  });

  const handleVendorEdit = (request) => {
    navigate('/edit-request', { state: { requestDetails: request } });
  };

  const handleDelete = (request) => {
    navigate('/delete-request', { state: { requestDetails: request } });
  };

  const handleDetails = (request) => {
    navigate('/request-details', { state: { requestDetails: request } });
  };

  return (
    <div>
      <div className="flex space-x-4 mb-4 border-b-2 pb-2">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'myRequests'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('myRequests')}
        >
          My Requests
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'requests'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
        </button>
      </div>
      {activeTab === 'myRequests' && (
        <div
          className="overflow-hidden rounded-lg shadow"
          style={{ padding: '30px' }}
        >
          <div className="p-4">
            <h2 className="font-bold text-xl mb-3">Requests</h2>

            <div className="flex flex-wrap gap-4 items-center mb-4">
              <div className="flex items-center space-x-2 mb-4">
                <label className="text-gray-700 font-bold whitespace-nowrap">
                  Search by Branch:
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

              <div className="flex items-center space-x-2 mb-4">
                <label className="text-gray-700 font-bold whitespace-nowrap">
                  Filter by Payment Status:
                </label>
                <select
                  value={requestStatusFilter}
                  onChange={(e) => setRequestStatusFilter(e.target.value)}
                  className="h-12 w-[200px] border border-gray-300 rounded-md px-3 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  {/* Add other statuses if needed */}
                </select>
              </div>
            </div>

            <div className="overflow-y-auto">
              {myRequestList.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No records found.
                </div>
              ) : (
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr className="bg-blue-500 text-white text-left">
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        requestId
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        requestNumber
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        branchName
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        branchId
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        requestType
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        status
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myRequestList
                      .filter((record) => {
                        const matchesBranch =
                          !branchFilter ||
                          Number(record.branchId) === Number(branchFilter);
                        const matchesStatus =
                          !requestStatusFilter ||
                          record.status?.toLowerCase() ===
                            requestStatusFilter.toLowerCase();
                        return matchesBranch && matchesStatus;
                      })
                      .map((record, index) => (
                        <tr
                          key={index}
                          className={
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }
                        >
                          <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                            {record.requestId || '-'}
                          </td>
                          <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                            {record.requestNumber || '-'}
                          </td>
                          <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                            {record.branchName || '-'}
                          </td>
                          <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                            {record.branchId}
                          </td>
                          <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                            {record.requestType}
                          </td>
                          <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                            {record.status}
                          </td>
                          <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600 relative">
                            <div className="relative inline-block text-left">
                              <button
                                onClick={() => toggleDropdown(record.requestId)}
                                className="text-gray-600 hover:text-black focus:outline-none"
                              >
                                <FaEllipsisV />
                              </button>
                              {dropdownOpen === record.requestId && (
                                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                  <button
                                    onClick={() => {
                                      handleVendorEdit(record);
                                      setDropdownOpen(null);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleDelete(record);
                                      setDropdownOpen(null);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                  >
                                    Delete
                                  </button>
                                  <button
                                    onClick={() => {
                                      handleDetails(record);
                                      setDropdownOpen(null);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-100"
                                  >
                                    Details
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
      {activeTab === 'requests' && (
        <div>
          <TableWithDateFilter
            type="requests"
            onEdit={handleVendorEdit}
            onDelete={handleDelete}
            onDetails={handleDetails}
            showDateFilters={false}
          />
        </div>
      )}
    </div>
  );
};

export default RequestRaise;
