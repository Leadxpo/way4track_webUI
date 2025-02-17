import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
const Invoices = () => {
  const navigate = useNavigate();
  const handleEdit = (invoice) => {
    navigate('/add-invoice', { state: { invoiceDetails: { invoice } } });
  };
  const handleDetails = (invoice) => {
    navigate('/invoice-details', { state: { invoiceDetails: { invoice } } });
  };
  return (
    <TableWithDateFilter
      type="invoice"
      onEdit={() => { }}
      onDelete={() => { }}
      onDetails={() => { }}
      showCreateBtn={false}
      showEdit={false}
      showDelete={false}
      showDetails={false}
    />
  );
};

export default Invoices;
