
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/ApiService';

const EditDispatch = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialData = location.state?.dispatch || null;
    const [formData, setFormData] = useState({
        id: initialData.id || '',
        fromAddress: initialData.fromAddress || '',
        toAddress: initialData.toAddress || '',
        dispatchDate: initialData.dispatchDate ? initialData.dispatchDate.split('T')[0] : '',
        arrivalDate: initialData.arrivalDate ? initialData.arrivalDate.split('T')[0] : '',
        status: initialData.status || '',
        transportId: initialData.transportId || '',
        packageId: initialData.packageId || '',
        receiverName: initialData.receiverName || '',
        dispatcherName: initialData.dispatcherName || '',
        trackingURL: initialData.trackingURL || '',
        dispatchCompanyName: initialData.dispatchCompanyName || '',
        dispatchDescription: initialData.dispatchDescription || '',
        dispatchPicks: initialData.dispatchPicks || [],
    });

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    // async function fetchImageAndAppend(url, formData, fieldName = 'dispatchBoximage') {
    //     const response = await fetch(url);
    //     const blob = await response.blob();

    //     // Create a file from blob, give it a name
    //     const filename = url.split('/').pop(); // use last part of URL
    //     const file = new File([blob], filename, { type: blob.type });
    //   return  formData.append(fieldName, file);
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formPayload = new FormData();
            // Append normal fields
            for (const key in formData) {
                if (key !== 'dispatchPicks') {
                    formPayload.append(key, formData[key]);
                }
            }
            // Append files
            selectedFiles.length > 0 && (
                selectedFiles.forEach((file) => {
                    formPayload.append('dispatchBoximage', file);
                })
            )
            if (formData.dispatchPicks && formData.dispatchPicks.length > 0) {
                await Promise.all(
                    formData.dispatchPicks?.map(async (item) => {
                        const response = await fetch(item);
                        const blob = await response.blob();
                        const filename = item.split('/').pop();
                        const file = new File([blob], filename, { type: blob.type });
                        formPayload.append("dispatchBoximage", file);
                    })
                );
            }
            const response = await ApiService.post('/dispatch/handleDispatchDetails', formPayload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

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
                <label className="font-semibold mb-2">Dispatch Status:</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                >
                    <option value="" disabled>Select Status</option>
                    <option value="DISPATCHED">Dispatched</option>
                    <option value="ON_THE_WAY">On The Way</option>
                    <option value="DELIVERED">Delivered</option>
                </select>
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

            <div className="flex flex-col">
                <label className="font-semibold mb-2">Description:</label>
                <textarea
                    name="dispatchDescription"
                    placeholder="Dispatch Description"
                    value={formData.dispatchDescription}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold mb-2">Dispatch Photos:</label>
                <input
                    type="file"
                    name="dispatchPicks"
                    multiple
                    onChange={handleFileChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
                {/* Preview existing images if editing */}
                {formData.dispatchPicks.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.dispatchPicks?.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`Dispatch Pic ${idx + 1}`}
                                className="w-20 h-20 object-cover rounded-md"
                            />
                        ))}
                    </div>
                )}
            </div>

            <button type="submit" className="w-full py-3 text-white bg-blue-500 hover:bg-blue-700 rounded-md">
                {formData.id ? 'Update Dispatch' : 'Create Dispatch'}
            </button>
        </form>
    );
};


export default EditDispatch;