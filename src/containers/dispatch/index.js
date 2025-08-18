import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEllipsisV } from 'react-icons/fa';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { getPermissions } from '../../common/commonUtils';
import { Alert } from 'bootstrap';

const Dispatch = () => {
    const navigate = useNavigate();
    const [dispatches, setDispatches] = useState([]);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [transportId, setTransportId] = useState('');
    const [allDispatches, setAllDispatches] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [dropdownOpen, setDropdownOpen] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState({});
    const [permissions, setPermissions] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedDispatch, setSelectedDispatch] = useState(null);
    const [deliveryDescription, setDeliveryDescription] = useState(null);
    const [updatedDispatchStatus, setUpdatedDispatchStatus] = useState('');

    const [role, setRole] = useState(localStorage.getItem("role"));

    const leadStatusUpdate = (item) => {
        setSelectedDispatch(item);
        setUpdatedDispatchStatus(item.status);
        setShowModal(true);
    };

    const handleSubmitDispatchUpdate = async () => {
        const rrr = localStorage.getItem("userProfile");
        const userProfile = JSON.parse(rrr)?.data;
        const User = userProfile?.name + "-" + userProfile?.staffId;
        const formPayload = new FormData();
        formPayload.append("id", selectedDispatch.id);
        formPayload.append("status", updatedDispatchStatus);
        if (updatedDispatchStatus === 'ON_THE_WAY') {
            formPayload.append("transDate", new Date());
            formPayload.append("transUpdateUser", User);
        };
        if (updatedDispatchStatus === 'DELIVERED') {
            formPayload.append("deliveredDate", new Date());
            formPayload.append("deliveredUpdateUser", User);
            formPayload.append("deliveryDescription", deliveryDescription);
        }
    if (selectedDispatch.dispatchPicks && selectedDispatch.dispatchPicks.length > 0) {
        await Promise.all(
            selectedDispatch.dispatchPicks.map(async (item) => {
                const response = await fetch(item);
                const blob = await response.blob();
                const filename = item.split('/').pop();
                const file = new File([blob], filename, { type: blob.type });
                formPayload.append("dispatchBoximage", file);
            })
        );
    }

    try {
        const response = await ApiService.post('/dispatch/handleDispatchDetails', formPayload, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.status) {
            alert("updated successfully")
            navigate("/dispatch")
        }
    } catch (error) {
        console.error("error:", error);
    }
    setShowModal(false);
};



useEffect(() => {
    setPermissions(
        role?.toLowerCase() === "ceo" ||
        role?.toLowerCase() === "warehouse manager" ||
        role?.toLowerCase() === "inventory operational analyst"||
        role?.toLowerCase() === "branch manager"
    );
    console.log("role :", role);
    console.log("role :", permissions);
}, [role]); // ✅ depends on 'role', not 'permissions'


const toggleDropdown = (id) => {
    setDropdownOpen((prev) => ({
        ...prev,
        [id]: !prev[id], // Toggle only the clicked row
    }));
};

useEffect(() => {
    fetchDispatches();
}, [dateFrom, dateTo, transportId]);

const fetchDispatches = async () => {
    try {
        const response = await ApiService.post("/dispatch/getDispatchData", {
            fromDate: dateFrom,
            toDate: dateTo,
            transportId,
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
        });
        if (response.data) {
            setDispatches(response.data || []);
            setAllDispatches(response.data || []);
        } else {
            console.error("Error: API response is invalid");
        }
    } catch (error) {
        console.error("Error fetching dispatch data:", error);
    } finally {
        setLoading(false);
    }
};

const handleSearch = () => {
    fetchDispatches()
};

// const toggleDropdown = (id) => {
//     setDropdownOpen(dropdownOpen === id ? null : id);
// };

const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this dispatch?")) {
        return;
    }
    try {
        await ApiService.post("/dispatch/deleteDispatch", {
            id, companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
        });
        alert("Dispatch deleted successfully!");
        fetchDispatches();
    } catch (error) {
        console.error("Error deleting dispatch:", error);
        alert("Failed to delete dispatch.");
    }
};

