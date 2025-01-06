import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Table from '../../components/Table';
import { useNavigate } from 'react-router';
const BankDetailsDashboard = () => {
  const navigate = useNavigate();
  const [searchAcc, setSearchAcc] = useState('');
  const [searchBank, setSearchBank] = useState('');
  const handleSearch = () => {};
  const onEdit = () => {};
  const onDelete = () => {};
  const onDetails = () => {
    navigate('/bank-details');
  };
  const bankData = [
    {
      No: 1,
      'A/C Holder': 'John Doe',
      'A/C Type': 'Savings',
      'A/C Number': '123456789012',
      Branch: 'Vishakapatnam',
      'IFSC Code': 'VIJB0001234',
      Amount: 15000.5,
    },
    {
      No: 2,
      'A/C Holder': 'Jane Smith',
      'A/C Type': 'Current',
      'A/C Number': '987654321098',
      Branch: 'Hyderabad',
      'IFSC Code': 'HYDB0005678',
      Amount: 25000.75,
    },
    {
      No: 3,
      'A/C Holder': 'Alice Johnson',
      'A/C Type': 'Savings',
      'A/C Number': '456123789045',
      Branch: 'Vijayawada',
      'IFSC Code': 'VIJB0003456',
      Amount: 18000.25,
    },
    {
      No: 4,
      'A/C Holder': 'Bob Brown',
      'A/C Type': 'Current',
      'A/C Number': '321789654012',
      Branch: 'Kakinada',
      'IFSC Code': 'KAKN0007890',
      Amount: 22000.0,
    },
    {
      No: 5,
      'A/C Holder': 'Charlie Wilson',
      'A/C Type': 'Savings',
      'A/C Number': '654321987654',
      Branch: 'Vishakapatnam',
      'IFSC Code': 'VIJB0006789',
      Amount: 19500.3,
    },
  ];

  return (
    <div className="p-10">
      <p className="font-bold text-xl">Bank Details</p>
      <div className="flex justify-end mb-4">
        <button
          className="h-12 px-4 bg-yellow-400 text-white font-bold rounded-md hover:cursor-pointer"
          onClick={() => navigate('/add-bank-account')}
        >
          Add Bank Account
        </button>
      </div>
      <div className="flex mb-4">
        <div className="flex-grow mr-2">
          <input
            type="text"
            value={searchAcc}
            placeholder="Search with Account number"
            onChange={(e) => setSearchAcc(e.target.value)}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            style={{ paddingLeft: '8px' }}
          />
        </div>
        <div className="flex-grow mx-2">
          <input
            type="text"
            value={searchBank}
            placeholder="Search with Bank Name"
            onChange={(e) => setSearchBank(e.target.value)}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            style={{ paddingLeft: '8px' }}
          />
        </div>

        <button
          onClick={handleSearch}
          className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </div>
      <Table
        columns={Object.keys(bankData[0])}
        data={bankData}
        onEdit={onEdit}
        onDetails={onDetails}
        onDelete={onDelete}
        showEdit={true}
        showDelete={true}
        showDetails={true}
        editText={'Edit'}
        deleteText={'Delete'}
        detailsText={'Details'}
      />
    </div>
  );
};

export default BankDetailsDashboard;
