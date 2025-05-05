import { useState } from 'react';
import ApiService, { initialAuthState } from '../../services/ApiService';
import { useNavigate } from 'react-router';

export default function AddProductType() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    companyCode: initialAuthState.companyCode,
    unitCode: initialAuthState.unitCode,
    type: '',
    photo: null,
    image: null,
  });

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   const payload = {
  //     name: formData.name,
  //     companyCode: formData.companyCode,
  //     unitCode: formData.unitCode,
  //     type: formData.type,
  //   };
  
  //   try {
  //     await ApiService.post('/productType/handleProductTypeDetails', payload, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  
  //     alert('Product Type submitted successfully!');
  //     setFormData({
  //       name: '',
  //       companyCode: initialAuthState.companyCode,
  //       unitCode: initialAuthState.unitCode,
  //       description: '',
  //       type: '',
  //       photo: null,
  //       image: null,
  //     });
  
  //     navigate('/product-type');
  //   } catch (error) {
  //     console.error('Error submitting form:', error.response || error);
  //     alert('Failed to submit product type.');
  //   }
  // };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = {name:formData.name,companyCode:formData.companyCode,unitCode:formData.unitCode,
        type: formData.type
      }
  
      try {
        const res=await ApiService.post("/productType/handleProductTypeDetails", data, {
          headers: { 'Content-Type': 'application/json' }
        });
        if(res.status){
          alert("Product Type submitted successfully!");
        }
        
        setFormData({
          name: "",
          companyCode: initialAuthState.companyCode,
          unitCode: initialAuthState.unitCode,
          type: "",
        });
     navigate("/product-type");
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit product type.");
      }
    };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Product Type Form</h2>
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
