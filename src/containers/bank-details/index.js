// import React, { useState, useEffect } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import Table from '../../components/Table';
// import { useNavigate } from 'react-router';
// import ApiService from '../../services/ApiService';
// import { initialAuthState } from '../../services/ApiService';
// const BankDetailsDashboard = () => {
//   const navigate = useNavigate();
//   const [searchAcc, setSearchAcc] = useState('');
//   const [searchBank, setSearchBank] = useState('');
//   const [bankData, setBankData] = useState([])
//   const handleSearch = () => { };
//   const onEdit = () => { };
//   const onDelete = () => { };
//   const onDetails = () => {
//     navigate('/bank-details');
//   };

//   useEffect(() => {
//     const fetchAccountDetails = async () => {
//       try {
//         const response = await ApiService.post('/dashboards/getAccountBySearch', {
//           accountName: searchAcc,
//           accountNumber: searchBank,
//           companyCode: initialAuthState.companyCode,
//           unitCode: initialAuthState.unitCode,
//         });

//         if (response.status) {
//           const data = response.data;
//           setBankData(data);
//         } else {
//           setBankData([]);
//         }
//       } catch (error) {
//         console.error('Error fetching account details:', error);
//         alert('Failed to fetch account details.');
//       }
//     };

//     fetchAccountDetails();
//   }, []);

//   const columns = [
//     { title: 'No', dataIndex: 'ac_id', key: 'ac_id' },
//     { title: 'A/C Holder', dataIndex: 'ac_name', key: 'ac_name' },
//     { title: 'A/C Type', dataIndex: 'ac_account_type', key: 'ac_account_type' },
//     { title: 'A/C Number', dataIndex: 'ac_account_number', key: 'ac_account_number' },
//     { title: 'IFSC Code', dataIndex: 'ac_ifsc_code', key: 'ac_ifsc_code' },
//     { title: 'Amount', dataIndex: 'ac_total_amount', key: 'ac_total_amount' },
//   ];


//   return (
//     <div className="p-10">
//       <p className="font-bold text-xl">Bank Details</p>
//       <div className="flex justify-end mb-4">
//         <button
//           className="h-12 px-4 bg-yellow-400 text-white font-bold rounded-md hover:cursor-pointer"
//           onClick={() => navigate('/add-bank-account')}
//         >
//           Add Bank Account
//         </button>
//       </div>
//       <div className="flex mb-4">
//         <div className="flex-grow mr-2">
//           <input
//             type="text"
//             value={searchAcc}
//             placeholder="Search with Account number"
//             onChange={(e) => setSearchAcc(e.target.value)}
//             className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
//             style={{ paddingLeft: '8px' }}
//           />
//         </div>
//         <div className="flex-grow mx-2">
//           <input
//             type="text"
//             value={searchBank}
//             placeholder="Search with Bank Name"
//             onChange={(e) => setSearchBank(e.target.value)}
//             className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
//             style={{ paddingLeft: '8px' }}
//           />
//         </div>

//         <button
//           onClick={handleSearch}
//           className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
//         >
//           <FaSearch className="mr-2" /> Search
//         </button>
//       </div>
//       <Table
//         columns={columns}
//         dataSource={bankData.map((item, index) => ({
//           key: item.ac_id,
//           ac_id: index + 1,
//           name: item.ac_name,
//           accountType: item.ac_account_type,
//           accountNumber: item.ac_account_number,
//           ifscCode: item.ac_ifsc_code,
//           totalAmount: parseFloat(item.ac_total_amount),
//         }))}
//         onEdit={onEdit}
//         onDetails={onDetails}
//         onDelete={onDelete}
//         showEdit={true}
//         showDelete={true}
//         showDetails={true}
//         editText={'Edit'}
//         deleteText={'Delete'}
//         detailsText={'Details'}
//       />

//     </div>
//   );
// };

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
    { title: 'A/C Number', dataIndex: 'ac_account_number', key: 'ac_account_number' },
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
        columns={columns}
        dataSource={bankData.map((item, index) => ({
          key: item.ac_id,
          ac_id: index + 1, // Replacing ID with index
          ac_name: item.ac_name,
          ac_account_type: item.ac_account_type,
          ac_account_number: item.ac_account_number,
          ac_ifsc_code: item.ac_ifsc_code,
          ac_total_amount: parseFloat(item.ac_total_amount),
        }))}
        onEdit={() => { }}
        onDetails={() => navigate('/bank-details')}
        onDelete={() => { }}
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
