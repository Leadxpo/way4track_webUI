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
      {/* {activeTab === 'work' && (
        <div
          className="overflow-hidden rounded-lg shadow"
          style={{ padding: '30px' }}
        >
          <div className="p-4">
            <h2 className="font-bold text-xl mb-3">Payments</h2>

            <div className="flex flex-wrap gap-4 items-center mb-4">
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
              <div className="flex items-center space-x-2 mb-4">
                <label className="text-gray-700 font-bold whitespace-nowrap">
                  Search by Branch:
                </label>
                <select
                  value={branchFilter}
                  onChange={handleBranchFilter}
                  className="h-12 w-[250px] border border-gray-300 rounded-md px-3 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">All Branches</option>
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.branchName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <label className="text-gray-700 font-bold whitespace-nowrap">
                  Filter by Payment Status:
                </label>
                <select
                  value={paymentStatusFilter}
                  onChange={(e) => setPaymentStatusFilter(e.target.value)}
                  className="h-12 w-[200px] border border-gray-300 rounded-md px-3 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">All</option>
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="PARTIALLY_PAID">Partially Paid</option>
                </select>
              </div>
            </div>

            <div className="overflow-y-auto">
              {filteredRecords.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No payment records found.
                </div>
              ) : (
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100 sticky top-0">
                    <tr className="bg-blue-500 text-white text-left">
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Client Name
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Phone Number
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Staff Name
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Backend Support Name
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Completed Date
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Amount
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Payment Status
                      </th>
                      <th className="px-4 py-3 border capitalize whitespace-nowrap min-w-[120px]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          {record.clientName || '-'}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          {record.phoneNumber || '-'}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          {record.staffName || '-'}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          {record.backSupporterName || '-'}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          {record.completedDate || '-'}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          ₹{record.amount || 0}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600">
                          {record.paymentStatus || 'Pending'}
                        </td>
                        <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-600" onClick={() => createInvoice(record)}>
                          Convert to Invoice
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )} */}

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
