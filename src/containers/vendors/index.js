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
  }, []);
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

export default Vendors;
