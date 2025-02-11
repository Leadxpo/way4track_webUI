import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService, { initialAuthState } from '../../services/ApiService';
import * as ExcelJS from 'exceljs';
import { EstimatePDF } from '../../components/EstimatePdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { TaxInvoicePDF } from '../../components/TaxInvoicePdf';
import { PurchaseOrderPDF } from '../../common/commonUtils';
const DownloadComponent = () => {
  const location = useLocation();
  const { filterData = [], name } = location.state || {};

  const [selectedBranch, setSelectedBranch] = useState("All Branch's");
  const [selectedClient, setSelectedClient] = useState('');
  const [branches, setBranches] = useState([]);
  const [client, setClient] = useState([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [inputId, setInputId] = useState('');
  const [estimateData, setEstimateData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [receiptData, setReceiptData] = useState([]);
  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await ApiService.post('/client/getClientNamesDropDown');
        setClient(res.data || []);
      } catch (err) {
        console.error('Failed to fetch client details:', err);
        setClient([]);
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await ApiService.post(
          '/branch/getBranchNamesDropDown'
        );
        if (response.status) {
          setBranches(response.data);
        } else {
          console.error('Failed to fetch branches');
        }
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

  const exportExcel = async () => {
    switch (name) {
      case 'Day Book':
        await exportDayBookExcel();
        break;
      case 'Ledger':
        await exportLedgerExcel();
        break;
      case 'Sales':
        await exportSalesExcel();
        break;
      case 'Receipt':
        await getReceiptDataForReport();
        break;
      case 'Estimate':
        await getEstimatesForReport();
        break;
      default:
        break;
    }
  };

  const exportDayBookExcel = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getDayBookDataForReport',
        {
          branch: selectedBranch,
          client: selectedClient,
          dateFrom,
          dateTo,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      const data = response.data;

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet();

      worksheet.columns = [
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Voucher ID', key: 'voucherId', width: 20 },
        { header: 'Product Type', key: 'productType', width: 20 },
        { header: 'Voucher Type', key: 'voucherType', width: 20 },
        { header: 'Purpose', key: 'purpose', width: 25 },
        { header: 'Credit Amount', key: 'creditAmount', width: 20 },
        { header: 'Debit Amount', key: 'debitAmount', width: 20 },
        { header: 'Balance Amount', key: 'balanceAmount', width: 20 },
      ];
      data.forEach((row) => {
        worksheet.addRow(row);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'DayBook.xlsx';
      anchor.click();
    } catch (error) {
      console.error('Error exporting Day Book Excel:', error);
    }
  };

  const exportLedgerExcel = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getLedgerDataForReport',
        {
          branch: selectedBranch,
          client: selectedClient,
          dateFrom,
          dateTo,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      const data = response.data;

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet();

      worksheet.columns = [
        { header: 'Voucher Type', key: 'voucherType', width: 20 },
        { header: 'generationDate', key: 'generationDate', width: 15 },
        { header: 'Voucher ID', key: 'voucherId', width: 20 },
        { header: 'client Name', key: 'clientName', width: 20 },
        { header: 'expireDate', key: 'expireDate', width: 15 },
        { header: 'Purpose', key: 'purpose', width: 25 },
        { header: 'Credit Amount', key: 'creditAmount', width: 20 },
        { header: 'Debit Amount', key: 'debitAmount', width: 20 },
        { header: 'Balance Amount', key: 'balanceAmount', width: 20 },
        { header: 'phone Number', key: 'phoneNumber', width: 20 },
        { header: 'Branch Name', key: 'branchName', width: 20 },
        { header: 'address', key: 'address', width: 20 },
        { header: 'email', key: 'email', width: 20 },
      ];
      data.forEach((row) => {
        worksheet.addRow(row);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'Ledger.xlsx';
      anchor.click();
    } catch (error) {
      console.error('Error exporting Ledger Excel:', error);
    }
  };

  const exportSalesExcel = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getTotalSalesForReport',
        {
          branch: selectedBranch,
          client: selectedClient,
          dateFrom,
          dateTo,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );
      const data = response.data;

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet();

      worksheet.columns = [
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Branch Name', key: 'branchName', width: 20 },
        { header: 'Sales', key: 'serviceSales', width: 20 },
      ];
      data.forEach((row) => {
        worksheet.addRow(row);
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'Sales.xlsx';
      anchor.click();
    } catch (error) {
      console.error('Error exporting Sales Excel:', error);
    }
  };

  const getReceiptDataForReport = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getReceiptDataForReport',
        {
          voucerID: inputId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      const pdfUrl = response.data.receiptPdfUrl;

      if (pdfUrl) {
        // Trigger automatic PDF download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Receipt_Report.pdf'; // Change filename as needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('No PDF available for this receipt.');
      }

      setReceiptData(response.data);
    } catch (e) {
      console.error('Error fetching receipt data:', e);
      alert('Failed to fetch receipt data. Please try again.');
    }
  };

  const getEstimatesForReport = async () => {
    try {
      const response = await ApiService.post(
        '/dashboards/getEstimatesForReport',
        {
          estimateId: inputId,
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      const pdfUrl = response.data.estimate_estimatePdfUrl;

      if (pdfUrl) {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Estimate_Report.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('No PDF available for this estimate.');
      }

      setEstimateData(response.data);
    } catch (e) {
      console.error('Error fetching estimate:', e);
      alert('Failed to fetch estimate data. Please try again.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Download {name}</h1>
      {name === 'Invoices' || name === 'Estimate' || name === 'Receipt' ? (
        <div className="mb-4">
          <input
            type="text"
            placeholder={`${name} id`}
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
            style={{ paddingLeft: '8px' }}
          />
        </div>
      ) : (
        <>
          {/* Date Pickers */}
          <div className="flex gap-4 mb-4">
            <div className="flex-grow mr-2">
              <input
                type="date"
                id="dateFrom"
                value={dateFrom}
                placeholder="From"
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
                style={{ paddingLeft: '8px' }}
              />
            </div>
            <div className="flex-grow mx-2">
              <input
                type="date"
                id="dateTo"
                value={dateTo}
                placeholder="To"
                onChange={(e) => setDateTo(e.target.value)}
                className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
                style={{ paddingLeft: '8px' }}
              />
            </div>
          </div>

          {name !== 'Ledger' && (
            <div className="mb-4">
              <select
                value={selectedBranch}
                onChange={handleBranchChange}
                className="w-full bg-green-500 text-white font-bold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <option value="All Branch's">All Branch's</option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.branchName}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
            </div>
          )}

          {name === 'Ledger' && (
            <div className="mb-4">
              <select
                value={selectedClient}
                onChange={handleClientChange}
                className="w-full bg-green-500 text-white font-bold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                <option value="All Clients">All Clients</option>
                {client.map((cl) => (
                  <option key={cl.id} value={cl.clientName}>
                    {cl.clientName}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}

      <button
        className="bg-green-500 text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
        onClick={exportExcel}
      >
        {name === 'Estimate' || name === 'Receipt' || name === 'Invoice'
          ? 'Search'
          : 'Download'}
      </button>

      {estimateData &&
        Object.keys(estimateData).length > 0 &&
        name === 'Estimate' && (
          <PDFDownloadLink
            document={<EstimatePDF data={estimateData} />}
            fileName="estimate.pdf"
            style={{
              textDecoration: 'none',
              padding: '10px 20px',
              color: 'white',
              backgroundColor: '#007bff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
          </PDFDownloadLink>
        )}

      {invoiceData &&
        Object.keys(invoiceData).length > 0 &&
        name === 'Invoice' && (
          <PDFDownloadLink
            document={<TaxInvoicePDF data={invoiceData} />}
            fileName="estimate.pdf"
            style={{
              textDecoration: 'none',
              padding: '10px 20px',
              color: 'white',
              backgroundColor: '#007bff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
          </PDFDownloadLink>
        )}

      {receiptData &&
        Object.keys(receiptData).length > 0 &&
        name === 'Receipt' && (
          <PDFDownloadLink
            document={<PurchaseOrderPDF data={receiptData} />}
            fileName="estimate.pdf"
            style={{
              textDecoration: 'none',
              padding: '10px 20px',
              color: 'white',
              backgroundColor: '#007bff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
          </PDFDownloadLink>
        )}
    </div>
  );
};

export default DownloadComponent;
