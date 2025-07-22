// export default BankDetailsDashboard;

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
  const [bankData, setBankData] = useState([]);

  const fetchAccountDetails = async () => {
    try {
      const response = await ApiService.post('/dashboards/getAccountBySearch', {
        accountName: searchAcc,
        accountNumber: searchBank,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      if (response.status) {
        setBankData(response.data);
      } else {
        setBankData([]);
      }
    } catch (error) {
      console.error('Error fetching account details:', error);
      alert('Failed to fetch account details.');
    }
  };

  useEffect(() => {
    fetchAccountDetails();
  }, []); // Initial fetch

  const handleSearch = () => {
    fetchAccountDetails();
  };

  const columns = [
    { title: 'No', dataIndex: 'ac_id', key: 'ac_id' },
    { title: 'A/C Holder', dataIndex: 'ac_name', key: 'ac_name' },
    { title: 'A/C Type', dataIndex: 'ac_account_type', key: 'ac_account_type' },
    {
      title: 'A/C Number',
      dataIndex: 'ac_account_number',
      key: 'ac_account_number',
    },
    { title: 'IFSC Code', dataIndex: 'ac_ifsc_code', key: 'ac_ifsc_code' },
    { title: 'Amount', dataIndex: 'ac_total_amount', key: 'ac_total_amount' },
  ];

  return (
    <div className="p-10">
      <p className="font-bold text-xl">Bank Details</p>
      <div className="flex justify-end mb-4">
        <button
          className="h-12 px-4 bg-yellow-400 text-white font-bold rounded-md"
          onClick={() => navigate('/add-bank-account')}
        >
          Add Bank Account
        </button>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          value={searchAcc}
          placeholder="Search with Account number"
          onChange={(e) => setSearchAcc(e.target.value)}
          className="h-12 border border-gray-500 px-2 rounded-md w-full"
        />
        <input
          type="text"
          value={searchBank}
          placeholder="Search with Bank Name"
          onChange={(e) => setSearchBank(e.target.value)}
          className="h-12 border border-gray-500 px-2 rounded-md w-full mx-2"
        />
        <button
          onClick={handleSearch}
          className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
        >
          <FaSearch className="mr-2" /> Search
        </button>
      </div>
      <Table
        columns={bankData?.length ? Object.keys(bankData[0]) : []}
        columnNames={bankData?.length ? Object.keys(bankData[0]) : []}
        data={bankData.map((item, index) => ({
          ac_id: item.ac_id,
          Sno: index + 1, // Replacing ID with index
          ac_account_name: item.ac_account_name,
          ac_name: item.ac_name,
          ac_account_number: item.ac_account_number,
          ac_account_type: item.ac_account_type,
          ac_ifsc_code: item.ac_ifsc_code,
          ac_phone_number: item.ac_phone_number,
          ac_address: item.ac_address,
          ac_branch_id: item.ac_branch_id,
          ac_total_amount: parseFloat(item.ac_total_amount),
        }))}
        onEdit={(bankDetails) => {
          navigate('/add-bank-account',{ state: { bankDetails }})}}
        onDetails={() => navigate('/bank-details')}
        onDelete={() => {}}
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
