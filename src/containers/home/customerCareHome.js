
// import React, { useState, useEffect } from 'react';
// import Table from '../../components/Table';
// import { useNavigate } from 'react-router';
// import { initialAuthState } from '../../services/ApiService';
// import ApiService from '../../services/ApiService';

// const CustomerCareHome = () => {
//   const [isPurchaseSelected, setIsPurchaseSelected] = useState(false);
//   const [tableData, setTableData] = useState([]);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const navigate = useNavigate();
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [tickets, setTickets] = useState([]);
//   const [selectedBranch, setSelectedBranch] = useState('');

//   const handlePurchaseClick = async () => {
//     if (!phoneNumber.trim()) {
//       alert('Please enter a phone number');
//       return;
//     }

//     try {
//       const payload = {
//         companyCode: initialAuthState.companyCode,
//         unitCode: initialAuthState.unitCode,
//         phoneNumber,
//       };

//       const response = await ApiService.post('/dashboards/getClientPurchaseOrderDataTable', payload);
//       console.log("API Response:", response);

//       if (response.status && response.data?.length) {
//         const customer = response.data[0];
//         setCustomerDetails({
//           clientName: customer.clientName || 'N/A',
//           phoneNumber: customer.phoneNumber || 'N/A',
//           address: customer.address || 'N/A',
//         });
//         setTableData(response.data);
//       } else {
//         setCustomerDetails(null);
//         setTableData([]);
//         alert('No data found');
//       }
//     } catch (error) {
//       console.error('Error fetching purchase data:', error);
//       alert('Failed to fetch data. Please try again.');
//     }
//   };


//   useEffect(() => {
//     const fetchTickets = async () => {
//       try {
//         const payload = {
//           companyCode: initialAuthState.companyCode,
//           unitCode: initialAuthState.unitCode,
//         };

//         const response = await ApiService.post('/dashboards/totalTicketsBranchWise', payload);
//         console.log("API Response:", response);

//         if (response.status && response.data) {
//           setTickets(response.data.branchWiseTickets);
//           if (response.data.branchWiseTickets.length > 0) {
//             setSelectedBranch(response.data.branchWiseTickets[0].branchName); // Auto-select first branch
//           }
//         } else {
//           setTickets([]);
//           alert('No data found');
//         }
//       } catch (error) {
//         console.error('Error fetching tickets:', error);
//         alert('Failed to fetch data. Please try again.');
//       }
//     };

//     fetchTickets();
//   }, []);

//   // Get details of the selected branch
//   const selectedBranchData = tickets.find(ticket => ticket.branchName === selectedBranch);


//   return (
//     <div className="p-6 space-y-6">
//       <div className="p-6 space-y-6">
//         {/* Branch Selection */}
//         {tickets.length > 0 && (
//           <div className="mt-4">
//             <label className="block text-gray-700">Select Branch:</label>
//             <select
//               className="border p-2 w-full md:w-64 rounded-md"
//               value={selectedBranch}
//               onChange={(e) => setSelectedBranch(e.target.value)}
//             >
//               {tickets.map((branch) => (
//                 <option key={branch.branchName} value={branch.branchName}>
//                   {branch.branchName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Display Selected Branch Details */}
//         {selectedBranchData && (
//           <div className="border p-4 mt-4 rounded-md shadow">
//             <h2 className="text-lg font-semibold">{selectedBranchData.branchName}</h2>
//             <p><strong>Total Tickets:</strong> {selectedBranchData.totalTickets}</p>
//             <p><strong>Pending Tickets:</strong> {selectedBranchData.pendingTickets}</p>
//           </div>
//         )}
//       </div>
//       {/* Search Input */}
//       <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:items-center">
//         <input
//           type="text"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           placeholder="Enter Phone Number"
//           className="border p-2 w-full md:w-64 rounded-md"
//         />
//         <button
//           onClick={handlePurchaseClick}
//           className="bg-green-700 text-white p-2 rounded-md"
//         >
//           Search
//         </button>
//       </div>

//       {/* Customer Details */}
//       <div className="border border-green-500 rounded-md p-6 flex flex-col md:flex-row justify-between items-center">
//         <div className="space-y-4">
//           {customerDetails ? (
//             Object.entries(customerDetails).map(([key, value]) => (
//               <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</p>
//             ))
//           ) : (
//             <p className="text-gray-500">Enter a phone number and search to view customer details.</p>
//           )}

