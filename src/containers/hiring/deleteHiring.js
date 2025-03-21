
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const DeleteHiring = ({ setHirings }) => {
  const navigate = useNavigate();
  const  location = useLocation();
  const hiringToDelete = location.state?.hiring || {};
  
  const handleConfirmDelete = async () => {
    if (!hiringToDelete) return;

    try {
      await ApiService.post('/hiring/deleteHiringDetails', {
        id: hiringToDelete.hiringId,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });

      // setHirings((prev) => prev.filter((hiring) => hiring.id !== hiringToDelete.id));
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

