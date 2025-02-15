import React, { useEffect, useState } from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import TableWithSearchFilter from '../tablesSearchFilter';
import { getPermissions } from '../../common/commonUtils';
const Clients = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  useEffect(() => {
    const perms = getPermissions('client');
    setPermissions(perms);
  }, []);
  const handleVendorEdit = (client) => {
    navigate('/add-client', { state: { clientDetails: client } });
  };

  const handleDelete = (client) => {
    console.log('on delete', client);
    navigate('/delete-client', { state: { clientDetails: client } });
  };

  const handleDetails = () => {
    navigate('/client-details');
  };
  return (
    <TableWithSearchFilter
      type="clients"
      showCreateBtn={permissions.add}
      showDelete={permissions.delete}
      showEdit={permissions.edit}
      showDetails={permissions.view}
      onEdit={handleVendorEdit}
      onDelete={handleDelete}
      onDetails={handleDetails}
    />
  );
};

export default Clients;
