import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import { PDFViewer } from '@react-pdf/renderer';
import { EstimatePDF } from '../../components/EstimatePdf';
import { TaxInvoicePDF } from '../../components/TaxInvoicePdf';
import { getPermissions } from '../../common/commonUtils';
import { useEffect, useState } from 'react';
const Estimates = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState({});
  console.log(permissions,"permissions for edit estimation")
  useEffect(() => {
    const perms = getPermissions('estimate');
    setPermissions(perms);
  }, []);
  const handleEdit = (estimate) => {
    navigate('/edit-estimate', { state: { estimateDetails: { estimate } } });
  };
  const handleDetails = (estimate) => {
    navigate('/estimate-details', { state: { estimateDetails: { estimate } } });
  };
  return (
    <>
      <TableWithDateFilter
        type="estimate"
        onEdit={handleEdit}
        // onDelete={() => {}}
        onDetails={handleDetails}
        showStatusFilter={false}
        showCreateBtn={permissions.add}
        showDelete={permissions.delete}
        showEdit={permissions.edit}
        showDetails={permissions.view} showBranchFilter={true}
      />
    </>
  );
};

export default Estimates;
