import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// import ReceiptForm from './receiptForm';
// import PaymentForm from './paymentForm';
// import JournalForm from './journalForm';
// import ContraForm from './contraForm';
import EditPurchaseForm from './editPurchaseForm';
import EditPaymentForm from './editPaymentForm';
import EditSaleForm from './editSaleForm';
import EditReceiptForm from './editReceiptForm';
import EditJournalForm from './editJournalForm';
import EditContraForm from './editContraForm';
import EditDebitNoteForm from './editDebitNote';
import EditCreditNoteForm from './editCreditNote';
import EmiForm from './emiForm';

import ApiService, { initialAuthState } from '../../services/ApiService';

const EditVoucher = () => {
  const location = useLocation();
  const item = location.state?.item || null;

  console.log(item,"location item vouchers details")

  const [branches, setBranches] = useState([]);
  const [bankOptions, setBankOptions] = useState([]);
  const [clients, setClients] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/branch/getBranchNamesDropDown'
        );
        if (response.status) setBranches(response.data);
      } catch (err) {
        console.error('Error fetching branches:', err);
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
        const formatted = response.data.map((acc) => ({
          value: acc.id || `Account ${acc.id}`,
          label: acc.accountName,
        }));
        setBankOptions(formatted);
      } catch (err) {
        console.error('Error fetching bank accounts:', err);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await ApiService.post(
          '/client/getClientNamesDropDown',
          {
            userId: 4,
            companyCode: 'WAY4TRACK',
            unitCode: 'WAY4',
          }
        );
        const formatted = response.data.map((c) => ({
          value: c.clientId,
          label: c.name,
        }));
        setClients(formatted);
      } catch (err) {
        console.error('Error fetching clients:', err);
      }
    };

    const fetchStaff = async () => {
      try {
        const response = await ApiService.post('/staff/getStaffNamesDropDown');
        const formatted = response.data.map((s) => ({
          value: s.id,
          label: s.name,
        }));
        setStaff(formatted);
      } catch (err) {
        console.error('Error fetching staff:', err);
      }
    };

    fetchBranches();
    fetchBankOptions();
    fetchClients();
    fetchStaff();
  }, []);

  const renderForm = () => {
    if (!item) return <div>No voucher selected for editing.</div>;

    const props = {
      branches,
      bankOptions,
      clients,
      staff,
      isEditMode: true,
      voucherToEdit: item,
    };

    switch (item.voucherType?.toUpperCase()) {
      case 'RECEIPT':
        return <EditReceiptForm {...props} />;
      case 'PAYMENT':
        return <EditPaymentForm {...props} />;
      case 'SALES':
        return <EditSaleForm {...props} />;
      case 'JOURNAL':
        return <EditJournalForm {...props} />;
      case 'CONTRA':
        return <EditContraForm {...props} />;
      case 'PURCHASE':
        return <EditPurchaseForm {...props} />;
      case 'DEBIT':
        return <EditDebitNoteForm {...props} />;
      case 'CREDIT':
        return <EditCreditNoteForm {...props} />;
      case 'EMI':
        return <EmiForm {...props} />;
      default:
        return <div>Invalid voucher type: {item.voucherType}</div>;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Voucher</h2>
      {renderForm()}
    </div>
  );
};

export default EditVoucher;
