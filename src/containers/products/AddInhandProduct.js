import React, { useState, useEffect } from "react";
import ApiService, { initialAuthState } from "../../services/ApiService";

const AddInhandProduct = () => {
  const [formData, setFormData] = useState({
    staffId: "",
    assignTime: "",
    productTypeId: 0, // Default as number
    numberOfProducts: 0, // Default as number
  });

  const [staffList, setStaffList] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  // Fetch Staff List
  const fetchEmployees = async () => {
    const branchName="Vishakapatnam"
    try {
      const response = await ApiService.post("/dashboards/getTotalStaffDetails", {
        branchName:branchName,
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      console.log(
        "qqqqq",
        response.data.staff.filter(staff => staff.staffDesignation === "Technician")
      );

      setStaffList(response.data.staff.filter(staff => staff.staffDesignation === "Technician"));

    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Failed to fetch employee data.");
    }
  };



  useEffect(() => {
    fetchEmployees();

  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "productTypeId" || name === "numberOfProducts" ? Number(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.staffId || !formData.assignTime || !formData.productTypeId || !formData.numberOfProducts) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await ApiService.post(
        "/product-assign/handleProductDetails",
        {
          ...formData,
          productTypeId: Number(formData.productTypeId),
          numberOfProducts: Number(formData.numberOfProducts),
          companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
        }
      );

      console.log("Submitting:", response);
      alert("Product Handover successfully!");

      // Reset Form
      setFormData({
        staffId: "",
        assignTime: "",
        productTypeId: 0,
        numberOfProducts: 0,
      });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Submission failed.");
    }
  };


  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await ApiService.post("/productType/getProductTypeDetails");
      if (response.data) {
        setProductTypes(response.data);
        console.log("qazwsxedc",response.data)
      } else {
        console.error("Invalid API response");
      }
    } catch (error) {
      console.error("Error fetching product types:", error);
    } finally {
      
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Assign In-Hand Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Staff Selection */}
        <div>
          <label className="block text-sm font-medium">Staff</label>
          <select
            name="staffId"
            value={formData.staffId}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Staff</option>
            {staffList.map((staff) => (
              <option key={staff.staffId} value={staff.staffId}>
                {staff.staffId}
              </option>
            ))}
          </select>
        </div>

        {/* Assign Time */}
        <div>
          <label className="block text-sm font-medium">Assign Time</label>
          <input
            type="date"
            name="assignTime"
            value={formData.assignTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Product Type Selection */}
        <div>
          <label className="block text-sm font-medium">Product Type</label>
          <select
            name="productTypeId"
            value={formData.productTypeId}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Product</option>
            {productTypes.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Products */}
        <div>
          <label className="block text-sm font-medium">Number of Products</label>
          <input
            type="number"
            name="numberOfProducts"
            value={formData.numberOfProducts}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddInhandProduct;
