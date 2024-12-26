import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';

const RequestRaise = () => {
  const navigate = useNavigate();
  const handleVendorEdit = (request) => {
    navigate('/add-request', { state: { requestDetails: request } });
  };

  const handleDelete = (request) => {
    navigate('/delete-request');
  };

  const handleDetails = (request) => {
    navigate('/request-details', { state: { requestDetails: request } });
  };
  return (
    <TableWithDateFilter
      type="requests"
      onEdit={handleVendorEdit}
      onDelete={handleDelete}
      onDetails={handleDetails}
      showDateFilters={false}
    />
  );
};

export default RequestRaise;