return (
    <div className="m-2">
        <div className="flex justify-between items-center py-4">
            <h2 className="text-2xl font-semibold text-gray-800">Dispatch</h2>
            <button
                className={`px-4 py-2 text-white rounded-md transition  ${permissions ? 'bg-yellow-600 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed opacity-50'}`
                }
                onClick={() => navigate("/add-dispatch")}
                disabled={!permissions}
            >
                Add Dispatch
            </button>
        </div>
        <div className="flex mb-4">
            <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-12 border border-gray-500 rounded-md px-2 mr-2 w-full"
                placeholder="From"
            />
            <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="h-12 border border-gray-500 rounded-md px-2 mx-2 w-full"
                placeholder="To"
            />
            <input
                type="text"
                value={transportId}
                onChange={(e) => setTransportId(e.target.value)}
                className="h-12 border border-gray-500 rounded-md px-2 mx-2 w-full"
                placeholder="Transport ID"
            />
            <button
                onClick={handleSearch}
                className="h-12 px-6 bg-green-700 text-white rounded-md flex items-center"
            >
                <FaSearch className="mr-2" /> Search
            </button>
        </div>
        {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
        ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="px-6 py-3 text-left text-sm font-bold">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">company Name</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Reciver Name</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">From Address</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">To Address</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Dispatch Date</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Transport Id</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Package Id</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dispatches.length > 0 ? (
                            dispatches.map((item) => (
                                <tr key={item.id} className="border-b">
                                    <td className="px-6 py-4">{item.id}</td>
                                    <td className="px-6 py-4">{item.dispatchCompanyName}</td>
                                    <td className="px-6 py-4">{item.receiverName}</td>
                                    <td className="px-6 py-4">{item.fromAddress}</td>
                                    <td className="px-6 py-4">{item.toAddress}</td>
                                    <td className="px-2 py-2">
                                        {new Date(item.dispatchDate).toLocaleDateString('en-GB').replace(/\//g, '/')}
                                    </td>
                                    <td className="p-3" onClick={() => leadStatusUpdate(item)}>{item.status}</td>
                                    <td className="px-6 py-4">{item.transportId}</td>
                                    <td className="px-6 py-4">{item.packageId}</td>
                                    <td className="px-6 py-4 text-center relative">
                                        <button onClick={() => toggleDropdown(item.id)} className="p-2">
                                            <FaEllipsisV className="cursor-pointer text-gray-700" />
                                        </button>
                                        {dropdownOpen[item.id] && ( // Check against the specific row ID
                                            <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md min-w-[150px] z-50">
                                                <ul className="text-left">
                                                    {permissions &&
                                                        <li
                                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => navigate("/edit-dispatch", { state: { dispatch: item } })}
                                                        >
                                                            Edit
                                                        </li>}
                                                    {permissions &&
                                                        <li
                                                            className="p-2 hover:bg-gray-100 cursor-pointer text-red-600"
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            Delete
                                                        </li>
                                                    }
                                                    {permissions &&

                                                        <li
                                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => navigate("/show-dispatch", { state: { dispatch: item } })}
                                                        >
                                                            More Details
                                                        </li>
                                                    }
                                                </ul>
                                            </div>
                                        )}
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center py-4">No Dispatch found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )}
        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
                    <h2 className="text-xl font-semibold mb-4">Update Dispatch Status</h2>

                    <label className="block mb-2">Dispatch Status</label>
                    <select
                        value={updatedDispatchStatus}
                        onChange={(e) => setUpdatedDispatchStatus(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mb-4"
                    >
                        <option value="">Select Dispatch Status</option>
                        <option value="DISPATCHED">Dispatched</option>
                        <option value="ON_THE_WAY">On The Way</option>
                        <option value="DELIVERED">Delivered</option>
                    </select>

                    {(updatedDispatchStatus === 'DELIVERED') && (
                        <>
                            <label className="block mb-2">Dispatch Description</label>
                            <strong>
                                {selectedDispatch.dispatchDescription}
                            </strong>
                            <label className="block mb-2">Delivery Description</label>
                            <textarea
                                type="text"
                                name="deliveryDescription"
                                value={deliveryDescription}
                                onChange={(e) => setDeliveryDescription(e.target.value)}
                                className="px-4 py-2 border rounded-lg bg-gray-50"
                            />
                        </>
                    )}

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmitDispatchUpdate}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        )}

    </div>
);
};

export default Dispatch;
