import { useEffect, useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import { useLocation, useNavigate } from "react-router-dom";

const EditDesignation = () => {
    const [designationDetails, setDesignationDetails] = useState({
        id: 0,
        designation: "",
        roles: [],
    });

    const navigate = useNavigate();
    const location = useLocation();
    const designationData = location.state?.designationDetails || {};

    useEffect(() => {
        const fetchDesignationDetails = async () => {
            try {
                const response = await ApiService.post("/designations/getDesignation", {
                    designation: designationData.designation,
                    companyCode: initialAuthState.companyCode,
                    unitCode: initialAuthState.unitCode,
                });

                if (response?.status) {
                    setDesignationDetails(response.data);
                } else {
                    console.error("Failed to fetch designation details:", response);
                }
            } catch (error) {
                console.error("Error fetching designation details:", error);
                alert("Failed to fetch designation details.");
            }
        };

        if (designationData.designation) {
            fetchDesignationDetails();
        }
    }, [designationData.designation]);

    // Handle designation input change
    const handleDesignationChange = (e) => {
        setDesignationDetails((prev) => ({
            ...prev,
            designation: e.target.value,
        }));
    };

    // Handle permission toggling
    const handlePermissionChange = (index, permissionType) => {
        setDesignationDetails((prev) => ({
            ...prev,
            roles: prev.roles.map((role, i) =>
                i === index ? { ...role, [permissionType]: !role[permissionType] } : role
            ),
        }));
    };

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const payload = {
            id: designationDetails.id,
            designation: designationDetails.designation,
            roles: JSON.stringify(designationDetails.roles), // Convert roles to JSON string
            companyCode: initialAuthState?.companyCode,
            unitCode: initialAuthState?.unitCode,
        };
        try {
            const response = await ApiService.post("/designations/createDesignation", payload);
            console.log(" payloadss :", response.designation,"===",designationDetails.designation)
            
            if (response.designation===designationDetails.designation) {
                alert("Designation updated successfully!");
                navigate("/designations")
            } else {
                alert("Failed to update designation. Please try again.");
            }
        } catch (error) {
            console.error("Error updating designation:", error);
            alert("Error: Could not update designation. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Edit Designation</h2>
            <input
                type="text"
                placeholder="Enter Designation"
                value={designationDetails.designation}
                onChange={handleDesignationChange}
                className="p-2 border rounded-lg w-full mb-4"
                required
            />

            <h3 className="text-lg font-semibold mb-2">Permissions</h3>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Role</th>
                            <th className="p-2 border">View</th>
                            <th className="p-2 border">Add</th>
                            <th className="p-2 border">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {designationDetails.roles.map((role, index) => (
                            <tr key={role.name} className="text-center">
                                <td className="p-2 border">{role.name.replace("-", " ")}</td>
                                <td className="p-2 border">
                                    <input
                                        type="checkbox"
                                        checked={role.view}
                                        onChange={() => handlePermissionChange(index, "view")}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <input
                                        type="checkbox"
                                        checked={role.add}
                                        onChange={() => handlePermissionChange(index, "add")}
                                    />
                                </td>
                                <td className="p-2 border">
                                    <input
                                        type="checkbox"
                                        checked={role.edit}
                                        onChange={() => handlePermissionChange(index, "edit")}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                Update
            </button>
        </form>
    );
};

export default EditDesignation;
