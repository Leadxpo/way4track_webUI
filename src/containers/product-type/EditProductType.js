import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import ApiService, { initialAuthState } from '../../services/ApiService';

export default function EditProductType() {
  const location = useLocation();
  const navigate = useNavigate();
  const productType = location.state?.productType;
  console.log('productType ---->productType', productType);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    id: productType.id,
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    // photo: null,
    // image: null,
  });

  useEffect(() => {
    if (productType) {
      setFormData({
        name: productType?.name || '',
        type: productType?.type || '',
        id: productType.id,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      });
    }
  }, [productType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { ...formData };
    // data.append('id', productType.id);
    // data.append('name', formData.name);
    // data.append('companyCode', initialAuthState.companyCode);
    // data.append('unitCode', initialAuthState.unitCode);
    // data.append('type', formData.type);

    // data.append('photo', formData.photo);
    // data.append('image', formData.image);

    try {
      const response = await ApiService.post(
        '/productType/handleProductTypeDetails',
        data
      );
      if (response.status) {
        alert('Product Type updated successfully!');
        navigate('/product-type');
      }
    } catch (error) {
      console.error('Error updating product type:', error);
      alert('Failed to update product type.');
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
          <label className="block text-sm font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select an option</option>
            <option value="PRODUCT">Product</option>
            <option value="APPLICATION">Application</option>
          </select>
        </div>

        {/* <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div> */}

        {/* <div>
          <label className="block text-sm font-medium">Product Photo</label>
          <input type="file" name="photo" value={formData.photo} onChange={handleFileChange} accept="image/*" className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium">Blog Image</label>
          <input type="file" name="image" value={formData.image} onChange={handleFileChange} accept="image/*" className="w-full" />
        </div> */}

        {/* <div>
          <label className="block text-sm font-medium">Product Photo</label>

          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Blog Image</label>

          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full"
          />
        </div> */}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md"
        >
          Update
        </button>
      </form>
    </div>
  );
}
