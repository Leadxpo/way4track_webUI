import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { initialAuthState } from "../../services/ApiService";
import { getPermissions } from '../../common/commonUtils';
const DesignationDetails = () => {
    const [branchDetails, setBranchDetails] = useState({
        designation: "",
        roles: [],
    });
    const [permissions, setPermissions] = useState({});

    const navigate = useNavigate();
    const location = useLocation();
    const branchDetailsFromState = location.state?.designationDetails || {};
    useEffect(() => {
        setPermissions(getPermissions('staff'));
      }, [permissions]);
    
    

    useEffect(() => {
        const fetchBranchDetails = async () => {
            try {
                const response = await ApiService.post("/designations/getDesignation", {
                    designation: branchDetailsFromState.designation,
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
    }, [branchDetailsFromState.designation]);

    return (
        <div className="space-y-10 px-8 py-4">

            {/* Branch Info */}
            <div className="space-y-6 px-8 py-4">
                {/* Designation Info Card */}
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Designation Details</h2>
                        <div className="text-lg font-medium text-gray-900">
                            <span className="text-blue-600">Designation:</span> {branchDetails.designation}
                        </div>
                    </div>
                    {permissions.edit &&
                    <button className="btn-primarypx-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600" style={{paddingLeft:15,paddingRight:15,paddingTop:5,paddingBottom:5,margin:5}} onClick={() => navigate('/edit-designation', { state: { designationDetails: branchDetails } })}>
                        EDIT
                    </button>
                    }

                </div>

                {/* Roles Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Roles & Permissions</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="border border-gray-300 px-4 py-2">Role Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Add</th>
                                    <th className="border border-gray-300 px-4 py-2">Edit</th>
                                    <th className="border border-gray-300 px-4 py-2">Delete</th>
                                    <th className="border border-gray-300 px-4 py-2">View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {branchDetails?.roles?.map((role, index) => (
                                    <tr key={index} className="text-center border-b border-gray-300 hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2 font-medium text-gray-900">{role.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span className={`px-2 py-1 rounded-md text-white ${role.add ? "bg-green-500" : "bg-red-500"}`}>
                                                {role.add ? "Yes" : "No"}
                                            </span>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span className={`px-2 py-1 rounded-md text-white ${role.edit ? "bg-green-500" : "bg-red-500"}`}>
                                                {role.edit ? "Yes" : "No"}
                                            </span>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span className={`px-2 py-1 rounded-md text-white ${role.delete ? "bg-green-500" : "bg-red-500"}`}>
                                                {role.delete ? "Yes" : "No"}
                                            </span>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span className={`px-2 py-1 rounded-md text-white ${role.view ? "bg-green-500" : "bg-red-500"}`}>
                                                {role.view ? "Yes" : "No"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DesignationDetails;

