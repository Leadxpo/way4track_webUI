import React, { useEffect, useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import Table from '../../components/Table';

const SubDealerHome = () => {
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPurchaseOrderData = async () => {
      try {

        const payload = {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          role: localStorage.getItem('role'),
        };

        if (
          payload.role === 'Technician' || payload.role === 'Sales Man'
        ) {
          payload.staffId = localStorage.getItem('userId');
        }

        const response = await ApiService.post('/dashboards/getPurchaseOrderDataTable',
          payload
        );
        if (response.status) {
          setDataSource(response.data || []);
        } else {
          setDataSource([]);
        }
      } catch (error) {
        console.error('Error fetching purchase order data:', error);
        alert('Failed to fetch purchase order data.');
      }
    };

    fetchPurchaseOrderData();
  }, []);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const payload = {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          role: localStorage.getItem('role'),
        };

        if (
          payload.role === 'Technician' || payload.role === 'Sales Man'
        ) {
          payload.staffId = localStorage.getItem('userId');
        }


        const response = await ApiService.post('/dashboards/getPaymentDataTable', payload);
        if (response.status) {
          setData(response.data || []);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching payment data:', error);
        alert('Failed to fetch payment data.');
      }
    };

    fetchPaymentData();
  }, []);

  // Calculate total amounts
  const totalPurchaseAmount = dataSource.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
  const totalReeferAmount = data.reduce((sum, item) => sum + (item.totalAmount || 0), 0);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Purchase Amount"
          value={totalPurchaseAmount}
          readOnly
          className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
        />
        <input
          type="text"
          placeholder="Reefer Amount"
          value={totalReeferAmount}
          readOnly
          className="h-12 block w-full border-gray-300 rounded-md shadow-sm border border-gray-500 px-1"
        />
      </div>
      <p className="text-xl my-4">Purchase Order</p>
      <Table columns={Object.keys(dataSource[0] || {})} data={dataSource} />
      <p className="text-xl my-4">Business Given</p>
      <Table columns={Object.keys(data[0] || {})} data={data} />
    </div>
  );
};

export default SubDealerHome;
