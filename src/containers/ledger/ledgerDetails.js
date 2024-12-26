import React from 'react';

const LedgerDetails = () => {
  const clientData = {
    name: 'Sai Kumar',
    email: 'way4teack@gmail.com',
    phone: '+91 45645 64556',
    gst: '**********',
    image: 'https://randomuser.me/api/portraits/men/45.jpg', // Sample image URL
  };

  const ledgerData = [
    {
      no: '001',
      voucherId: 'way4track23',
      purpose: 'Car GPS Tracker',
      date: 'Petrol',
      debit: '₹5000',
      credit: '₹0',
    },
    {
      no: '002',
      voucherId: 'way4track23',
      purpose: 'Car GPS Tracker',
      date: 'Books',
      debit: '₹1000',
      credit: '₹0',
    },
    {
      no: '003',
      voucherId: 'way4track23',
      purpose: 'Car GPS Tracker',
      date: 'Pens',
      debit: '₹3000',
      credit: '₹0',
    },
    {
      no: '004',
      voucherId: 'way4track23',
      purpose: 'Car GPS Tracker',
      date: 'Advances',
      debit: '₹2000',
      credit: '₹0',
    },
  ];

  const totalAmount = ledgerData.reduce(
    (total, entry) => total + parseInt(entry.debit.replace('₹', '')),
    0
  );

  return (
    <div className="p-8 space-y-6">
      {/* Client Profile Section */}
      <div className="flex items-center bg-white p-6 rounded-lg shadow-lg">
        <img
          src={clientData.image}
          alt="Client Profile"
          className="w-24 h-24 rounded-full object-cover mr-6"
        />
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
              <th className="py-2 px-4">Voucher ID</th>
              <th className="py-2 px-4">Purpose</th>
              <th className="py-2 px-4">Date/Time</th>
              <th className="py-2 px-4">Debit</th>
              <th className="py-2 px-4">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {ledgerData.map((entry, index) => (
              <tr
                key={entry.no}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="py-2 px-4">{entry.no}</td>
                <td className="py-2 px-4">{entry.voucherId}</td>
                <td className="py-2 px-4">{entry.purpose}</td>
                <td className="py-2 px-4">{entry.date}</td>
                <td className="py-2 px-4">{entry.debit}</td>
                <td className="py-2 px-4">{entry.credit}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 text-right font-semibold">
          Total Amount: ₹{totalAmount}
        </div>
      </div>
    </div>
  );
};

export default LedgerDetails;
