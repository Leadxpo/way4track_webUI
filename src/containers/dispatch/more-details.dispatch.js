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
<div className="min-h-screen bg-slate-50 px-6 py-8">
    {/* Back Button */}
    <button
        className="mb-6 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
        onClick={() => navigate(-1)}
    >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
    </button>

    {/* Dispatch Details Card */}
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">🚚 Dispatch Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 gap-x-4 text-base text-slate-700">
            <div className="font-semibold text-slate-800">Dispatch Company:</div>
            <div className="col-span-2">{branchDetails.dispatchCompanyName}</div>

            <div className="font-semibold text-slate-800">From Address:</div>
            <div className="col-span-2">{branchDetails.fromAddress}</div>

            <div className="font-semibold text-slate-800">To Address:</div>
            <div className="col-span-2">{branchDetails.toAddress}</div>

            <div className="font-semibold text-slate-800">Dispatch Date:</div>
            <div className="col-span-2">{branchDetails.dispatchDate ? new Date(branchDetails.dispatchDate).toLocaleString() : 'N/A'}</div>

            <div className="font-semibold text-slate-800">Arrival Date:</div>
            <div className="col-span-2">{branchDetails.arrivalDate ? new Date(branchDetails.arrivalDate).toLocaleString() : 'N/A'}</div>

            <div className="font-semibold text-slate-800">Transport ID:</div>
            <div className="col-span-2">{branchDetails.transportId}</div>

            <div className="font-semibold text-slate-800">Package ID:</div>
            <div className="col-span-2">{branchDetails.packageId}</div>

            <div className="font-semibold text-slate-800">Receiver Name:</div>
            <div className="col-span-2">{branchDetails.receiverName}</div>

            <div className="font-semibold text-slate-800">Dispatcher Name:</div>
            <div className="col-span-2">{branchDetails.dispatcherName}</div>

            {branchDetails.trackingURL && (
                <>
                    <div className="font-semibold text-slate-800">Tracking:</div>
                    <div className="col-span-2">
                        <a 
                        // href="#"
                            // href={branchDetails.trackingURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline hover:text-blue-800 transition"
                        >
                            Track Shipment
                        </a>
                    </div>
                </>
            )}
        </div>
    </div>
</div>



    );
};

export default DispatchDetails;
