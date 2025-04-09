import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { TfiTimer } from 'react-icons/tfi';

const BackendSupportHome = () => {
  const navigate = useNavigate();
  const [popupData, setPopupData] = useState(null);
  const [records, setRecords] = useState([
    {
      id: '01',
      productName: 'Product A',
      serviceName: 'Service X',
      staffName: 'John Doe',
      branchName: 'Branch 1',
      clientName: 'Client A',
      phoneNumber: '1234567890',
      simNumber: '9876543210',
      vehicleType: 'Car',
      date: '11 Mar 2029',
      status: 'Install',
    },
    {
      id: '02',
      productName: 'Product B',
      serviceName: 'Service Y',
      staffName: 'Jane Smith',
      branchName: 'Branch 2',
      clientName: 'Client B',
      phoneNumber: '0987654321',
      simNumber: '1234567890',
      vehicleType: 'Bike',
      date: '12 Mar 2029',
      status: 'Accepted',
    },
    {
      id: '03',
      productName: 'Product C',
      serviceName: 'Service Z',
      staffName: 'Alice Brown',
      branchName: 'Branch 3',
      clientName: 'Client C',
      phoneNumber: '1122334455',
      simNumber: '5566778899',
      vehicleType: 'Truck',
      date: '13 Mar 2029',
      status: 'Install',
    },
    {
      id: '04',
      productName: 'Product D',
      serviceName: 'Service W',
      staffName: 'Bob White',
      branchName: 'Branch 4',
      clientName: 'Client D',
      phoneNumber: '2233445566',
      simNumber: '6677889900',
      vehicleType: 'Van',
      date: '14 Mar 2029',
      status: 'Accepted',
    },
  ]);

  const cardData = [
    {
      title: 'Total works',
      key: 'totalInstallWork',
      color: 'bg-yellow-10',
      id: 'install',
    },
    {
      title: 'Work in process',
      key: 'totalAcceptWork',
      color: 'bg-blue-100',
      id: 'accept',
    },
    {
      title: 'Pending Works',
      key: 'totalPendingWork',
      color: 'bg-yellow-100',
      id: 'pending',
    },
    {
      title: 'Job Completed',
      key: 'totalActivateWork',
      color: 'bg-green-100',
      id: 'activate',
    },
  ];

  const userId = localStorage.getItem('id');
  const userStaffId = localStorage.getItem('userId');

  const [workRecords, setWorkRecords] = useState([]);
  const [workRecordsCount, setWorkRecordsCount] = useState([]);
  const [branchesWorkRecordsCount, setBranchesWorkRecordsCount] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCardKey, setSelectedCardKey] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [memberWorkRecords, setMemberWorkRecords] = useState(null);

  console.log(workRecordsCount, 'useState');

  // Fetch records from an API

  const fetchRecords = async () => {
    try {
      const response = await ApiService.post(
        '/technician/getBackendSupportWorkAllocation',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      setWorkRecords(response.data || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setWorkRecords([]);
    }
  };

  const fetchMemberRecords = async () => {
    try {
      const response = await ApiService.post(
        '/technician/getBackendSupportWorkAllocation',
        {
          supporterId: userStaffId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      setMemberWorkRecords(response.data || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setMemberWorkRecords([]);
    }
  };

  const fetchCardRecords = async () => {
    try {
      const response = await ApiService.post('/technician/getWorkStatusCards', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      console.log(response.data, 'setWorkRecordsCount');
      setWorkRecordsCount(response.data.overall || []);
      setBranchesWorkRecordsCount(response.data.branchWise || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setWorkRecordsCount([]);
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchCardRecords();
    fetchMemberRecords();

    const interval = setInterval(() => {
      fetchRecords();
      fetchCardRecords();
    }, 180000);

    return () => clearInterval(interval);
  }, []);

  const onClickRefresh = () => {
    fetchRecords();
    fetchCardRecords();
    fetchMemberRecords();
  };

  //   useEffect(() => {

  //     fetchRecords();
  //   }, []);

  // const handleStatusChange = async (item, newStatus) => {
  //   console.log(item, 'item');
  //   try {
  //     setRecords((prevRecords) =>
  //       prevRecords.map((record) =>
  //         record.id === item.id ? { ...record, workStatus: newStatus } : record
  //       )
  //     );

  //     const response = await ApiService.post(
  //       '/technician/handleTechnicianDetails',
  //       {
  //         id: item.id,
  //         workStatus: newStatus,
  //         staffId: item.staffId,
  //         backEndStaffRelation: Number(userId),
  //         companyCode: initialAuthState.companyCode,
  //         unitCode: initialAuthState.unitCode,
  //       }
  //     );

  //     console.log('Status updated successfully:', response.data);

  //     await fetchRecords();
  //   } catch (error) {
  //     console.error('Error updating status:', error);
  //   }
  // };

  const handleStatusChange = async (item, newStatus) => {
    console.log(item, 'item');
    try {
      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === item.id ? { ...record, workStatus: newStatus } : record
        )
      );

      const response = await ApiService.post(
        '/technician/handleTechnicianDetails',
        {
          id: item.id,
          workStatus: newStatus,
          staffId: item.staffId,
          branchId: item.branchId,
          backEndStaffRelation: Number(userId),
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      console.log('Status updated successfully:', response.data);

      await fetchRecords();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const exportToExcel = (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

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

  const filteredCards =
    selectedCardId === 'install'
      ? workRecords.filter(
          (card) =>
            card.branchName === selectedLocation &&
            card.workStatus === selectedCardId
        )
      : ['accept', 'activate'].includes(selectedCardId)
        ? memberWorkRecords.filter(
            (card) =>
              card.branchName === selectedLocation &&
              card.workStatus === selectedCardId
          )
        : [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Work Records</h2>
        <button
          onClick={onClickRefresh}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Refresh
        </button>
      </div>

      <div className="flex justify-between gap-4 my-6">
        {cardData.map((item, index) => (
          <div
            key={index}
            className={`flex-1 ${item.color} shadow-md rounded-lg p-4 text-left border border-gray-300`}
            style={{ height: '150px' }}
            // onClick={() =>
            //   navigate(`/backend-work-details/${item.id}`, {
            //     state: { data: workRecords },
            //   })
            // }
            onClick={() => {
              setSelectedCardId(item.id);
              setSelectedCardKey(item.key);
              setSelectedLocation(null);
            }}
          >
            <h4
              className="text-lg font-semibold text-gray-700"
              style={{ fontSize: '25px' }}
            >
              {item.title}
            </h4>
            <p
              className="text-xl font-bold text-blue-600"
              style={{ fontSize: '45px', marginTop: '25px' }}
            >
              {workRecordsCount?.[item.key] || 0}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Locations - Vertical Sidebar */}
        {selectedCardKey && (
          <div
            className="space-y-4"
            style={{ width: '23%', margin: '0px', padding: '0px' }}
          >
            {branchesWorkRecordsCount
              .filter((loc) => loc.branchName)
              .map((loc, i) => (
                <div
                  key={i}
                  className={`cursor-pointer border px-3 py-5 rounded-md text-center font-bold shadow text-sm ${
                    selectedLocation === loc.branchName
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  onClick={() => setSelectedLocation(loc.branchName)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    height: '20%',
                  }}
                >
                  <p style={{ fontSize: '18px' }}>
                    {loc.branchName || 'Unknown Branch'}
                  </p>
                  <p style={{ fontSize: '18px' }}>
                    {loc?.[selectedCardKey] || 0}
                  </p>{' '}
                  {/* Dynamically shows the value */}
                </div>
              ))}
          </div>
        )}

        {/* Main Content - Cards and Jobs */}
        <div className="flex-1 space-y-6">
          {/* Jobs Grid */}
          {selectedLocation && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredCards.map((card, i) => {
                const cardBgColor =
                  {
                    install: 'bg-white-50 border-yellow-300',
                    accept: 'bg-white-50 border-blue-300',
                    activate: 'bg-white-50 border-green-300',
                    pending: 'bg-white-50 border-orange-300',
                    completed: 'bg-white-100 border-gray-300',
                  }[card.workStatus] || 'bg-white border-gray-200';

                const statusButtonColor =
                  {
                    install: 'bg-yellow-100 text-yellow-800',
                    accept: 'bg-blue-100 text-blue-800',
                    activate: 'bg-green-100 text-green-800',
                    pending: 'bg-orange-100 text-orange-800',
                    completed: 'bg-gray-300 text-gray-700',
                  }[card.workStatus] || 'bg-gray-100 text-gray-700';

                return (
                  <div
                    key={i}
                    className={`border rounded-md p-4 shadow min-h-[120px] ${cardBgColor}`}
                    style={{ width: '100%' }}
                  >
                    {card.staffName ? (
                      <div className="flex flex-col h-full justify-between">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className="text-sm font-semibold text-gray-700"
                            style={{ fontWeight: 'bold' }}
                          >
                            ID: {card.technicianNumber}
                          </span>
                          <span
                            className="text-sm text-gray-500"
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <TfiTimer
                              style={{
                                color: '#000000',
                                fontSize: '15px',
                                marginTop: '2px',
                              }}
                            />{' '}
                            :{' '}
                            {card.startDate
                              ? `${calculateDuration(card.startDate, card.endDate)}`
                              : ''}
                          </span>
                        </div>

                        <hr className="mb-2" />

                        {/* Main Info */}
                        <div className="mb-2">
                          <p className="text-lg font-bold text-gray-800">
                            {card.staffName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {card.phoneNumber}
                          </p>
                        </div>

                        {/* Status Button */}
                        <div className="mb-2">
                          <button
                            onClick={() => {
                              let nextStatus;
                              if (card.workStatus === 'install')
                                nextStatus = 'accept';
                              else if (card.workStatus === 'accept')
                                nextStatus = 'activate';
                              else nextStatus = card.workStatus;

                              handleStatusChange(card, nextStatus);
                            }}
                            className={`text-xs font-semibold px-3 py-1 rounded-md ${statusButtonColor}`}
                          >
                            {card?.workStatus === 'install'
                              ? 'In Progress'
                              : card?.workStatus === 'accept'
                                ? 'Activate'
                                : card?.workStatus === 'activate'
                                  ? 'Activated'
                                  : card?.workStatus
                                    ? card.workStatus.charAt(0).toUpperCase() +
                                      card.workStatus.slice(1)
                                    : 'Unknown'}
                          </button>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                          {card.startDate ? convertToIST(card.startDate) : '-'}
                          <button
                            onClick={() =>
                              navigate('/work-view-details', {
                                state: { data: card },
                              })
                            }
                            className="text-white-600 hover:underline font-medium"
                            style={{
                              backgroundColor: 'green',
                              borderRadius: '8px',
                              padding: '5px',
                              color: '#FFFFFF',
                            }}
                          >
                            More Details
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400 italic">
                        Empty
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {popupData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Work Details</h2>
            <p>
              <strong>ID:</strong> {popupData.id}
            </p>
            <p>
              <strong>Product Name:</strong> {popupData.productName}
            </p>
            <p>
              <strong>Service Name:</strong> {popupData.service}
            </p>
            <p>
              <strong>Staff Name:</strong> {popupData.staffName}
            </p>
            <p>
              <strong>Branch Name:</strong> {popupData.branchName}
            </p>
            <p>
              <strong>Client Name:</strong> {popupData.clientName}
            </p>
            <p>
              <strong>Phone Number:</strong> {popupData.phoneNumber}
            </p>
            <p>
              <strong>Sim Number:</strong> {popupData.simNumber}
            </p>
            <p>
              <strong>Vehicle Type:</strong> {popupData.vehicleType}
            </p>
            <p>
              <strong>Date:</strong> {popupData.date}
            </p>
            <p>
              <strong>Status:</strong> {popupData.status}
            </p>

            <button
              onClick={() => setPopupData(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="p-6">
  //     <div className="flex justify-between items-center mb-4">
  //       <h2 className="text-xl font-bold">Work Records</h2>
  //       <button
  //         onClick={onClickRefresh}
  //         className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
  //       >
  //         Refresh
  //       </button>
  //     </div>

  //     {['accept'].map((workStatus) => {
  //       const filteredRecords = workRecords.filter(
  //         (item) => item.workStatus === workStatus
  //       );

  //       return (
  //         <div key={workStatus} className="mb-6">
  //           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  //             <h3 className="text-lg font-bold mb-2">Accepted Works</h3>
  //             <button
  //               onClick={() => exportToExcel(filteredRecords, 'Accepted_Works')}
  //               className="bg-green-500 text-white px-4 py-2 mb-2 rounded-lg shadow-md hover:bg-green-600 transition"
  //             >
  //               Generate XL
  //             </button>
  //           </div>
  //           <div className="overflow-x-auto bg-white shadow-md rounded-lg">
  //             <table className="w-full border-collapse border border-gray-300">
  //               <thead>
  //                 <tr className="bg-gray-200 whitespace-nowrap">
  //                   <th className="px-4 py-2">ID</th>
  //                   <th className="px-4 py-2">Product Name</th>
  //                   <th className="px-4 py-2">Service Name</th>
  //                   <th className="px-4 py-2">Staff Name</th>
  //                   <th className="px-4 py-2">Branch Name</th>
  //                   <th className="px-4 py-2">Client Name</th>
  //                   <th className="px-4 py-2">Phone Number</th>
  //                   <th className="px-4 py-2">IMEI Number</th>
  //                   <th className="px-4 py-2">Sim Number</th>
  //                   <th className="px-4 py-2">Start Time</th>
  //                   <th className="px-4 py-2">End Time</th>
  //                   <th className="px-4 py-2">Duration</th>
  //                   <th className="px-4 py-2">Vehicle Type</th>
  //                   <th className="px-4 py-2">Date</th>
  //                   <th className="px-4 py-2">Status</th>
  //                   <th className="px-4 py-2">Action</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {filteredRecords.length > 0 ? (
  //                   filteredRecords.map((item) => (
  //                     <tr key={item.id} className="bg-white border-b">
  //                       <td className="px-4 py-2">{item.id}</td>
  //                       <td className="px-4 py-2">{item.productName}</td>
  //                       <td className="px-4 py-2">{item.service}</td>
  //                       <td className="px-4 py-2">{item.staffName}</td>
  //                       <td className="px-4 py-2">{item.branchName}</td>
  //                       <td className="px-4 py-2">{item.clientName}</td>
  //                       <td className="px-4 py-2">{item.phoneNumber}</td>
  //                       <td className="px-4 py-2">{item.imeiNumber}</td>
  //                       <td className="px-4 py-2">{item.simNumber}</td>
  //                       <td className="px-4 py-2">
  //                         {convertToIST(item.startDate)}
  //                       </td>
  //                       <td
  //                         className={`px-4 py-2 ${!item.endDate ? 'text-red-500' : ''}`}
  //                       >
  //                         {item.endDate ? convertToIST(item.endDate) : '-'}
  //                       </td>
  //                       <td
  //                         className={`px-4 py-2 ${!item.endDate ? 'text-red-500' : ''}`}
  //                       >
  //                         {item.startDate
  //                           ? `${calculateDuration(item.startDate, item.endDate)}`
  //                           : ''}
  //                       </td>

  //                       <td className="px-4 py-2">{item.vehicleType}</td>
  //                       <td className="px-4 py-2">{item.date}</td>
  //                       <td className="px-4 py-2">
  //                         <select
  //                           value={item.workStatus}
  //                           onChange={(e) =>
  //                             handleStatusChange(item, e.target.value)
  //                           }
  //                           className="border rounded p-1"
  //                         >
  //                           {/* <option value="install">Install</option> */}
  //                           <option value="accept">Accepted</option>
  //                           <option value="activate">Activated</option>
  //                         </select>
  //                       </td>
  //                       <td className="px-4 py-2 text-center">
  //                         <FaEye
  //                           className="cursor-pointer text-blue-500"
  //                           onClick={() =>
  //                             navigate('/work-view-details', {
  //                               state: { data: item },
  //                             })
  //                           }
  //                         />
  //                       </td>
  //                     </tr>
  //                   ))
  //                 ) : (
  //                   <tr>
  //                     <td
  //                       colSpan="13"
  //                       className="text-center py-4 text-gray-500"
  //                     >
  //                       No data found
  //                     </td>
  //                   </tr>
  //                 )}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       );
  //     })}

  //     <div className="flex justify-between gap-4 my-6">
  //       {cardData.map((item, index) => (
  //         <div
  //           key={index}
  //           className={`flex-1 ${item.color} shadow-md rounded-lg p-4 text-left border border-gray-300`}
  //           style={{ height: '150px' }}
  //         >
  //           <h4
  //             className="text-lg font-semibold text-gray-700"
  //             style={{ fontSize: '25px' }}
  //           >
  //             {item.title}
  //           </h4>
  //           <p
  //             className="text-xl font-bold text-blue-600"
  //             style={{ fontSize: '45px', marginTop: '25px' }}
  //           >
  //             {workRecordsCount?.[item.key] || 0}
  //           </p>
  //         </div>
  //       ))}
  //     </div>

  //     {['install'].map((workStatus) => {
  //       const filteredRecords = workRecords.filter(
  //         (item) => item.workStatus === workStatus
  //       );

  //       return (
  //         <div key={workStatus} className="mb-6 mt-6">
  //           <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  //             <h3 className="text-lg font-bold mb-2">Installed Works</h3>
  //             <button
  //               onClick={() =>
  //                 exportToExcel(filteredRecords, 'Installed_Works')
  //               }
  //               className="bg-green-500 text-white px-4 py-2 mb-2 rounded-lg shadow-md hover:bg-green-600 transition"
  //             >
  //               Generate XL
  //             </button>
  //           </div>
  //           <div className="overflow-x-auto bg-white shadow-md rounded-lg">
  //             <table className="w-full border-collapse border border-gray-300">
  //               <thead>
  //                 <tr className="bg-gray-200 whitespace-nowrap">
  //                   <th className="px-4 py-2">ID</th>
  //                   <th className="px-4 py-2">Product Name</th>
  //                   <th className="px-4 py-2">Service Name</th>
  //                   <th className="px-4 py-2">Staff Name</th>
  //                   <th className="px-4 py-2">Branch Name</th>
  //                   <th className="px-4 py-2">Client Name</th>
  //                   <th className="px-4 py-2">Phone Number</th>
  //                   <th className="px-4 py-2">IMEI Number</th>
  //                   <th className="px-4 py-2">Sim Number</th>
  //                   <th className="px-4 py-2">Start Time</th>
  //                   <th className="px-4 py-2">End Time</th>
  //                   <th className="px-4 py-2">Duration</th>
  //                   <th className="px-4 py-2">Vehicle Type</th>
  //                   <th className="px-4 py-2">Date</th>
  //                   <th className="px-4 py-2">Status</th>
  //                   <th className="px-4 py-2">Action</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {filteredRecords.length > 0 ? (
  //                   filteredRecords.map((item) => (
  //                     <tr key={item.id} className="bg-white border-b">
  //                       <td className="px-4 py-2">{item.id}</td>
  //                       <td className="px-4 py-2">{item.productName}</td>
  //                       <td className="px-4 py-2">{item.service}</td>
  //                       <td className="px-4 py-2">{item.staffName}</td>
  //                       <td className="px-4 py-2">{item.branchName}</td>
  //                       <td className="px-4 py-2">{item.clientName}</td>
  //                       <td className="px-4 py-2">{item.phoneNumber}</td>
  //                       <td className="px-4 py-2">{item.imeiNumber}</td>
  //                       <td className="px-4 py-2">{item.simNumber}</td>

  //                       <td className="px-4 py-2">
  //                         {convertToIST(item.startDate)}
  //                       </td>
  //                       <td
  //                         className={`px-4 py-2 ${!item.endDate ? 'text-red-500' : ''}`}
  //                       >
  //                         {item.endDate ? convertToIST(item.endDate) : '-'}
  //                       </td>
  //                       <td
  //                         className={`px-4 py-2 ${!item.endDate ? 'text-red-500' : ''}`}
  //                       >
  //                         {item.startDate
  //                           ? `${calculateDuration(item.startDate, item.endDate)}`
  //                           : ''}
  //                       </td>

  //                       <td className="px-4 py-2">{item.vehicleType}</td>
  //                       <td className="px-4 py-2">{item.date}</td>
  //                       <td className="px-4 py-2">
  //                         <select
  //                           value={item.workStatus}
  //                           onChange={(e) =>
  //                             handleStatusChange(item, e.target.value)
  //                           }
  //                           className="border rounded p-1"
  //                         >
  //                           <option value="install">Install</option>
  //                           <option value="accept">Accepted</option>
  //                           {/* <option value="activate">Activated</option> */}
  //                         </select>
  //                       </td>
  //                       <td className="px-4 py-2 text-center">
  //                         <FaEye
  //                           className="cursor-pointer text-blue-500"
  //                           onClick={() =>
  //                             navigate('/work-view-details', {
  //                               state: { data: item },
  //                             })
  //                           }
  //                         />
  //                       </td>
  //                     </tr>
  //                   ))
  //                 ) : (
  //                   <tr>
  //                     <td
  //                       colSpan="13"
  //                       className="text-center py-4 text-gray-500"
  //                     >
  //                       No data found
  //                     </td>
  //                   </tr>
  //                 )}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       );
  //     })}

  //     {popupData && (
  //       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
  //         <div className="bg-white p-6 rounded-lg shadow-lg w-96">
  //           <h2 className="text-xl font-bold mb-4">Work Details</h2>
  //           <p>
  //             <strong>ID:</strong> {popupData.id}
  //           </p>
  //           <p>
  //             <strong>Product Name:</strong> {popupData.productName}
  //           </p>
  //           <p>
  //             <strong>Service Name:</strong> {popupData.service}
  //           </p>
  //           <p>
  //             <strong>Staff Name:</strong> {popupData.staffName}
  //           </p>
  //           <p>
  //             <strong>Branch Name:</strong> {popupData.branchName}
  //           </p>
  //           <p>
  //             <strong>Client Name:</strong> {popupData.clientName}
  //           </p>
  //           <p>
  //             <strong>Phone Number:</strong> {popupData.phoneNumber}
  //           </p>
  //           <p>
  //             <strong>Sim Number:</strong> {popupData.simNumber}
  //           </p>
  //           <p>
  //             <strong>Vehicle Type:</strong> {popupData.vehicleType}
  //           </p>
  //           <p>
  //             <strong>Date:</strong> {popupData.date}
  //           </p>
  //           <p>
  //             <strong>Status:</strong> {popupData.status}
  //           </p>

  //           <button
  //             onClick={() => setPopupData(null)}
  //             className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
  //           >
  //             Close
  //           </button>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default BackendSupportHome;
