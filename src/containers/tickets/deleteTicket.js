import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const DeleteTicket = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const ticketDetails = location.state?.ticketDetails || null;

  const deleteTicketDetails = async () => {
    if (!ticketDetails) {
      alert('No ticket details available.');
      return;
    }

    try {
      const payload = {
        id: ticketDetails.id,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      const res = await ApiService.post('/tickets/deleteTicketDetails', payload);

      if (res.status) {
        alert('Ticket deleted successfully.');
        navigate(-1); // Go back to the previous page after deletion
      } else {
        alert('Failed to delete ticket.');
      }
    } catch (err) {
      console.error('Failed to delete ticket:', err);
      alert('An error occurred while deleting the ticket.');
    }
  };

  useEffect(() => {
    if (!ticketDetails?.id) {
      alert('No ticket selected to delete.');
      navigate(-1); // Navigate back if no ticket details are found
    }
  }, [ticketDetails, navigate]);

  return (
    <div className="min-h-screen flex items-start justify-center pt-10">
      <div className="bg-white shadow-lg pb-4 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center bg-red-500 p-2">
          <h2 className="text-white font-bold text-xl text-center flex-grow">
            Alert
          </h2>
        </div>

        {/* Message */}
        <p className="mt-4 text-gray-700 text-center">
          Are you sure you want to delete this Sub Dealer?
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={deleteTicketDetails}>
            Delete
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTicket;
