import React, { useState } from 'react';
import Tickets from '../../mockData/mockTickets.json';
import Table from '../../components/Table';
const TicketAssign = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [assignee, setAssignee] = useState('');
  const [comments, setComments] = useState('');
  const handleEditClick = (ticket) => {
    setSelectedTicket(ticket); // Set the selected ticket for the popup
    setIsPopupOpen(true); // Open the popup
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setAssignee('');
    setComments('');
    setSelectedTicket(null);
  };

  const handleAssign = () => {
    // Handle ticket assignment logic
    console.log(`Assigning ticket: ${selectedTicket.id}`);
    console.log(`Assignee: ${assignee}`);
    console.log(`Comments: ${comments}`);
    handlePopupClose(); // Close the popup after assignment
  };
  return (
    <div>
      <Table
        data={Tickets}
        columns={Object.keys(Tickets[0])}
        showDelete={false}
        showDetails={false}
        editText="Assign"
        onEdit={handleEditClick}
      />
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg">
            <h3 className="text-lg text-center font-semibold mb-4">
              Assign Ticket
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Branch</label>
              <select
                className="w-full border rounded p-2"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              >
                <option value="">Select Branch</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Team</label>
              <select
                className="w-full border rounded p-2"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              >
                <option value="">Select Team</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Staff Number
              </label>
              <input
                type="text"
                className="w-full border rounded p-2"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 rounded mr-2"
                onClick={handlePopupClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleAssign}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketAssign;
