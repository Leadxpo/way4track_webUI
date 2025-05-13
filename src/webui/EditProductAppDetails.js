import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';

function EditProductAppDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [productApps, setProductApps] = useState([]);
  const [productMeta, setProductMeta] = useState({});

  useEffect(() => {
    const product = location?.state?.product;
    if (product && product.productApp) {
      const filledApps = product.productApp.map((app) => ({
        id: app.id,
        name: app.name || '',
        shortDescription: app.shortDescription || '',
        image: null,
        imagePreview: app.image || '',
        points:
          app.points?.map((p) => ({
            title: p.title || '',
            desc: p.desc || '',
          })) || [],
      }));
      setProductApps(filledApps);
      setProductMeta({
        companyCode: product.companyCode,
        unitCode: product.unitCode,
        webProductId: product.id,
      });
    }
  }, [location.state?.product]);

  const handleAppChange = (index, field, value) => {
    const updated = [...productApps];
    updated[index][field] = value;
    setProductApps(updated);
  };

  const handleImageChange = (index, file) => {
    const preview = file ? URL.createObjectURL(file) : '';
    const updated = [...productApps];
    updated[index].image = file;
    updated[index].imagePreview = preview;
    setProductApps(updated);
  };

  const handlePointChange = (appIndex, pointIndex, field, value) => {
    const updated = [...productApps];
    updated[appIndex].points[pointIndex][field] = value;
    setProductApps(updated);
  };

  const handleSubmit = async () => {
    for (const app of productApps) {
      const formData = new FormData();
      formData.append('id', app.id);
      formData.append('name', app.name);
      formData.append('shortDescription', app.shortDescription);
      formData.append('companyCode', productMeta.companyCode);
      formData.append('unitCode', productMeta.unitCode);
      formData.append('webProductId', productMeta.webProductId);
      formData.append('points', JSON.stringify(app.points));
      if (app.image) formData.append('photo', app.image);

      try {
        const res = await ApiService.post(
          '/product-apps/handleUpdateAppDetails',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        console.log(`Product App ${app.id} updated:`, res.data);
        navigate('/ceoui');
      } catch (error) {
        console.error(`Failed to update product app ${app.id}:`, error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-2">Product Applications</h2>
      <p className="text-gray-500 mb-6">
        Edit each product app’s details and its key points.
      </p>

      {productApps.map((app, index) => (
        <div key={index} className="border border-gray-200 rounded-md mb-6">
          <div className="bg-gray-100 px-4 py-2 rounded-t-md font-medium">
            Product App {index + 1}
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={app.name}
                onChange={(e) => handleAppChange(index, 'name', e.target.value)}
                className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Short Description
              </label>
              <textarea
                value={app.shortDescription}
                onChange={(e) =>
                  handleAppChange(index, 'shortDescription', e.target.value)
                }
                className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <label className="cursor-pointer block">
                <div className="border-dashed border-2 border-gray-300 rounded-md p-4 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition">
                  Upload Image
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  className="hidden"
                />
              </label>
              {app.imagePreview && (
                <div className="mt-2">
                  <img
                    src={app.imagePreview}
                    alt="Preview"
                    className="h-24 rounded border object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Points
              </label>
              {app.points.map((point, pointIndex) => (
                <div key={pointIndex} className="mb-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={point.title}
                    onChange={(e) =>
                      handlePointChange(
                        index,
                        pointIndex,
                        'title',
                        e.target.value
                      )
                    }
                    className="block w-full mb-1 p-2 rounded-md border border-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={point.desc}
                    onChange={(e) =>
                      handlePointChange(
                        index,
                        pointIndex,
                        'desc',
                        e.target.value
                      )
                    }
                    className="block w-full p-2 rounded-md border border-gray-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
      >
        Submit
      </button>
    </div>
  );
}

export default EditProductAppDetails;
