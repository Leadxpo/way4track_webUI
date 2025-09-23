import React, { useEffect, useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { useLocation, useNavigate } from 'react-router';
import DateConvert from '../../components/dateConvert';

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
          // Set ledger data
          setLedgerData(ledgerEntries);

          const rrr = ledgerEntries.vouchers?.filter(
            (item) => item.voucherType !== "CONTRA" 
          );
          setLedgerVoucherData(rrr)
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
  const totalDebit = ledgerVoucherData.reduce((total, entry) => {
    const amount = parseFloat(entry?.amount) || 0;
    if (['PAYMENT', 'DEBITNOTE', 'SALES'].includes(entry.voucherType)) {
      return total + amount;
    }
    return total;
  }, 0);
  
  const totalCredit = ledgerVoucherData.reduce((total, entry) => {
    const amount = parseFloat(entry?.amount) || 0;
    if (['RECEIPT', 'CREDITNOTE', 'JOURNAL', 'PURCHASE'].includes(entry.voucherType)) {
      return total + amount;
    }
    return total;
  }, 0);
  
  const closingBalance = totalDebit - totalCredit;
  
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
          className="block btn-primary rounded px-4 py-2 text-left text-sm hover:bg-gray-100" style={{ position: 'relative', zIndex: 99, top: -80, right: -100 }}
        >
          Edit Ledger
        </button>
      </div>

      {/* Ledger Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Ledger</h2>
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">NO.</th>
              <th className="py-2 px-4">Date/Time</th>
              <th className="py-2 px-4">Payment Type</th>
              <th className="py-2 px-4">Voucher Type</th>
              <th className="py-2 px-4">Debit</th>
              <th className="py-2 px-4">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ledgerVoucherData.map((entry, index) => {
              let amountType = "";
              switch (entry?.voucherType) {
                case 'PAYMENT':
                case 'DEBITNOTE':
                case 'SALES':
                  amountType = 'Debit';
                  break;
                case 'RECEIPT':
                case 'CREDITNOTE':
                case 'JOURNAL':
                case 'PURCHASE':
                  amountType = "Credit";
                  break;
                default:
                  amountType = 0;
              }
              return (
                <tr
                  key={entry.id}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    {DateConvert(entry.createdAt)}
                  </td>
                  <td className="py-2 px-4">{entry.paymentType}</td>
                  <td className="py-2 px-4">{entry.voucherType}</td>
                  <td className="py-2 px-4">{amountType === 'Debit' ? entry.amount : ""}</td>
                  <td className="py-2 px-4">{amountType === 'Credit' ? entry.amount : ""}</td>
                </tr>
              )
            })}
          </tbody>
          <tbody>
  <tr className="bg-gray-100 font-bold">
    <td colSpan="4" className="py-2 px-4 text-right">Total</td>
    <td className="py-2 px-4 text-green-700">₹{totalDebit.toFixed(2)}</td>
    <td className="py-2 px-4 text-red-700">₹{totalCredit.toFixed(2)}</td>
  </tr>
  <tr className="bg-gray-50 font-bold">
    <td colSpan="4" className="py-2 px-4 text-right">Closing Balance</td>
    {totalDebit <= totalCredit  && 
       <td className="py-2 px-4 text-right"> </td>
      } 
    <td colSpan='2' className="py-2 px-4 text-blue-700">
      ₹{closingBalance.toFixed(2)} ({closingBalance >= 0 ? 'Dr' : 'Cr'})
    </td>
  </tr>
</tbody>

        </table>
        
      </div>
    </div>
  );
};

export default LedgerDetails;
