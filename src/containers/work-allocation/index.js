import React, { useState, useEffect } from 'react';
import TableWithSearchFilter from '../tablesSearchFilter';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';
import { FaSearch } from 'react-icons/fa';
import { FaEllipsisV } from 'react-icons/fa';

const data = [
  {
    id: '01',
    workAllocationID: '4376T4RT5TG',
    type: 'Product',
    vehicleNumber: '5897',
    amount: '₹2099',
    paymentStatus: "success",
    paymentMode: 'Credit Card',
  },
  {
    id: '02',
    workAllocationID: '4376T4RT5TG',
    type: 'Service',
    vehicleNumber: '6464',
    amount: '₹2099',
    paymentStatus: "success",
    paymentMode: 'Cash',
  },
  {
    id: '03',
    workAllocationID: '4376T4RT5TG',
    type: 'Product',
    vehicleNumber: '3234',
    amount: '₹2099',
    paymentStatus: "success",
    paymentMode: 'Autopay',
  },
  {
    id: '04',
    workAllocationID: '4376T4RT5TG',
    type: 'Product',
    vehicleNumber: '7655',
    amount: '₹2099',
    paymentStatus: "success",
    paymentMode: 'Net Banking',
  },
];

const WorkAllocation = () => {
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

  useEffect(() => {
    const perms = getPermissions('work-allocation');
    setPermissions(perms);
  }, []);

  useEffect(() => {
    if (workAllocationData.id) {
      const fetchClientDetails = async () => {
        try {
          const response = await ApiService.post(
            '/work-allocations/getWorkAllocationDetails',
            {
              id: workAllocationData.id,
              companyCode: initialAuthState.companyCode,
              unitCode: initialAuthState.unitCode,
            }
          );
          if (response.data?.length > 0) {
            const subDealer = response.data[0];
            setSelectedWorkAllocation({
              ...initialFormData,
              ...subDealer,
              productDetails: subDealer?.productDetails || [],
            });
          }
        } catch (error) {
          console.error('Error fetching work allocation details:', error);
          alert('Failed to fetch work allocation details.');
        }
      };
      fetchClientDetails();
    }
  }, [workAllocationData.workAllocationNumber]);

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

  const handleEdit = (work) => {
    navigate('/edit-work-allocation', {
      state: { workAllocationDetails: { work } },
    });
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
        const res = await ApiService.post('/staff/getStaffNamesDropDown');
        setStaff(res.data || []);
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

      if (response.data.status) {
        alert(
          selectedWorkAllocation.id
            ? 'Work Allocation updated successfully!'
            : 'Work Allocation added successfully!'
        );
        navigate('/workAllocations');
      } else {
        alert('Failed to save work allocation. Please try again.');
      }
    } catch (error) {
      console.error('Error saving work allocation:', error);
      alert('Failed to save work allocation. Please try again.');
    }
  };

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
                      Client Number
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
                      {staff.map((staffMember) => (
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

                {/* Service or Product */}
                <div>
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
                  <input
                    name="serviceOrProduct"
                    value={selectedWorkAllocation?.serviceOrProduct || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                  />
                </div>

                {/* Other Information */}
                <div className="col-span-2">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      color: '#000000',
                    }}
                  >
                    Address
                  </label>
                  <input
                    name="otherInformation"
                    className="w-full border p-3 rounded-md bg-gray-200 focus:outline-none"
                    style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                    value={selectedWorkAllocation?.otherInformation || ''}
                    onChange={handleInputChange}
                    rows="2"
                  />
                </div>

                {/* Product Name */}

                {/* Description */}
                {/* <div className="col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="w-full border p-3 rounded-md bg-gray-200 focus:outline-none"
                    value={selectedWorkAllocation?.description || ''}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div> */}
              </div>
              <div>
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    color: '#000000',
                    width: '100vh',
                  }}
                >
                  Other Information
                </label>
                <textarea
                  name="productName"
                  className="w-full border p-3 rounded-md bg-gray-200 focus:outline-none"
                  style={{ borderRadius: '6px', backgroundColor: '#FFFFFF' }}
                  value={selectedWorkAllocation?.productName || ''}
                  onChange={handleInputChange}
                  rows="2"
                />
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
                  }}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isMoreDetailsModalOpen && selectedWorkAllocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg relative w-[550px]">
            <button
              onClick={handleCloseMoreDetailsModal}
              className="absolute top-2 right-2 text-white cursor-pointer bg-green-600 rounded-full w-6 h-6"
            >
              X
            </button>
            <h2 className="text-xl font-bold text-center mb-4">
              Work Allocation Details
            </h2>
            <div>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Work Allocation Number : </strong>{' '}
                {selectedWorkAllocation.workAllocationNumber}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Client Name : </strong>{' '}
                {selectedWorkAllocation.clientName}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Client Number : </strong>{' '}
                {selectedWorkAllocation.phoneNumber}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Date : </strong> {selectedWorkAllocation.date}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Service / Product :</strong>{' '}
                {selectedWorkAllocation.serviceOrProduct}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Allocated to : </strong>{' '}
                {selectedWorkAllocation.assignedTo}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Address : </strong> {selectedWorkAllocation.address}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Other Information : </strong>{' '}
                {selectedWorkAllocation.otherInformation}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Work Allocation ID:"
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
                Vehicle Number
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
                Payment Status
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
                Payment Mode
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
            {data.map((item, index) => (
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
                  {item.workAllocationID}
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
                  {item.type}
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
                  {item.vehicleNumber}
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
                  {item.paymentStatus}
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
                  {item.paymentMode}
                </td>
                <td className="border p-2 relative">
                  <button
                    // onClick={(e) => handleOpenPopup(e, group.id)}
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
