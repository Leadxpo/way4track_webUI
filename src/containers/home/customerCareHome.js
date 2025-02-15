// import React, { useState } from 'react';
// import Table from '../../components/Table';
// import { useNavigate } from 'react-router';
// import { initialAuthState } from '../../services/ApiService';
// import ApiService from '../../services/ApiService';

// class CommonReq {
//   constructor(unitCode, companyCode, userId, userName) {
//     this.unitCode = unitCode;
//     this.companyCode = companyCode;
//     this.userId = userId;
//     this.userName = userName;
//   }
// }

// const CustomerCareHome = () => {
//   const [isPurchaseSelected, setIsPurchaseSelected] = useState('');
//   const [tableData, setTableData] = useState([]);
//   const [columns, setColumns] = useState([]);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const navigate = useNavigate();


//   const [customerDetails, setCustomerDetails] = useState(null); // Add this new state

//   const getPurchaseTable = async () => {
//     if (!phoneNumber.trim()) {
//       alert('Please enter a phone number');
//       return;
//     }

//     try {
//       const payload = new CommonReq(
//         initialAuthState.unitCode,
//         initialAuthState.companyCode,
//         phoneNumber
//       );

//       const response = await ApiService.post(
//         '/dashboards/getClientPurchaseOrderDataTable',
//         payload
//       );
//       const data = response.data.data || [];

//       if (data.length === 0) {
//         setTableData([]);
//         setColumns([]);
//         setCustomerDetails(null); // Clear customer details if no data found
//         alert('No data found');
//         return;
//       }

//       // Extract customer details from the first record
//       const customerInfo = {
//         clientName: data[0].clientName,
//         phoneNumber: data[0].phoneNumber,
//         address: data[0].address,
//       };

//       // Define table columns dynamically based on the first data item
//       const tableColumns = [
//         { title: 'Client Name', dataIndex: 'clientName', key: 'clientName' },
//         { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
//         { title: 'Client ID', dataIndex: 'clientId', key: 'clientId' },
//         { title: 'Address', dataIndex: 'address', key: 'address' },
//         { title: 'Voucher ID', dataIndex: 'voucherId', key: 'voucherId' },
//         { title: 'Generation Date', dataIndex: 'generationDate', key: 'generationDate', render: (text) => new Date(text).toLocaleDateString() },
//         { title: 'Purpose', dataIndex: 'purpose', key: 'purpose' },
//         { title: 'Item Name', dataIndex: 'name', key: 'name' },
//         { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', render: (text) => text ?? 'N/A' },
//         { title: 'Payment Status', dataIndex: 'paymentStatus', key: 'paymentStatus' },
//         { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' }
//       ];

//       setColumns(tableColumns);
//       setTableData(data);
//       setCustomerDetails(customerInfo); // Store customer details
//     } catch (error) {
//       console.error('Error fetching purchase data:', error);
//       alert('Failed to fetch data. Please try again.');
//     }
//   };


