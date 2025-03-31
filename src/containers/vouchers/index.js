import React from 'react';
import { FaPlus, FaEllipsisV } from 'react-icons/fa';

const Vouchers = () => {
  // Sample Data
  const vouchers = [
    {
      id: '01',
      name: 'Mohan Rao',
      purpose: 'Vizag',
      branch: 'Vizag',
      date: '11 Mar 2029',
      amount: '₹2099',
      paymentMode: 'Credit Card',
      status: 'Credit Card',
    },
    {
      id: '02',
      name: 'Mohan Rao',
      purpose: 'Hyd',
      branch: 'Hyd',
      date: '11 Mar 2029',
      amount: '₹2099',
      paymentMode: 'Cash',
      status: 'Cash',
    },
    {
      id: '03',
      name: 'Mohan Rao',
      purpose: 'KKD',
      branch: 'KKD',
      date: '11 Mar 2029',
      amount: '₹2099',
      paymentMode: 'Autopay',
      status: 'Autopay',
    },
    {
      id: '04',
      name: 'Mohan Rao',
      purpose: 'Vjy',
      branch: 'Vjy',
      date: '11 Mar 2029',
      amount: '₹2099',
      paymentMode: 'Net Banking',
      status: 'Net Banking',
    },
  ];

  return (
    <div className="p-6">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Vouchers</h2>
        <button className="bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow">
          <FaPlus /> Create Vouchers
        </button>
      </div>

      {/* Search Filters */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {/* First Row - Vouchers ID & Name */}
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Vouchers ID"
            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
          />
          <input
            type="text"
            placeholder="Vouchers Name"
            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
          />
        </div>

        {/* Second Row - Select & Search Button */}
        <div className="flex gap-4">
          <select className="w-full px-4 py-2 border rounded-lg bg-gray-50">
            <option>Select Vouchers</option>
            <option>Voucher 1</option>
            <option>Voucher 2</option>
          </select>
          <button
            className="w-full px-4 py-2 border rounded-lg bg-gray-50"
            style={{ backgroundClip: '#15A753' }}
          >
            SEARCH
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">NO.</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Purpose</th>
              <th className="px-4 py-2">Branch</th>
              <th className="px-4 py-2">Date/ Time</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Payment Mode</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher, index) => (
              <tr
                key={index}
                className={`border-t ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
              >
                <td className="px-4 py-2">{voucher.id}</td>
                <td className="px-4 py-2">{voucher.name}</td>
                <td className="px-4 py-2">{voucher.purpose}</td>
                <td className="px-4 py-2">{voucher.branch}</td>
                <td className="px-4 py-2">{voucher.date}</td>
                <td className="px-4 py-2">{voucher.amount}</td>
                <td className="px-4 py-2">{voucher.paymentMode}</td>
                <td className="px-4 py-2">{voucher.status}</td>
                <td className="px-4 py-2 text-center">
                  <FaEllipsisV className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vouchers;

// import React, { useState, useEffect } from 'react';
// import TableWithSearchFilter from '../tablesSearchFilter';
// import { useNavigate } from 'react-router';
// import { formatString } from '../../common/commonUtils';
// import { getPermissions } from '../../common/commonUtils';
// const Vouchers = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [selectedVoucher, setSelectedVoucher] = useState(null);
//   const [isMoreDetailsModalOpen, setIsMoreDetailsModalOpen] = useState(false);
//   const [selectedTab, setSelectedTab] = useState('Receipt');
//   const [selectedPaymentMode, setSelectedPaymentMode] = useState('Cash');
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();
//   const [permissions, setPermissions] = useState({});
//   useEffect(() => {
//     const perms = getPermissions('voucher');
//     setPermissions(perms);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleOpenModalForAdd = () => {
//     navigate('/add-voucher');
//   };

//   const handleOpenModalForEdit = (voucher) => {
//     setSelectedVoucher(voucher);
//     setIsEditMode(true);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedVoucher(null);
//   };

//   const handleOpenMoreDetailsModal = (voucher) => {
//     console.log(voucher);
//     setSelectedVoucher(voucher);
//     setIsMoreDetailsModalOpen(true);
//   };

//   const handleCloseMoreDetailsModal = () => {
//     setIsMoreDetailsModalOpen(false);
//     setSelectedVoucher(null);
//   };

//   return (
//     <div className="p-10">
//       <div className="flex justify-between mb-4">
//         <p className="text-xl font-bold">Vouchers</p>
//         <button
//           className={`h-12 px-8 text-white font-bold rounded-md hover:cursor-pointer  ${!permissions.add ? 'bg-yellow-400 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`}
//           onClick={handleOpenModalForAdd}
//           disabled={!permissions.add}
//         >
//           Create Voucher
//         </button>
//       </div>

//       {isMoreDetailsModalOpen && selectedVoucher && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-8 rounded-md shadow-lg relative w-[700px] max-h-[80vh] overflow-auto">
//             <button
//               onClick={handleCloseMoreDetailsModal}
//               className="absolute top-2 right-4 text-white cursor-pointer bg-green-600 rounded-full w-6 h-6"
//             >
//               X
//             </button>
//             <h2 className="text-xl font-bold text-center mb-4">
//               Voucher Details
//             </h2>

//             <div className="grid grid-cols-2 gap-4">
//               {Object.entries(selectedVoucher).map(([key, value]) => {
//                 const formattedKey = key
//                   .replace(/^cl_/, 'Client ') // Replace "cl_" with "Client "
//                   .replace(/^branch_/, 'Branch ') // Replace "branch_" with "Branch "
//                   .replace(/_/g, ' ') // Replace underscores with spaces
//                   .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
//                 return (
//                   <div
//                     key={key}
//                     className="shadow-md rounded-md p-3 border border-gray-200"
//                   >
//                     <strong className="block text-gray-700">
//                       {formattedKey}:
//                     </strong>
//                     <span className="text-gray-900">
//                       {value !== null ? value.toString() : 'N/A'}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* <button className="bg-green-600 text-white py-2 px-6 rounded font-bold hover:bg-blue-500 mx-auto block mt-4">
//               Download PDF
//             </button> */}
//           </div>
//         </div>
//       )}

//       <TableWithSearchFilter
//         type="vouchers"
//         onEdit={handleOpenModalForEdit}
//         onDetails={handleOpenMoreDetailsModal}
//         onDelete={() => {}}
//         showCreateBtn={false}
//         showDelete={permissions.delete}
//         showEdit={permissions.edit}
//         showDetails={permissions.view}
//       />
//     </div>
//   );
// };

// export default Vouchers;
