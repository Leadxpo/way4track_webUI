import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';

const Vendors = () => {
  const navigate = useNavigate();
  const handleVendorEdit = (vendor) => {
    navigate('/add-vendor', { state: { vendorDetails: vendor } });
  };

  const handleDelete = (vendor) => {
    navigate('/delete-vendor');
  };

  const handleDetails = () => {
    navigate('/vendor-profile');
  };
  return (
    <TableWithDateFilter
      type="vendors"
      onEdit={handleVendorEdit}
      onDelete={handleDelete}
      onDetails={handleDetails}
    />
  );
};

export default Vendors;
