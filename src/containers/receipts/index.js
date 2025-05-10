import React from 'react';
import TableWithSearchFilter from '../tablesSearchFilter';
import { useNavigate } from 'react-router';

const Receipts = () => {
  const navigate = useNavigate();
  const handleDetails = (receipt) => {
    navigate('/receipt-details', { state: { receiptDetails: receipt } });
  };
  return (
    <TableWithSearchFilter
      type={'receipts'}
      showCreateBtn={false}
      showEdit={false}
      showDelete={false}
      showDetails={false}
      showActionColumn={false}
      onDetails={handleDetails}
    />
  );
};

export default Receipts;
