import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { TfiTimer } from 'react-icons/tfi';

const CeoBackendSupportPayments = () => {
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
      title: 'Pending Payments',
      key: 'totalPendingPayments',
      color: 'bg-yellow-10',
      id: 'PENDING',
    },
    {
      title: 'Partial Payments',
      key: 'totalPartialPayments',
      color: 'bg-blue-100',
      id: 'PARTIALLY_PAID',
    },
    {
      title: 'Unpaid Payments',
      key: 'totalUnpaidPayments',
      color: 'bg-yellow-100',
      id: 'UNPAID',
    },
    {
      title: 'Payments Done',
      key: 'totalPaymentsDone',
      color: 'bg-green-100',
      id: 'COMPLETED',
    },
  ];

  const userId = localStorage.getItem('id');
  const userStaffId = localStorage.getItem('userId');

  const [workRecords, setWorkRecords] = useState([]);
  const [workRecordsCount, setWorkRecordsCount] = useState([]);
  const [paymentRecordsCount, setPaymentRecordsCount] = useState([]);

  const [branchesWorkRecordsCount, setBranchesWorkRecordsCount] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCardKey, setSelectedCardKey] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [memberPaymentRecords, setMemberPaymentRecords] = useState(null);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [searchPhone, setSearchPhone] = useState('');

  console.log(selectedLocation, 'selectedLocation');
  console.log(memberPaymentRecords, 'Member payments');
  const [branchWisePaymentRecords, setBranchWisePaymentRecords] = useState([]);

  const fetchMemberRecords = async () => {
    try {
      const response = await ApiService.post(
        '/technician/getBackendSupportWorkAllocation',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      const records = response?.data || [];

      console.log(records, 'records');

      // Filter the records with workStatus === 'activate'
      const activePendingRecords = records?.filter(
        (record) => record.workStatus === 'activate'
      );

      // Calculate overall payment counts
      const overallPaymentsCount = {
        totalPendingPayments: activePendingRecords.filter(
          (record) => record.paymentStatus === 'PENDING'
        ).length,
        totalPartialPayments: activePendingRecords.filter(
          (record) => record.paymentStatus === 'PARTIALLY_PAID'
        ).length,
        totalUnpaidPayments: activePendingRecords.filter(
          (record) => record.paymentStatus === 'UNPAID'
        ).length,
        totalPaymentsDone: activePendingRecords.filter(
          (record) => record.paymentStatus === 'COMPLETED'
        ).length,
      };

      // Group by branch and calculate payment counts
      const branchMap = {};

      activePendingRecords.forEach((record) => {
        const branch = record.branchName || null;

        if (!branchMap[branch]) {
          branchMap[branch] = {
            branchName: branch,
            totalPendingPayments: 0,
            totalPartialPayments: 0,
            totalUnpaidPayments: 0,
            totalPaymentsDone: 0,
          };
        }

        if (record.paymentStatus === 'PENDING') {
          branchMap[branch].totalPendingPayments += 1;
        } else if (record.paymentStatus === 'PARTIALLY_PAID') {
          branchMap[branch].totalPartialPayments += 1;
        } else if (record.paymentStatus === 'UNPAID') {
          branchMap[branch].totalUnpaidPayments += 1;
        } else if (record.paymentStatus === 'COMPLETED') {
          branchMap[branch].totalPaymentsDone += 1;
        }
      });

      const branchWise = Object.values(branchMap); // convert to array

      // Set states
      setMemberPaymentRecords(activePendingRecords);
      setPaymentRecordsCount(overallPaymentsCount);
      setBranchWisePaymentRecords(branchWise);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setMemberPaymentRecords([]);
      setPaymentRecordsCount([]);
      setBranchWisePaymentRecords([]);
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
    // fetchRecords();
    fetchCardRecords();
    fetchMemberRecords();

    const interval = setInterval(() => {
      //   fetchRecords();
      fetchCardRecords();
    }, 180000);

    return () => clearInterval(interval);
  }, []);

  const onClickRefresh = () => {
    // fetchRecords();
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
      // Update local state for UI feedback
      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === item.id ? { ...record, workStatus: newStatus } : record
        )
      );

      // Build payload dynamically
      const payload = {
        id: item.id,
        workStatus: newStatus,
        staffId: item.staffId,
        branchId: item.branchId,
        backEndStaffRelation: Number(userId),
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      if (newStatus === 'accept') {
        payload.acceptStartDate = new Date().toISOString();
      } else if (newStatus === 'active') {
        payload.activeStartDate = new Date().toISOString();
      }

      const response = await ApiService.post(
        '/technician/handleTechnicianDetails',
        payload
      );

      console.log('Status updated successfully:', response.data);
      //   await fetchRecords();
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
            card.workStatus === selectedCardId &&
            card.phoneNumber?.toLowerCase().includes(searchPhone.toLowerCase())
        )
      : ['PENDING', 'PARTIALLY_PAID', 'UNPAID', 'COMPLETED'].includes(
            selectedCardId
          )
        ? memberPaymentRecords.filter(
            (card) =>
              card.branchName === selectedLocation &&
              card.paymentStatus === selectedCardId &&
              card.phoneNumber
                ?.toLowerCase()
                .includes(searchPhone.toLowerCase())
          )
        : [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Work Records</h2>
        <input
          type="text"
          placeholder="Search by Phone Number"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          className="border px-4 py-2 rounded-md mb-4 w-full max-w-xs"
        />
        <button
          onClick={onClickRefresh}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6">
        {cardData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`cursor-pointer shadow-md rounded-lg p-4 w-full border transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg
          ${item.color}
          ${selectedCardId === item.id ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}
        `}
              style={{
                height: '150px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
              onClick={() => {
                const isExpanded = expandedCardId === item.id;
                setExpandedCardId(isExpanded ? null : item.id);
                setSelectedCardId(item.id);
                setSelectedCardKey(isExpanded ? null : item.key);
                setSelectedLocation(null);
              }}
            >
              <h4
                className="text-lg font-semibold text-gray-700 text-center"
                style={{ fontSize: '25px' }}
              >
                {item.title}
              </h4>
              <p className="text-4xl font-bold text-blue-600 mt-6 text-center">
                {paymentRecordsCount?.[item.key] || 0}
              </p>
            </div>

            {/* BRANCH LIST JUST BELOW SELECTED CARD */}
            {expandedCardId === item.id && (
              <div className="mt-4 w-full animate-fade-in">
                <h3 className="text-md font-semibold mb-2 text-center">
                  Branches
                </h3>
                <div className="flex flex-col gap-2">
                  {branchWisePaymentRecords
                    .filter((loc) => loc.branchName)
                    .map((loc, i) => (
                      <div
                        key={i}
                        className={`cursor-pointer border px-3 py-2 rounded-md font-medium text-sm flex justify-between items-center transition-all duration-200 hover:scale-[1.01]
                    ${
                      selectedLocation === loc.branchName
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-blue-50'
                    }
                  `}
                        onClick={() => setSelectedLocation(loc.branchName)}
                      >
                        <span>{loc.branchName}</span>
                        <span>{loc?.[item.key] || 0}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedCardKey && selectedLocation && (
        <div className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
                  className={`border rounded-md p-2 shadow min-h-[120px] ${cardBgColor}`}
                >
                  {card.staffName ? (
                    <div className="flex flex-col h-full justify-between">
                      <div className="flex justify-between items-center mb-2">
                        <span
                          className="text-lg font-semibold text-gray-700"
                          style={{ fontSize: '18px', fontWeight: 'bold' }}
                        >
                          ID: {card.technicianNumber}
                        </span>
                        {/* <span
                          className="text-sm text-gray-500 flex items-center"
                          style={{ fontSize: '12px' }}
                        >
                          <TfiTimer className="mr-1 text-black" />
                          {card.startDate
                            ? calculateDuration(card.startDate, card.endDate)
                            : ''}
                        </span> */}
                      </div>
                      <hr className="mb-2" />
                      <div className="mb-2 flex space-x-4">
                        <div className="text-left">
                          <p
                            className="text-lg font-semibold text-gray-500"
                            style={{ fontSize: '15px' }}
                          >
                            Client Name:
                          </p>
                          <p
                            className="text-lg font-semibold text-gray-500"
                            style={{ fontSize: '15px' }}
                          >
                            Tech Name:
                          </p>
                          <p
                            className="text-lg font-semibold text-gray-500"
                            style={{ fontSize: '15px' }}
                          >
                            Backend Support:
                          </p>
                        </div>
                        <div>
                          <p
                            className="text-lg font-bold text-gray-800"
                            style={{ fontSize: '16px' }}
                          >
                            {card.clientName}
                          </p>
                          <p
                            className="text-lg font-bold text-gray-800"
                            style={{ fontSize: '16px' }}
                          >
                            {card.staffName}
                          </p>
                          <p
                            className="text-lg font-bold text-gray-800"
                            style={{ fontSize: '16px' }}
                          >
                            {card.backSupportterName}
                          </p>
                        </div>
                      </div>
                      {card.paymentStatus === 'PENDING' && (
                        <div
                          className="mb-2 flex space-x-8"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          {/* Start Date */}
                          <div className="flex flex-row items-center space-x-1">
                            <p
                              className="text-sm text-gray-600"
                              style={{ fontSize: '14px' }}
                            >
                              Amount:
                            </p>
                            <p
                              className="text-sm font-semibold text-gray-700"
                              style={{ fontSize: '13px' }}
                            >
                              {card.amount ?? 'Nill'}
                            </p>
                          </div>
                        </div>
                      )}

                      {card.paymentStatus !== 'PENDING' && (
                        <div
                          className="mb-2 flex space-x-8"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          {/* Start Date */}
                          <div className="flex flex-row items-center space-x-1">
                            <p
                              className="text-sm text-gray-600"
                              style={{ fontSize: '14px' }}
                            >
                              Amount:
                            </p>
                            <p
                              className="text-sm font-semibold text-gray-700"
                              style={{ fontSize: '13px' }}
                            >
                              {card.amount ?? '00'}
                            </p>
                          </div>

                          {/* End Date */}
                          <div className="flex flex-row items-center space-x-1">
                            <p
                              className="text-sm text-gray-600"
                              style={{ fontSize: '14px' }}
                            >
                              Paid Amount:
                            </p>
                            <p
                              className="text-sm font-semibold text-gray-700"
                              style={{ fontSize: '13px' }}
                            >
                              {card.paidAmount ?? '00'}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        {/* Conditional Status Control */}
                        <div className="mb-1">
                          <p
                            className="text-sm font-semibold text-gray-700"
                            style={{ fontSize: '13px' }}
                          >
                            {convertToIST(card.startDate)}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            navigate('/work-view-details', {
                              state: { data: card },
                            })
                          }
                          className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700"
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
        </div>
      )}

      {popupData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 border border-gray-300 rounded-lg p-4 shadow-sm">
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
};

export default CeoBackendSupportPayments;
