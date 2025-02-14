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
//       <div className="flex justify-between items-center">
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
import React, { useState } from 'react';
import Table from '../../components/Table';
import { useNavigate } from 'react-router';
import { initialAuthState } from '../../services/ApiService';
import ApiService from '../../services/ApiService';

const CustomerCareHome = () => {
  const [isPurchaseSelected, setIsPurchaseSelected] = useState('');
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState(null);

  const tableColumns = [
    { title: 'Client Name', dataIndex: 'clientName', key: 'clientName' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Client ID', dataIndex: 'clientId', key: 'clientId' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Voucher ID', dataIndex: 'voucherId', key: 'voucherId' },
    { title: 'Generation Date', dataIndex: 'generationDate', key: 'generationDate', render: (text) => new Date(text).toLocaleDateString() },
    { title: 'Purpose', dataIndex: 'purpose', key: 'purpose' },
    { title: 'Item Name', dataIndex: 'name', key: 'name' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', render: (text) => text ?? 'N/A' },
    { title: 'Payment Status', dataIndex: 'paymentStatus', key: 'paymentStatus' },
    { title: 'Total Amount', dataIndex: 'totalAmount', key: 'totalAmount' }
  ];

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

      // const data = response?.data || [];

      if (response.status) {
        setCustomerDetails({
          clientName: response.data[0]?.clientName || 'N/A',
          phoneNumber: response.data[0]?.phoneNumber || 'N/A',
          address: response.data[0]?.address || 'N/A',
        });
        setTableData([...response.data]);  // Ensure re-render
        setColumns([...tableColumns]); // Ensure re-render
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



  return (
    <div className="p-6 space-y-6">
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

      <div className="border border-green-500 rounded-md p-6 flex flex-col md:flex-row justify-between items-center">
        <div className="space-y-4">
          {customerDetails ? (
            <>
              <p><strong>Name:</strong> {customerDetails.clientName || 'N/A'}</p>
              <p><strong>Phone Number:</strong> {customerDetails.phoneNumber || 'N/A'}</p>
              <p><strong>Address:</strong> {customerDetails.address || 'N/A'}</p>
            </>
          ) : (
            <p className="text-gray-500">Enter a phone number and search to view customer details.</p>
          )}
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${isPurchaseSelected === 'purchase' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
              onClick={() => {
                setIsPurchaseSelected('purchase');
                handlePurchaseClick();
              }}
            >
              Purchase
            </button>

            <button
              className={`px-4 py-2 rounded-md ${isPurchaseSelected === 'appointment' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
              onClick={() => setIsPurchaseSelected('appointment')}
            >
              Appointment
            </button>
          </div>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/150"
            alt="Customer"
            className="rounded-md border w-32 h-32 object-cover"
          />
        </div>
      </div>

      {<Table data={tableData} columns={columns} />}
    </div>
  );
};

export default CustomerCareHome;
