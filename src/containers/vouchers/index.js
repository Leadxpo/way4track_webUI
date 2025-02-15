import React, { useState, useEffect } from 'react';
import TableWithSearchFilter from '../tablesSearchFilter';
import { useNavigate } from 'react-router';
import { formatString } from '../../common/commonUtils';
import { getPermissions } from '../../common/commonUtils';
const Vouchers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Receipt');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('Cash');
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  useEffect(() => {
    const perms = getPermissions('voucher');
    setPermissions(perms);
  }, []);

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
          className={`h-12 px-8 text-white font-bold rounded-md hover:cursor-pointer  ${!permissions.add ? 'bg-yellow-400 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
          onClick={handleOpenModalForAdd}
          // disabled={!!permissions.add}
        >
          Create Voucher
        </button>
      </div>

      {isMoreDetailsModalOpen && selectedVoucher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg relative w-[700px] max-h-[80vh] overflow-auto">
            <button
              onClick={handleCloseMoreDetailsModal}
              className="absolute top-2 right-4 text-white cursor-pointer bg-green-600 rounded-full w-6 h-6"
            >
              X
            </button>
            <h2 className="text-xl font-bold text-center mb-4">
              Voucher Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(selectedVoucher).map(([key, value]) => {
                const formattedKey = key
                  .replace(/^cl_/, 'Client ') // Replace "cl_" with "Client "
                  .replace(/^branch_/, 'Branch ') // Replace "branch_" with "Branch "
                  .replace(/_/g, ' ') // Replace underscores with spaces
                  .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
                return (
                  <div
                    key={key}
                    className="shadow-md rounded-md p-3 border border-gray-200"
                  >
                    <strong className="block text-gray-700">
                      {formattedKey}:
                    </strong>
                    <span className="text-gray-900">
                      {value !== null ? value.toString() : 'N/A'}
                    </span>
                  </div>
                );
              })}
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
        showCreateBtn={false}
        showDelete={permissions.delete}
        showEdit={permissions.edit}
        showDetails={permissions.view}
      />
    </div>
  );
};

export default Vouchers;
