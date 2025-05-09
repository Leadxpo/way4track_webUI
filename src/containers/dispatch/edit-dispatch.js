
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const EditDispatch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const appointmentDetails = location.state?.dispatch || null;

    const [formData, setFormData] = useState({
        fromAddress: '',
        toAddress: '',
        id: null,
        dispatchCompanyName: '',
        dispatchDate: '',
        arrivalDate: '',
        status: '',
        transportId: '',
        packageId: '',
        assignedProductsId: '',
        receiverName: '',
        dispatcherName: '',
        trackingURL: '',
        staffId: '',
        clientId: '',
        subDealerId: '',
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
    });

    useEffect(() => {
        if (appointmentDetails) {
            setFormData({
                fromAddress: appointmentDetails.fromAddress || "",
                toAddress: appointmentDetails.toAddress || "",
                id: appointmentDetails.id || null,
                dispatchCompanyName: appointmentDetails.dispatchCompanyName || "",
                dispatchDate: appointmentDetails.dispatchDate || "",
                arrivalDate: appointmentDetails.arrivalDate || "",
                status: appointmentDetails.status || "",
                transportId: appointmentDetails.transportId || "",
                packageId: appointmentDetails.packageId || "",
                assignedProductsId: appointmentDetails.assignedProductsId || "",
                receiverName: appointmentDetails.receiverName || "",
                dispatcherName: appointmentDetails.dispatcherName || "",
                trackingURL: appointmentDetails.trackingURL || "",
                staffId: appointmentDetails.staffId || "",
                clientId: appointmentDetails.clientId || "",
                subDealerId: appointmentDetails.subDealerId || "",
                companyCode: initialAuthState.companyCode, // Keeping the initial value
                unitCode: initialAuthState.unitCode, // Keeping the initial value
            });
        }
    }, [appointmentDetails]);


    const [clients, setClients] = useState([]);
    const [subDealers, setSubDealers] = useState([]);
    const [staff, setStaff] = useState([]);
    const [assignedProducts, setAssignedProducts] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [subDealerRes, productRes, clientRes, staffRes] = await Promise.all([
                    ApiService.post('/subdealer/getSubDealerNamesDropDown'),
                    ApiService.post('/product-assign/getAllProductAssign', {
                        companyCode: initialAuthState.companyCode,
                        unitCode: initialAuthState.unitCode,
                    }),
                    ApiService.post('/client/getClientNamesDropDown'),
                    ApiService.post('/staff/getStaffNamesDropDown'),
                ]);

                setSubDealers(subDealerRes.data || []);
                setAssignedProducts(productRes.data || []);
                setClients(clientRes.data || []);
                setStaff(staffRes.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await ApiService.post('/dispatch/handleDispatchDetails', formData);
            if (response.status) {
                alert('Dispatch updated successfully!');
                navigate('/dispatch');
            } else {
                alert('Failed to save dispatch details. Please try again.');
            }
        } catch (error) {
            console.error('Error saving dispatch details:', error);
            alert('Failed to save dispatch details. Please try again.');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto p-6 rounded-lg space-y-6">
            <h1 className="text-3xl font-bold mb-4">
                {formData.id ? 'Edit Dispatch' : 'Create Dispatch'}
            </h1>

            <div className="flex flex-col">
                <label className="font-semibold mb-2">Dispatch Date:</label>
                <input
                    type="date"
                    name="dispatchDate"
                    value={formData.dispatchDate}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold mb-2">Arrival Date:</label>
                <input
                    type="date"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold mb-2">From Address:</label>
                <input
                    type="text"
                    name="fromAddress"
                    value={formData.fromAddress}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold mb-2">Dispatch Status:</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                >
                    <option value="" disabled>Select Status</option>
                    <option value="ON_THE_WAY">On The Way</option>
                    <option value="DISPATCHED">Dispatched</option>
                    <option value="DELIVERED">Delivered</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label className="font-semibold mb-2">To Address:</label>
                <input
                    type="text"
                    name="toAddress"
                    value={formData.toAddress}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold mb-2">Dispatch Company Name:</label>
                <input
                    type="text"
                    name="dispatchCompanyName"
                    value={formData.dispatchCompanyName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold mb-2">Receiver Name:</label>
                <input
                    type="text"
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold mb-2">Dispatcher Name:</label>
                <input
                    type="text"
                    name="dispatcherName"
                    value={formData.dispatcherName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold mb-2">Tracking URL:</label>
                <input
                    type="text"
                    name="trackingURL"
                    value={formData.trackingURL}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div>

            {subDealers.length > 0 && (
                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Sub Dealer:</label>
                    <select
                        name="subDealerId"
                        value={formData.subDealerId}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    >
                        <option value="" disabled>Select Sub Dealer</option>
                        {subDealers.map(({ subDealerId, name }) => (
                            <option key={subDealerId} value={subDealerId}>{name}</option>
                        ))}
                    </select>
                </div>
            )}

            {clients.length > 0 && (
                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Client:</label>
                    <select
                        name="clientId"
                        value={formData.clientId}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    >
                        <option value="" disabled>Select Client</option>
                        {clients.map(({ clientId, name }) => (
                            <option key={clientId} value={clientId}>{name}</option>
                        ))}
                    </select>
                </div>
            )}

            {staff.length > 0 && (
                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Assign To Staff:</label>
                    <select
                        name="staffId"
                        value={formData.staffId}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    >
                        <option value="" disabled>Select Staff</option>
                        {staff.map(({ staffId, name }) => (
                            <option key={staffId} value={staffId}>{name}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* {assignedProducts.length > 0 && (
                <div className="flex flex-col">
                    <label className="font-semibold mb-2">Assign prosduct:</label>
                    <select
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                    >
                        <option value="" disabled>
                            Select prosduct
                        </option>
                        {assignedProducts.map((staffMember) => (
                            <option key={staffMember.id} value={staffMember.id}>
                                {staffMember.name}
                            </option>
                        ))}
                    </select>
                </div>
            )} */}

            <div className="flex flex-col">
                <label className="font-semibold mb-2">Transport ID:</label>
                <input
                    type="text"
                    name="transportId"
                    value={formData.transportId}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold mb-2">Package ID:</label>
                <input
                    type="text"
                    name="packageId"
                    value={formData.packageId}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div>

            <button type="submit" className="w-full py-3 text-white bg-blue-500 hover:bg-blue-700 rounded-md">
                {formData.id ? 'Update Dispatch' : 'Create Dispatch'}
            </button>
        </form>
    );
};

export default EditDispatch;