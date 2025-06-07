import React, { useState, useEffect } from 'react';
import TableWithSearchFilter from '../tablesSearchFilter';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';
import { FaSearch } from 'react-icons/fa';
import { FaEllipsisV } from 'react-icons/fa';
import * as XLSX from 'xlsx';

const data = [
  {
    id: '01',
    visitingNumber: '4376T4RT5TG',
    name: 'Way4track',
    phoneNumber: '9876543210',
    date: '09-12-2024',
    estimateDate: '09-12-2024',
  },
  {
    id: '02',
    visitingNumber: '4376T4RT5TG',
    name: 'Way4track',
    phoneNumber: '9876543210',
    date: '09-12-2024',
    estimateDate: '09-12-2024',
  },
  {
    id: '03',
    visitingNumber: '4376T4RT5TG',
    name: 'Way4track',
    phoneNumber: '9876543210',
    date: '09-12-2024',
    estimateDate: '09-12-2024',
  },
  {
    id: '04',
    visitingNumber: '4376T4RT5TG',
    name: 'Way4track',
    phoneNumber: '9876543210',
    date: '09-12-2024',
    estimateDate: '09-12-2024',
  },
];

const SalesVisit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Check if there's workAllocation data passed through location.state
  const [showModal, setShowModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [updatedLeadStatus, setUpdatedLeadStatus] = useState('');
  const [selectedStaffId, setSelectedStaffId] = useState('');
  const [staffList, setStaffList] = useState([]); // You can fetch this from API if needed
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
  const [client, setClient] = useState([]);
  const [voucher, setVoucher] = useState([]);
  const [staff, setStaff] = useState([]);
  const [permissions, setPermissions] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const [salesDetails, setSalesDetails] = useState([]);
  //Sales Data fetching

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await ApiService.post('/staff/getStaffNamesDropDown');
        setStaffList(res.data || []);
      } catch (err) {
        console.error('Failed to fetch staff:', err);
        setStaffList([]);
      }
    };
    fetchStaff();
  }, []);

  useEffect(() => {
    const fetchSalesDetails = async () => {
      try {
        const response = await ApiService.post(
          'sales-works/getSalesSearchDetails',
          {
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        setSalesDetails(prev => prev = response.data);
        console.log(salesDetails, 'sales details');
      } catch (error) {
        console.error('Failed to fetch Sales Details:', error);
        setSalesDetails([]);
      }
    };
    fetchSalesDetails();
  }, []);

  const leadStatusUpdate = (item) => {
    setSelectedLead(item);
    setUpdatedLeadStatus(item.leadStatus);
    setSelectedStaffId(item.staffId || '');
    setShowModal(true);
  };

  const handleSubmitLeadUpdate = async () => {
    const payload = {
      id: selectedLead.id,
      leadStatus: updatedLeadStatus,
      ...(updatedLeadStatus === 'allocated' && { allocateStaffId: selectedStaffId }),
    }
    try {
      // Attempt to fetch branches
      const { data } = await ApiService.post(`/sales-works/handleSales`, payload, {
        headers: { "Content-Type": "application/json" }
      });
      console.log("response data :", data)
    } catch (error) {
      console.log("error : ", error)
      // If the error status is 500, try refreshing the token
    }
    // Call your backend API here
    console.log("Updating Lead:", payload);

    // Close modal
    setShowModal(false);
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleActionClick = (event, item) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setPopupData((prev) =>
      prev && prev.item.id === item.id
        ? null
        : {
          item,
          position: {
            top: rect.top + window.scrollY + 30,
            left: rect.left + window.scrollX - 50,
          },
        }
    );
  };

  const handleEdit = (visit) => {
    navigate('/edit-salesVisit-details', { state: { visit } });
    setPopupData(null);
  };

  const handleMoreDetails = (visit) => {
    navigate('/sales-visit-details', { state: { visit } });
    setPopupData(null);
  };

  // const handleRowClick = (e, person) => {
  //   const rect = e.currentTarget.getBoundingClientRect();

  //   // Toggle the popup if the same row is clicked
  //   if (popupData && popupData.id === person.id) {
  //     setPopupData(null);
  //   } else {
  //     setPopupData(person);
  //     setPopupPosition({ top: rect.top + window.scrollY + 30, left: rect.left + window.scrollX + 100 });
  //   }
  // };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (popupData && !event.target.closest('.popup-box')) {
  //       setPopupData(null);
  //     }
  //   };

  //   document.addEventListener('click', handleClickOutside);
  //   return () => document.removeEventListener('click', handleClickOutside);
  // }, [popupData]);

  useEffect(() => {
    const perms = getPermissions('work-allocation');
    setPermissions(perms);
  }, []);

  const handleOpenModalForAdd = () => {
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleDropdownChange = (e) => {
    const selectedClientId = e.target.value;
    const selectedClient = client.find(
      (clientDetails) =>
        String(clientDetails.clientId) === String(selectedClientId)
    );

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await ApiService.post('/client/getClientNamesDropDown');
        setClient(res.data || []);
      } catch (err) {
        console.error('Failed to fetch client details:', err);
        setClient([]);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const getVoucherNamesDropDown = async () => {
      try {
        const res = await ApiService.post('/voucher/getVoucherNamesDropDown');
        setVoucher(res.data || []);
      } catch (err) {
        console.error('Failed to fetch voucher details:', err);
        setVoucher([]);
      }
    };
    getVoucherNamesDropDown();
  }, []);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await ApiService.post('/staff/getStaffNamesDropDown');
        setStaff(res.data || []);
      } catch (err) {
        console.error('Failed to fetch staff:', err);
        setStaff([]);
      }
    };
    fetchStaff();
  }, []);

  const generateExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(salesDetails);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Visits');
    XLSX.writeFile(workbook, 'Sales_Visits.xlsx');
  };

  return (
    <div className="p-10">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-bold">Sales Visits</p>
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Staff ID:"
          className="h-12 block w-1/2 border border-gray-500 px-2 rounded"
          style={{ height: '47px' }}
        />
        <input
          type="text"
          placeholder="Company Name:"
          className="h-12 block w-1/2 border border-gray-500 px-2 mx-2 rounded"
        />

        <button className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center ml-2">
          <FaSearch />
        </button>
        <button
          className="h-12 px-6 bg-green-600 text-white rounded-md flex items-center ml-2"
          onClick={generateExcel}
        >
          Generate XL
        </button>
      </div>

      <div className="overflow-x-auto" style={{ marginTop: '20px' }}>
        {salesDetails.length === 0 ? (
          <div className="text-center text-gray-500 text-lg p-5">
            No Data Found
          </div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr
                className="bg-gray-200 text-left"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <th className="p-3">No.</th>
                <th className="p-3">Visit ID</th>
                <th className="p-3">Client</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Date of Visit</th>
                <th className="p-3" >Estimate Date</th>
                <th className="p-3">Staff ID</th>
                <th className="p-3">Lead Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {salesDetails.map((item, index) => {
                const formatDate = (dateString) => {
                  const [year, month, day] = dateString.split("T")[0].split("-");
                  return `${day}-${month}-${year}`;
                };
                console.log("remaingDetails:" + JSON.stringify(item.requirementDetails))
                return (
                  <tr
                    key={item.id}
                    className={`border-b`}
                    style={{
                      backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#D0D0D0',
                    }}
                  >
                    <td className="p-3 font-semibold">{item.id}</td>
                    <td className="p-3">{item.visitingNumber}</td>
                    <td className="p-3 font-semibold">{item.name}</td>
                    <td className="p-3">{item.phoneNumber}</td>
                    <td className="p-3 font-semibold" width={200}>{formatDate(item.date)}</td>
                    <td className="p-3" width={100}>{formatDate(item.estimateDate)}</td>
                    <td className="p-3">{item.staffId ? item.staffId : "N/A"}</td>
                    <td className="p-3" onClick={() => leadStatusUpdate(item)}>{item.leadStatus}</td>
                    <td className=" p-2 relative">
                      <button
                        // onClick={(e) => handleOpenPopup(e, group.id)}
                        onClick={(e) => handleActionClick(e, item)}
                        className="p-2"
                      >
                        <FaEllipsisV />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {popupData && (
        <div
          className="popup-menu absolute bg-white border border-gray-300 shadow-md rounded-lg py-2 w-40"
          style={{
            top: `${popupData.position.top}px`,
            left: `${popupData.position.left}px`,
          }}
        >
          <button
            className="block px-4 py-2 text-left w-full hover:bg-gray-100"
            onClick={() => handleEdit(popupData.item)}
          >
            Edit
          </button>
          <button
            className="block px-4 py-2 text-left w-full hover:bg-gray-100"
            onClick={() => handleMoreDetails(popupData.item)}
          >
            More Details
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">Update Lead Status</h2>

            <label className="block mb-2">Lead Status</label>
            <select
              value={updatedLeadStatus}
              onChange={(e) => setUpdatedLeadStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="">Select Status</option>
              <option value="allocated">ALLOCATED</option>
              <option value="incomplete">INCOMPLETE</option>
              <option value="paymentPending">PAYMENT_PENDING</option>
              <option value="partiallyPaid">PARTIALLY_PAID</option>
              <option value="completed">COMPLETED</option>
            </select>

            {updatedLeadStatus === 'allocated' && (
              <>
                <label className="block mb-2">Allocate Staff</label>
                <select
                  value={selectedStaffId}
                  onChange={(e) => setSelectedStaffId(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                >
                  <option value="">Select Staff</option>
                  {staffList.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name} ({staff.staffId})
                    </option>
                  ))}
                </select>
              </>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitLeadUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SalesVisit;
