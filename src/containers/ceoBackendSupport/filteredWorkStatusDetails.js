import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';

const FilteredWorkStatusDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // workStatus is derived from URL param
  const location = useLocation();
  const workRecords = location.state?.data || [];

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchColumn, setSearchColumn] = useState('');

  const exportToExcel = (filteredData) => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'WorkRecords');
    XLSX.writeFile(workbook, 'WorkRecords.xlsx');
  };

  // **Filtering Logic**
  const filteredRecords = workRecords
    .filter((item) => String(item.workStatus) === String(id)) // Filter by workStatus
    .filter((item) => {
      if (!searchTerm || !searchColumn) return true;
      return item[searchColumn]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    })
    .filter((item) => {
      if (!startDate || !endDate) return true;
      const itemDate = new Date(item.date);
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });

  const convertToIST = (utcDate) => {
    if (!utcDate) return null;
    const date = new Date(utcDate);
    return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }); // Convert to IST
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date(); // Use current time if endDate is missing
    const diffMs = end - start; // Difference in milliseconds

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3 className="text-lg font-bold mb-2">Accepted Works</h3>
          <div>
            <button
              onClick={filteredRecords}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition mr-2"
            >
              Refresh
            </button>
            <button
              onClick={() => exportToExcel(filteredRecords)}
              className="bg-green-500 text-white px-4 py-2 mb-2 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Generate XL
            </button>
          </div>
        </div>

        {/* Search & Date Filters */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <div>
            <select
              className="border p-2 mr-2 rounded"
              value={searchColumn}
              onChange={(e) => setSearchColumn(e.target.value)}
            >
              <option value="">Search Based on...</option>
              <option value="productName">Product Name</option>
              <option value="service">Service Name</option>
              <option value="staffName">Staff Name</option>
              <option value="branchName">Branch Name</option>
              <option value="clientName">Client Name</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 mr-2 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <input
              type="date"
              className="border p-2 mr-2 rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="border p-2 mr-2 rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 whitespace-nowrap">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Service Name</th>
                <th className="px-4 py-2">Staff Name</th>
                <th className="px-4 py-2">Branch Name</th>
                <th className="px-4 py-2">Client Name</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">IMEI Number</th>
                <th className="px-4 py-2">Sim Number</th>
                <th className="px-4 py-2">Start Time</th>
                <th className="px-4 py-2">End Time</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Vehicle Type</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((item) => (
                  <tr key={item.id} className="bg-white border-b">
                    <td className="px-4 py-2">{item.id}</td>
                    <td className="px-4 py-2">{item.productName}</td>
                    <td className="px-4 py-2">{item.service}</td>
                    <td className="px-4 py-2">{item.staffName}</td>
                    <td className="px-4 py-2">{item.branchName}</td>
                    <td className="px-4 py-2">{item.clientName}</td>
                    <td className="px-4 py-2">{item.phoneNumber}</td>
                    <td className="px-4 py-2">{item.imeiNumber}</td>
                    <td className="px-4 py-2">{item.simNumber}</td>
                    <td className="px-4 py-2">
                      {convertToIST(item.startDate)}
                    </td>
                    <td
                      className={`px-4 py-2 ${!item.endDate ? 'text-red-500' : ''}`}
                    >
                      {item.endDate ? convertToIST(item.endDate) : '-'}
                    </td>
                    <td
                      className={`px-4 py-2 ${!item.endDate ? 'text-red-500' : ''}`}
                    >
                      {item.startDate
                        ? `${calculateDuration(item.startDate, item.endDate)}`
                        : ''}
                    </td>

                    <td className="px-4 py-2">{item.vehicleType}</td>
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">
                      <select
                        value={item.workStatus}
                        className="border rounded p-1"
                      >
                        {id === 'install' ? (
                          <>
                            <option value="install">Install</option>
                            <option value="accept">Accepted</option>
                          </>
                        ) : (
                          <>
                            <option value="accept">Accepted</option>
                            <option value="activate">Activated</option>
                          </>
                        )}
                      </select>
                    </td>

                    <td className="px-4 py-2 text-center">
                      <FaEye
                        className="cursor-pointer text-blue-500"
                        onClick={() =>
                          navigate('/work-view-details', {
                            state: { data: item },
                          })
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="text-center py-4 text-gray-500">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FilteredWorkStatusDetails;
