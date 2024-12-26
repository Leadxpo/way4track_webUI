import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import TableWithSearchFilter from '../tablesSearchFilter';

const Hiring = () => {
  const navigate = useNavigate();
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
      onEdit={handleHiringEdit}
      onDelete={handleDelete}
      onDetails={handleDetails}
    />
  );
};

export default Hiring;
