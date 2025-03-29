import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import ApiService, { initialAuthState } from "../../services/ApiService";

export default function ShowProductType() {
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
        name: productType.name || "",
        description: productType.description || "",
        photo: productType.productPhoto || null,
        image: productType.blogImage || null,
      });
    }
  }, [productType]);



  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Product Type</h2>
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={formData.name}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={formData.description}
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

<div>
  <label className="block text-sm font-medium">Product Photo</label>
  {formData.photo && typeof formData.photo === "string" && (
    <img src={formData.photo} alt="photo" className="w-20 h-20 object-cover mb-2" />
  )}
  <input type="file" name="photo" accept="image/*" className="w-full" />
</div>

<div>
  <label className="block text-sm font-medium">Blog Image</label>
  {formData.image && typeof formData.image === "string" && (
    <img src={formData.image} alt="Blog" className="w-20 h-20 object-cover mb-2" />
  )}
  <input type="file" name="image" accept="image/*" className="w-full" />
</div>

    </div>
  );
}
