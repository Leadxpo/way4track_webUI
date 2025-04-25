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
  const handleVendorEdit = (clientDetails) => {
    navigate('/edit-client', { state: { clientDetails } });
  };

  const handleDelete = (clientDetails) => {

    navigate('/delete-client', { state: { clientDetails } });
  };

  const handleDetails = (clientDetails) => {
    navigate('/client-details', { state: { clientDetails } });
  };
  return (
    <TableWithSearchFilter
      type="clients"
      showCreateBtn={true}
      showDelete={permissions.delete}
      showEdit={true}
      showDetails={true}
      onEdit={handleVendorEdit}
      onDelete={handleDelete}
      onDetails={handleDetails}
    />
  );
};

export default Clients;