//           {/* Buttons */}
//           <div className="flex space-x-4">
//             <button
//               className={`px-4 py-2 rounded-md ${isPurchaseSelected ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
//               onClick={() => {
//                 setIsPurchaseSelected(true);
//                 handlePurchaseClick();
//               }}
//             >
//               Purchase
//             </button>

//             <button
//               className="px-4 py-2 rounded-md bg-green-100 text-green-700"
//               onClick={() => navigate('/add-appointment')}
//             >
//               Appointment
//             </button>
//           </div>
//         </div>

//         <img
//           src="https://via.placeholder.com/150"
//           alt="Customer"
//           className="rounded-md border w-32 h-32 object-cover"
//         />
//       </div>

//       {/* Table */}
//       {tableData.length > 0 && <Table columns={Object.keys(tableData[0] || {})} data={tableData} />}
//     </div>
//   );
// };

// export default CustomerCareHome;



import React, { useState, useEffect } from 'react';
import Table from '../../components/Table';
import { useNavigate } from 'react-router';
import { initialAuthState } from '../../services/ApiService';
import ApiService from '../../services/ApiService';
import { FaEllipsisV } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';

const CustomerCareHome = () => {
  const [isPurchaseSelected, setIsPurchaseSelected] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [tabIndex, setTabIndex] = useState('works');
  const [productTypes, setProductTypes] = useState([]);
  const [allProductTypes, setAllProductTypes] = useState([]);
  const [loading, setLoading] = useState(true);
    const [appointment, setAppointment] = useState([]);
    const [allAppointments, setAllAppointments] = useState([]);
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


   useEffect(() => {
    fetchAppointments();
    }, []);
  
    const fetchAppointments = async () => {
        try {
          const response = await ApiService.post("/appointment/getAllAppointmentDetails");
          if (response.data) {
            setAppointment(response.data || []);
            setAllAppointments(response.data || []); // Store original data
            console.log("hi",response.data)
          } else {
            console.error("Error: API response is invalid");
          }
        } catch (error) {
          console.error("Error fetching appointments:", error);
        } finally {
          setLoading(false);
        }
      };


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
              // onClick={() => {
              //   setIsPurchaseSelected(true);
              //   handlePurchaseClick();
              // }}
               onClick={() => setTabIndex("works")

              }

            >
              Works
            </button>

            <button
              className="px-4 py-2 rounded-md bg-green-100 text-green-700"
              onClick={() => setTabIndex('appointments')}
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


      {tabIndex==="works"&&(<>
        {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="border-b bg-blue-500 text-white text-left">
              <th className="px-6 py-3 text-left text-sm font-bold">Appointment Id</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Client Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Appointment Date</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Description</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointment.length > 0 ? (
                appointment.map((item, index) => (
                  <tr key={item.id} className={`border-b ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
                    <td className="px-6 py-4">{item.appointmentId}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    

                    <td className="px-6 py-4 relative dropdown-container">
                      <button
                        onClick={() => navigate("/view-appointment", { state: { appointment: item } })}
                        className="p-2 bg-white rounded-md focus:outline-none"
                      >
                        View Details
                      </button>

                    </td>
                  </tr> 
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
              </>)}


{tabIndex==="appointments"&&(<>
  {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="border-b bg-blue-500 text-white text-left">
              <th className="px-6 py-3 text-left text-sm font-bold">Appointment Id</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Client Name</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Appointment Date</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Description</th>
                <th className="px-6 py-3 text-left text-sm font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointment.length > 0 ? (
                appointment.map((item, index) => (
                  <tr key={item.id} className={`border-b ${index % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
                    <td className="px-6 py-4">{item.appointmentId}</td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">{item.description}</td>
                    

                    <td className="px-6 py-4 relative dropdown-container">
                      <button
                        onClick={() => navigate("/view-appointment", { state: { appointment: item } })}
                        className="p-2 bg-white rounded-md focus:outline-none"
                      >
                        View Details
                      </button>

                    </td>
                  </tr> 
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
              </>)}
    </div>
  );
};

export default CustomerCareHome;



