import React, { useEffect, useState } from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import TableWithSearchFilter from '../tablesSearchFilter';
import { getPermissions } from '../../common/commonUtils';
import hasPermission from '../../common/permission'

const Clients = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  var permission = localStorage.getItem("userPermissions");

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
    <div>

      <TableWithSearchFilter
        type="clients"
        showStatusFilter={true}
        showCreateBtn={permissions.add}
        showDelete={permissions.delete}
        showEdit={permissions.edit}
        showDetails={permissions.view}
        onEdit={handleVendorEdit}
        onDelete={handleDelete}
        onDetails={handleDetails}
      />
    </div>
  );
};

export default Clients;
