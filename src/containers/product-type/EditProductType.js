import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import ApiService, { initialAuthState } from "../../services/ApiService";

export default function EditProductType() {
  const location = useLocation();
  const navigate = useNavigate();
  const productType = location.state?.productType;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    photo: null,
    image: null,
  });

  useEffect(() => {
    if (productType) {
      setFormData({
        name: productType?.name || "",
        description: productType?.description || "",
        photo: productType?.productPhoto || null,
        image: productType?.blogImage || null,
      });
    }
  }, [productType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files.length > 0 ? files[0] : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("companyCode", initialAuthState.companyCode);
    data.append("unitCode", initialAuthState.unitCode);
    data.append("description", formData.description);
    data.append("id", productType.id);

   data.append("photo", formData.photo);
    data.append("image", formData.image);

    try {
      await ApiService.post("/productType/handleProductTypeDetails", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product Type updated successfully!");
      navigate("/product-type");
    } catch (error) {
      console.error("Error updating product type:", error);
      alert("Failed to update product type.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Product Type</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        {/* <div>
          <label className="block text-sm font-medium">Product Photo</label>
          <input type="file" name="photo" value={formData.photo} onChange={handleFileChange} accept="image/*" className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium">Blog Image</label>
          <input type="file" name="image" value={formData.image} onChange={handleFileChange} accept="image/*" className="w-full" />
        </div> */}

<div>
  <label className="block text-sm font-medium">Product Photo</label>
  
  <input type="file" name="photo" onChange={handleFileChange} accept="image/*" className="w-full" />

</div>

<div>
  <label className="block text-sm font-medium">Blog Image</label>

  <input type="file" name="image" onChange={handleFileChange} accept="image/*" className="w-full" />

</div>


        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
          Update
        </button>
      </form>
    </div>
  );
}
