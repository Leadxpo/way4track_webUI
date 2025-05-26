import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService, { initialAuthState } from "../../services/ApiService";

export default function AddEditPromocode() {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state?.editData || null;

  const [formData, setFormData] = useState({
    promocode: "",
    date: new Date().toISOString().split("T")[0],
    discount: 0,
    discountType: "PERCENTAGE",
    minSaleAmount: "",
    maxDiscountAmount: "",
    promoUsers: "",
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        promocode: editData.promocode || "",
        date: editData.date ? editData.date.split("T")[0] : new Date().toISOString().split("T")[0],
        discount: editData.discount || 0,
        discountType: editData.discountType || "PERCENTAGE",
        minSaleAmount: editData.minSaleAmount || "",
        maxDiscountAmount: editData.maxDiscountAmount || "",
        promoUsers: editData.promoUsers || "",
        companyCode: editData.companyCode || initialAuthState.companyCode,
        unitCode: editData.unitCode || initialAuthState.unitCode,
        id: editData.id, // Needed for edit
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      discount: parseFloat(formData.discount),
      minSaleAmount: formData.minSaleAmount ? parseFloat(formData.minSaleAmount) : null,
      maxDiscountAmount: formData.maxDiscountAmount ? parseFloat(formData.maxDiscountAmount) : null,
    };

    try {
      const res = await ApiService.post("/promocode/handlePromocodeDetails", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.status) {
        alert(editData ? "Promocode updated successfully!" : "Promocode created successfully!");
        navigate("/promocode");
      }
    } catch (error) {
      console.error("Error submitting promocode:", error);
      alert("Failed to submit promocode.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {editData ? "Edit Promocode" : "Add Promocode"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Promocode</label>
          <input
            type="text"
            name="promocode"
            value={formData.promocode}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Discount</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Discount Type</label>
          <select
            name="discountType"
            value={formData.discountType}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="PERCENTAGE">Percentage</option>
            <option value="FIXED">Fixed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Min Sale Amount</label>
          <input
            type="number"
            name="minSaleAmount"
            value={formData.minSaleAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Max Discount Amount</label>
          <input
            type="number"
            name="maxDiscountAmount"
            value={formData.maxDiscountAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
          {editData ? "Update Promocode" : "Submit Promocode"}
        </button>
      </form>
    </div>
  );
}
