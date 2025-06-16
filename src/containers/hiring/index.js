import React,{ useState, useEffect } from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import TableWithSearchFilter from '../tablesSearchFilter';
import { getPermissions } from '../../common/commonUtils';
const Hiring = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  
  useEffect(() => {
    const perms = getPermissions('hiring');
    setPermissions(perms);
  }, [permissions]);

  const handleHiringEdit = (hiring) => {
    navigate('/edit-hiring', { state: {  hiring } });
  };

  const handleDelete = (hiring) => {
    navigate('/delete-hiring', { state: {  hiring } });
  };

  const handleDetails = (hiring) => {
    navigate('/hiring-details', { state: {  hiring } });
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
