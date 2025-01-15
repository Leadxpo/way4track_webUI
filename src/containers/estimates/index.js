import React from 'react';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import { PDFViewer } from '@react-pdf/renderer';
import { EstimatePDF } from '../../components/EstimatePdf';
import { TaxInvoicePDF } from '../../components/TaxInvoicePdf';
const Estimates = () => {
  const navigate = useNavigate();
  const handleEdit = (estimate) => {
    navigate('/add-estimate', { state: { estimateDetails: { estimate } } });
  };
  const handleDetails = (estimate) => {
    navigate('/estimate-details', { state: { estimateDetails: { estimate } } });
  };
  return (
    <>
      <TableWithDateFilter
        type="estimate"
        onEdit={handleEdit}
        onDelete={() => {}}
        onDetails={handleDetails}
        showStatusFilter={true}
        showDelete={false}
      />
      {/* <div style={{ height: '100vh', width: '50vw' }}>
        <PDFViewer style={{ width: '100%', height: '100%' }}>
          <TaxInvoicePDF data={{}} />
        </PDFViewer>
      </div> */}
    </>
  );
};

export default Estimates;
