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
  const [productList, setProductList] = useState([]);

  // Fetch Staff List
  const fetchEmployees = async () => {
    try {
      const response = await ApiService.post("/dashboards/getStaff", {
        companyCode: initialAuthState?.companyCode,
        unitCode: initialAuthState?.unitCode,
      });

      if (response.status && Array.isArray(response.data)) {
        const staffData = response.data.map((staff) => ({
          id: staff.staffId?.trim() || "",
          name: staff.name?.trim() || "Unknown", // Ensure name exists
        }));
        setStaffList(staffData);
      } else {
        setStaffList([]);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Failed to fetch employee data.");
    }
  };

  // Fetch Product Type List
  const fetchProductType = async () => {
    try {
      // Uncomment when using API
      // const response = await ApiService.get("/productType/getProductTypeNamesDropDown");
      // if (response.status && Array.isArray(response.data)) {
      //   setProductList(response.data);
      // } else {
      //   setProductList([]);
      // }

      // Static Data for testing
      const response = [
        { id: 1, name: "Electronics" },
        { id: 2, name: "Furniture" },
        { id: 3, name: "Clothing" },
        { id: 4, name: "Groceries" },
        { id: 5, name: "Books" },
      ];
      setProductList(response);
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchProductType();
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
              <option key={staff.id} value={staff.id}>
                {staff.id} {/* Show both name and ID */}
              </option>
            ))}
          </select>
        </div>

        {/* Assign Time */}
        <div>
          <label className="block text-sm font-medium">Assign Time</label>
          <input
            type="datetime-local"
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
            {productList.map((product) => (
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
