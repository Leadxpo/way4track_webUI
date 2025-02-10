import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import TableWithSearchFilter from '../tablesSearchFilter';
import { getPermissions } from '../../common/commonUtils';
import { useState, useEffect } from 'react';
const Hiring = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  useEffect(() => {
    const perms = getPermissions('hiring');
    setPermissions(perms);
  }, []);
  const handleHiringEdit = (hiring) => {
    navigate('/edit-hiring', { state: { hiringDetails: hiring } });
  };

  const handleDelete = (hiring) => {
    navigate('/delete-hiring');
  };

  const handleDetails = (hiring) => {
    navigate('/hiring-details', { state: { hiringDetails: hiring } });
  };
  return (
    <TableWithSearchFilter
      type="hiring"
      showCreateBtn={permissions.add}
      showDelete={permissions.delete}
      showEdit={permissions.edit}
      showDetails={permissions.view}
      onEdit={handleHiringEdit}
      onDelete={handleDelete}
      onDetails={handleDetails}
    />
  );
};

export default Hiring;
