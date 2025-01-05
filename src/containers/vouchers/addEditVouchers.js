import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ReceiptForm from './receiptForm';
import PaymentForm from './paymentForm';
import JournalForm from './journalForm';
import ContraForm from './contraForm';
import ApiService from '../../services/ApiService';
import PurchaseForm from './purchaseForm';
import InvoiceForm from './invoiceForm';
const TABS = ['Receipt', 'Payment', 'Journal', 'Contra', 'Purchase', 'Invoice'];
const PAYMENT_MODES = ['Cash', 'UPI', 'Bank', 'Cheque', 'Card'];

const AddEditVouchers = () => {
  const [selectedTab, setSelectedTab] = useState('Receipt');
  const [branches, setBranches] = useState([]);
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/branch/getBranchNamesDropDown'
        ); // API call
        if (response.status) {
          setBranches(response.data); // Set branches to state
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

  const getFormComponent = (selectedTab) => {
    switch (selectedTab) {
      case 'Receipt':
        return <ReceiptForm branches={branches} />;
      case 'Payment':
        return <PaymentForm branches={branches} />;
      case 'Journal':
        return <JournalForm branches={branches} />;
      case 'Contra':
        return <ContraForm branches={branches} />;
      case 'Purchase':
        return <PurchaseForm branches={branches} />;
      case 'Invoice':
        return <InvoiceForm branches={branches} />;
    }
  };
  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex space-x-2 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${selectedTab === tab ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dynamic Form Fields */}
      {getFormComponent(selectedTab)}
    </div>
  );
};

export default AddEditVouchers;
