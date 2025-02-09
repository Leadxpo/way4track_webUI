import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const BankDetails = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      transId: 'TRA0002211',
      accountType: 'Saving Account',
      date: '11 Mar 2029',
      credit: 3424444,
      debit: 0,
      balance: 545663,
    },
    {
      id: 2,
      transId: 'TRA0002288',
      accountType: 'Saving Account',
      date: '11 Mar 2029',
      credit: 0,
      debit: 45748433,
      balance: 67686449,
    },
    {
      id: 3,
      transId: 'TRA0002255',
      accountType: 'Saving Account',
      date: '11 Mar 2029',
      credit: 5667689,
      debit: 0,
      balance: 56558475,
    },
    {
      id: 4,
      transId: 'TRA0002244',
      accountType: 'Saving Account',
      date: '11 Mar 2029',
      credit: 45733958,
      debit: 0,
      balance: 577894,
    },
  ]);

  const totalAmount = transactions.reduce((acc, t) => acc + t.balance, 0);

  const handleAddAmount = () => {
    if (amount) {
      const newTransaction = {
        id: transactions.length + 1,
        transId: `TRA${String(transactions.length + 1).padStart(7, '0')}`,
        accountType: 'Saving Account',
        date: new Date().toLocaleDateString(),
        credit: parseFloat(amount),
        debit: 0,
        balance: totalAmount + parseFloat(amount),
      };
      setTransactions([...transactions, newTransaction]);
      setAmount('');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg w-full max-w-4xl mx-auto space-y-6">
      {/* Bank Details Section */}
      <h1 className="text-2xl font-bold mb-4">Bank Details</h1>
      <div className="space-y-4">
        {[
          { label: 'Account Holder Name', value: 'Sathya Dheav' },
          { label: 'Bank Name', value: 'SBI Bank' },
          { label: 'A/c No.', value: '28473957543045' },
          { label: 'A/c Type', value: 'Saving Account' },
          { label: 'IFSC Code', value: 'RE45DERGDD' },
          { label: 'Bank Address', value: '****************************' },
        ].map((field, index) => (
          <div key={index}>
            <p className="font-semibold">{field.label}</p>
            <input
              type="text"
              value={field.value}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-100"
            />
          </div>
        ))}
      </div>

      {/* Amount Input Section */}
      <div className="flex items-center space-x-4">
        <p className="text-lg font-semibold">Amount:</p>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter Amount"
          className="p-2 border rounded-md bg-gray-100 w-1/2"
          disabled
        />
        {/* <button
          onClick={() => navigate('/add-amount')}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Add Amount
        </button> */}
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {[
                'NO.',
                'Transcation ID',
                'A/c Type',
                'Date / Time',
                'Credit',
                'Debit',
                'Balance',
              ].map((header) => (
                <th key={header} className="border p-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{transaction.transId}</td>
                <td className="border p-2">{transaction.accountType}</td>
                <td className="border p-2">{transaction.date}</td>
                <td className="border p-2">{transaction.credit || '-'}</td>
                <td className="border p-2">{transaction.debit || '-'}</td>
                <td className="border p-2">{transaction.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="text-right font-bold text-lg mt-4">
        All Amount: {totalAmount.toLocaleString('en-IN')} /-
      </div>
    </div>
  );
};

export default BankDetails;
