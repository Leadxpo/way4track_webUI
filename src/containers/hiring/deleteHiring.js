
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { initialAuthState } from "../../services/ApiService";

const DeleteHiring = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const hiringToDelete = location.state?.hiring || {};

  const handleConfirmDelete = async () => {
    if (!hiringToDelete) return;

    try {
      await ApiService.post('/hiring/deleteHiringDetails', {
        id: hiringToDelete.hiringId,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      alert('Hiring deleted successfully');
      navigate('/hiring');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete hiring.');
    }
  };

  return (
    <>
      {/* Delete Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md shadow"
      >
        Delete Hiring
      </button>

      {/* Popup Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p className="text-gray-700 mt-2">
              Are you sure you want to delete <b>{hiringToDelete?.hiringName}</b>?
            </p>
            
            {/* Buttons */}
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteHiring;



