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
    workAllocationID: '4376T4RT5TG',
    type: 'Product',
    vehicleNumber: '5897',
    amount: '₹2099',
    paymentStatus: 'success',
    paymentMode: 'Credit Card',
  },
  {
    id: '02',
    workAllocationID: '4376T4RT5TG',
    type: 'Service',
    vehicleNumber: '6464',
    amount: '₹2099',
    paymentStatus: 'success',
    paymentMode: 'Cash',
  },
  {
    id: '03',
    workAllocationID: '4376T4RT5TG',
    type: 'Product',
    vehicleNumber: '3234',
    amount: '₹2099',
    paymentStatus: 'success',
    paymentMode: 'Autopay',
  },
  {
    id: '04',
    workAllocationID: '4376T4RT5TG',
    type: 'Product',
    vehicleNumber: '7655',
    amount: '₹2099',
    paymentStatus: 'success',
    paymentMode: 'Net Banking',
  },
];

const WorkAllocation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Check if there's workAllocation data passed through location.state
  const workAllocationData = location.state?.workAllocationDetails || {};
  console.log(workAllocationData, 'data');
  const initialFormData = {
    id: workAllocationData?.id || '',
    workAllocationId: workAllocationData?.workAllocationId || '',
    workAllocationNumber: workAllocationData?.workAllocationNumber || '',
    serviceOrProduct: workAllocationData?.serviceOrProduct || '',
    address: workAllocationData?.address || '',
    date: workAllocationData?.date || '',
    staffId: workAllocationData?.assignedTo || '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    voucherId: workAllocationData?.voucherId || null,
    install: workAllocationData?.install || false,
    clientId: workAllocationData?.clientId || null,
    otherInformation: workAllocationData?.otherInformation,
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

  const [selectedType, setSelectedType] = useState('');
  const [serviceInput, setServiceInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [productLists, setProductList] = useState([]);
  const [salesId, setSalesId] = useState('');
  const [visitingNumber, setVisitingNumber] = useState([]);
  const [workAllocationDetails, setWorkAllocationDetails] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [detailedWorkAllocation, setDetailedWorkAllocation] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [branches, setBranches] = useState([]);

  const productList = ['Product A', 'Product B', 'Product C'];

  console.log(selectedWorkAllocation, 'edit products');

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
        console.log(res, 'response work ');

        console.log(res.data, 'response work data');
        setProductList(res.data || []);
      } catch (err) {
        console.error('Failed to fetch client details:', err);
        setProductList([]);
      }
    };
    fetchProductList();
  }, []);

  // useEffect(() => {
  //   if (workAllocationData.id) {
  //     const fetchClientDetails = async () => {
  //       console.log('abcdss');
  //       try {
  //         const response = await ApiService.post(
  //           '/work-allocations/getWorkAllocationDetails',
  //           {
  //             id: workAllocationData.id,
  //             companyCode: initialAuthState.companyCode,
  //             unitCode: initialAuthState.unitCode,
  //           }
  //         );

  //         console.log(response.data, 'client data');
  //         if (response.data?.length > 0) {
  //           const subDealer = response.data[0];
  //           setSelectedWorkAllocation({
  //             ...initialFormData,
  //             ...subDealer,
  //             productDetails: subDealer?.productDetails || [],
  //           });
  //         }
  //       } catch (error) {
  //         console.error('Error fetching work allocation details:', error);
  //         alert('Failed to fetch work allocation details.');
  //       }
  //     };
  //     fetchClientDetails();
  //   }
  // }, [workAllocationData.workAllocationNumber]);

  useEffect(() => {
    const fetchClientDetails = async () => {
      console.log('abcdss');
      try {
        const response = await ApiService.post(
          '/work-allocations/getWorkAllocation',
          {
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );

        console.log(response.data, 'client data work');
        if (response.data?.length > 0) {
          setWorkAllocationDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching work allocation details:', error);
        alert('Failed to fetch work allocation details.');
      }
    };
    fetchClientDetails();
  }, []);

  const handleOpenModalForAdd = () => {
    setSelectedWorkAllocation(initialFormData);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = async (id) => {
    console.log('ID received:', id);
    if (!id) {
      console.error('Invalid ID passed:', id);
      alert('Invalid Work Allocation ID!');
      return;
    }

    setPopupData(null);

    setSelectedWorkAllocation(initialFormData);
    setIsEditMode(true);
    setIsModalOpen(true);
    try {
      console.log('Fetching work allocation details...');

      const response = await ApiService.post(
        '/work-allocations/getWorkAllocationDetails',
        {
          id,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      console.log(response.data, 'client work allocation particular data');
      if (response.data?.length > 0) {
        const subDealer = response.data[0];
        setSelectedWorkAllocation({
          ...initialFormData,
          ...subDealer,
          clientId: subDealer.clientId.id,
          address: subDealer.clientId.address,
          staffId: subDealer.staffId.id,
          date: subDealer.date.split('T')[0],
          productDetails: subDealer?.productDetails || [],
        });
      }
    } catch (error) {
      console.error(
        'Error fetching work allocation details:',
        error.response || error
      );
      alert('Failed to fetch work allocation details.');
    }
  };

  // const handleDropdownChange = (e) => {
  //   const selectedClientId = e.target.value;
  //   const selectedClient = client.find(
  //     (clientDetails) =>
  //       String(clientDetails.clientId) === String(selectedClientId)
  //   );

  //   setSelectedWorkAllocation((prev) => ({
  //     ...prev,
  //     clientId: selectedClientId,
  //     // clientName: selectedClient?.name || '',
  //     // phoneNumber: selectedClient?.phoneNumber || '',
  //   }));
  // };

  // const handleDropdownChange = (e) => {
  //   const selectedClientId = Number(e.target.value); // Convert to number
  //   const selectedClient = client.find(
  //     (clientDetails) => clientDetails.clientId === selectedClientId
  //   );

  //   setSelectedWorkAllocation((prev) => ({
  //     ...prev,
  //     clientId: selectedClientId, // Now stored as a number
  //     // clientName: selectedClient?.name || '',
  //     // phoneNumber: selectedClient?.phoneNumber || '',
  //   }));
  // };

  // const handleBranchDropdownChange = (e) => {
  //   const selectedBranchId = Number(e.target.value); // Convert to number
  //   const selectedBranch = branch.find(
  //     (clientDetails) => clientDetails.clientId === selectedClientId
  //   );

  //   setSelectedWorkAllocation((prev) => ({
  //     ...prev,
  //     clientId: selectedClientId, // Now stored as a number
  //     // clientName: selectedClient?.name || '',
  //     // phoneNumber: selectedClient?.phoneNumber || '',
  //   }));
  // };

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

  // const handleEdit = (work) => {
  //   navigate('/edit-work-allocation', {
  //     state: { workAllocationDetails: { work } },
  //   });
  // };

  const handleEdit = () => {
    alert('Edit work details');
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await ApiService.post('/client/getClientNamesDropDown');
        console.log(res, 'client response');
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorkAllocation(null);
  };

  const handleOpenMoreDetailsModal = (voucher) => {
    setSelectedWorkAllocation(voucher);
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
    const payload = { ...selectedWorkAllocation };
    try {
      const endpoint = selectedWorkAllocation.id
        ? '/work-allocations/handleWorkAllocationDetails'
        : '/work-allocations/handleWorkAllocationDetails';
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status) {
        alert(
          selectedWorkAllocation.id
            ? 'Work Allocation updated successfully!'
            : 'Work Allocation added successfully!'
        );
        navigate('/work_allocations');
      } else {
        alert('Failed to save work allocation. Please try again.');
      }
    } catch (error) {
      console.error('Error saving work allocation:', error);
      alert('Failed to save work allocation. Please try again.');
    }
  };

  const handleMoreDetails = async (id) => {
    console.log('ID received:', id);
    if (!id) {
      console.error('Invalid ID passed:', id);
      alert('Invalid Work Allocation ID!');
      return;
    }

    setIsMoreDetailsModalOpen(true);
    setPopupData(null);

    try {
      console.log('Fetching work allocation details...');

      const response = await ApiService.post(
        '/work-allocations/getWorkAllocationDetails',
        {
          id,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      console.log(response.data, 'client work allocation particular data');
      if (response.data?.length > 0) {
        setDetailedWorkAllocation(response.data[0]);
      }
    } catch (error) {
      console.error(
        'Error fetching work allocation details:',
        error.response || error
      );
      alert('Failed to fetch work allocation details.');
    }
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
    console.log('hiiiiii');
    try {
      const response = await ApiService.post('/branch/getBranchNamesDropDown');
      console.log('hiiiiii22', response);
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

  const filteredData = workAllocationDetails.filter((item) =>
    item.workAllocationNumber.toLowerCase().includes(searchId.toLowerCase())
  );

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
          disabled={!permissions.add}
        >
          <span className="text-black mr-2">➕</span>
          Create Work Allocation
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white p-8 rounded-md shadow-lg relative w-3/4 max-w-4xl"
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
                  <select
                    name="clientId"
                    value={selectedWorkAllocation?.clientId || ''}
                    onChange={handleDropdownChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="" disabled>
                      Select Client
                    </option>
                    {client.map((clientItem) => (
                      <option key={clientItem.id} value={clientItem.id}>
                        {clientItem.name}
                      </option>
                    ))}
                  </select>
                  {/* )} */}
                </div>

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

                {/* Voucher ID */}
                {voucher.length > 0 && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Voucher ID
                    </label>
                    <select
                      name="voucherId"
                      value={selectedWorkAllocation?.voucherId || ''}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                      style={{
                        borderRadius: '6px',
                        backgroundColor: '#FFFFFF',
                      }}
                    >
                      <option value="" disabled>
                        Select Voucher
                      </option>
                      {voucher.map((voucherItem) => (
                        <option key={voucherItem.id} value={voucherItem.id}>
                          {voucherItem.voucherId}
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
                    name="date"
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                    value={selectedWorkAllocation?.date || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Service or Product */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '30px',
                }}
              >
                {/* Service/Product Dropdown */}
                <div style={{ width: '33%', marginRight: '10px' }}>
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#000000',
                    }}
                  >
                    Service/Product
                  </label>
                  <select
                    name="serviceOrProduct"
                    value={selectedType}
                    onChange={(e) => {
                      setSelectedType(e.target.value);
                      setSelectedWorkAllocation((prev) => ({
                        ...prev,
                        serviceOrProduct: e.target.value,
                      }));
                    }}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    style={{
                      borderRadius: '6px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="service">Service</option>
                    <option value="product">Product</option>
                  </select>
                </div>

                {/* Show input field when "Service" is selected */}
                {selectedType === 'service' && (
                  <div
                    className="flex gap-3"
                    style={{ width: '66%', marginLeft: '10px' }}
                  >
                    <div style={{ width: '100%' }}>
                      <label
                        className="block text-gray-700 font-semibold mb-2"
                        style={{
                          fontSize: '16px',
                          fontWeight: '400',
                          color: '#000000',
                        }}
                      >
                        Enter Service
                      </label>
                      <input
                        type="text"
                        name="serviceName"
                        value={selectedWorkAllocation.serviceName}
                        onChange={(e) =>
                          setSelectedWorkAllocation({
                            ...selectedWorkAllocation,
                            service: e.target.value,
                          })
                        }
                        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                        style={{
                          borderRadius: '6px',
                          backgroundColor: '#FFFFFF',
                        }}
                        placeholder="Enter service name"
                      />
                    </div>
                    <div style={{ width: '100%' }}>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Enter Amount
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={selectedWorkAllocation.amount}
                        onChange={(e) =>
                          setSelectedWorkAllocation({
                            ...selectedWorkAllocation,
                            amount: e.target.value,
                          })
                        }
                        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                        style={{
                          borderRadius: '6px',
                          backgroundColor: '#FFFFFF',
                        }}
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                )}

                {/* Show product dropdown when "Product" is selected */}
                {selectedType === 'product' && (
                  <div className="flex gap-3" style={{ width: '66%' }}>
                    {/* Product Dropdown */}
                    <div style={{ width: '100%' }}>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Select Product
                      </label>
                      <select
                        name="productId"
                        value={selectedWorkAllocation.productId || ''} // Ensure value is a number
                        onChange={(e) => {
                          const selectedProductId = Number(e.target.value);
                          const selectedProduct = productLists.find(
                            (product) => product.id === selectedProductId
                          );

                          setSelectedWorkAllocation((prev) => ({
                            ...prev,
                            productId: selectedProductId,
                            productName: selectedProduct
                              ? selectedProduct.productType
                              : '',
                          }));
                        }}
                        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                        style={{
                          borderRadius: '6px',
                          backgroundColor: '#FFFFFF',
                        }}
                      >
                        <option value="" disabled>
                          Select a product
                        </option>
                        {productLists.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.productType}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Amount Input */}
                    <div style={{ width: '100%' }}>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Enter Amount
                      </label>
                      <input
                        type="number"
                        name="amount"
                        value={selectedWorkAllocation.amount}
                        onChange={(e) =>
                          setSelectedWorkAllocation({
                            ...selectedWorkAllocation,
                            amount: Number(e.target.value),
                          })
                        }
                        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                        style={{
                          borderRadius: '6px',
                          backgroundColor: '#FFFFFF',
                        }}
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>
                )}
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
                    name="address"
                    className="w-full border p-3 rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                    value={selectedWorkAllocation?.address || ''}
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
                    name="otherInformation"
                    className="w-full border p-3 rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                    value={selectedWorkAllocation?.otherInformation || ''}
                    onChange={handleInputChange}
                    rows="2"
                  />
                </div>
              </div>

              <div className="flex gap-3" style={{ width: '66%' }}>
                {/* Sales ID Input */}
                <div style={{ width: '100%' }}>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Sales ID
                  </label>
                  <select
                    name="salesId"
                    value={selectedWorkAllocation?.salesId || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    style={{
                      borderRadius: '6px',
                      backgroundColor: '#FFFFFF',
                    }}
                  >
                    <option value="" disabled>
                      Sales ID
                    </option>
                    {staff
                      .filter(
                        (staffMember) => staffMember.designation === 'Sales Man'
                      )
                      .map((staffMember) => (
                        <option key={staffMember.id} value={staffMember.id}>
                          {staffMember.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Visiting Number Input */}
                <div style={{ width: '100%' }}>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Visiting Number
                  </label>
                  <input
                    type="text"
                    name="visitingNumber"
                    value={selectedWorkAllocation.visitingNumber}
                    onChange={(e) =>
                      setSelectedWorkAllocation({
                        ...selectedWorkAllocation,
                        visitingNumber: e.target.value,
                      })
                    }
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                    placeholder="Enter Visiting Number"
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
            className="bg-white p-8 rounded-md shadow-lg relative w-3/4 max-w-4xl"
            style={{ borderRadius: '50px' }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseMoreDetailsModal}
              className="absolute top-5 right-5 text-white cursor-pointer rounded-full w-10 h-10 flex items-center justify-center"
              style={{ backgroundColor: '#FF9900' }}
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-xl font-bold text-center mb-6">
              Work Allocation Details
            </h2>

            {/* Details */}
            <div className="grid gap-2 mb-2" style={{ height: '400px' }}>
              <div>
                <p
                  className="w-full p-3 border rounded-md bg-gray-200"
                  style={{
                    height: '55px',
                    fontSize: '24px',
                    fontWeight: '500',
                    color: '#000000',
                  }}
                >
                  Client Name: {detailedWorkAllocation?.clientId?.name || 'N/A'}
                </p>
              </div>

              <div>
                <p
                  className="w-full p-3 border rounded-md bg-gray-200"
                  style={{
                    height: '55px',
                    fontSize: '24px',
                    fontWeight: '500',
                    color: '#000000',
                  }}
                >
                  Client Number:{' '}
                  {detailedWorkAllocation?.clientId?.phoneNumber || 'N/A'}
                </p>
              </div>

              <div>
                <p
                  className="w-full p-3 border rounded-md bg-gray-200"
                  style={{
                    height: '55px',
                    fontSize: '24px',
                    fontWeight: '500',
                    color: '#000000',
                  }}
                >
                  Date: {detailedWorkAllocation?.date || 'N/A'}
                </p>
              </div>

              <div>
                <p
                  className="w-full p-3 border rounded-md bg-gray-200"
                  style={{
                    height: '55px',
                    fontSize: '24px',
                    fontWeight: '500',
                    color: '#000000',
                  }}
                >
                  Service / Product: Resource Allocation
                </p>
              </div>

              <div>
                <p
                  className="w-full p-3 border rounded-md bg-gray-200"
                  style={{
                    height: '55px',
                    fontSize: '24px',
                    fontWeight: '500',
                    color: '#000000',
                  }}
                >
                  Allocated to: {detailedWorkAllocation?.staffId?.name || 'N/A'}
                </p>
              </div>

              <div>
                <p
                  className="w-full p-3 border rounded-md bg-gray-200"
                  style={{
                    height: '55px',
                    fontSize: '24px',
                    fontWeight: '500',
                    color: '#000000',
                  }}
                >
                  Client Address:{' '}
                  {detailedWorkAllocation?.clientId?.address || 'N/A'}
                </p>
              </div>
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
                  fontSize: '30px',
                  fontWeight: '500',
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
          placeholder="Work Allocation ID:"
          onChange={(e) => setSearchId(e.target.value)}
          className="h-12 block w-1/2 border border-gray-500 px-2 rounded"
          style={{ height: '47px' }}
        />
        <input
          type="text"
          placeholder="Work Allocation Name:"
          className="h-12 block w-1/2 border border-gray-500 px-2 mx-2 rounded"
        />

        <button className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center ml-2">
          <FaSearch />
        </button>
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
                Work Allocation ID
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
                    {item.workAllocationNumber}
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
                    {item.serviceOrProduct === 'service'
                      ? item.service
                      : item.productName}
                    {/* {item.productName} */}
                  </td>
                  {/* <td
                    className="px-4 py-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#000000',
                      height: '60px',
                    }}
                  >
                    {item.vehicleNumber}
                  </td> */}
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
                  {/* <td
                    className="px-4 py-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '500',
                      color: '#000000',
                      height: '60px',
                    }}
                  >
                    {item.paymentStatus}
                  </td> */}
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
            onClick={() => handleOpenModalForEdit(popupData.item.id)}
          >
            Edit
          </button>
          <button
            className="block px-4 py-2 text-left w-full hover:bg-gray-100"
            onClick={() => handleMoreDetails(popupData.item.id)}
          >
            More Details
          </button>
        </div>
      )}

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

export default WorkAllocation;
