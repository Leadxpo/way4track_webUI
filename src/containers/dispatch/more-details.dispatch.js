import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService, { initialAuthState } from "../../services/ApiService";

const DispatchDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const appointmentDetails = location.state?.dispatch || {};

    const [branchDetails, setBranchDetails] = useState({
        fromAddress: appointmentDetails?.fromAddress || '',
        toAddress: appointmentDetails?.toAddress || '',
        id: appointmentDetails?.id || null,
        dispatchCompanyName: appointmentDetails?.dispatchCompanyName || 'Pending',
        dispatchDate: appointmentDetails?.dispatchDate || '',
        arrivalDate: appointmentDetails?.arrivalDate || '',
        status: appointmentDetails?.status || '',
        transportId: appointmentDetails?.transportId || '',
        packageId: appointmentDetails?.packageId || '',
        assignedProductsId: appointmentDetails?.assignedProductsId || '',
        receiverName: appointmentDetails?.receiverName || '',
        dispatcherName: appointmentDetails?.dispatcherName || '',
        trackingURL: appointmentDetails?.trackingURL || '',
        staffId: appointmentDetails?.staffId || '',
        clientId: appointmentDetails?.clientId || '',
        subDealerId: appointmentDetails?.subDealerId || '',
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
    });

    useEffect(() => {
        const fetchBranchDetails = async () => {
            if (!branchDetails.id) return; // Prevent API call if ID is missing

            try {
                const response = await ApiService.post("/dispatch/getDispatchDetailsById", {
                    id: branchDetails.id,
                    companyCode: initialAuthState.companyCode,
                    unitCode: initialAuthState.unitCode,
                });

                if (response?.status) {
                    setBranchDetails(response.data);
                } else {
                    console.error("Failed to fetch branch details:", response);
                }
            } catch (error) {
                console.error("Error fetching branch details:", error);
                alert("Failed to fetch branch details.");
            }
        };

        fetchBranchDetails();
    }, [branchDetails.id]);

    return (
        <div className="space-y-10 px-8 py-4">
            {/* Back Button */}
            <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => navigate(-1)}
            >
                Back
            </button>

            {/* Dispatch Details Card */}
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Dispatch Details</h2>

                <div className="text-lg font-medium text-gray-900">
                    <span className="text-blue-600">Dispatch Company:</span> {branchDetails.dispatchCompanyName}
                </div>
                <div>
                    <span className="text-blue-600">From Address:</span> {branchDetails.fromAddress}
                </div>
                <div>
                    <span className="text-blue-600">To Address:</span> {branchDetails.toAddress}
                </div>
                <div>
                    <span className="text-blue-600">Dispatch Date:</span> {branchDetails.dispatchDate ? new Date(branchDetails.dispatchDate).toLocaleString() : 'N/A'}
                </div>
                <div>
                    <span className="text-blue-600">Arrival Date:</span> {branchDetails.arrivalDate ? new Date(branchDetails.arrivalDate).toLocaleString() : 'N/A'}
                </div>
                <div>
                    <span className="text-blue-600">Transport ID:</span> {branchDetails.transportId}
                </div>
                <div>
                    <span className="text-blue-600">Package ID:</span> {branchDetails.packageId}
                </div>
                <div>
                    <span className="text-blue-600">Receiver Name:</span> {branchDetails.receiverName}
                </div>
                <div>
                    <span className="text-blue-600">Dispatcher Name:</span> {branchDetails.dispatcherName}
                </div>
                {branchDetails.trackingURL && (
                    <div>
                        <span className="text-blue-600">Tracking:</span>
                        <a href={branchDetails.trackingURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                            Track Shipment
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DispatchDetails;
