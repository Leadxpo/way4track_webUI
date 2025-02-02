import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Table from '../../components/Table';
import { useNavigate } from 'react-router';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
const BankDetailsDashboard = () => {
  const navigate = useNavigate();
  const [searchAcc, setSearchAcc] = useState('');
  const [searchBank, setSearchBank] = useState('');
  const [bankData, setBankData] = useState([])
  const handleSearch = () => { };
  const onEdit = () => { };
  const onDelete = () => { };
  const onDetails = () => {
    navigate('/bank-details');
  };

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await ApiService.post('/account/getAccountsDetails', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });

        if (response.status) {
          const data = response.data;
          setBankData(data);
        } else {
          setBankData([]);
        }
      } catch (error) {
        console.error('Error fetching account details:', error);
        alert('Failed to fetch account details.');
      }
    };

    fetchAccountDetails();
  }, []);

  const columns = [
    { title: 'No', dataIndex: 'id', key: 'id' },
    { title: 'A/C Holder', dataIndex: 'name', key: 'name' },
    { title: 'A/C Type', dataIndex: 'accountType', key: 'accountType' },
    { title: 'A/C Number', dataIndex: 'accountNumber', key: 'accountNumber' },
    { title: 'IFSC Code', dataIndex: 'ifscCode', key: 'ifscCode' },
    { title: 'Amount', dataIndex: 'totalAmount', key: 'totalAmount' },
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
        columns={columns}
        dataSource={bankData.map((item, index) => ({
          key: item.id,
          id: index + 1,
          name: item.name,
          accountType: item.accountType,
          accountNumber: item.accountNumber,
          ifscCode: item.ifscCode,
          totalAmount: parseFloat(item.totalAmount),
        }))}
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
