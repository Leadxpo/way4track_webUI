import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router';
const Ledger = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    clientId: '',
    clientName: '',
    branch: '',
  });

  const records = [
    { no: '001', client: 'Petrol', items: 'Petrol', amount: '₹2099' },
    { no: '002', client: 'Books', items: 'Books', amount: '₹2099' },
    { no: '003', client: 'Pens', items: 'Pens', amount: '₹2099' },
    { no: '004', client: 'Advances', items: 'Advances', amount: '₹2099' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    console.log('Search data:', searchData);
  };

  const handleView = (ledger) => {
    navigate('/ledger-details', { state: { ledgerDetails: ledger } });
  };

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
        <div className="flex-grow mx-2">
          <select
            name="branch"
            value={searchData.branch}
            onChange={handleInputChange}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
          >
            <option value="">Select Ledger</option>
            <option value="Branch1">Branch 1</option>
            <option value="Branch2">Branch 2</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="py-2 px-4">NO.</th>
              <th className="py-2 px-4">Number of Clients</th>
              <th className="py-2 px-4">Number Of Items</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records.map((record, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} text-sm`}
              >
                <td className="py-1 px-4 cursor-pointer hover:underline">
                  {record.no}
                </td>
                <td className="py-1 px-4">{record.client}</td>
                <td className="py-1 px-4">{record.items}</td>
                <td className="py-1 px-4">{record.amount}</td>
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
      </div>
    </div>
  );
};

export default Ledger;
