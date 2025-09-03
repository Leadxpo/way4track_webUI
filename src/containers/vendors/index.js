import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { getPermissions } from '../../common/commonUtils';

const Vendors = () => {
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    const perms = getPermissions('vendor');
    setPermissions(perms);
  }, [permissions]);

  const handleVendorEdit = (vendorDetails) => {
    navigate('/add-vendor', { state: { vendorDetails } });
  };

  const handleDelete = (vendorDetails) => {
    navigate('/delete-vendor', { state: { vendorDetails } });
  };

  const handleDetails = (vendorDetails) => {
    navigate('/vendor-profile', { state: { vendorDetails } });
  };

  return (
    <TableWithDateFilter
      type="vendors"
      showCreateBtn={permissions.add}
      showDelete={permissions.delete}
      showEdit={permissions.edit || true}
      showDetails={permissions.view || true}
      onEdit={handleVendorEdit}
      onDelete={handleDelete} 
      onDetails={handleDetails}
      showDateFilters={false}
    />
  );
};

export default Vendors;
