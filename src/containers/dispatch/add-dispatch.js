
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

const AddDispatch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const appointmentDetails = location.state?.dispatch || null;

    const [formData, setFormData] = useState({
        fromAddress: appointmentDetails?.fromAddress || '',
        toAddress: appointmentDetails?.toAddress || '',
        id: appointmentDetails?.id || null,
        dispatchCompanyName: appointmentDetails?.dispatchCompanyName,
        dispatchDate: appointmentDetails?.dispatchDate || '',
        arrivalDate: appointmentDetails?.arrivalDate || '',
        status: appointmentDetails?.status || '',
        transportId: appointmentDetails?.transportId || '',
        packageId: appointmentDetails?.packageId || '',
        assignedProductsId: appointmentDetails?.assignedProductsId || '',
        receiverName: appointmentDetails?.receiverName || '',
        dispatcherName: appointmentDetails?.dispatcherName || '',
        trackingURL: appointmentDetails?.trackingURL || '',
        dispatchDescription: appointmentDetails?.dispatchDescription || '',
        dispatchBoxImage: appointmentDetails?.dispatchBoxImage || [],
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
    });
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            dispatchBoxImage: [...prev.dispatchBoxImage, ...files],
        }));

        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    };

    const handleReplaceImage = (index) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setFormData((prev) => {
                    const updated = [...prev.dispatchBoxImage];
                    updated[index] = file;
                    return { ...prev, dispatchBoxImage: updated };
                });
                setImagePreviews((prev) => {
                    const updated = [...prev];
                    updated[index] = URL.createObjectURL(file);
                    return updated;
                });
            }
        };
        fileInput.click();
    };
    const removeImage = (index) => {
        const updatedImages = [...formData.dispatchBoxImage];
        updatedImages.splice(index, 1);
        setFormData((prev) => ({
            ...prev,
            dispatchBoxImage: updatedImages,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'dispatchBoxImage') {
                value.forEach((file) => payload.append('dispatchBoximage', file)); // 👈 use field name your backend expects
            } else {
                if (value !== null && value !== undefined) {
                    payload.append(key, value);
                }
            }
        });
        const ID = localStorage.getItem("userId")
        const role = localStorage.getItem("role")
        if (role === "sub_dealer") {

            payload.append("subDealerId", ID);
        } else {
            console.log("rrr :", ID)
            payload.append("staffId", ID);
        }
        try {
            const response = await ApiService.post('/dispatch/handleDispatchDetails', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status) {
                alert(formData.id ? 'Dispatch updated successfully!' : 'Dispatch created successfully!');
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
                    <option value="DISPATCHED">Dispatched</option>
                    <option value="ON_THE_WAY">On The Way</option>
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
                <label className="font-semibold mb-2">Receiver ID:</label>
                <input
                    type="text"
                    name="receiverName"
                    placeholder='861XXXX'
                    value={formData.receiverName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div>

            {/* <div className="flex flex-col">
                <label className="font-semibold mb-2">Dispatcher Name:</label>
                <input
                    type="text"
                    name="dispatcherName"
                    value={formData.dispatcherName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div> */}

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
                    type="text"
                    name="dispatchDescription"
                    placeholder='Dispatch Description'
                    value={formData.dispatchDescription}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
            </div>

            <div className="flex flex-col">
                <label className="font-semibold mb-2">Package Images:</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
                />
                <div className="flex flex-wrap gap-4 mt-4">
                    {imagePreviews.map((src, index) => (
                        <div key={index} className="relative">
                            <img
                                src={src}
                                alt={`Preview ${index}`}
                                className="w-24 h-24 object-cover rounded-md cursor-pointer"
                                onClick={() => handleReplaceImage(index)}
                            />
                            <span className="text-xs absolute bottom-1 left-1 bg-white/80 px-1 rounded-sm">
                                Click to Replace
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <button type="submit" className="w-full py-3 text-white bg-blue-500 hover:bg-blue-700 rounded-md">
                {formData.id ? 'Update Dispatch' : 'Create Dispatch'}
            </button>
        </form>
    );
};

export default AddDispatch;