import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../services/ApiService';

function EditApplicationDetails() {
  const location = useLocation();
  const [applicationDetails, setApplicationDetails] = useState([]);
  const [productMeta, setProductMeta] = useState({}); // companyCode, unitCode, webProductId

  useEffect(() => {
    const product = location?.state?.product;
    if (product && product.application) {
      const filledApplications = product.application.map(a => ({
        id: a.id,
        name: a.name || '',
        desc: a.desc || '',
        image: null,
        imagePreview: a.image || '',
      }));
      setApplicationDetails(filledApplications);

      setProductMeta({
        companyCode: product.companyCode,
        unitCode: product.unitCode,
        webProductId: product.id,
      });
    }
  }, [location.state?.product]);

  const handleChange = (index, field, value) => {
    setApplicationDetails(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleImageChange = (index, file) => {
    const preview = file ? URL.createObjectURL(file) : '';
    setApplicationDetails(prev => {
      const updated = [...prev];
      updated[index].image = file;
      updated[index].imagePreview = preview;
      return updated;
    });
  };

  const handleSubmit = async () => {
    for (let i = 0; i < applicationDetails.length; i++) {
      const application = applicationDetails[i];
      const formData = new FormData();
      formData.append('companyCode', productMeta.companyCode);
      formData.append('unitCode', productMeta.unitCode);
      formData.append('id', application.id);
      formData.append('name', application.name);
      formData.append('desc', application.desc);
      formData.append('webProductId', productMeta.webProductId);

      if (application.image) {
        formData.append('photo', application.image);
      }

      try {
        const res = await ApiService.post('/applications/handleUpdateApplicationDetails', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(`Application ${application.id} updated successfully:`, res.data);
      } catch (error) {
        console.error(`Failed to update application ${application.id}:`, error);
      }
    }
    alert('All applications updated.');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-2">Applications</h2>
      <p className="text-gray-500 mb-6">
        Add up to 6 applications that enhance your product's appeal. Each should have a name, description, and optional image.
      </p>

      {applicationDetails.map((application, index) => (
        <div key={index} className="border border-gray-200 rounded-md mb-6">
          <div className="bg-gray-100 px-4 py-2 rounded-t-md font-medium">
            Application {index + 1}
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter application name"
                value={application.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Enter a brief description"
                value={application.desc}
                onChange={(e) => handleChange(index, 'desc', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <label className="cursor-pointer block">
                <div className="border-dashed border-2 border-gray-300 rounded-md p-4 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mx-auto mb-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  <span className="font-medium">Upload</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  className="hidden"
                />
              </label>

              {application.imagePreview && (
                <div className="mt-2">
                  <img
                    src={application.imagePreview}
                    alt="Preview"
                    className="h-24 rounded border border-gray-300 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-sm transition duration-200"
      >
        Submit
      </button>
    </div>
  );
}

export default EditApplicationDetails;
