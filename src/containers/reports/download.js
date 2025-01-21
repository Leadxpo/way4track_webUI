import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import * as ExcelJS from 'exceljs';

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

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };

  // Fetch client data
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
    let type = '';
    switch (type) {
      case 'Day Book':
        await exportDayBookExcel();
        break;
      case 'Ledger':
        await exportLedgerExcel();
        break;
      case 'Sales':
        await exportSalesExcel();
        break;
      default:
        break;
    }
  };

  const exportDayBookExcel = async () => {
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
    console.log(filterData, ' Fetch Data');
    filterData.forEach((row) => {
      worksheet.addRow({
        date: row.date,
        voucherId: row.voucherId,
        productType: row.productType,
        voucherType: row.voucherType,
        purpose: row.purpose,
        creditAmount: row.creditAmount,
        debitAmount: row.debitAmount,
        balanceAmount: row.balanceAmount,
      });
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
  };

  const exportLedgerExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet();

    worksheet.columns = [
      { header: 'Voucher Type', key: 'voucherType', width: 20 },
      { header: 'generationDate', key: 'generationDate', width: 15 },
      { header: 'Voucher ID', key: 'voucherId', width: 20 },
      { header: 'client Name', key: 'clientName', width: 20 },
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
    console.log(filterData, ' Fetch Data');
    filterData.forEach((row) => {
      worksheet.addRow({
        voucherId: row.voucherId,
        name: row.name,
        clientName: row.clientName,
        generationDate: row.generationDate,
        expireDate: row.expireDate,
        paymentStatus: row.paymentStatus,
        phoneNumber: row.phoneNumber,
        email: row.email,
        address: row.address,
        creditAmount: row.creditAmount,
        debitAmount: row.debitAmount,
        balanceAmount: row.balanceAmount,
        purpose: row.purpose,
        branchName: row.branchName,
        voucherType: row.voucherType,
      });
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
  };

  const exportSalesExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet();

    worksheet.columns = [
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Branch Name', key: 'branchName', width: 20 },
      { header: 'Sales', key: 'serviceSales', width: 20 },
    ];
    console.log(filterData, ' Fetch Data');
    filterData.forEach((row) => {
      worksheet.addRow({
        date: row.date,
        branchName: row.branchName,
        serviceSales: row.serviceSales,
      });
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
        </>
      )}

      <button
        className="bg-green-500 text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
        onClick={exportExcel}
      >
        Download
      </button>
    </div>
  );
};

export default DownloadComponent;
