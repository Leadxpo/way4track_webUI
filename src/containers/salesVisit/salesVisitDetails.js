import React from 'react';
import { useLocation } from 'react-router-dom';

const SalesVisitDetails = () => {
  const location = useLocation();
  const visitDetails = location.state?.visit || {};
  console.log(visitDetails, 'visit details');

  // Parse requirementDetails and service fields
  let parsedRequirements = [];
  let parsedServices = [];

  try {
    parsedRequirements = JSON.parse(visitDetails.requirementDetails || '[]');
  } catch (e) {}

  try {
    parsedServices = JSON.parse(visitDetails.service || '[]');
  } catch (e) {}

  return (
    <div className="p-8 space-y-6 mx-auto bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-10 text-gray-800">Visit Details</h2>

      <div className="space-y-4 text-lg">
        {[
          { label: 'ID', key: 'id' },
          { label: 'Visiting Number', key: 'visitingNumber' },
          { label: 'Name', key: 'name' },
          { label: 'Phone Number', key: 'phoneNumber' },
          { label: 'Email', key: 'email' },
          { label: 'Visit Staff', key: 'staffName' },
          { label: 'Staff Phone Number', key: 'staffPhoneNumber' },
          { label: 'Allocated Staff', key: 'allocatedStaffName' },
          { label: 'Allocated Staff Number', key: 'allocatedStaffPhoneNumber' },
          { label: 'Company Name', key: 'companyName' },
          { label: 'Address', key: 'address' },
          { label: 'Branch Name', key: 'branchName' },
          { label: 'Date', key: 'date' },
          { label: 'Estimate Date', key: 'estimateDate' },
          { label: 'Lead Status', key: 'leadStatus' },
        ].map(({ label, key }) => (
          <p key={key} className="text-lg font-medium">
            {label} : {visitDetails[key] || 'N/A'}
          </p>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        {['Entrance Card', 'Visit Card'].map((title, index) => (
          <div key={index} className="w-1/2">
            <h3 className="font-bold text-center text-lg">{title}</h3>
            <div className="p-4 border rounded-lg text-center h-[153px]">
              <img
                src="/way4track-logo.png"
                alt="Way4Track Logo"
                className="mx-auto my-2"
              />
              <p className="text-green-600 font-semibold">Track Anywhere</p>
            </div>
          </div>
        ))}
      </div>

      {parsedRequirements.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Requirements</h3>
          <div className="space-y-4 bg-gray-200 p-4 rounded-lg">
            {parsedRequirements.map((req, index) => (
              <div key={index} className="flex space-x-4">
                <input
                  type="text"
                  value={req.productName || ''}
                  placeholder="Product Name"
                  className="w-1/2 p-2 border rounded"
                  readOnly
                />
                <input
                  type="text"
                  value={req.quantity || ''}
                  placeholder="Quantity"
                  className="w-1/2 p-2 border rounded"
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {parsedServices.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Services</h3>
          <div className="space-x-4 bg-gray-200 p-4 rounded-lg">
            {parsedServices.map((srv, index) => (
              <div key={index} className="flex space-x-4">
                <input
                  type="text"
                  value={srv.services || ''}
                  placeholder="Service Name"
                  className="w-full p-2 border rounded"
                  readOnly
                />
                <input
                  type="text"
                  value={srv.description || ''}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-center">
        <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg">
          Create Estimate
        </button>
      </div>
    </div>
  );
};

export default SalesVisitDetails;

// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const SalesVisitDetails = () => {
//   const location = useLocation();
//   const visitDetails = location.state?.visit || {};
//   console.log(visitDetails,"vesit details")

//   return (
//     <div className="p-8 space-y-6 mx-auto bg-white rounded-lg">
//       <h2 className="text-2xl font-bold mb-10 text-gray-800">Visit Details</h2>

//       <div className="space-y-4 text-lg">
//         {[
//           'id',
//           'visitingNumber',
//           'name',
//           'phoneNumber',
//           'email',
//           'visitStaff',
//           'companyName',
//           'address',
//         ].map((key) => (
//           <p key={key} className="text-lg font-medium">
//             {key.replace(/([A-Z])/g, ' $1').trim()} :{' '}
//             {visitDetails[key] || 'N/A'}
//           </p>
//         ))}
//       </div>

//       <div className="flex justify-between items-center mt-6">
//         {['Entrance Card', 'Visit Card'].map((title, index) => (
//           <div key={index} className="w-1/2">
//             <h3 className="font-bold text-center text-lg">{title}</h3>
//             <div className="p-4 border rounded-lg text-center h-[153px]">
//               <img
//                 src="/way4track-logo.png"
//                 alt="Way4Track Logo"
//                 className="mx-auto my-2"
//               />
//               <p className="text-green-600 font-semibold">Track Anywhere</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex space-x-4 mt-6 bg-gray-200 p-4 rounded-lg">
//         {['productType', 'productService', 'quantity'].map((key) => (
//           <input
//             key={key}
//             type="text"
//             value={visitDetails[key] || ''}
//             placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
//             className="w-1/3 p-2 border rounded"
//             readOnly
//           />
//         ))}
//       </div>

//       <p className="text-sm text-gray-700 mt-4">
//         <strong>Description:</strong> Lorem ipsum dolor sit amet, consectetur
//         adipiscing elit.
//       </p>

//       <div className="text-center">
//         <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg">
//           Create Estimate
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SalesVisitDetails;
