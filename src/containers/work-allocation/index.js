import React, { useState } from 'react';
import TableWithSearchFilter from '../tablesSearchFilter';

const WorkAllocation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWorkAllocation, setSelectedWorkAllocation] = useState(null);
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);

  const handleOpenModalForAdd = () => {
    setSelectedWorkAllocation(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (voucher) => {
    setSelectedWorkAllocation(voucher);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorkAllocation(null);
  };

  const handleOpenMoreDetailsModal = (voucher) => {
    console.log(voucher);
    setSelectedWorkAllocation(voucher);
    setIsMoreDetailsModalOpen(true);
  };

  const handleCloseMoreDetailsModal = () => {
    setIsMoreDetailsModalOpen(false);
    setSelectedWorkAllocation(null);
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
                  <input
                    type="text"
                    className="border p-2 rounded w-full focus:outline-none"
                    defaultValue={
                      isEditMode && selectedWorkAllocation
                        ? selectedWorkAllocation.issuedPerson
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
                      isEditMode && selectedWorkAllocation
                        ? selectedWorkAllocation.takenPerson
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
                      isEditMode && selectedWorkAllocation
                        ? selectedWorkAllocation.Date
                        : ''
                    }
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
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Allocated to
                  </label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full focus:outline-none"
                    defaultValue={
                      isEditMode && selectedWorkAllocation
                        ? selectedWorkAllocation.paymentMode
                        : ''
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
                      isEditMode && selectedWorkAllocation
                        ? selectedWorkAllocation.Date
                        : ''
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
                    isEditMode && selectedWorkAllocation
                      ? selectedWorkAllocation.otherInformation
                      : ''
                  }
                />
              </div>
              <button className="bg-green-600 text-white py-2 px-6 rounded font-bold hover:bg-green-500 mx-auto block">
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
                {selectedWorkAllocation.issuedPerson}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Client Number : </strong>{' '}
                {selectedWorkAllocation.takenPerson}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Date : </strong> {selectedWorkAllocation.Date}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Service / Product :</strong>{' '}
                {selectedWorkAllocation.Amount}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Allocated to : </strong>{' '}
                {selectedWorkAllocation.paymentMode}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Address : </strong> {selectedWorkAllocation.Date}
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
