import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';

const SubDealers = () => {
  const navigate = useNavigate();
  const handleVendorEdit = (subDealer) => {
    navigate('/add-sub-dealer', { state: { subDealerDetails: subDealer } });
  };

  const handleDelete = (vendor) => {
    navigate('/delete-sub-dealer');
  };

  const handleDetails = () => {
    navigate('/sub-dealer-profile');
  };
  return (
    <TableWithDateFilter
      type="sub_dealers"
      onEdit={handleVendorEdit}
      onDelete={handleDelete}
      onDetails={handleDetails}
    />
  );
};

export default SubDealers;
