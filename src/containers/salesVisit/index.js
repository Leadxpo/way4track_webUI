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
    visitId: '4376T4RT5TG',
    company: 'Way4track',
    contact: '9876543210',
    visitDate: '09-12-2024',
    estimateDate: '09-12-2024',
  },
  {
    id: '02',
    visitId: '4376T4RT5TG',
    company: 'Way4track',
    contact: '9876543210',
    visitDate: '09-12-2024',
    estimateDate: '09-12-2024',
  },
  {
    id: '03',
    visitId: '4376T4RT5TG',
    company: 'Way4track',
    contact: '9876543210',
    visitDate: '09-12-2024',
    estimateDate: '09-12-2024',
  },
  {
    id: '04',
    visitId: '4376T4RT5TG',
    company: 'Way4track',
    contact: '9876543210',
    visitDate: '09-12-2024',
    estimateDate: '09-12-2024',
  },
];

const SalesVisit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Check if there's workAllocation data passed through location.state
  const workAllocationData = location.state?.workAllocationDetails || {};
  const initialFormData = {
    id: workAllocationData?.id || '',
    workAllocationId: workAllocationData?.workAllocationId || '',
    workAllocationNumber: workAllocationData?.workAllocationNumber || '',
    serviceOrProduct: workAllocationData?.serviceOrProduct || '',
    otherInformation: workAllocationData?.otherInformation || '',
    date: workAllocationData?.date || '',
    staffId: workAllocationData?.assignedTo || '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    voucherId: workAllocationData?.voucherId || null,
    install: workAllocationData?.install || false,
    clientId: workAllocationData?.clientId || null,
    productName: workAllocationData?.productName,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWorkAllocation, setSelectedWorkAllocation] =
    useState(initialFormData);
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
    const fetchSalesDetails = async () => {
      try {
        const response = await ApiService.post(
          'sales-works/getSalesSearchDetails',
          {
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );
        setSalesDetails(response.data);
        console.log(response.data, 'sales details');
      } catch (error) {
        console.error('Failed to fetch Sales Details:', error);
        setSalesDetails([]);
      }
    };
    fetchSalesDetails();
  }, []);

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

  const handleEdit = () => {
    alert('Edit action clicked');
  };

  const handleMoreDetails = () => {
    navigate('/sales-visit-details');
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
    setSelectedWorkAllocation(initialFormData);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleDropdownChange = (e) => {
    const selectedClientId = e.target.value;
    const selectedClient = client.find(
      (clientDetails) =>
        String(clientDetails.clientId) === String(selectedClientId)
    );

    setSelectedWorkAllocation((prev) => ({
      ...prev,
      clientId: selectedClientId,
      clientName: selectedClient?.name || '',
      phoneNumber: selectedClient?.phoneNumber || '',
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedWorkAllocation({ ...selectedWorkAllocation, [name]: value });
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
                <th className="p-3">Company</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Date of Visit</th>
                <th className="p-3">Estimate Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {salesDetails.map((item, index) => (
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
                  <td className="p-3 font-semibold">{item.date}</td>
                  <td className="p-3">{item.estimateDate}</td>
                  <td className="border p-2 relative">
                    <button
                      // onClick={(e) => handleOpenPopup(e, group.id)}
                      onClick={(e) => handleActionClick(e, item)}
                      className="p-2"
                    >
                      <FaEllipsisV />
                    </button>
                  </td>
                </tr>
              ))}
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
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="block px-4 py-2 text-left w-full hover:bg-gray-100"
            onClick={handleMoreDetails}
          >
            More Details
          </button>
        </div>
      )}
      {/* </div> */}

      {/* <TableWithSearchFilter
        type="work-allocations"
        onEdit={handleEdit}
        onDetails={handleOpenMoreDetailsModal}
        showCreateBtn={false}
        showDelete={false}
        showEdit={permissions.edit}
        showDetails={permissions.view}
      /> */}
    </div>
  );
};

export default SalesVisit;
