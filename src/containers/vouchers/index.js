import React, { useState } from 'react';
import TableWithSearchFilter from '../tablesSearchFilter';
import { useNavigate } from 'react-router';

const Vouchers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Receipt');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Cash');
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenModalForAdd = () => {
    navigate('/add-voucher');
  };

  const handleOpenModalForEdit = (voucher) => {
    setSelectedVoucher(voucher);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVoucher(null);
  };

  const handleOpenMoreDetailsModal = (voucher) => {
    console.log(voucher);
    setSelectedVoucher(voucher);
    setIsMoreDetailsModalOpen(true);
  };

  const handleCloseMoreDetailsModal = () => {
    setIsMoreDetailsModalOpen(false);
    setSelectedVoucher(null);
  };

  return (
    <div className="p-10">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-bold">Vouchers</p>
        <button
          className="h-12 px-8 bg-yellow-400 text-white font-bold rounded-md hover:cursor-pointer"
          onClick={handleOpenModalForAdd}
        >
          Create Voucher
        </button>
      </div>

      {isMoreDetailsModalOpen && selectedVoucher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg relative w-[550px]">
            <button
              onClick={handleCloseMoreDetailsModal}
              className="absolute top-2 right-2 text-white cursor-pointer bg-green-600 rounded-full w-6 h-6"
            >
              X
            </button>
            <h2 className="text-xl font-bold text-center mb-4">
              Voucher Details
            </h2>
            <div>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Voucher Issued Person:</strong>{' '}
                {selectedVoucher.issuedPerson}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Voucher Taken Person:</strong>{' '}
                {selectedVoucher.takenPerson}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Purposes:</strong> {selectedVoucher.Purpose}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Amount:</strong> {selectedVoucher.Amount}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Payment Mode:</strong> {selectedVoucher.paymentMode}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Date:</strong> {selectedVoucher.Date}
              </p>
              <p className="shadow-lg rounded-md p-4 my-2 border border-gray-200">
                <strong>Other Information:</strong>{' '}
                {selectedVoucher.otherInformation}
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
        onDelete={() => {}}
        showDelete={false}
        showCreateBtn={false}
      />
    </div>
  );
};

export default Vouchers;
