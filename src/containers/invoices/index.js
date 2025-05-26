import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
const Invoices = () => {
  const navigate = useNavigate();
  const handleDetails = (invoice) => {
    navigate('/invoice-details', { state: { invoiceDetails: { invoice } } });
  };
  return (
    <TableWithDateFilter
      type="invoice"
      onEdit={() => { }}
      onDelete={() => { }}
      onDetails={() => { }}
      showCreateBtn={true}
      showEdit={true}
      showDelete={false}
      showDetails={true}
    />
  );
};

export default Invoices;
