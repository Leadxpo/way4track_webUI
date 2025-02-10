import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { getPermissions } from '../../common/commonUtils';
const SubDealers = () => {
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState({});
  useEffect(() => {
    const perms = getPermissions('subdealer');
    setPermissions(perms);
  }, []);
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

export default SubDealers;
