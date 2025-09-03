import React,{useState,useEffect} from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import { getPermissions } from '../../common/commonUtils';

const Invoices = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  useEffect(() => {
    const perms = getPermissions('estimate');
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
      // showCreateBtn={true}
      showEdit={true}
      showDelete={permissions.delete}
      showDetails={true} 
    />
  );
};

export default Invoices;
