import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { initialAuthState } from "../../services/ApiService";

const BranchDetails = () => {
  const [branchDetails, setBranchDetails] = useState({
    branchName: "",
    branchNumber: "",
    address: "",
    email: "",
    branchPhoto: "",
    city: "",
    state: "",
    phoneNumber: "",
    branchOpening: "",
    staff: [],
    asserts: [],
  });

  const location = useLocation();
  const branchDetailsFromState = location.state?.branchDetails || {};


  useEffect(() => {
    const fetchBranchDetails = async () => {
      try {
        const response = await ApiService.post("/branch/getBranchDetailsById", {
          id: branchDetailsFromState.id,
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
  }, [branchDetailsFromState.id]);

  return (
    <div className="space-y-10 px-8 py-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <img
          src={branchDetails.branchPhoto || "default-branch.png"}
          alt="Branch Logo"
          className="w-16 h-16 rounded-full"
        />
        <h1 className="text-3xl font-bold text-green-600">
          {branchDetails.branchName}
        </h1>
      </div>

      {/* Branch Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <strong>Branch Name:</strong>
          <p>{branchDetails.branchName}</p>
        </div>
        <div>
          <strong>Branch Number:</strong>
          <p>{branchDetails.branchNumber}</p>
        </div>
        <div>
          <strong>Email:</strong>
          <p>{branchDetails.email}</p>
        </div>
        <div>
          <strong>Address:</strong>
          <p>{branchDetails.address}</p>
        </div>
        <div>
          <strong>City:</strong>
          <p>{branchDetails.city}</p>
        </div>
        <div>
          <strong>State:</strong>
          <p>{branchDetails.state}</p>
        </div>
        <div>
          <strong>Branch Opening:</strong>
          <p>{branchDetails.branchOpening}</p>
        </div>
      </div>

      {/* Staff */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Branch Staff</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branchDetails.staff.map((staff, index) => (
            <div key={index} className="text-center">
              <img
                src={staff.staffPhoto || "default-staff.png"}
                alt={staff.name}
                className="rounded-full w-24 h-24"
              />
              <p>{staff.name}</p>
              <p>{staff.designation}</p>
              <p>{branchDetails.branchName}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assets */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Branch Assets</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branchDetails.asserts.length > 0 ? (
            branchDetails.asserts.map((asset, index) => (
              <div key={index} className="p-4 border rounded-lg shadow">
                <p>
                  <strong>Asset Name:</strong> {asset.name || "N/A"}
                </p>
                <p>
                  <strong>Asset Amount:</strong> {asset.amount || "N/A"}
                </p>
                <p>
                  <strong>Asset Type:</strong> {asset.type || "N/A"}
                </p>
                {asset.photo && (
                  <img
                    src={asset.photo}
                    alt={asset.name || "Asset"}
                    className="w-full h-32 object-cover mt-2"
                  />
                )}
              </div>
            ))
          ) : (
            <p>No assets available for this branch.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BranchDetails;

