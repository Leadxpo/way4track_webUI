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
import { useIsomorphicLayoutEffect } from 'framer-motion';

const CustomerCareHome = () => {
  const [branches, setBranches] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [appointmentCount, setAppointmentCount] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [tabIndex, setTabIndex] = useState('works');
  const [productTypes, setProductTypes] = useState([]);
  const [allProductTypes, setAllProductTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState([]);
  const [work, setWork] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [client, setClient] = useState();

  const handlePhoneClick = () => {
    if (!phoneNumber.trim()) {
      alert('Please enter a phone number');
      setAppointment([]);
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Please enter a valid 10-digit phone number');
      setAppointment([]);
      return;
    }

    fetchAppointmentsApi(phoneNumber);
    fetchWorkApi(phoneNumber);
    fetchClientApi(phoneNumber);
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/branch/getBranchNamesDropDown'
        );
        if (response.status) {
          setBranches(response.data);
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

  const fetchAppointmentsApi = async (phoneNumber) => {
    setLoading(true);
    try {
      const response = await ApiService.post(
        '/appointment/getAllAppointmentDetails'
      );
      if (response.data) {
        const matched = response.data.filter(
          (item) =>
            item.clientPhoneNumber &&
            item.clientPhoneNumber.toString().includes(phoneNumber)
        );

        setAppointment(matched || []);
      } else {
        console.error('Error: API response is invalid');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const fetchWorkApi = async (phoneNumber) => {
    setLoading(true);
    try {
      const response = await ApiService.post(
        '/technician/getBackendSupportWorkAllocation',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      if (response.data) {
        console.log(response.data, 'get work allocations');

        const matched = response.data.filter(
          (item) =>
            item.phoneNumber &&
            item.phoneNumber.toString().includes(phoneNumber)
        );

        setWork(matched || []);
      } else {
        console.error('Error: API response is invalid');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const fetchClientApi = async (phoneNumber) => {
    setLoading(true);
    try {
      const response = await ApiService.post('/client/getClientDetails');

      if (response.data && response.data) {
        const matched = response.data.filter(
          (item) =>
            item.phoneNumber &&
            item.phoneNumber.toString().includes(phoneNumber)
        );

        const firstClient = matched[0] || null;
        setClient(firstClient);
        console.log('Matched Client:', firstClient);
      } else {
        console.error('Error: API response is invalid');
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointmentCount = async () => {
    setLoading(true);
    try {
      const response = await ApiService.post(
        '/dashboards/getAllAppointmentDetails',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      if (response.data) {
        const result = response.data.result;

        // Filter all matching branches (in case more than one match)
        const matchedResults = result.filter(
          (item) =>
            item.branchName.trim().toLowerCase() ===
            selectedBranch.trim().toLowerCase()
        );

        console.log('Matched Results:', matchedResults);

        if (matchedResults.length > 0) {
          // If you only want to use the first match:
          setAppointmentCount(matchedResults[0]);

          // Or, if you want to set all matches:
          // setAppointmentCount(matchedResults);
        } else {
          console.warn('No branch matched for:', selectedBranch);
        }
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBranch) {
      fetchAppointmentCount();
    }
  }, [selectedBranch]);

  return (
    <div className="p-6 space-y-6">
      <div className="p-6 space-y-6">
        {branches.length > 0 && (
          <div>
            <p className="font-semibold mb-1">Branch</p>
            <select
              name="selectedBranch"
              value={selectedBranch}
              onChange={handleBranchChange}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
            >
              <option value="">Select a Branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.branchName}>
                  {branch.branchName}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedBranch && (
          <div className="border p-4 mt-4 rounded-md shadow">
            <h2 className="text-lg font-semibold">
              {appointmentCount.branchName}
            </h2>
            <p>
              <strong>Total Appointments :</strong>{' '}
              {appointmentCount.totalAppointments}
            </p>
            <p>
              <strong>Total Success Appointments :</strong>{' '}
              {appointmentCount.totalSuccessAppointments}
            </p>
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
          onClick={handlePhoneClick}
          className="bg-green-700 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Customer Details Placeholder */}
      <div className="border border-green-500 rounded-md p-6 flex flex-col md:flex-row justify-between items-center">
        <div className="space-y-4">
          {client && (
            <div className="flex items-start space-x-8 bg-white p-6 rounded-lg shadow-md">
              {client?.clientPhoto && (
                <img
                  src={client?.clientPhoto}
                  alt="Vendor"
                  className="w-32 h-32 rounded-full object-cover"
                />
              )}
              <div className="space-y-2">
                <p className="font-bold text-xl">Customer ID : {client?.id}</p>
                <p className="text-gray-800 font-bold text-xl">
                  Customer Name : {client?.name}
                </p>
                <p className="text-gray-800">
                  Phone number : {client?.phoneNumber}
                </p>
                <p className="text-gray-800">Email : {client?.email}</p>
                <p className="text-gray-800">
                  Customer Branch : {client?.branchName}
                </p>

                <p className="text-gray-800">Address : {client?.address}</p>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md ${tabIndex === 'works' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
              onClick={() => setTabIndex('works')}
            >
              Works
            </button>

            <button
              className={`px-4 py-2 rounded-md ${tabIndex === 'appointments' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'}`}
              onClick={() => setTabIndex('appointments')}
            >
              Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Works Tab */}
      {tabIndex === 'works' && (
        <>
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-200 text-gray-600">
                    <th className="py-2 px-4">Work Id</th>
                    <th className="py-2 px-4">Product Type</th>
                    <th className="py-2 px-4">Vehicle Number</th>
                    <th className="py-2 px-4">Quantity</th>
                    <th className="py-2 px-4">Amount</th>
                    <th className="py-2 px-4">Status</th>
                    <th className="py-2 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(work) && work.length > 0 ? (
                    work.map((pitcher, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                      >
                        <td className="py-2 px-4 text-center">
                          {pitcher.id}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {pitcher.productName}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {pitcher.vehicleNumber || "N/A"}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {pitcher.quantity || "N/A"}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {pitcher.amount || "N/A"}
                        </td>
                        <td className="py-2 px-4 text-center">
                          {pitcher.paymentStatus}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              navigate('/view-work', {
                                state: { data: pitcher },
                              })
                            }
                            className="p-2 bg-white rounded-md"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Appointments Tab */}
      {tabIndex === 'appointments' && (
        <>
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead>
                  <tr className="border-b bg-blue-500 text-white text-left">
                    <th className="px-6 py-3 text-sm font-bold">
                      Appointment Id
                    </th>
                    <th className="px-6 py-3 text-sm font-bold">Client Name</th>
                    <th className="px-6 py-3 text-sm font-bold">
                      Appointment Date
                    </th>
                    <th className="px-6 py-3 text-sm font-bold">Description</th>
                    <th className="px-6 py-3 text-sm font-bold">Status</th>
                    <th className="px-6 py-3 text-sm font-bold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointment.length > 0 ? (
                    appointment.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}
                      >
                        <td className="px-6 py-4">{item.appointmentId}</td>
                        <td className="px-6 py-4">{item.name}</td>
                        <td className="px-6 py-4">{item.date}</td>
                        <td className="px-6 py-4">{item.description}</td>
                        <td className="px-6 py-4">{item.status}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              navigate('/view-appointment', {
                                state: { appointment: item },
                              })
                            }
                            className="p-2 bg-white rounded-md"
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
        </>
      )}
    </div>
  );
};

export default CustomerCareHome;
