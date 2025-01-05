// import React, { useState } from 'react';
// import ApiService from '../../services/ApiService';
// import { initialAuthState } from '../../services/ApiService';

// const DeleteHiring = ({ hirings, setHirings }) => {
//   const [hiringToDelete, setHiringToDelete] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

//   const handleDeleteClick = (hiring) => {
//     setHiringToDelete(hiring);
//     setShowPopup(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (!hiringToDelete) return;

//     try {
//       await ApiService.post('/hiring/deleteHiringDetails', {
//         id: hiringToDelete.id, companyCode: initialAuthState.companyCode,
//         unitCode: initialAuthState.unitCode
//       });

//       // Update the hirings state by filtering out the deleted hiring
//       setHirings((prev) => prev.filter((hiring) => hiring.id !== hiringToDelete.id));

//       alert('Hiring deleted successfully');
//     } catch (error) {
//       console.error('Error deleting hiring:', error);
//       alert(error.response?.data?.message || 'Failed to delete hiring.');
//     } finally {
//       setShowPopup(false);
//       setHiringToDelete(null);
//     }
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false);
//     setHiringToDelete(null);
//   };

//   return (
//     <>
//       {hirings.map((hiring) => (
//         <div key={hiring.id} className="hiring-item">
//           <span>{hiring.hiringName}</span>
//           <button
//             className="text-red-500 hover:underline"
//             onClick={() => handleDeleteClick(hiring)}
//           >
//             Delete
//           </button>
//         </div>
//       ))}

//       {/* Delete Confirmation Popup */}
//       {showPopup && hiringToDelete && (
//         <div className="min-h-screen flex items-start justify-center pt-10">
//           <div className="bg-white shadow-lg pb-4 w-full max-w-md">
//             {/* Header */}
//             <div className="flex justify-between items-center bg-red-500 p-2">
//               <h2 className="text-white font-bold text-xl text-center flex-grow">
//                 Alert
//               </h2>
//             </div>

//             {/* Message */}
//             <p className="mt-4 text-gray-700 text-center">
//               Are you sure you want to delete this Hiring?{' '}
//               <strong>{hiringToDelete.hiringName}</strong>
//             </p>

//             {/* Buttons */}
//             <div className="mt-6 flex justify-center space-x-4">
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//                 onClick={handleConfirmDelete}
//               >
//                 Delete
//               </button>
//               <button
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
//                 onClick={handleClosePopup}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default DeleteHiring;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const DeleteHiring = ({ setHirings }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const hiringToDelete = state?.hiringDetails;

  const handleConfirmDelete = async () => {
    if (!hiringToDelete) return;

    try {
      await ApiService.post('/hiring/deleteHiringDetails', {
        id: hiringToDelete.id,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      setHirings((prev) => prev.filter((hiring) => hiring.id !== hiringToDelete.id));
      alert('Hiring deleted successfully');
      navigate('/hiring'); // Redirect back to the hiring list after deletion
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete hiring.');
    }
  };

  const handleCancel = () => {
    navigate('/hiring'); // Redirect back to the hiring list if the user cancels
  };

  return (
    <div>
      <p>Are you sure you want to delete hiring: {hiringToDelete?.hiringName}?</p>
      <button onClick={handleConfirmDelete}>Confirm Delete</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default DeleteHiring;

