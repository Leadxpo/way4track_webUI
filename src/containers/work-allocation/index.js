import React, { useState, useEffect } from 'react';
import TableWithSearchFilter from '../tablesSearchFilter';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';
import { FaSearch } from 'react-icons/fa';
import { FaEllipsisV } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { FaPencil } from 'react-icons/fa6';

const WorkAllocation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Check if there's workAllocation data passed through location.state
  const workAllocationData = location.state?.workAllocationDetails || {};
  const initialFormData = {
    id: workAllocationData.id,
    fromStaffId: workAllocationData.fromStaffId || '',
    staffId: workAllocationData?.staffId || '',
    phoneNumber: workAllocationData?.phoneNumber || '',
    userName: workAllocationData?.userID || '',
    name: workAllocationData?.name || '',
    email: workAllocationData?.email || '',
    address: workAllocationData?.address || '',
    branchId: workAllocationData?.branchId || '',
    productName: workAllocationData?.productName || '',
    serviceId: workAllocationData?.serviceId || '',
    startDate: workAllocationData?.currentDateTime || '',
    description: workAllocationData?.description || '',
    installationAddress: workAllocationData?.installationAddress || '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWorkAllocation, setSelectedWorkAllocation] =
    useState(initialFormData);
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
  const [client, setClient] = useState({});
  const [staff, setStaff] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [productLists, setProductList] = useState([]);
  const [workAllocationDetails, setWorkAllocationDetails] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [detailedWorkAllocation, setDetailedWorkAllocation] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [branches, setBranches] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  const [clientName, setClientName] = useState('');
  const [productName, setProductName] = useState('');

  useEffect(() => {
    const perms = getPermissions('work-allocation');
    setPermissions(perms);
  }, []);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const res = await ApiService.post('/products/getAllproductDetails', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });

        setProductList(res.data || []);
      } catch (err) {
        console.error('Failed to fetch client details:', err);
        setProductList([]);
      }
    };
    fetchProductList();
  }, []);

  const fetchClientDetails = async () => {
    try {
      const response = await ApiService.post(
        '/technician/getBackendSupportWorkAllocation',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      if (response.data?.length > 0) {
        setWorkAllocationDetails(response.data);
      }
    } catch (error) {
      console.error('Error fetching work allocation details:', error);
      alert('Failed to fetch work allocation details.');
    }
  };

  useEffect(() => {
    fetchClientDetails();
  }, []);

  const handleOpenModalForAdd = () => {
    setSelectedWorkAllocation(initialFormData);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    const numericValue = Number(value); // Ensure value is a number

    setSelectedWorkAllocation((prev) => ({
      ...prev,
      [name]: numericValue, // Dynamically update either clientId or branchId
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setSelectedWorkAllocation((prev) => ({
      ...prev,
      [name]: isNaN(value) || value === '' ? value : Number(value), // Convert to number if applicable
    }));
  };

  const fetchClients = async () => {
    const clientData = {
      phoneNumber: selectedWorkAllocation.phoneNumber,
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
    };
    try {
      const res = await ApiService.post(
        '/client/getClientByPhoneNumber',
        clientData
      );
      console.log('clientdata :', res.data);
      setClient(res.data || []);
      if (res.data) {
        setSelectedWorkAllocation((prev) => ({
          ...prev,
          address: res.data?.address,
          email: res.data?.email,
          name: res.data?.name, // Convert to number if applicable
        }));
      } else {
        alert('no client found with this number so please fill required data');
      }
    } catch (err) {
      console.error('Failed to fetch client details:', err);
      setClient([]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorkAllocation(null);
  };

  useEffect(() => {
    const fetchDropdownData = async () => {
      const payload = { companycode: 'WAY4TRACK', unitCode: 'WAY4' };

      try {
        const [productRes, serviceRes] = await Promise.all([
          ApiService.post('/productType/getProductTypeNamesDropDown', payload),
          ApiService.post('/ServiceType/getServiceTypeNamesDropDown', payload),
        ]);

        setProductTypes(productRes?.data || []);
        setServiceTypes(serviceRes?.data || []);
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleOpenMoreDetailsModal = (workId) => {
    setSelectedWorkAllocation(workId);
    setIsMoreDetailsModalOpen(true);
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await ApiService.post('/staff/getStaffDetails', {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        });
        setStaff(response.data || []);
      } catch (err) {
        console.error('Failed to fetch staff:', err);
        setStaff([]);
      }
    };
    fetchStaff();
  }, []);

  const handleCloseMoreDetailsModal = () => {
    setIsMoreDetailsModalOpen(false);
    setSelectedWorkAllocation(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = selectedWorkAllocation.id
      ? { ...selectedWorkAllocation }
      : { ...selectedWorkAllocation, fromStaffId: localStorage.getItem('id') };

    try {
      const endpoint = selectedWorkAllocation.id
        ? '/technician/handleTechnicianDetails'
        : '/technician/handleTechnicianDetails';

      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status) {
        alert(
          selectedWorkAllocation.id
            ? 'Work Allocation updated successfully!'
            : 'Work Allocation added successfully!'
        );
        setIsModalOpen(false);
        navigate('/work_allocation');
        fetchClientDetails();
      } else {
        alert('Failed to save work allocation. Please try again.');
      }
    } catch (error) {
      console.error('Error saving work allocation:', error);
      alert('Failed to save work allocation. Please try again.');
    }
  };

  const handleMoreDetails = async (e,data) => {
    const id = data.id;
    if (!id) {
      console.error('Invalid ID passed:', id);
      alert('Invalid Work Allocation ID!');
      return;
    }

    setIsMoreDetailsModalOpen(true);
    setPopupData(null);

    // try {

    //   const response = await ApiService.post(
    //     '/work-allocations/getWorkAllocationDetails',
    //     {
    //       id,
    //       companyCode: initialAuthState.companyCode,
    //       unitCode: initialAuthState.unitCode,
    //     }
    //   );

    //   if (response.data?.length > 0) {
    //     setDetailedWorkAllocation(response.data[0]);
    //   }
    // } catch (error) {
    //   console.error(
    //     'Error fetching work allocation details:',
    //     error.response || error
    //   );
    //   alert('Failed to fetch work allocation details.');
    // }

    console.log(data, 'more details of work allocation');
    setDetailedWorkAllocation(data);
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

  const fetchBranches = async () => {
    try {
      const response = await ApiService.post('/branch/getBranchNamesDropDown');
      if (response.status && Array.isArray(response.data)) {
        setBranches(response.data);
      } else {
        console.error('Failed to fetch branches:', response);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const generateExcel = () => {
    const worksheetData = filteredData.map((item, index) => ({
      No: index + 1,
      'Work Allocation ID': item.workAllocationNumber,
      'Product / Service':
        item.serviceOrProduct === 'service' ? item.service : item.productName,
      Amount: item.amount,
      'Work Status': item.workStatus,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Work Allocations');

    XLSX.writeFile(workbook, 'WorkAllocations.xlsx');
  };

  const filteredData = workAllocationDetails.filter((item) => {
    return [item.workAllocationNumber, item.clientName, item.productName].every(
      (field, index) =>
        (field || '')
          .toString()
          .toLowerCase()
          .includes([searchId, clientName, productName][index].toLowerCase())
    );
  });

  return (
    <div className="p-10">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-bold">Work Allocation</p>
        <button
          className={`h-12 px-8 text-white font-bold rounded-md hover:cursor-pointer  ${permissions.add ? 'bg-yellow-400 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
          style={{
            backgroundColor: '#FFF504',
            borderRadius: '25px',
            color: '#000000',
          }}
          onClick={handleOpenModalForAdd}
          // disabled={!permissions.add}
          disabled={!permissions.add}
        >
          <span className="text-black mr-2">➕</span>
          Create Work Allocation
        </button>
      </div>

      {isModalOpen && (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        //   <div
        //     className="bg-white p-8 rounded-md shadow-lg relative w-3/4 max-w-4xl"
        //     style={{ borderRadius: '50px' }}
        //   >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
          <div
            className="bg-white p-8 shadow-lg relative w-3/4 max-w-4xl my-10 max-h-screen overflow-y-auto"
            style={{ borderRadius: '50px' }}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 text-white cursor-pointer rounded-full w-10 h-10 flex items-center justify-center"
              style={{ backgroundColor: '#FF9900' }}
            >
              X
            </button>
            <h2 className="text-xl font-bold text-center mb-6">
              {isEditMode ? 'Edit Work Allocation' : 'Create Work Allocation'}
            </h2>
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                {/* Client Name */}
                {/* Assign To */}
                <div>
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#000000',
                    }}
                  >
                    Client Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="w-full p-2 border rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                    value={selectedWorkAllocation?.phoneNumber || ''}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Date */}
                <div>
                  <button
                    type="button"
                    className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition"
                    style={{
                      backgroundColor: '#FF9900',
                      borderRadius: '27px',
                      height: '54px',
                      width: '300px',
                      color: '#000000',
                      fontSize: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '20px',
                    }}
                    onClick={fetchClients}
                  >
                    Get
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                {/* Client Name */}
                <div>
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#000000',
                    }}
                  >
                    Client Name
                  </label>
                  {/* {client.length > 0 && ( */}
                  <input
                    type="text"
                    name="name"
                    className="w-full p-2 border rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                    value={selectedWorkAllocation?.name || ''}
                    onChange={handleInputChange}
                  />
                  {/* )} */}
                </div>

                <div>
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#000000',
                    }}
                  >
                    Client Email
                  </label>
                  {/* {client.length > 0 && ( */}
                  <input
                    type="text"
                    name="email"
                    className="w-full p-2 border rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                    value={selectedWorkAllocation?.email || ''}
                    onChange={handleInputChange}
                  />
                  {/* )} */}
                </div>

                <div>
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#000000',
                    }}
                  >
                    Client Addrress
                  </label>
                  {/* {client.length > 0 && ( */}
                  <input
                    type="text"
                    name="address"
                    className="w-full p-2 border rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                    value={selectedWorkAllocation?.address || ''}
                    onChange={handleInputChange}
                  />
                  {/* )} */}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                {/* Assign To */}
                {staff.length > 0 && (
                  <div>
                    <label
                      className="block text-gray-700 font-semibold mb-2"
                      style={{
                        fontSize: '16px',
                        fontWeight: '400',
                        color: '#000000',
                      }}
                    >
                      Staff Name
                    </label>
                    <select
                      name="staffId"
                      value={selectedWorkAllocation?.staffId || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                      style={{
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <option value="" disabled>
                        Allocated to
                      </option>
                      {staff
                        .filter(
                          (staffMember) =>
                            staffMember.designation === 'Technician'
                        )
                        .map((staffMember) => (
                          <option key={staffMember.id} value={staffMember.id}>
                            {staffMember.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                {/* Date */}
                <div>
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#000000',
                    }}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    className="w-full p-2 border rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                    value={selectedWorkAllocation?.startDate || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#000000',
                    }}
                  >
                    Branch Name
                  </label>
                  {/* {client.length > 0 && ( */}
                  <select
                    name="branchId"
                    value={selectedWorkAllocation?.branchId || ''}
                    onChange={handleDropdownChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="" disabled>
                      Select Branch
                    </option>
                    {branches.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {' '}
                        {/* Use branch.id as value */}
                        {branch.branchName}
                      </option>
                    ))}
                  </select>
                  {/* )} */}
                </div>
              </div>

              {/* Service or Product */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginBottom: '30px',
                }}
              >
                {/* Service/Product Dropdown */}
                <div style={{ flex: 1, marginRight: '10px' }}>
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#000000',
                    }}
                  >
                    Product
                  </label>
                  <select
                    name="productName"
                    onChange={handleInputChange}
                    placeholder="Select Product"
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="" disabled>
                      Select Product
                    </option>
                    {productTypes.map((product) => (
                      <option key={product.id} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Show product dropdown when "Product" is selected */}
                <div className="flex gap-3" style={{ flex: 1, padding: 10 }}>
                  {/* Product Dropdown */}
                  <div style={{ width: '100%' }}>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Select Services
                    </label>
                    <select
                      placeholder="Select Service"
                      onChange={handleInputChange}
                      name="serviceId"
                      className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                      style={{
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <option value="" disabled>
                        Select Services
                      </option>
                      {serviceTypes.map((service) => (
                        <option key={service.id} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Other Information */}
              <div
                style={{
                  display: 'flex',
                  alignContent: 'center',
                  marginBottom: '30px',
                }}
              >
                <div
                  style={{
                    marginLeft: '5px',
                    width: '50%',
                    marginRight: '10px',
                  }}
                >
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#000000',
                      width: '50vh',
                    }}
                  >
                    Address
                  </label>
                  <textarea
                    name="installationAddress"
                    className="w-full border p-3 rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                    value={selectedWorkAllocation?.installationAddress || ''}
                    onChange={handleInputChange}
                    rows="2"
                  />
                </div>
                <div
                  style={{
                    marginLeft: '5px',
                    width: '50%',
                    marginLeft: '10px',
                  }}
                >
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#000000',
                      width: '50vh',
                    }}
                  >
                    Other Information
                  </label>
                  <textarea
                    name="description"
                    className="w-full border p-3 rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                    value={selectedWorkAllocation?.description || ''}
                    onChange={handleInputChange}
                    rows="2"
                  />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}
              >
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition"
                  style={{
                    backgroundColor: '#FF9900',
                    borderRadius: '27px',
                    height: '54px',
                    width: '300px',
                    color: '#000000',
                    fontSize: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '20px',
                  }}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isMoreDetailsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white p-8 rounded-md shadow-lg relative w-11/12 max-w-6xl overflow-y-auto"
            style={{ borderRadius: '50px', maxHeight: '90vh' }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseMoreDetailsModal}
              className="absolute top-5 right-5 text-white cursor-pointer rounded-full w-10 h-10 flex items-center justify-center"
              style={{ backgroundColor: '#FF9900' }}
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">
              Work Allocation Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(detailedWorkAllocation || {})
                .filter(([key]) => key !== 'remark')
                .map(([key, value]) => {
                  const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase());

                  let displayValue = 'N/A';
                  if (Array.isArray(value)) {
                    displayValue = value.length
                      ? value.map((v, i) => JSON.stringify(v)).join(', ')
                      : '[]';
                  } else if (typeof value === 'object' && value !== null) {
                    displayValue = JSON.stringify(value);
                  } else if (
                    typeof value === 'string' &&
                    value.includes('http')
                  ) {
                    displayValue = (
                      <img
                        src={value}
                        alt={key}
                        className="w-full max-w-xs h-auto border rounded-md"
                      />
                    );
                  } else {
                    displayValue = value || 'N/A';
                  }

                  return (
                    <div key={key}>
                      <p
                        className="w-full p-3 border rounded-md bg-gray-100"
                        style={{
                          fontSize: '18px',
                          fontWeight: '500',
                          color: '#333',
                          wordBreak: 'break-word',
                        }}
                      >
                        <span className="font-bold text-gray-800">
                          {formattedKey}:
                        </span>{' '}
                        {displayValue}
                      </p>
                    </div>
                  );
                })}
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-6">
              <button
                className="text-white font-semibold px-6 py-2 rounded-full shadow-md"
                style={{
                  backgroundColor: '#FF9900',
                  width: '300px',
                  height: '54px',
                  borderRadius: '27px',
                  color: '#000000',
                  fontSize: '24px',
                  fontWeight: '600',
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Client Name:"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="h-12 block w-1/2 border border-gray-500 px-2 rounded"
          style={{ height: '47px' }}
        />
        <input
          type="text"
          value={productName}
          placeholder="Product Name:"
          onChange={(e) => setProductName(e.target.value)}
          className="h-12 block w-1/2 border border-gray-500 px-2 mx-2 rounded"
        />

        {/* <button  className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center ml-2">
          <FaSearch />
        </button> */}
        <button
          onClick={generateExcel}
          className="h-12 px-6 bg-green-600 text-white rounded-md flex items-center ml-2"
        >
          Generate XL
        </button>
      </div>

      <div className="overflow-x-auto" style={{ marginTop: '40px' }}>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200" style={{ backgroundColor: '#FFFFFF' }}>
              <th
                className="px-4 py-2 text-left"
                style={{
                  fontSize: '17px',
                  fontWeight: '600',
                  color: '#000000',
                  height: '60px',
                }}
              >
                No.
              </th>
              <th
                className="px-4 py-2 text-left"
                style={{
                  fontSize: '17px',
                  fontWeight: '600',
                  color: '#000000',
                  height: '60px',
                }}
              >
                Client
              </th>
              <th
                className="px-4 py-2 text-left"
                style={{
                  fontSize: '17px',
                  fontWeight: '600',
                  color: '#000000',
                  height: '60px',
                }}
              >
                Product / Service
              </th>
              <th
                className="px-4 py-2 text-left"
                style={{
                  fontSize: '17px',
                  fontWeight: '600',
                  color: '#000000',
                  height: '60px',
                }}
              >
                Allocated Staff
              </th>

              <th
                className="px-4 py-2 text-left"
                style={{
                  fontSize: '17px',
                  fontWeight: '600',
                  color: '#000000',
                  height: '60px',
                }}
              >
                Amount
              </th>

              <th
                className="px-4 py-2 text-left"
                style={{
                  fontSize: '17px',
                  fontWeight: '600',
                  color: '#000000',
                  height: '60px',
                }}
              >
                Work Status
              </th>
              <th
                className="px-4 py-2 text-left"
                style={{
                  fontSize: '17px',
                  fontWeight: '600',
                  color: '#000000',
                  height: '60px',
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(workAllocationDetails) &&
              filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b`}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#D0D0D0' : '#FFFFFF',
                  }}
                >
                  <td
                    className="px-4 py-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#000000',
                      height: '60px',
                    }}
                  >
                    {item.id}
                  </td>
                  <td
                    className="px-4 py-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#000000',
                      height: '60px',
                    }}
                  >
                    {item.clientName}
                  </td>
                  <td
                    className="px-4 py-2 font-bold"
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#000000',
                      height: '60px',
                    }}
                  >
                    {item.productName}
                    {/* {item.productName} */}
                  </td>
                  <td
                    className="px-4 py-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#000000',
                      height: '60px',
                    }}
                  >
                    {item.staffName}
                  </td>
                  <td
                    className="px-4 py-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#000000',
                      height: '60px',
                    }}
                  >
                    {item.amount}
                  </td>
                  <td
                    className="px-4 py-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#000000',
                      height: '60px',
                    }}
                  >
                    {item.workStatus}
                  </td>
                  <td className="border p-2 relative">
                    <button
                      onClick={(e) => handleMoreDetails(e, item)}
                      className="p-2" >
                      <FaPencil />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkAllocation;
