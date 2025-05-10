import React,{useState,useEffect} from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import ApiService, { initialAuthState } from '../../services/ApiService';

const RequestRaise = () => {
  const navigate = useNavigate();

  const fetchMemberRecords = async () => {
    try {
      const response = await ApiService.post(
        '/requests/getRequestsBySearch',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          staffId: localStorage.getItem('userId'),
        }
      );

      if (response.status) {
        setRequestRecords(response.data);
        }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setRequestRecords([]);
    }
  };
  const [requestRecords, setRequestRecords] = useState([]);
  const [activeTab, setActiveTab] = useState('work');
  const [branchFilter, setBranchFilter] = useState('');
  const [branches, setBranches] = useState([]);
  const [requestStatusFilter, setRequestStatusFilter] = useState('');

  useEffect(() => {
    fetchMemberRecords();
  }, []);

  const fetchBranchRecords=async ()=>{
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };
      const response = await ApiService.post("/branch/getBranchNamesDropDown", payload);
      setBranches(response?.data || []);
    } catch (error) {
      console.error("Error fetching branch stock details:", error);
      setBranches([]);
    }
  }

  useEffect(() => {
    fetchBranchRecords();
  }, [setBranchFilter]);

  const handleBranchFilter = (e) => {
    setBranchFilter(e.target.value);
  };

  const filteredRecords = requestRecords.filter((record) => {
    const matchesBranch = !branchFilter || Number(record.branchId) === Number(branchFilter);
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
          className={`px-4 py-2 font-semibold ${activeTab === 'work'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
            }`}
          onClick={() => setActiveTab('myRequests')}
        >
          My Requests
        </button>
        <button
          className={`px-4 py-2 font-semibold ${activeTab === 'voucher'
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
              {filteredRecords.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No payment records found.
                </div>
              ) : (
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr className="bg-blue-500 text-white text-left">
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                      RequestID
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Request Type
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Staff Name
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Branch
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Request Date
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Request Status
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          {record.requestID || '-'}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          {record.requestType || '-'}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          {record.staffName || '-'}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          {record.branchName || '-'}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          {record.requestDate || '-'}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          {record.status || 'Pending'}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          View
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