//   return (
//     <div className="p-6 space-y-6">
//       {/* Header Section */}
//      <div className="flex justify-between items-center">
//         <div className="flex space-x-4">
//           <select className="border rounded-md px-4 py-2">
//             <option>All</option>
//             <option>Visakhapatnam</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Total Tickets :340"
//             disabled
//             className="border rounded-md px-4 py-2 w-48 text-center"
//           />
//           <input
//             type="text"
//             placeholder="Pending's : 200"
//             disabled
//             className="border rounded-md px-4 py-2 w-48 text-center"
//           />
//           <input
//             type="text"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             placeholder="Enter Phone Number"
//             className="border p-2 mr-2"
//           />
//           <button
//             onClick={getPurchaseTable}
//             className="bg-green-700 text-white p-2 rounded-md"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       {/* Customer Details */}
//       {/* Customer Details */}
//       <div className="border border-green-500 rounded-md p-6 flex justify-between items-center">
//         <div className="space-y-4">
//           {customerDetails ? (
//             <>
//               <p>
//                 <strong>Name:</strong> {customerDetails.clientName || 'N/A'}
//               </p>
//               <p>
//                 <strong>Phone Number:</strong> {customerDetails.phoneNumber || 'N/A'}
//               </p>
//               <p>
//                 <strong>Address:</strong> {customerDetails.address || 'N/A'}
//               </p>
//             </>
//           ) : (
//             <p className="text-gray-500">Enter a phone number and search to view customer details.</p>
//           )}
//           <div className="flex space-x-4">
//             <button
//               className={`px-4 py-2 rounded-md ${isPurchaseSelected === 'purchase' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
//               onClick={() => setIsPurchaseSelected('purchase')}
//             >
//               Purchase
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md ${isPurchaseSelected === 'appointment' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
//               onClick={() => setIsPurchaseSelected('appointment')}
//             >
//               Appointment
//             </button>
//           </div>
//         </div>
//         <div>
//           <img
//             src="https://via.placeholder.com/150"
//             alt="Customer"
//             className="rounded-md border w-32 h-32 object-cover"
//           />
//         </div>
//       </div>


//       {/* Table Data */}
//       {tableData.length > 0 && <Table data={tableData} columns={columns} />}

//       {/* Description */}
//       <p className="text-gray-600">
//         <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur
//         adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
//         sociis natoque penatibus et magnis dis parturient montes, nascetur
//         ridiculus mus.
//       </p>
//     </div>
//   );
// };

// export default CustomerCareHome;
import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import { useNavigate } from 'react-router';
import { initialAuthState } from '../../services/ApiService';
import ApiService from '../../services/ApiService';

// const tableColumns = [
//   { title: 'Client Name', dataIndex: 'clientName', key: 'clientName', render: (text) => text ?? 'N/A' },
//   { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber', render: (text) => text ?? 'N/A' },
//   { title: 'Client ID', dataIndex: 'clientId', key: 'clientId', render: (text) => text ?? 'N/A' },
//   { title: 'Address', dataIndex: 'address', key: 'address', render: (text) => text ?? 'N/A' },
//   { title: 'Voucher ID', dataIndex: 'voucherId', key: 'voucherId', render: (text) => text ?? 'N/A' },
//   { title: 'Generation Date', dataIndex: 'generationDate', key: 'generationDate', render: (text) => text ? new Date(text).toLocaleDateString() : 'N/A' },
//   { title: 'Purpose', dataIndex: 'purpose', key: 'purpose', render: (text) => text ?? 'N/A' },
//   { title: 'Item Name', dataIndex: 'name', key: 'name', render: (text) => text ?? 'N/A' },
//   { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', render: (text) => text ?? 'N/A' },
//   { title: 'Payment Status', dataIndex: 'paymentStatus', key: 'paymentStatus', render: (text) => text ?? 'N/A' },
//   { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount', render: (text) => text ?? 'N/A' }
// ];

const CustomerCareHome = () => {
  const [isPurchaseSelected, setIsPurchaseSelected] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');

  const handlePurchaseClick = async () => {
    if (!phoneNumber.trim()) {
      alert('Please enter a phone number');
      return;
    }

    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        phoneNumber,
      };

      const response = await ApiService.post('/dashboards/getClientPurchaseOrderDataTable', payload);
      console.log("API Response:", response);

      if (response.status && response.data?.length) {
        const customer = response.data[0];
        setCustomerDetails({
          clientName: customer.clientName || 'N/A',
          phoneNumber: customer.phoneNumber || 'N/A',
          address: customer.address || 'N/A',
        });
        setTableData(response.data);
      } else {
        setCustomerDetails(null);
        setTableData([]);
        alert('No data found');
      }
    } catch (error) {
      console.error('Error fetching purchase data:', error);
      alert('Failed to fetch data. Please try again.');
    }
  };


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const payload = {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        };

        const response = await ApiService.post('/dashboards/totalTicketsBranchWise', payload);
        console.log("API Response:", response);

        if (response.status && response.data) {
          setTickets(response.data.branchWiseTickets);
          if (response.data.branchWiseTickets.length > 0) {
            setSelectedBranch(response.data.branchWiseTickets[0].branchName); // Auto-select first branch
          }
        } else {
          setTickets([]);
          alert('No data found');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        alert('Failed to fetch data. Please try again.');
      }
    };

    fetchTickets();
  }, []);

  // Get details of the selected branch
  const selectedBranchData = tickets.find(ticket => ticket.branchName === selectedBranch);


  return (
    <div className="p-6 space-y-6">
      <div className="p-6 space-y-6">
        {/* Branch Selection */}
        {tickets.length > 0 && (
          <div className="mt-4">
            <label className="block text-gray-700">Select Branch:</label>
            <select
              className="border p-2 w-full md:w-64 rounded-md"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              {tickets.map((branch) => (
                <option key={branch.branchName} value={branch.branchName}>
                  {branch.branchName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Display Selected Branch Details */}
        {selectedBranchData && (
          <div className="border p-4 mt-4 rounded-md shadow">
            <h2 className="text-lg font-semibold">{selectedBranchData.branchName}</h2>
            <p><strong>Total Tickets:</strong> {selectedBranchData.totalTickets}</p>
            <p><strong>Pending Tickets:</strong> {selectedBranchData.pendingTickets}</p>
          </div>
        )}
      </div>
      {/* Search Input */}
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:items-center">
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter Phone Number"
          className="border p-2 w-full md:w-64 rounded-md"
        />
        <button
          onClick={handlePurchaseClick}
          className="bg-green-700 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Customer Details */}
      <div className="border border-green-500 rounded-md p-6 flex flex-col md:flex-row justify-between items-center">
        <div className="space-y-4">
          {customerDetails ? (
            Object.entries(customerDetails).map(([key, value]) => (
              <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</p>
            ))
          ) : (
            <p className="text-gray-500">Enter a phone number and search to view customer details.</p>
          )}

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${isPurchaseSelected ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
              onClick={() => {
                setIsPurchaseSelected(true);
                handlePurchaseClick();
              }}
            >
              Purchase
            </button>

            <button
              className="px-4 py-2 rounded-md bg-green-100 text-green-700"
              onClick={() => navigate('/add-appointment')}
            >
              Appointment
            </button>
          </div>
        </div>

        <img
          src="https://via.placeholder.com/150"
          alt="Customer"
          className="rounded-md border w-32 h-32 object-cover"
        />
      </div>

      {/* Table */}
      {tableData.length > 0 && <Table columns={Object.keys(tableData[0] || {})} data={tableData} />}
    </div>
  );
};

export default CustomerCareHome;

