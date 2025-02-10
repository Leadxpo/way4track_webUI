import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { formatString } from '../../common/commonUtils';

const Ledger = () => {
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    clientId: '',
    clientName: '',
    branch: '',
  });
  const [branches, setBranches] = useState([]);
  const [records, setRecords] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBranches = async () => {
    try {
      const response = await ApiService.post('/branch/getBranchNamesDropDown');
      if (response.status) {
        setBranches(response.data); // Set branches to state
      } else {
        console.error('Failed to fetch branches');
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await ApiService.post('/dashboards/getLedgerDataTable', {
        ...searchData,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      if (response.status) {
        const data = response.data;

        if (data.length > 0) {
          // Extract column names dynamically from the first record
          setColumns(Object.keys(data[0]));
        } else {
          setColumns([]); // No columns if no data
        }

        setRecords(data);
      } else {
        setError(response.data.message || 'No records found.');
        setColumns([]);
        setRecords([]);
      }
    } catch (error) {
      setError('Failed to fetch ledger data. Please try again.');
      console.error('Error fetching ledger data:', error);
      setColumns([]);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (ledger) => {
    navigate('/ledger-details', {
      state: { ledgerDetails: ledger },
    });
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Ledger</h1>

      {/* Search Section */}
      <div className="flex mb-4">
        <div className="flex-grow mr-2">
          <input
            type="text"
            name="clientId"
            placeholder="Search with ID"
            value={searchData.clientId}
            onChange={handleInputChange}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            style={{ paddingLeft: '8px' }}
          />
        </div>
        <div className="flex-grow mx-2">
          <input
            type="text"
            name="clientName"
            placeholder="Search with Name"
            value={searchData.clientName}
            onChange={handleInputChange}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            style={{ paddingLeft: '8px' }}
          />
        </div>
        {branches.length > 0 && (
          <div className="space-y-4">
            <div>
              <select
                name="branch"
                value={searchData.branch}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
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
            </div>
          </div>
        )}
        <button
          onClick={handleSearch}
          className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      {/* Loading and Error Messages */}
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Table Section */}
      <div className="overflow-x-auto border rounded-lg">
        {records.length > 0 ? (
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm">
                {columns.map((col, index) => (
                  <th key={index} className="py-2 px-4">
                    {formatString(col)}
                  </th>
                ))}
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map((record, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} text-sm`}
                >
                  {columns.map((col, colIndex) => (
                    <td key={colIndex} className="py-1 px-4">
                      {record[col]}
                    </td>
                  ))}
                  <td className="py-1 px-4">
                    <button
                      className="bg-blue-600 text-white text-sm rounded-lg px-3 py-1 hover:bg-blue-600"
                      onClick={() => handleView(record)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && (
            <p className="py-4 text-center text-gray-500">No records found</p>
          )
        )}
      </div>
    </div>
  );
};

export default Ledger;
