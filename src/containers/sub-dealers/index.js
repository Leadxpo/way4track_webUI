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
  const handleVendorEdit = (subDealerDetails) => {
    console.log("-------------",subDealerDetails)
    navigate('/add-sub-dealer', { state: { subDealerDetails } });
  };

  const handleDelete = (subDealerDetails) => {
    navigate('/delete-sub-dealer', { state: { subDealerDetails } });
  };

  const handleDetails = (subDealerDetails) => {
    navigate('/sub-dealer-profile', { state: { subDealerDetails } });
  };
  return (
    <TableWithDateFilter
      type="sub_dealers"
      showCreateBtn={true}
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
