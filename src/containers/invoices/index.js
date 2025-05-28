import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
const Invoices = () => {
  const navigate = useNavigate();
  const handleEdit = (invoice) => {
    navigate('/edit-invoice', { state: { invoiceDetails: { invoice } } });
  };
  const handleDetails = (invoice) => {
    navigate('/invoice-details', { state: { invoiceDetails: { invoice } } });
  };
  return (
    <TableWithDateFilter
      type="invoice"
      onEdit={handleEdit}
      onDelete={() => { }}
      onDetails={handleDetails}
      showCreateBtn={true}
      showEdit={true}
      showDelete={false}
      showDetails={true}
    />
  );
};

export default Invoices;
