import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const DeleteClient = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const clientDetails = location.state?.clientDetails || null;

    // Function to handle client deletion
    const deleteClientDetails = async () => {
        if (!clientDetails) {
            alert('No client details available.');
            return;
        }

        try {
            const payload = {
                clientId: clientDetails.clientId,
                companyCode: initialAuthState.companyCode,
                unitCode: initialAuthState.unitCode,
            };

            const res = await ApiService.post('/client/deleteClientDetails', payload);

            if (res.status) {
                alert('Client deleted successfully.');
                navigate(-1); // Go back to the previous page after deletion
            } else {
                alert('Failed to delete client.');
            }
        } catch (err) {
            console.error('Failed to delete client:', err);
            alert('An error occurred while deleting the client.');
        }
    };

    useEffect(() => {
        if (!clientDetails?.clientId) {
            alert('No client selected to delete.');
            navigate(-1); // Navigate back if no client details are found
        }
    }, [clientDetails, navigate]);

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
                    Are you sure you want to delete this Client?
                </p>

                {/* Buttons */}
                <div className="mt-6 flex justify-center space-x-4">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={deleteClientDetails}
                    >
                        Delete
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        onClick={() => navigate(-1)} // Go back without deleting
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteClient;
