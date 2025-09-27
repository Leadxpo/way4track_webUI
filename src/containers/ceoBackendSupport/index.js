import React, { useState, useEffect } from 'react';
import { FaEye, FaDownload } from 'react-icons/fa';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { TfiTimer } from 'react-icons/tfi';
import hasPermission from '../../common/permission'

const CeoBackendSupportHome = () => {
  const navigate = useNavigate();
  const [popupData, setPopupData] = useState(null);
  var permission = localStorage.getItem("userPermissions");
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

  const branchesWorkRecordsCounts = [
    {
      data: {
        overall: {
          totalInstallWork: '1',
          totalAcceptWork: '0',
          totalActivateWork: '24',
          totalPendingWork: '0',
          totalCompletedWork: '0',
        },
        branchWise: [
          {
            branchName: 'Ongole',
            totalInstallWork: '1',
            totalAcceptWork: '0',
            totalActivateWork: '24',
            totalPendingWork: '0',
            totalCompletedWork: '0',
          },
          {
            branchName: 'Hyderabad',
            totalInstallWork: '3',
            totalAcceptWork: '2',
            totalActivateWork: '10',
            totalPendingWork: '1',
            totalCompletedWork: '5',
          },
          {
            branchName: 'Chennai',
            totalInstallWork: '5',
            totalAcceptWork: '1',
            totalActivateWork: '15',
            totalPendingWork: '2',
            totalCompletedWork: '3',
          },
          {
            branchName: 'Bangalore',
            totalInstallWork: '2',
            totalAcceptWork: '0',
            totalActivateWork: '8',
            totalPendingWork: '1',
            totalCompletedWork: '2',
          },
          {
            branchName: 'Pune',
            totalInstallWork: '4',
            totalAcceptWork: '1',
            totalActivateWork: '12',
            totalPendingWork: '3',
            totalCompletedWork: '4',
          },
        ],
      },
    },
  ];

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

  const workDetails = [
    {
      id: 23,
      name: 'Mahesh',
      phone: '993357114',
      status: 'install',
      date: '23-04-2025',
      location: 'Ongole',
    },
    {
      id: 24,
      name: 'Naresh',
      phone: '993357114',
      status: 'accept',
      date: '23-04-2025',
      location: 'Ongole',
    },
    {
      id: 25,
      name: 'Suresh',
      phone: '993357114',
      status: 'activate',
      date: '23-04-2025',
      location: 'Ongole',
    },
    {
      id: 26,
      name: 'Veru',
      phone: '993357114',
      status: 'pending',
      date: '23-04-2025',
      location: 'Ongole',
    },
  ];

  const userId = localStorage.getItem('id');

  const [workRecords, setWorkRecords] = useState([]);
  const [workRecordsCount, setWorkRecordsCount] = useState([]);
  const [branchesWorkRecordsCount, setBranchesWorkRecordsCount] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCardKey, setSelectedCardKey] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [searchPhone, setSearchPhone] = useState('');

  console.log(branchesWorkRecordsCounts[0], 'useState');

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

      const records = response.data || [];

      const filteredRecords = records.filter(
        (item) => (item.vehicleNumber !== null)
      );

      const removedItems = records.filter(
        (item) => item.vehicleNumber === null
      );

      setWorkRecords(filteredRecords);

    } catch (err) {
      console.error('Failed to fetch data:', err);
      setWorkRecords([]);
    }
  };

  const fetchCardRecords = async () => {
    try {
      const response = await ApiService.post('/technician/getWorkStatusCards', {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      const records = response.data || [];

      setWorkRecordsCount(records.overall || []);
      setBranchesWorkRecordsCount(records.branchWise || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setWorkRecordsCount([]);
    }
  };

  const handleDownload = (type) => {
    let filename = type + "output.xlsx";

    if (!filteredCards || filteredCards.length === 0) {
      alert('No data available to download.');
      return;
    }

    try {
      const worksheet = XLSX.utils.json_to_sheet(filteredCards);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, type);
      XLSX.writeFile(workbook, filename);
    } catch (error) {
      console.error('Error generating Excel file:', error);
      alert('Failed to generate the Excel file. Please try again.');
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchCardRecords();

    const interval = setInterval(() => {
      fetchRecords();
      fetchCardRecords();
    }, 180000);

    return () => clearInterval(interval);
  }, []);

  const onClickRefresh = () => {
    fetchRecords();
    fetchCardRecords();
  };


  const handleStatusChange = async (item, newStatus) => {

    try {
      setRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === item.id ? { ...record, workStatus: newStatus } : record
        )
      );

      // Prepare the base payload
      const payload = {
        id: item.id,
        workStatus: newStatus,
        staffId: item.staffId,
        branchId: item.branchId,
        backEndStaffRelation: Number(userId),
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      // Add acceptStartDate if newStatus is "accept"
      if (newStatus === 'accept') {
        payload.acceptStartDate = new Date().toISOString(); // or new Date() if backend handles parsing
      }

      if (newStatus === 'activate') {
        payload.activateDate = new Date().toISOString(); // or new Date() if backend handles parsing
      }

      const response = await ApiService.post(
        '/technician/handleTechnicianDetails',
        payload
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

  const filterlist = () => {
    return workRecords.filter((card) => {
      const statusOk = !selectedCardId || card.workStatus === selectedCardId;

      const selectedBranch = selectedLocation;
      const branchOk =
        !selectedBranch ||
        (card.branchName ?? "").toLowerCase().trim() ===
        selectedBranch.toLowerCase().trim();

      const q = (searchPhone ?? "").toLowerCase().trim();
      const searchOk =
        !q ||
        (String(card.phoneNumber ?? "").toLowerCase().includes(q) ||
          String(card.vehicleNumber ?? "").toLowerCase().includes(q));

      return statusOk && branchOk && searchOk;
    });
  };

  const filteredCards = filterlist() || []

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Work Records</h2>

        <input
          type="text"
          placeholder="vehicle No"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          className="border px-4 py-2 rounded-md mb-4 w-full max-w-xs"
        />
        <button
          onClick={() => handleDownload('backendSupport')}
          className="bg-green-700 text-white px-4 py-2 mx-5 rounded-md flex items-center gap-2 hover:bg-green-800 transition duration-200"
        >
          <FaDownload className="text-white" />
          Download works Excel Sheet
        </button>
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
                {workRecordsCount?.[item.key] || 0}
              </p>
            </div>

            {/* BRANCH LIST JUST BELOW SELECTED CARD */}
            {expandedCardId === item.id && (
              <div className="mt-4 w-full animate-fade-in">
                <h3 className="text-md font-semibold mb-2 text-center">
                  Branches
                </h3>
                <div className="flex flex-col gap-2">
                  {branchesWorkRecordsCount
                    .filter((loc) => loc.branchName)
                    .map((loc, i) => (
                      <div
                        key={i}
                        className={`cursor-pointer border px-3 py-2 rounded-md font-medium text-sm flex justify-between items-center transition-all duration-200 hover:scale-[1.01]
                    ${selectedLocation === loc.branchName
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-blue-50'
                          }
                  `}
                        onClick={() => {
                          setSelectedLocation(loc.branchName)
                        }
                        }
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
            {workRecords
              .filter(
                (card) => {

                  const statusOk = card.workStatus === selectedCardId;

                  const selectedBranch = selectedLocation

                  const branchOk = (card.branchName ?? '').toLowerCase().trim() === selectedBranch.toLowerCase().trim();

                  const q = (searchPhone ?? '').toLowerCase().trim();

                  const searchOk =
                    !q ||
                    (String(card.phoneNumber ?? '').toLowerCase().includes(q) ||
                      String(card.vehicleNumber ?? '').toLowerCase().includes(q));

                  return statusOk && branchOk && searchOk;
                  // console.log("cardLocation:", typeof (card.branchName) + "===" + typeof (selectedLocation))
                  // return (
                  //   card.workStatus === selectedCardId &&
                  //   card.branchName === selectedLocation &&
                  //   // card.vehicleNumber
                  //   //   ?.toLowerCase()
                  //   //   .includes(searchPhone.toLowerCase())||
                  //   card.phoneNumber
                  //     ?.toLowerCase()
                  //     .includes(searchPhone.toLowerCase())
                  // )
                }
              )
              .map((card, i) => {
                const lastRemark = card?.remark?.[card.remark.length - 1]?.desc;
                const lastRemarkName = card?.remark?.[card.remark.length - 1]?.name;
                console.log("id ::",card.id )
                console.log("id ::",card )

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
                    {card.staffName || card.subDealerName ? (
                      <div className="flex flex-col h-full justify-between" onClick={()=>{
                      }}>
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className="text-lg font-semibold text-gray-700"
                            style={{ fontSize: '18px', fontWeight: 'bold' }}
                          >
                            ID: {card.technicianNumber}
                          </span>

                        </div>
                        <hr className="mb-2" />
                        <div className="mb-2 flex space-x-4">
                          <div className="text-left">
                            <p
                              className="text-lg font-semibold text-gray-500"
                              style={{ fontSize: '15px' }}
                            >
                              Client:
                            </p>
                            <p
                              className="text-lg font-semibold text-gray-500"
                              style={{ fontSize: '15px' }}
                            >
                              Support:
                            </p>
                            <p
                              className="text-lg font-semibold text-gray-500"
                              style={{ fontSize: '15px' }}
                            >
                              Vehicle:
                            </p>
                            {card.workStatus !== 'install' && (
                              <p
                                className="text-lg font-semibold text-gray-500"
                                style={{ fontSize: '15px' }}
                              >
                                Backend Support:
                              </p>
                            )}
                          </div>
                          <div>
                            <p
                              className="text-lg font-bold text-gray-800"
                              style={{ fontSize: '16px', maxWidth: '100%' }}
                            >
                              {card.clientName}
                            </p>
                            <p
                              className="text-lg font-bold text-gray-800"
                              style={{
                                fontSize: '16px',
                                maxWidth: '100%',
                                maxLines: 1,
                              }}
                            >
                              {card.staffName}
                            </p>
                            <p
                              className="text-lg font-bold text-gray-800"
                              style={{
                                fontSize: '16px',
                                textTransform: 'capitalize',
                              }}
                            >
                              {card.vehicleNumber}
                            </p>
                            {card.workStatus !== 'install' && (
                              <p
                                className="text-lg font-bold text-gray-800"
                                style={{ fontSize: '16px' }}
                              >
                                {card.backSupportterName}
                              </p>
                            )}
                          </div>
                        </div>

                        <div
                          className="mb-2 flex space-x-8"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          {/* Start Date */}
                          <div className="flex flex-col">
                            <p
                              className="text-sm text-gray-600"
                              style={{ fontSize: '14px' }}
                            >
                              Start Date:
                            </p>
                            <p
                              className="text-sm font-semibold text-gray-700"
                              style={{ fontSize: '13px' }}
                            >
                              {convertToIST(card.startDate)}
                            </p>
                          </div>

                          {/* End Date */}
                          <div className="flex flex-col">
                            <p
                              className="text-sm text-gray-600"
                              style={{ fontSize: '14px' }}
                            >
                              End Date:
                            </p>
                            <p
                              className="text-sm font-semibold text-gray-700"
                              style={{ fontSize: '13px' }}
                            >
                              {convertToIST(card.endDate)}
                            </p>
                          </div>

                          {/* Duration */}
                          <div className="flex flex-col">
                            <p
                              className="text-sm text-gray-600"
                              style={{ fontSize: '14px' }}
                            >
                              Duration:
                            </p>
                            <p
                              className="text-sm font-semibold text-gray-700"
                              style={{ fontSize: '13px' }}
                            >
                              {card.startDate
                                ? calculateDuration(
                                  card.startDate,
                                  card.endDate
                                )
                                : ''}
                            </p>
                          </div>
                        </div>

                        {card.workStatus !== 'install' && (
                          <div
                            className="mb-2 flex space-x-8"
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            {/* Start Date */}
                            <div className="flex flex-col">
                              <p
                                className="text-sm text-gray-600"
                                style={{ fontSize: '14px' }}
                              >
                                Accepted Date:
                              </p>
                              <p
                                className="text-sm font-semibold text-gray-700"
                                style={{ fontSize: '13px' }}
                              >
                                {convertToIST(card.acceptStartDate)}{' '}
                              </p>
                            </div>

                            {/* End Date */}
                            <div className="flex flex-col">
                              <p
                                className="text-sm text-gray-600"
                                style={{ fontSize: '14px' }}
                              >
                                Activated Date:
                              </p>
                              <p
                                className="text-sm font-semibold text-gray-700"
                                style={{ fontSize: '13px' }}
                              >
                                {/* {card.activateDate?.slice(0, 10)} */}
                                {convertToIST(card.activeDate)}
                              </p>
                            </div>

                            {/* Duration */}
                            <div className="flex flex-col">
                              <p
                                className="text-sm text-gray-600"
                                style={{ fontSize: '14px' }}
                              >
                                Duration:
                              </p>
                              <p
                                className="text-sm font-semibold text-gray-700"
                                style={{ fontSize: '13px' }}
                              >
                                {card.startDate
                                  ? calculateDuration(
                                    card.startDate,
                                    card.endDate
                                  )
                                  : ''}
                              </p>
                            </div>
                          </div>
                        )}
                        {lastRemarkName && <div style={{ backgroundColor: '#f3f3f3', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px', padding: 8 }}>


                          <strong style={{
                            fontSize: 10, whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: 100, // you can adjust this width
                            display: 'inline-block'
                          }}>{lastRemarkName}</strong>
                          <p style={{ fontSize: 8 }}>{lastRemark}</p>

                        </div>}

                        {hasPermission(permission, "backend", "edit") &&
                          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                            {/* Conditional Status Control */}
                            <div className="mb-1">
                              {card.workStatus === 'accept' ||
                                card.workStatus === 'pending' ? (
                                <div className="relative">
                                  <select
                                    onChange={(e) =>
                                      handleStatusChange(card, e.target.value)
                                    }
                                    defaultValue=""
                                    className="text-sm font-semibold pr-8 pl-3 py-1 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                                  >
                                    <option value="" disabled>
                                      Change Status
                                    </option>
                                    {card.workStatus === 'accept' && (
                                      <>
                                        <option value="activate">Activate</option>
                                        <option value="pending">Pending</option>
                                      </>
                                    )}
                                    {card.workStatus === 'pending' && (
                                      <>
                                        <option value="activate">Activate</option>
                                        <option value="cancel">Cancel</option>
                                      </>
                                    )}
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                                    <svg
                                      className="w-4 h-4 text-gray-500"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 011.08 1.04l-4.25 4.66a.75.75 0 01-1.08 0l-4.25-4.66a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    let nextStatus;
                                    if (card.workStatus === 'install')
                                      nextStatus = 'accept';
                                    else nextStatus = card.workStatus;
                                    handleStatusChange(card, nextStatus);
                                  }}
                                  className={`text-sm font-semibold px-3 py-1 rounded-md ${statusButtonColor}`}
                                >
                                  {card?.workStatus === 'install'
                                    ? 'In Progress'
                                    : card?.workStatus === 'activate'
                                      ? 'Activated'
                                      : card?.workStatus
                                        ?.charAt(0)
                                        .toUpperCase() +
                                      card?.workStatus?.slice(1)}
                                </button>
                              )}
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

                        }
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
};

export default CeoBackendSupportHome;
