import { type } from '@testing-library/user-event/dist/type';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import ReceiptForm from './receiptForm';
import PaymentForm from './paymentForm';
import JournalForm from './journalForm';
import ContraForm from './contraForm';
import ApiService, { initialAuthState } from '../../services/ApiService';
import PurchaseForm from './purchaseForm';
import InvoiceForm from './invoiceForm';
import EmiForm from './emiForm';
const TABS = ['Receipt', 'Payment', 'Journal', 'Contra', 'Purchase', 'EMI'];
const PAYMENT_MODES = ['Cash', 'UPI', 'Bank', 'Cheque', 'Card'];

const AddEditVouchers = () => {
  const [selectedTab, setSelectedTab] = useState('Receipt');
  const [branches, setBranches] = useState([]);
  const [bankOptions, setBankOptions] = useState([]);
  const [clients, setCleints] = useState([]);
  const [staff, setStaff] = useState([]);

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

    const fetchStaff = async () => {
      try {
        const response = await ApiService.post('/staff/getStaffNamesDropDown');
        const formattedOptions = response.data.map((client) => ({
          value: client.id,
          label: client.name,
        }));
        setStaff(formattedOptions);
      } catch (err) {
        console.error('Failed to fetch staff:', err);
        setStaff([]);
      }
    };

    const fetchBankOptions = async () => {
      try {
        const requestData = {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        };
        const response = await ApiService.post(
          '/account/getAccountsDropDown',
          requestData
        );
        const formattedOptions = response.data.map((account) => ({
          value: account.id || `Account ${account.id}`,
          label: account.accountName, // Provide fallback if accountName is missing
        }));

        // const formattedOptions = response.data.map((account) => ({
        //   value: account.id,
        //   label: account.accountName,
        // }));
        console.log(
          '+++++++====================================',
          formattedOptions
        );
        setBankOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching bank options:', error);
      }
    };

    const fetchClients = async () => {
      try {
        const requestData = {
          userId: 4,
          companyCode: 'WAY4TRACK',
          unitCode: 'WAY4',
        };
        const response = await ApiService.post(
          '/client/getClientNamesDropDown',
          requestData
        );
        console.log(response);
        const formattedOptions = response.data.map((client) => ({
          value: client.clientId,
          label: client.name,
        }));

        setCleints(formattedOptions);
      } catch (error) {
        console.error('Error fetching bank options:', error);
      }
    };

    const fetchStaffNames = async () => {
      try {
        const response = await ApiService.post('/staff/getStaffNamesDropDown');
        const formattedOptions = response.data.map((account) => ({
          value: account.id,
          label: account.name,
        }));
        setStaff(formattedOptions || []);
      } catch (error) {
        console.error('Failed to fetch staff names:', error);
      }
    };

    fetchBranches();
    fetchBankOptions();
    fetchClients();
    fetchStaff();
  }, []);

  const getFormComponent = (selectedTab) => {
    switch (selectedTab) {
      case 'Receipt':
        return (
          <ReceiptForm
            branches={branches}
            bankOptions={bankOptions}
            clients={clients}
            staff={staff}
          />
        );
      case 'Payment':
        return (
          <PaymentForm
            branches={branches}
            bankOptions={bankOptions}
            clients={clients}
            staff={staff}
          />
        );
      case 'Journal':
        return (
          <JournalForm
            branches={branches}
            staff={staff}
            bankOptions={bankOptions}
          />
        );
      case 'Contra':
        return (
          <ContraForm
            branches={branches}
            staff={staff}
            bankOptions={bankOptions}
          />
        );
      case 'Purchase':
        return (
          <PurchaseForm
            branches={branches}
            staff={staff}
            bankOptions={bankOptions}
          />
        );
      case 'EMI':
        return (
          <EmiForm
            branches={branches}
            staff={staff}
            bankOptions={bankOptions}
          />
        );
      // case 'Invoice':
      //   return <InvoiceForm branches={branches} />;
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
