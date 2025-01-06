import React, { useState, useEffect } from 'react';
import TableWithSearchFilter from '../tablesSearchFilter';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
const WorkAllocation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if there's workAllocation data passed through location.state
  const workAllocationData = location.state?.workAllocationDetails || {};


  // Initialize form data with existing workAllocation details if available
  const initialFormData = {
    id: workAllocationData.id || '',
    // staffId: workAllocationData.name || '',
    workAllocationId: workAllocationData.workAllocationId || '',
    workAllocationNumber: workAllocationData.workAllocationNumber || '',
    serviceOrProduct: workAllocationData.serviceOrProduct || '',
    otherInformation: workAllocationData.otherInformation || '',
    date: workAllocationData.date || '',
    staffId: workAllocationData.assignedTo,
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    // clientName: workAllocationData?.clientName,
    // clientId: workAllocationData?.clientId || null,
    // phoneNumber: workAllocationData?.phoneNumber,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWorkAllocation, setSelectedWorkAllocation] = useState(initialFormData);
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
  const [client, setClient] = useState([]);
  const [staff, setStaff] = useState([]);
  const handleOpenModalForAdd = () => {
    setSelectedWorkAllocation(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };
  // const handleDropdownChange = (e) => {
  //   const selectedClientId = e.target.value;
  //   const selectedClient = client.find(
  //     (clientDetails) => String(clientDetails.clientId) === String(selectedClientId)
  //   );

  //   setSelectedWorkAllocation((prev) => ({
  //     ...prev,
  //     clientId: selectedClientId,
  //     clientName: selectedClient?.name || '',
  //     phoneNumber: selectedClient?.phoneNumber || '',
  //   }));
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedWorkAllocation({ ...selectedWorkAllocation, [name]: value });
  };
  const handleOpenModalForEdit = (voucher) => {
    setSelectedWorkAllocation(voucher);
    setIsEditMode(true);
    setIsModalOpen(true);
  };
  // Fetch client data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await ApiService.post('/client/getClientNamesDropDown');
        setClient(res.data || []);
      } catch (err) {
        console.error('Failed to fetch client details:', err);
        setClient([]); // Ensure state is always an array
      }
    };
    fetchClients();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorkAllocation(null);
  };

  const handleOpenMoreDetailsModal = (voucher) => {
    console.log(voucher);
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
    console.log(payload, "+++++++++++++++++++++++")
    try {
      const endpoint = selectedWorkAllocation.id ? '/work-allocations/handleWorkAllocationDetails' : '/work-allocations/handleWorkAllocationDetails';
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status) {
        alert(selectedWorkAllocation.id ? 'workAllocation updated successfully!' : 'workAllocation added successfully!');
        navigate('/workAllocations');
      } else {
        alert('Failed to save employee details. Please try again.');
      }
    } catch (error) {
      console.error('Error saving employee details:', error);
      alert('Failed to save employee details. Please try again.');
    }
  };
  return (
    <div className="p-10">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-bold">Work Allocation</p>
        <button
          className="h-12 px-8 bg-yellow-400 text-white font-bold rounded-md hover:cursor-pointer"
          onClick={handleOpenModalForAdd}
        >
          Create Work Allocation
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white cursor-pointer bg-green-600 rounded-full w-6 h-6"
            >
              X
            </button>
            <h2 className="text-xl font-bold text-center mb-4">
              {isEditMode ? 'Edit Work Allocation' : 'Create Work Allocation'}
            </h2>
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Client Name
                  </label>
                  {client.length > 0 && (
                    <select
                      name="clientId"
                      value={selectedWorkAllocation.clientId || ''}
                      onChange={handleDropdownChange}
                      className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    >
                      <option value="" disabled>Select Client</option>
                      {client.map((clientItem) => (
                        <option key={clientItem.clientId} value={clientItem.clientId}>
                          {clientItem.name}
                        </option>
                      ))}
                    </select>
                  )}

                </div> */}
                {/* <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Client Number
                  </label>
                  <select
                    name="clientId"
                    value={selectedWorkAllocation.clientId}
                    onChange={handleDropdownChange}
                    defaultValue={
                      isEditMode && selectedWorkAllocation
                        ? selectedWorkAllocation.clientId
                        : ''
                    }
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select Client
                    </option>
                    {client.map((clientItem) => (
                      <option key={clientItem.clientId} value={clientItem.clientId}>
                        {clientItem.phoneNumber}
                      </option>
                    ))}
                  </select>
                </div> */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="border p-2 rounded w-full focus:outline-none"
                    defaultValue={
                      isEditMode && selectedWorkAllocation
                        ? selectedWorkAllocation.date
                        : ''

                    }
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Service / Product
                  </label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full focus:outline-none"
                    defaultValue={
                      isEditMode && selectedWorkAllocation
                        ? selectedWorkAllocation.Amount
                        : ''
                    }
                  />
                </div>
                {/* Assign To */}
                {staff.length > 0 && (
                  <div className="flex flex-col">
                    <label className="font-semibold mb-2">Assign To:</label>
                    <select
                      name="staffId"
                      value={selectedWorkAllocation.staffId}
                      onChange={handleInputChange}
                      defaultValue={
                        isEditMode && selectedWorkAllocation.staffId
                      }
                      className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    >
                      <option value="" disabled>
                        Allocated to
                      </option>
                      {staff.map((staffMember) => (
                        <option key={staffMember.id} value={staffMember.staffId}>
                          {staffMember.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full focus:outline-none"
                    defaultValue={
                      isEditMode && selectedWorkAllocation
                        ? selectedWorkAllocation.address
                        : ''
                    }
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Other Information
                </label>
                <textarea
                  className="w-full border p-2 rounded mb-4 focus:outline-none"
                  defaultValue={
                    isEditMode && selectedWorkAllocation
                      ? selectedWorkAllocation.otherInformation
                      : ''
                  }
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="bg-green-600 text-white py-2 px-6 rounded font-bold hover:bg-green-500 mx-auto block">
                {isEditMode ? 'Save Changes' : 'Save'}
              </button>
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
            <button className="bg-green-600 text-white py-2 px-6 rounded font-bold hover:bg-blue-500 mx-auto block mt-4">
              Download PDF
            </button>
          </div>
        </div>
      )}

      <TableWithSearchFilter
        type="vouchers"
        onEdit={handleOpenModalForEdit}
        onDetails={handleOpenMoreDetailsModal}
        showDelete={false}
        showCreateBtn={false}
      />
    </div>
  );
};

export default WorkAllocation;
