import React, { useEffect, useState } from 'react';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { useNavigate } from 'react-router';

const Vouchers = () => {
  const navigate = useNavigate();
  const [voucherList, setVoucherList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [voucherID, setVoucherID] = useState('');
  const [voucherName, setVoucherName] = useState('');
  const [selectedVoucherType, setSelectedVoucherType] = useState('');
  const [popupData, setPopupData] = useState(null);

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

  const handleMoreDetails = (item) => {
    navigate('/voucher-details', { state: { item } });
    setPopupData(null);
  };

  const voucherTypes = Array.from(
    new Set(voucherList.map((v) => v.voucherType))
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Vouchers</h2>
        <button
          onClick={handleNavigation}
          className="bg-yellow-300 text-black font-semibold px-4 py-2 rounded-full shadow-md hover:brightness-95"
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
            height: '82px',
            width: '105px',
            borderRadius: '5px',
            backgroundColor: '#F1F1F1',
          }}
        >
          <button
            className="block px-4 py-1 text-left w-full hover:bg-gray-100"
            style={{ fontSize: '13px', color: '#000000', fontWeight: '400' }}
            onClick={() => handleEdit(popupData.item)}
          >
            Edit
          </button>

          {/* Horizontal Line */}
          <hr className="border-gray-300 my-1" />

          <button
            className="block px-4 py-1 text-left w-full hover:bg-gray-100"
            onClick={() => handleMoreDetails(popupData.item)}
            style={{ fontSize: '12px', color: '#000000', fontWeight: '400' }}
          >
            More Details
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Voucher ID</th>
              <th className="p-3">Branch</th>
              <th className="p-3">Voucher Type</th>
              <th className="p-3">Generation Date/Time</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Payment Mode</th>
              <th className="p-3">Payment Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData?.map((voucher, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                <td className="p-3">{voucher.voucherId}</td>
                <td className="p-3">{voucher.branch}</td>
                <td className="p-3">{voucher.paymentType}</td>
                <td className="p-3 ">{voucher.generationDate}</td>
                <td className="p-3">{voucher.amount}</td>
                <td className="p-3">{voucher.paymentMode}</td>
                <td className="p-3">{voucher.paymentStatus}</td>
                {/* <td
                  className="px-4 py-2 text-center"
                  onClick={(e) => handleActionClick(e, voucher)}
                >
                  <FaEllipsisV className="cursor-pointer" />
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vouchers;
