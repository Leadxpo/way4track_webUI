import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService'; // Adjust the import based on your structure
import TableWithSearchFilter from '../tablesSearchFilter';
import { initialAuthState } from '../../services/ApiService';

const Tickets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
  const [staffList, setStaffList] = useState([]); // Store fetched staff names
  const [branchList, setBranchList] = useState([]); // Store fetched branches
  const [selectedStaffId, setSelectedStaffId] = useState(''); // Selected staff ID
  const [selectedStaffNumber, setSelectedStaffNumber] = useState(''); // Staff number
  const [selectedBranch, setSelectedBranch] = useState(''); // Selected branch
  const [selectedDepartment, setSelectedDepartment] = useState(''); // Selected addressing department
  const [date, setDate] = useState(''); // Date state
  const [address, setAddress] = useState(''); // Address state
  const [problem, setProblem] = useState(''); // Problem state
  const [tickets, setTickets] = useState([]); // Tickets state

  // Fetch staff names when modal opens
  useEffect(() => {
    if (isModalOpen) {
      fetchStaffNames();
      fetchBranches();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isEditMode && selectedTicket) {
      setSelectedStaffId(selectedTicket.staffName || '');
      setSelectedStaffNumber(selectedTicket.staffNumber || '');
      setSelectedBranch(selectedTicket.branchName || '');
      setSelectedDepartment(selectedTicket.addressing_department || '');
      setDate(
        selectedTicket.ticket_date
          ? selectedTicket.ticket_date.split('T')[0]
          : ''
      );
      setAddress(selectedTicket.address || '');
      setProblem(selectedTicket.otherInformation || '');
    }
  }, [isEditMode, selectedTicket]);

  const fetchStaffNames = async () => {
    try {
      const response = await ApiService.post('/staff/getStaffNamesDropDown');
      setStaffList(response.data || []);
    } catch (error) {
      console.error('Failed to fetch staff names:', error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await ApiService.post('/branch/getBranchNamesDropDown');
      setBranchList(response.data || []);
    } catch (error) {
      console.error('Failed to fetch branches:', error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await ApiService.post('/branch/getBranchNamesDropDown');
      setTickets(response.data || []);
    } catch (error) {
      console.error('Failed to fetch branches:', error);
    }
  };

  const handleStaffChange = (e) => {
    const staffName = e.target.value;
    setSelectedStaffId(staffName);

    // Find the selected staff and set their number
    const selectedStaff = staffList.find((staff) => staff.name === staffName);
    setSelectedStaffNumber(selectedStaff?.staffId || '');
  };

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value); // Update date when changed
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleProblemChange = (e) => {
    setProblem(e.target.value);
  };

  const handleOpenModalForAdd = () => {
    setSelectedTicket(null);
    setIsEditMode(false);
    setIsModalOpen(true);
    setSelectedStaffId('');
    setSelectedStaffNumber('');
    setSelectedBranch('');
    setDate(''); // Reset date for Add
    setSelectedDepartment(''); // Reset department for Add
    setAddress(''); // Reset address for Add
    setProblem(''); // Reset problem for Add
  };

  const handleOpenModalForEdit = (ticket) => {
    setSelectedTicket(ticket);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
    setSelectedStaffId('');
    setSelectedStaffNumber('');
    setSelectedBranch('');
    setDate('');
    setSelectedDepartment(''); // Reset department on modal close
    setAddress(''); // Reset address on modal close
    setProblem(''); // Reset problem on modal close
  };

  const handleOpenMoreDetailsModal = (ticket) => {
    console.log('Selected Ticket:', ticket);
    setSelectedTicket(ticket);
    setIsMoreDetailsModalOpen(true);
  };

  const handleCloseMoreDetailsModal = () => {
    setIsMoreDetailsModalOpen(false);
    setSelectedTicket(null);
  };

  const handleSaveTicket = async () => {
    let payload = {
      staffId: selectedStaffId,
      problem: problem, // Use the problem from state
      date: date, // Use the date from state
      branchId: selectedBranch,
      addressingDepartment: selectedDepartment, // Send the selected department
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
      address: address, // Send the address from state
    };

    // if(isEditMode) {
    //   payload.id = selectedTicket.id;
    // }

    try {
      const response = await ApiService.post(
        '/tickets/handleTicketDetails',
        payload
      );
      console.log('Ticket saved successfully', response);
      handleCloseModal(); // Close the modal after saving
    } catch (error) {
      console.error('Error saving ticket', error);
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-bold">Tickets</p>
      </div>

      {/* Modal for Add/Edit Ticket */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg relative w-3/4">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-white cursor-pointer bg-green-600 rounded-full w-6 h-6"
            >
              X
            </button>
            <h2 className="text-xl font-bold text-center mb-4">
              {isEditMode ? 'Edit Ticket' : 'Create Ticket'}
            </h2>
            <form>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Staff Name Dropdown */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Staff Name
                  </label>
                  <select
                    value={selectedStaffId}
                    onChange={handleStaffChange}
                    className="border p-2 rounded w-full focus:outline-none"
                  >
                    <option value="">Select Staff</option>
                    {staffList.map((staff) => (
                      <option key={staff.id} value={staff.id}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Staff Number */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Staff Number
                  </label>
                  <input
                    type="text"
                    value={selectedStaffNumber}
                    readOnly
                    className="border p-2 rounded w-full focus:outline-none bg-gray-100"
                  />
                </div>
                {/* Date */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="border p-2 rounded w-full focus:outline-none"
                  />
                </div>
                {/* Addressing Department */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Addressing Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    className="border p-2 rounded w-full focus:outline-none"
                  >
                    <option value="">Select Role</option>
                    <option value="CEO">CEO</option>
                    <option value="HR">HR</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Operator">Operator</option>
                    <option value="Warehouse Manager">Warehouse Manager</option>
                    <option value="Sub Dealer">Sub Dealer</option>
                    <option value="Technician">Technician</option>
                    <option value="Sales Man">Sales Man</option>
                  </select>
                </div>
                {/* Branch Dropdown */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Select Branch
                  </label>
                  <select
                    value={selectedBranch}
                    onChange={handleBranchChange}
                    className="border p-2 rounded w-full focus:outline-none"
                  >
                    <option value="">Select Branch</option>
                    {branchList.map((branch) => (
                      <option key={branch.id} value={branch.branchNumber}>
                        {branch.branchName}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Address */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleAddressChange}
                    className="border p-2 rounded w-full focus:outline-none"
                  />
                </div>
              </div>
              {/* Problems */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Problems
                </label>
                <textarea
                  name="problem"
                  value={problem}
                  onChange={handleProblemChange}
                  className="w-full border p-2 rounded mb-4 focus:outline-none"
                ></textarea>
              </div>
              {/* Save Button */}
              <button
                type="button"
                className="bg-green-600 text-white py-2 px-6 rounded font-bold hover:bg-green-500 mx-auto block"
                onClick={handleSaveTicket}
              >
                {isEditMode ? 'Save Changes' : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}

      {isMoreDetailsModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg relative w-[550px]">
            <button
              onClick={handleCloseMoreDetailsModal}
              className="absolute top-2 right-2 text-white cursor-pointer bg-green-600 rounded-full w-6 h-6"
            >
              X
            </button>
            <h2 className="text-xl font-bold text-center mb-4">
              Ticket Details
            </h2>
            <div>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Staff Name:</strong> {selectedTicket.staffName}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Staff Number:</strong> {selectedTicket.staffNumber}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Date:</strong> {selectedTicket.ticket_date}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Problem:</strong> {selectedTicket.problem}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Branch:</strong> {selectedTicket.branchName}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Address:</strong> {selectedTicket.address}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Other Information:</strong>{' '}
                {selectedTicket.otherInformation}
              </p>
            </div>
          </div>
        </div>
      )}

      <TableWithSearchFilter
        type="tickets"
        onCreateNew={handleOpenModalForAdd}
        onEdit={handleOpenModalForEdit}
        onDetails={handleOpenMoreDetailsModal}
        onDelete={() => {}}
      />
    </div>
  );
};

export default Tickets;
