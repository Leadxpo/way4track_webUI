import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEllipsisV } from 'react-icons/fa';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

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
                    className="bg-green-700 text-white px-4 py-2 rounded-md"
                    onClick={() => navigate("/add-dispatch")}
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
                                        <td className="px-6 py-4">{item.dispatchDate}</td>
                                        <td className="px-6 py-4">{item.status}</td>
                                        <td className="px-6 py-4">{item.transportId}</td>
                                        <td className="px-6 py-4">{item.packageId}</td>
                                        <td className="px-6 py-4 text-center relative">
                                            <button onClick={() => toggleDropdown(item.id)} className="p-2">
                                                <FaEllipsisV className="cursor-pointer text-gray-700" />
                                            </button>
                                            {dropdownOpen[item.id] && ( // Check against the specific row ID
                                                <div className="absolute right-0 mt-2 bg-white shadow-lg border rounded-md min-w-[150px] z-50">
                                                    <ul className="text-left">
                                                        <li
                                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => navigate("/edit-dispatch", { state: { dispatch: item } })}
                                                        >
                                                            Edit
                                                        </li>
                                                        <li
                                                            className="p-2 hover:bg-gray-100 cursor-pointer text-red-600"
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            Delete
                                                        </li>
                                                        <li
                                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => navigate("/show-dispatch", { state: { dispatch: item } })}
                                                        >
                                                            More Details
                                                        </li>
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
        </div>
    );
};

export default Dispatch;
