import React, { useState, useEffect } from 'react';
import TableWithSearchFilter from '../tablesSearchFilter';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { useNavigate } from 'react-router';

const WorkAllocation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWorkAllocation, setSelectedWorkAllocation] = useState(null);
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
  const [clientNames, setClientNames] = useState([]); // For storing client names
  const [clientNumber, setClientNumber] = useState(''); // For storing client number
  const [selectedClient, setSelectedClient] = useState(null); // To keep track of the selected client
  const [staffList, setStaffList] = useState([]); // For storing staff names
  const [selectedStaff, setSelectedStaff] = useState(null); // To keep track of the selected staff
  const [serviceOrProduct, setServiceOrProduct] = useState(''); // To store service/product value
  const [otherInformation, setOtherInformation] = useState(''); // To store other information
  const [date, setDate] = useState(''); // To store date value
  const [address, setAddress] = useState(''); // To store address value
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch client names when component mounts
    const fetchClientNames = async () => {
      try {
        const response = await ApiService.post(
          '/client/getClientNamesDropDown',
          {}
        );
        setClientNames(response.data); // Assuming API returns an array of client names
      } catch (error) {
        console.error('Error fetching client names:', error);
      }
    };
    const fetchStaffNames = async () => {
      try {
        const response = await ApiService.post('/staff/getStaffNamesDropDown');
        setStaffList(response.data || []);
      } catch (error) {
        console.error('Failed to fetch staff names:', error);
      }
    };

    fetchClientNames();
    fetchStaffNames();
  }, []);

  useEffect(() => {
    setDate(
      selectedWorkAllocation.date
        ? selectedWorkAllocation.date.split('T')[0]
        : ''
    );
    setSelectedStaff(selectedWorkAllocation.staffName);
  }, [isEditMode, isMoreDetailsModalOpen]);

  const handleClientChange = (event) => {
    const selectedClientName = event.target.value;
    setSelectedClient(selectedClientName);

    // Assuming API returns the client number when provided the client name
    const selectedClientInfo = clientNames.find(
      (client) => client.name === selectedClientName
    );
    if (selectedClientInfo) {
      setClientNumber(selectedClientInfo.id);
    } else {
      setClientNumber('');
    }
  };

  const handleStaffChange = (event) => {
    const selectedStaffId = event.target.value;
    setSelectedStaff(selectedStaffId);
  };

  const handleServiceOrProductChange = (event) => {
    setServiceOrProduct(event.target.value);
  };

  const handleOtherInformationChange = (event) => {
    setOtherInformation(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleOpenModalForAdd = () => {
    setSelectedWorkAllocation(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (voucher) => {
    setSelectedWorkAllocation(voucher);
    setIsEditMode(true);
    setIsModalOpen(true);

    // Populate input fields with existing data
    setSelectedClient(voucher.clientName);
    setClientNumber(voucher.clientNumber);
    setServiceOrProduct(voucher.serviceOrProduct);
    setOtherInformation(voucher.otherInformation);
    setDate(voucher.date);
    setSelectedStaff(voucher.staffId);
    setAddress(voucher.address);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorkAllocation(null);
  };

  const handleOpenMoreDetailsModal = (voucher) => {
    setSelectedWorkAllocation(voucher);
    setIsMoreDetailsModalOpen(true);
  };

  const handleCloseMoreDetailsModal = () => {
    setIsMoreDetailsModalOpen(false);
    setSelectedWorkAllocation(null);
  };

  const handleSave = async () => {
    const payload = {
      id: isEditMode ? selectedWorkAllocation.id : '', // Only send id for edit
      staffId: selectedStaff,
      clientId: clientNumber,
      serviceOrProduct,
      otherInformation,
      date,
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
      workAllocationNumber: isEditMode
        ? selectedWorkAllocation.workAllocationNumber
        : '', // Only send workAllocationNumber for edit
    };

    try {
      const response = await ApiService.post(
        '/work-allocations/handleWorkAllocationDetails',
        payload
      );
      if (response.status) {
        alert('Work allocation saved successfully.');
        setIsModalOpen(false);
        navigate('/work_allocation', { replace: true });
      } else {
        alert(response.data.message || 'Failed to save work allocation.');
      }
    } catch (error) {
      console.error('Error saving work allocation:', error);
      alert('Failed to save work allocation.');
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
            <form>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Client Name
                  </label>
                  <select
                    className="border p-2 rounded w-full focus:outline-none"
                    value={selectedClient || ''}
                    onChange={handleClientChange}
                  >
                    <option value="">Select Client</option>
                    {clientNames.map((client, index) => (
                      <option key={index} value={client.name}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Client Number
                  </label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full focus:outline-none"
                    value={clientNumber}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="border p-2 rounded w-full focus:outline-none"
                    value={date}
                    onChange={handleDateChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Service / Product
                  </label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full focus:outline-none"
                    value={serviceOrProduct}
                    onChange={handleServiceOrProductChange}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Allocated to
                  </label>
                  <select
                    className="border p-2 rounded w-full focus:outline-none"
                    value={selectedStaff || ''}
                    onChange={handleStaffChange}
                  >
                    <option value="">Select Staff</option>
                    {staffList.map((staff, index) => (
                      <option key={index} value={staff.id}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full focus:outline-none"
                    value={address}
                    onChange={handleAddressChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Other Information
                </label>
                <textarea
                  className="w-full border p-2 rounded mb-4 focus:outline-none"
                  value={otherInformation}
                  onChange={handleOtherInformationChange}
                />
              </div>
              <button
                className="bg-green-600 text-white py-2 px-6 rounded font-bold hover:bg-green-500 mx-auto block"
                onClick={handleSave}
              >
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
                <strong>Client Name : </strong>{' '}
                {selectedWorkAllocation.clientName}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Client Number : </strong>{' '}
                {selectedWorkAllocation.clientNumber}
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
                {selectedWorkAllocation.staffName}
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
        type="work-allocations"
        onEdit={handleOpenModalForEdit}
        onDetails={handleOpenMoreDetailsModal}
        showDelete={false}
        showCreateBtn={false}
      />
    </div>
  );
};

export default WorkAllocation;
