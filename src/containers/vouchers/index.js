import React, { useEffect, useState } from 'react';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { useNavigate } from 'react-router';
import { getPermissions } from '../../common/commonUtils';
import DateConvert from '../../components/dateConvert';

const Vouchers = () => {
  const navigate = useNavigate();
  const [voucherList, setVoucherList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [voucherID, setVoucherID] = useState('');
  const [voucherName, setVoucherName] = useState('');
  const [selectedVoucherType, setSelectedVoucherType] = useState('');
  const [popupData, setPopupData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const perms = getPermissions('vendor');
    setPermissions(perms);
  }, [permissions]);

  const handleSearch = () => {
    const filtered = voucherList.filter((item) => {
      const matchID = voucherID
        ? String(item.voucherId).includes(voucherID)
        : true;
      const matchType = selectedVoucherType
        ? item.voucherType === selectedVoucherType
        : true;

      return matchID && matchType;
    });

    setFilteredData(filtered);
  };

  const handleNavigation = () => {
    navigate('/select-branch');
  };

  useEffect(() => {
    const fetchAllVouchers = async () => {
      try {
        const response = await ApiService.post('/voucher/getAllVouchers', {
          companyCode: initialAuthState?.companyCode,
          unitCode: initialAuthState?.unitCode,
        });

        if (response.status) {
          console.log('qqqqqqq', response.data);
          setVoucherList(response.data);
          setFilteredData(response.data); // show all vouchers initially
        } else {
          console.error('Failed to fetch voucher list');
        }
      } catch (error) {
        console.error('Error fetching voucher list:', error);
      }
    };

    fetchAllVouchers();
  }, []);

  const handleActionClick = (event, item) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setPopupData((prev) =>
      prev && prev.item.id === item.id
        ? null
        : {
            item,
            position: {
              top: rect.top + window.scrollY + 30,
              left: rect.left + window.scrollX - 50,
            },
          }
    );
  };

  const handleEdit = (item) => {
    navigate('/edit-voucher', { state: { item } });
    setPopupData(null);
  };

  // const handleMoreDetails = (item) => {
  //   navigate('/voucher-details', { state: { item } });
  //   setPopupData(null);
  // };

  const voucherTypes = Array.from(
    new Set(voucherList.map((v) => v.voucherType))
  );

  const handleMoreDetails = (item) => {
    setSelectedVoucher(item);
    setShowModal(true);
    setPopupData(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVoucher(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Vouchers</h2>
        <button
          onClick={handleNavigation}
          className={`px-4 py-2 text-white rounded-md transition ${permissions.add ? 'bg-blue-300 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
          disabled={!permissions.add}
        >
          + Create Vouchers
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Voucher ID"
          value={voucherID}
          onChange={(e) => setVoucherID(e.target.value)}
          className="border rounded-md p-3 w-full"
        />

        <select
          value={selectedVoucherType}
          onChange={(e) => setSelectedVoucherType(e.target.value)}
          className="border rounded-md p-3 w-full"
        >
          <option value="">Select Voucher Type</option>
          {voucherTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="bg-green-600 text-white font-semibold rounded-md w-full p-3 hover:bg-green-700"
        >
          SEARCH
        </button>
      </div>

      {popupData && (
        <div
          className="popup-menu absolute bg-white border border-gray-300 shadow-md rounded-lg py-2 w-40"
          style={{
            top: `${popupData.position.top}px`,
            left: `${popupData.position.left}px`,
            height: '42px',
            width: '105px',
            borderRadius: '5px',
            backgroundColor: '#F1F1F1',
          }}
        >
          {/* <button
            className="block px-4 py-1 text-left w-full hover:bg-gray-100"
            style={{ fontSize: '13px', color: '#000000', fontWeight: '400' }}
            onClick={() => handleEdit(popupData.item)}
          >
            Edit
          </button> */}

          {/* Horizontal Line */}
          {/* <hr className="border-gray-300 my-1" /> */}

          {permissions.edit &&<button
            className="block px-4 py-1 text-left w-full hover:bg-gray-100"
            onClick={() => handleEdit(popupData.item)}
            style={{ fontSize: '12px', color: '#000000', fontWeight: '400' }}
          >
            Edit
          </button>}

          {permissions.view &&<button
            className="block px-4 py-1 text-left w-full hover:bg-gray-100"
            onClick={() => handleMoreDetails(popupData.item)}
            style={{ fontSize: '12px', color: '#000000', fontWeight: '400' }}
          >
            More Details
          </button>}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Voucher ID</th>
              <th className="p-3">Branch</th>
              <th className="p-3">Voucher Type</th>
              <th className="p-3">Voucher ID</th>
              <th className="p-3">Generation Date/Time</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment Mode</th>
              <th className="p-3">Date</th>
              <th className="p-3">Payment Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData?.map((voucher, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                <td className="p-3">{voucher.voucherId}</td>
                <td className="p-3">{voucher.branchName}</td>
                <td className="p-3">{voucher.voucherType}</td>
                <td className="p-3 ">{voucher.invoiceId}</td>
                <td className="p-3 ">
                  {new Date(voucher.generationDate).toLocaleDateString('en-IN')}
                </td>
                <td className="p-3">{voucher.amount}</td>
                <td className="p-3">{voucher.paymentType}</td>
                <td className="p-3">{DateConvert(voucher.createdAt)}</td>
                <td className="p-3">{voucher.paymentStatus}</td>
                <td
                  className="px-4 py-2 text-center"
                  onClick={(e) => handleActionClick(e, voucher)}
                >
                  <FaEllipsisV className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && selectedVoucher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl font-bold text-gray-600 hover:text-gray-800"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Voucher Details</h3>
            <p>
              <strong>Voucher ID:</strong> {selectedVoucher.voucherId}
            </p>
            <p>
              <strong>Branch:</strong> {selectedVoucher.branchName}
            </p>
            <p>
              <strong>Voucher Type:</strong> {selectedVoucher.voucherType}
            </p>
            {/* <p>
              <strong>Generation Date:</strong> {selectedVoucher.generationDate}
            </p> */}
            <p>
              <strong>Generation Date:</strong>{' '}
              {new Date(selectedVoucher.generationDate).toLocaleDateString(
                'en-GB'
              )}
            </p>
            <p>
              <strong>Amount:</strong> ₹{selectedVoucher.amount}
            </p>
            <p>
              <strong>Payment Mode:</strong> {selectedVoucher.paymentType}
            </p>
            <p>
              <strong>Payment Status:</strong> {selectedVoucher.paymentStatus}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vouchers;
