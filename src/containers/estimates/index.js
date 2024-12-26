import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';

const Estimates = () => {
  const navigate = useNavigate();
  const handleEdit = (estimate) => {
    navigate('/add-estimate', { state: { estimateDetails: { estimate } } });
  };
  const handleDetails = (estimate) => {
    navigate('/estimate-details', { state: { estimateDetails: { estimate } } });
  };
  return (
    <TableWithDateFilter
      type="estimate"
      onEdit={handleEdit}
      onDelete={() => {}}
      onDetails={handleDetails}
      showStatusFilter={true}
      showDelete={false}
    />
  );
};

export default Estimates;
