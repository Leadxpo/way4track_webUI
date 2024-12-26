import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import TableWithSearchFilter from '../tablesSearchFilter';

const Clients = () => {
  const navigate = useNavigate();
  const handleVendorEdit = (client) => {
    navigate('/add-client', { state: { clientDetails: client } });
  };

  const handleDelete = (vendor) => {
    navigate('/delete-client');
  };

  const handleDetails = () => {
    navigate('/client-details');
  };
  return (
    <TableWithSearchFilter
      type="clients"
      onEdit={handleVendorEdit}
      onDelete={handleDelete}
      onDetails={handleDetails}
    />
  );
};

export default Clients;
