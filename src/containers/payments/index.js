import React, { useEffect, useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import TableWithDateFilter from '../tablesDateFilter';
import { useNavigate } from 'react-router';
import CeoBackendSupportPayments from '../ceoBackendSupport/ceoBackSupportPayments';

const Payments = () => {
  const navigate = useNavigate();
  const [paymentRecords, setPaymentRecords] = useState([]);
  const [activeTab, setActiveTab] = useState('work');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [branches, setBranches] = useState([]);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');

  const fetchMemberRecords = async () => {
    try {
      const response = await ApiService.post(
        '/technician/getBackendSupportWorkAllocation',
        {
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
        }
      );

      if (response.status) {
        console.log("tttttff",response.data);
        setPaymentRecords(response.data);

        // Extract unique branchId + branchName pairs
        // const uniqueBranches = [];
        // const seenBranchIds = new Set();

        // response.data.forEach((item) => {
        //   if (!seenBranchIds.has(item.branchId)) {
        //     seenBranchIds.add(item.branchId);
        //     uniqueBranches.push({
        //       id: item.branchId,
        //       branchName: item.branchName,
        //     });
        //   }
        // });

        const seenBranchIds = new Set();
const uniqueBranches = [];

response.data.forEach((item) => {
  // Filter out items with null or undefined branchId or branchName
  if (item.branchId != null && item.branchName != null) {
    if (!seenBranchIds.has(item.branchId)) {
      seenBranchIds.add(item.branchId);
      uniqueBranches.push({
        id: item.branchId,
        branchName: item.branchName,
      });
    }
  }
});

        setBranches(uniqueBranches);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setPaymentRecords([]);
    }
  };

  const createInvoice = async (formData) => {
    const estimateDate = new Date(); // Current date
    const expireDate = new Date(estimateDate);
    expireDate.setDate(estimateDate.getDate() + 3);
    const estimateDto = {
      clientId: formData.clientId,
      estimateDate: estimateDate.toISOString().split('T')[0],
      expireDate: expireDate.toISOString().split('T')[0],
      productOrService: 'product',
      totalAmount: formData.paidAmount,
      convertToInvoice: true,
      companyCode: initialAuthState.companyCode, // Replace with actual company code
      unitCode: initialAuthState.unitCode, // Replace with actual unit code
      productDetails: [
        {
          productId: formData.productId, // Assuming each formData has a productId
          productName: formData.productName,
          quantity: 1,
          amount: formData.amount,
          hsnCode: '0000', // Total cost calculation
          description: '', // Total cost calculation
        },
      ],
    };

    // invoicePDF
    try {
      console.log('Estimate saved:', estimateDto);
      const response = await ApiService.post(
        '/estimate/handleEstimateDetails',
        estimateDto
      );
      if (response.status) {
        console.log('Estimate saved:', response);
        alert('Successfully invoice created');
        navigate('/invoice');
      } else {
        alert('Faild to create Invoice');
      }
    } catch (err) {
      console.error('Failed to save estimate:', err);
    }
  };

  useEffect(() => {
    fetchMemberRecords();
  }, []);

  const handleBranchFilter = (e) => {
    setBranchFilter(e.target.value);
  };

  const filteredRecords = paymentRecords.filter((record) => {
    const matchesBranch =
      !branchFilter || Number(record.branchId) === Number(branchFilter);
    const matchesStatus =
      !paymentStatusFilter || record.paymentStatus === paymentStatusFilter;

    const recordDate = new Date(record.completedDate);
    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo) : null;

    const matchesDate =
      (!fromDate || recordDate >= fromDate) &&
      (!toDate || recordDate <= toDate);

    return matchesBranch && matchesStatus && matchesDate;
  });

  if(filteredRecords){
    console.log("qqqqq",filteredRecords);
  }

  return (
    <div>
      <div className="flex space-x-4 mb-4 border-b-2 pb-2">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'work'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('work')}
        >
          Work Payments
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'voucher'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('voucher')}
        >
          Voucher Payments
        </button>
      </div>
      {activeTab === 'work' && <CeoBackendSupportPayments />}

      {activeTab === 'voucher' && (
        <div>
          <TableWithDateFilter
            type={'payments'}
            showCreateBtn={false}
            showStatusFilter={false}
            showDateFilters={true}
            showEdit={false}
            showDelete={false}
            showDetails={false}
          />
        </div>
      )}
    </div>
  );
};

export default Payments;
