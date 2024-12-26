import React, { useState } from 'react';
import TableWithSearchFilter from '../tablesSearchFilter';

const Tickets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);

  const handleOpenModalForAdd = () => {
    setSelectedTicket(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (ticket) => {
    setSelectedTicket(ticket);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const handleOpenMoreDetailsModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsMoreDetailsModalOpen(true);
  };

  const handleCloseMoreDetailsModal = () => {
    setIsMoreDetailsModalOpen(false);
    setSelectedTicket(null);
  };

  return (
    <div className="p-10">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-bold">Tickets</p>
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
              {isEditMode ? 'Edit Ticket' : 'Create Ticket'}
            </h2>
            <form>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full focus:outline-none"
                    defaultValue={
                      isEditMode && selectedTicket
                        ? selectedTicket.clientName
                        : ''
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Client Number
                  </label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full focus:outline-none"
                    defaultValue={
                      isEditMode && selectedTicket
                        ? selectedTicket.clientNumber
                        : ''
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    className="border p-2 rounded w-full focus:outline-none"
                    defaultValue={
                      isEditMode && selectedTicket ? selectedTicket.date : ''
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Problem
                  </label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full focus:outline-none"
                    defaultValue={
                      isEditMode && selectedTicket ? selectedTicket.problem : ''
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Select Branch
                  </label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full focus:outline-none"
                    defaultValue={
                      isEditMode && selectedTicket ? selectedTicket.branch : ''
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full focus:outline-none"
                    defaultValue={
                      isEditMode && selectedTicket ? selectedTicket.address : ''
                    }
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
                    isEditMode && selectedTicket
                      ? selectedTicket.otherInformation
                      : ''
                  }
                ></textarea>
              </div>
              <button className="bg-green-600 text-white py-2 px-6 rounded font-bold hover:bg-green-500 mx-auto block">
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
                <strong>Client Name:</strong> {selectedTicket.clientName}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Client Number:</strong> {selectedTicket.clientNumber}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Date:</strong> {selectedTicket.date}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Problem:</strong> {selectedTicket.problem}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Branch:</strong> {selectedTicket.branch}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Address:</strong> {selectedTicket.address}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Other Information:</strong>{' '}
                {selectedTicket.otherInformation}
              </p>
            </div>
            <button className="bg-green-600 text-white py-2 px-6 rounded font-bold hover:bg-blue-500 mx-auto block mt-4">
              Download PDF
            </button>
          </div>
        </div>
      )}

      <TableWithSearchFilter
        type="tickets"
        onEdit={handleOpenModalForEdit}
        onDetails={handleOpenMoreDetailsModal}
        onDelete={() => {}}
      />
    </div>
  );
};

export default Tickets;
