import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';

const Payments = () => {
  return (
    <TableWithDateFilter
      type={'payments'}
      showCreateBtn={false}
      showStatusFilter={false}
      showDateFilters={true}
      showEdit={false}
      showDelete={false}
      showDetails={false}
    />
  );
};

export default Payments;
