import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ApiService from '../services/ApiService';
import AddProductAppPopup from './AddProductAppPopup';

function EditProductAppDetails() {
  const location = useLocation();
  const [productApps, setProductApps] = useState([]);
  const [productMeta, setProductMeta] = useState({});
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);

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
            file: null,
            filePreview: p.file || '',
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

  const handlePointFileChange = (appIndex, pointIndex, file) => {
    const preview = file ? URL.createObjectURL(file) : '';
    const updated = [...productApps];
    updated[appIndex].points[pointIndex].file = file;
    updated[appIndex].points[pointIndex].filePreview = preview;
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

  // const handleAddNewApp = () => {
  //   const newApp = {
  //     name: '',
  //     shortDescription: '',
  //     image: null,
  //     imagePreview: '',
  //     points: [{ title: '', desc: '' }],
  //   };
  //   setProductApps([...productApps, newApp]);
  // };

  const handleAddNewApp = () => {
    setShowAddPopup(true);
  };

  const handleSaveNewApp = (newApp) => {
    delete newApp.id;
    setProductApps([...productApps, newApp]);
    handleSubmitSingleApp(newApp)
  };

  const handleSubmitSingleApp = async (app, index) => {
    const formData = new FormData();
    if (app.id) {
      formData.append('id', app.id);
    }
    formData.append('name', app.name);
    formData.append('shortDescription', app.shortDescription);
    formData.append('companyCode', productMeta.companyCode);
    formData.append('unitCode', productMeta.unitCode);
    formData.append('webProductId', productMeta.webProductId);
    if (app.image) formData.append('photo', app.image);

    (app.points || []).forEach((p, pIndex) => {
      formData.append(`points[${pIndex}].title`, p.title || '');
      formData.append(`points[${pIndex}].desc`, p.desc || '');
      if (p.file) {
        formData.append(`points[${pIndex}].file`, p.file, p.file.name);
      }
    });

    try {
      setLoadingIndex(index);
      const res = await ApiService.post(
        '/product-apps/handleUpdateAppDetails',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(`Product App ${app.id || '[New]'} updated:`, res.data);
      alert(`Product App ${index + 1} updated successfully!`);
    } catch (error) {
      console.error(
        `Failed to update product app ${app.id || '[New]'}:`,
        error
      );
      alert(`Failed to update Product App ${index + 1}`);
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleRemoveApp = async (indexToRemove) => {
    const id = indexToRemove;
    const confirmDelete = window.confirm(
      'Are you sure you want to remove this product app?'
    );
    if (!confirmDelete) return;

    const updated = productApps.filter((_, i) => i !== indexToRemove);
    setProductApps(updated);
    try {
      const res = await ApiService.post('/device/deleteDeviceDetails', {
        id: id,
      });
      console.log(`Product App ${id} deleted successfully:`, res.data);
      alert(`Product App "${id}" deleted successfully`);
      // navigate('/ceoui');
    } catch (error) {
      console.error(`Failed to update Product App ${id}:`, error);
      alert(`Failed to update Product App "${id}"`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        type="button"
        onClick={handleAddNewApp}
        className="mb-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg"
      >
        + Add New Product App
      </button>

      <h2 className="text-2xl font-semibold mb-2">Product Applications</h2>
      <p className="text-gray-500 mb-6">
        Update each product app individually with this editor.
      </p>

      {productApps.map((app, index) => (
        <div key={index} className="border border-gray-300 rounded-lg mb-6">
          <div className="bg-gray-100 px-4 py-2 font-medium rounded-t-lg">
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
                className="mt-1 block w-full p-2 rounded-md border border-gray-300"
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
                className="mt-1 block w-full p-2 rounded-md border border-gray-300"
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
              <button
                type="button"
                onClick={() => {
                  const updated = [...productApps];
                  updated[index].points.push({ title: '', desc: '' });
                  setProductApps(updated);
                }}
                className="text-blue-600 hover:underline text-sm"
              >
                + Add Point
              </button>
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

                  {/* Upload Image */}
                  <label className="cursor-pointer block mb-2">
                    <div className="border-dashed border-2 border-gray-300 rounded-md p-2 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition">
                      Upload Point Image
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePointFileChange(index, pointIndex, e.target.files[0])}
                      className="hidden"
                    />
                  </label>

                  {/* Show Preview */}
                  {point.filePreview && (
                    <div className="mt-2">
                      <img
                        src={point.filePreview}
                        alt="Point Preview"
                        className="h-20 rounded border object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="button"
                onClick={() => handleSubmitSingleApp(app, index)}
                disabled={loadingIndex === index}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg ${loadingIndex === index ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {loadingIndex === index ? 'Saving...' : 'Update'}
              </button>

              <button
                type="button"
                onClick={() => handleRemoveApp(app.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {showAddPopup && (
        <AddProductAppPopup
          onClose={() => setShowAddPopup(false)}
          onSave={handleSaveNewApp}
        />
      )}
    </div>
  );
}

export default EditProductAppDetails;
