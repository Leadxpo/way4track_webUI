import React,{useState,useEffect} from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import { getPermissions } from '../../common/commonUtils';

const Invoices = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  useEffect(() => {
    const perms = getPermissions('invoice');
    setPermissions(perms);
  }, [permissions]); 

  const handleEdit = (invoice) => {
    navigate('/edit-invoice', { state: { invoiceDetails: { invoice } } });
  };
  const handleDetails = (invoice) => {
    navigate('/invoice-details', { state: { invoiceDetails: { invoice } } });
  };
  return (
    <TableWithDateFilter
      type="invoice"
      onEdit={handleEdit}
      onDelete={() => { }}
      onDetails={handleDetails}
      showCreateBtn={permissions.add}
      showEdit={permissions.edit}
      showDelete={permissions.delete}
      showDetails={permissions.view}
    />
  );
};

export default Invoices;
