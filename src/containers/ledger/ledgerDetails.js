import React, { useEffect, useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { useLocation, useNavigate } from 'react-router';

const LedgerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ledgerDetails = location.state?.ledgerDetails || {};

  // State to store ledger data and client information
  const [ledgerData, setLedgerData] = useState([]);
  const [ledgerVoucherData, setLedgerVoucherData] = useState([]);

  useEffect(() => {

    const fetchLedgerDetailsById = async () => {

      try {
        const response = await ApiService.post(
          '/ledger/getLedgerDetailsById',
          {
            id: ledgerDetails.id,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );

        if (response.status) {
          const ledgerEntries = response.data;
          console.log("rrr :", ledgerEntries)
          // Extract client details from the first valid entry
          // if (firstEntry) {
          //   setledgerData({
          //     name:
          //       firstEntry.clientName ||
          //       firstEntry.vendorName ||
          //       firstEntry.subDealerName ||
          //       ledgerData.name,
          //     phone: firstEntry.phoneNumber || ledgerData.phone,
          //     email: firstEntry.email || ledgerData.email,
          //     gst: firstEntry.GSTNumber || ledgerData.gst,
          //     image:
          //       firstEntry.clientPhoto ||
          //       firstEntry.vendorPhoto ||
          //       firstEntry.subDealerPhoto ||
          //       '',
          //   });
          // }

          // Set ledger data
          setLedgerData(ledgerEntries);
          setLedgerVoucherData(ledgerEntries.vouchers)
        }
      } catch (error) {
        console.error('Error fetching ledger details:', error);
      }
    };

    fetchLedgerDetailsById();
  }, []);

  const handleEdit = (ledger) => {
    console.log("aaa :", ledger)
    navigate('/add-ledger', {
      state: { ledgerDetails: ledger },
    });
  };
  // Calculate total amount
  const totalAmount = ledgerData?.vouchers?.reduce(
    (total, entry) => total + (parseInt(entry?.amount) || 0),
    0
  );

  return (
    <div className="p-8 space-y-6">
      {/* Client Profile Section */}
      <div className="flex items-center bg-white p-6 rounded-lg shadow-lg">

        {ledgerData && (
          <div >
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">Ledger Details</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-700" style={{ justifyContent: 'space-between' }}>
              <div>
                <span className="font-semibold">Name:</span> {ledgerData.name}
              </div>
              <div>
                <span className="font-semibold">State:</span> {ledgerData.state}
              </div>
              <div>
                <span className="font-semibold">Country:</span> {ledgerData.country}
              </div>
              <div>
                <span className="font-semibold">PAN Number:</span> {ledgerData.panNumber || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Registration Type:</span> {ledgerData.registrationType}
              </div>
              <div>
                <span className="font-semibold">GST UIN:</span> {ledgerData.gstUinNumber || 'N/A'}
              </div>
              <div>
                <span className="font-semibold">Group:</span> {ledgerData.group}
              </div>
              <div>
                <span className="font-semibold">TDS Deductable:</span> {ledgerData.tdsDeductable ? 'Yes' : 'No'}
              </div>
              <div>
                <span className="font-semibold">TCS Deductable:</span> {ledgerData.tcsDeductable ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            handleEdit(ledgerData)
          }} type='button'
          className="block btn-primary rounded px-4 py-2 text-left text-sm hover:bg-gray-100" style={{position:'relative', zIndex:99,top:-80,right:-100}}
        >
          Edit Ledger
        </button>      </div>

      {/* Ledger Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Ledger</h2>
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">NO.</th>
              <th className="py-2 px-4">Ledger ID</th>
              <th className="py-2 px-4">Date/Time</th>
              <th className="py-2 px-4">Payment Type</th>
              <th className="py-2 px-4">Voucher Type</th>
              <th className="py-2 px-4">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ledgerVoucherData.map((entry, index) => (
              <tr
                key={entry.id}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{entry.id}</td>
                <td className="py-2 px-4">
                  {new Date(entry.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4">{entry.paymentType}</td>
                <td className="py-2 px-4">{entry.voucherType}</td>
                <td className="py-2 px-4">{entry.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right font-semibold">
          Total Debit Amount: ₹{totalAmount}
        </div>
      </div>
    </div>
  );
};

export default LedgerDetails;
