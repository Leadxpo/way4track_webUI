import React, { useState } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";
import { useLocation, useNavigate } from "react-router-dom";
const AddDesignation = () => {
    const [designation, setDesignation] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const [roles, setRoles] = useState([
        { name: "branch", add: false, edit: false, view: false },
        { name: "assets", add: false, edit: false, view: false },
        { name: "appointments", add: false, edit: false, view: false },
        { name: "staff", add: false, edit: false, view: false },
        { name: "client", add: false, edit: false, view: false },
        { name: "vendor", add: false, edit: false, view: false },
        { name: "subdealer", add: false, edit: false, view: false },
        { name: "hiring", add: false, edit: false, view: false },
        { name: "bank", add: false, edit: false, view: false },
        { name: "product", add: false, edit: false, view: false },
        { name: "productassign", add: false, edit: false, view: false },
        { name: "tickets", add: false, edit: false, view: false },
        { name: "voucher", add: false, edit: false, view: false },
        { name: "work-allocation", add: false, edit: false, view: false },
        { name: "estimate", add: false, edit: false, view: false },
        { name: "attendance", add: false, edit: false, view: false },
        { name: "requests", add: false, edit: false, view: false },
    ]);

    // Handle permission toggling
    const handlePermissionChange = (index, permissionType) => {
        setRoles((prevRoles) =>
            prevRoles.map((role, i) =>
                i === index ? { ...role, [permissionType]: !role[permissionType] } : role
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        // Ensure roles array is always included in the payload
        const updatedRoles = roles.map(role => ({
            ...role,
            add: role.add || false,
            edit: role.edit || false,
            view: role.view || false,
        }));
    
        const payload = {
            designation,
            roles: JSON.stringify(updatedRoles), // Convert roles to JSON string
            companyCode: initialAuthState?.companyCode,
            unitCode: initialAuthState?.unitCode,
        };
    
        try {
            const endpoint = `/designations/createDesignation`;
            const response = await ApiService.post(endpoint, payload);
    
            if (response.designation===designation) {
                alert("Designation added successfully!");
                setDesignation(""); // Clear input field after success
                setRoles(roles.map(role => ({ ...role, add: false, edit: false, view: false }))); // Reset roles
                navigate("/designations")
            } else {
                alert("Failed to update designation. Please try again.");
            }
        } catch (error) {
            console.error("Error saving designation:", error);
            alert("Error: Could not save designation. Please try again.");
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="p-5 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Designation</h2>
            <input
                type="text"
                placeholder="Enter Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="p-2 border rounded-lg w-full mb-4"
                required
            />

            <h3 className="text-lg font-semibold mb-2">Default Permissions</h3>
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
                        {roles.map((role, index) => (
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
                Save
            </button>
        </form>
    );
};

export default AddDesignation;