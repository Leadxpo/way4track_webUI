import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService'; // Adjust the import based on your structure
import TableWithSearchFilter from '../tablesSearchFilter';
import { initialAuthState } from '../../services/ApiService';
import { useNavigate, useLocation } from 'react-router-dom';
const Tickets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
  const [staffList, setStaffList] = useState([]); // Store fetched staff names
  const [branchList, setBranchList] = useState([]); // Store fetched branches
  const [selectedStaffId, setSelectedStaffId] = useState(''); // Selected staff ID
  const [selectedStaffNumber, setSelectedStaffNumber] = useState(''); // Staff number
  const [selectedBranch, setSelectedBranch] = useState(''); // Selected branch
  const [date, setDate] = useState(''); // Date state
  const navigate = useNavigate();
  const location = useLocation();

  const tickettData = location.state?.tickettDetails || {};
  useEffect(() => {
    if (isModalOpen) {
      fetchStaffNames();
      fetchBranches();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isEditMode && selectedTicket) {
      setDate(selectedTicket.date.slice(0, 10)); // Set date in yyyy-MM-dd format for editing
    }
  }, [isEditMode, selectedTicket]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
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

  const handleOpenModalForAdd = () => {
    setSelectedTicket(null);
    setIsEditMode(false);
    setIsModalOpen(true);
    setSelectedStaffId('');
    setSelectedStaffNumber('');
    setSelectedBranch('');
    setDate(''); // Reset date for Add
  };

  const handleOpenModalForEdit = (ticket) => {
    setSelectedTicket(ticket);
    setIsEditMode(true);
    setIsModalOpen(true);
    setSelectedStaffId(ticket?.staffId || '');
    setSelectedStaffNumber(ticket?.staffNumber || '');
    setSelectedBranch(ticket?.branch || '');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
    setSelectedStaffId('');
    setSelectedStaffNumber('');
    setSelectedBranch('');
    setDate('');
  };

  const handleOpenMoreDetailsModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsMoreDetailsModalOpen(true);
  };

  const handleCloseMoreDetailsModal = () => {
    setIsMoreDetailsModalOpen(false);
    setSelectedTicket(null);
  };

  const handleSaveTicket = async () => {
    const payload = {
      id: tickettData.id,
      staffId: selectedStaffId,
      date: date,
      // date: tickettData.date,
      branchId: selectedBranch,
      problem: document.querySelector('[name="problem"]').value,
      addressingDepartment: tickettData.addressingDepartment || '',
      companyCode: initialAuthState.companyCode,
      unitCode: initialAuthState.unitCode,
    };

    try {
      const endpoint = formData.id
        ? '/tickets/handleTicketDetails'
        : '/tickets/handleTicketDetails';
      const response = await ApiService.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.data.status) {
        alert(
          formData.id
            ? 'Ticket updated successfully!'
            : 'Ticket saved successfully!'
        );
        navigate('/vendors');
      } else {
        alert('Failed to save employee details. Please try again.');
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving ticket', error);
      alert('Failed to save employee details. Please try again.');
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
                      <option key={staff.id} value={staff.name}>
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
                    // onChange={handleInputChange}
                    className="border p-2 rounded w-full focus:outline-none"
                  />
                </div>
                {/* Problem */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Problem
                  </label>
                  <input
                    type="text"
                    name="problem"
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full focus:outline-none"
                    defaultValue={
                      isEditMode && selectedTicket ? selectedTicket.problem : ''
                    }
                  />
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
                      <option key={branch.id} value={branch.branchName}>
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
                    className="border p-2 rounded w-full focus:outline-none"
                    onChange={handleInputChange}
                    defaultValue={
                      isEditMode && selectedTicket ? selectedTicket.address : ''
                    }
                  />
                </div>
                <div>
                  <p className="font-semibold mb-1">Addressing Department</p>
                  <select
                    name="addressingDepartment"
                    value={formData.addressingDepartment}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                  >
                    <option value="">Select addressingDepartment</option>
                    <option value="CEO">CEO</option>
                    <option value="HR">HR</option>
                    <option value="Accountant">Accountant</option>
                    <option value="BranchManager">Branch Manager</option>
                    <option value="SubDealer">Sub Dealer</option>
                    <option value="Technician">Technician</option>
                    <option value="SalesMan">Sales Man</option>
                    <option value="CallCenter">Call Center</option>
                    <option value="Warehouse Manager">Warehouse Manager</option>
                  </select>
                </div>
              </div>
              {/* Problems */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Problems
                </label>
                <textarea
                  className="w-full border p-2 rounded mb-4 focus:outline-none"
                  onChange={handleInputChange}
                  defaultValue={
                    isEditMode && selectedTicket
                      ? selectedTicket.otherInformation
                      : ''
                  }
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
