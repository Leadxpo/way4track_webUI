import React, { useEffect, useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { useLocation } from 'react-router';

const LedgerDetails = () => {
  const location = useLocation();
  const ledgerDetails = location.state?.ledgerDetails || {};
  // Determine voucherId based on available values
  const voucherId =
    ledgerDetails.clientId ||
    ledgerDetails.vendorId ||
    ledgerDetails.subDealerId ||
    '';

  // State to store ledger data and client information
  const [ledgerData, setLedgerData] = useState([]);
  const [clientData, setClientData] = useState({
    name:
      ledgerDetails.clientName ||
      ledgerDetails.vendorName ||
      ledgerDetails.subDealerName ||
      'N/A',
    phone: ledgerDetails.phoneNumber || 'N/A',
    email: ledgerDetails.email || 'N/A',
    gst: ledgerDetails.GSTNumber || 'N/A',
    image: '', // To be set from API response
  });

  useEffect(() => {
    const fetchLedgerDetailsById = async () => {
      if (!voucherId) return; // Prevent API call if there's no valid voucherId

      try {
        const response = await ApiService.post(
          '/dashboards/getLedgerDataById',
          {
            voucherId,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          }
        );

        if (response.status && response.data.length > 0) {
          const ledgerEntries = response.data;

          // Extract client details from the first valid entry
          const firstEntry = ledgerEntries.find(
            (entry) =>
              entry.clientName || entry.vendorName || entry.subDealerName
          );
          if (firstEntry) {
            setClientData({
              name:
                firstEntry.clientName ||
                firstEntry.vendorName ||
                firstEntry.subDealerName ||
                clientData.name,
              phone: firstEntry.phoneNumber || clientData.phone,
              email: firstEntry.email || clientData.email,
              gst: firstEntry.GSTNumber || clientData.gst,
              image:
                firstEntry.clientPhoto ||
                firstEntry.vendorPhoto ||
                firstEntry.subDealerPhoto ||
                '',
            });
          }

          // Set ledger data
          setLedgerData(ledgerEntries);
        }
      } catch (error) {
        console.error('Error fetching ledger details:', error);
      }
    };

    fetchLedgerDetailsById();
  }, [voucherId]);

  // Calculate total amount
  const totalAmount = ledgerData.reduce(
    (total, entry) => total + (parseInt(entry.debitAmount) || 0),
    0
  );

  return (
    <div className="p-8 space-y-6">
      {/* Client Profile Section */}
      <div className="flex items-center bg-white p-6 rounded-lg shadow-lg">
        {clientData.image && (
          <img
            src={clientData.image}
            alt="Client Profile"
            className="w-24 h-24 rounded-full object-cover mr-6"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">Client Profile</h2>
          <p>Name: {clientData.name}</p>
          <p>Email: {clientData.email}</p>
          <p>Phone Number: {clientData.phone}</p>
          <p>GST: {clientData.gst}</p>
        </div>
      </div>

      {/* Ledger Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Ledger</h2>
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">NO.</th>
              <th className="py-2 px-4">Ledger ID</th>
              <th className="py-2 px-4">Purpose</th>
              <th className="py-2 px-4">Date/Time</th>
              <th className="py-2 px-4">Debit</th>
              <th className="py-2 px-4">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ledgerData.map((entry, index) => (
              <tr
                key={entry.ledgerId}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{entry.ledgerId}</td>
                <td className="py-2 px-4">{entry.purpose}</td>
                <td className="py-2 px-4">
                  {new Date(entry.generationDate).toLocaleString()}
                </td>
                <td className="py-2 px-4">₹{entry.debitAmount}</td>
                <td className="py-2 px-4">₹{entry.creditAmount}</td>
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
