import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus, Image as ImageIcon } from 'lucide-react';
import ApiService from '../services/ApiService';

const DashboardForm = ({
  initialData,
  onSuccess,
  onCancel,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    header: '',
    shortDescription: '',
    theme: '',
  });

  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const [themeBgimage, setThemeBgimage] = useState(null);
  const [themeBgPreview, setThemeBgPreview] = useState(null);
  const [existingBgImage, setExistingBgImage] = useState(null);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sessionThemes = [
    'Session-1',
    'Session-2',
    'Session-3',
    'Session-4',
    'Session-5',
    'Session-6',
    'Session-7',
    'Session-8',
    'Session-9',
    'Session-10',
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        name: initialData.name || '',
        header: initialData.header || '',
        shortDescription: initialData.shortDescription || '',
        theme: initialData.theme || '',
      });

      if (initialData.image) {
        setExistingImage(initialData.image);
        setPreviewImage(initialData.image);
      }

      if (initialData.themeBgimage) {
        setExistingBgImage(initialData.themeBgimage);
        setThemeBgPreview(initialData.themeBgimage);
      }

      if (initialData.list && initialData.list.length > 0) {
        setList(
          initialData.list.map((item) => ({
            desc: item.desc || '',
            name: item.name || '',
            photo: item.photo || null, // Store directly in photo
            preview: null,
          }))
        );
      } else {
        updateListBasedOnTheme(initialData.theme);
      }
    }
  }, [initialData]);

  const updateListBasedOnTheme = (theme) => {
    switch (theme) {
      case 'Session-2':
        setList(
          new Array(4).fill(null).map(() => ({
            desc: '',
            photo: null,
            preview: null,
            // photoUrl: null,
          }))
        );
        break;
      case 'Session-3':
        setList(
          new Array(10).fill(null).map(() => ({
            desc: '',
            photo: null,
            preview: null,
            // photoUrl: null,
          }))
        );
        break;
      case 'Session-4':
        setList([{ desc: '', photo: null, preview: null }]);
        break;
      case 'Session-5':
      case 'Session-6':
        setList([{ name: '', desc: '' }]);
        break;
      default:
        setList([]);
    }
  };

  useEffect(() => {
    if (!initialData || !initialData.list) {
      updateListBasedOnTheme(formData.theme);
    }
  }, [formData.theme]);

  const handleBgFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setThemeBgimage(file);
      setThemeBgPreview(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleListChange = (index, field, value) => {
    setList((prevList) => {
      const updated = [...prevList];
      updated[index] = {
        ...updated[index],
        [field]: value,
        // Don't overwrite existing values unnecessarily
        photo: updated[index].photo ?? null,
        preview: updated[index].preview ?? null,
        photoUrl: updated[index].photoUrl ?? null,
      };
      return updated;
    });
  };

  // Fixed handleListFileChange function that preserves photoUrl for other items
  //  const handleListFileChange = (index, e) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const updated = [...list];
  //     updated[index] = {
  //       ...updated[index],
  //       photo: file,
  //       preview: URL.createObjectURL(file),
  //       photoUrl: null, // Clear photoUrl only when new file is selected
  //     };
  //     setList(updated);
  //   }
  // };

  const handleListFileChange = (index, e) => {
    const file = e.target.files?.[0];
    if (file) {
      setList((prev) =>
        prev.map((item, i) =>
          i === index
            ? {
              ...item,
              photo: file,
              preview: URL.createObjectURL(file),
              // Keep existing photoUrl until upload succeeds
            }
            : item
        )
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const payload = new FormData();

  //     // Add main form data
  //     payload.append('name', formData.name);
  //     payload.append('header', formData.header);
  //     payload.append('shortDescription', formData.shortDescription);
  //     payload.append('theme', formData.theme);
  //     payload.append('companyCode', 'WAY4TRACK');
  //     payload.append('unitCode', 'WAY4');

  //     if (isEdit && formData.id) {
  //       payload.append('id', formData.id);
  //     }

  //     // Handle main image
  //     if (image) {
  //       payload.append('image', image);
  //     } else if (existingImage) {
  //       payload.append('existingImage', existingImage);
  //     }

  //     // Handle background image
  //     if (themeBgimage) {
  //       payload.append('themeBgimage', themeBgimage);
  //     } else if (existingBgImage) {
  //       payload.append('existingBgImage', existingBgImage);
  //     }

  //     // Handle list items with proper indexing
  //     list.forEach((item, index) => {
  //       payload.append(`list[${index}][desc]`, item.desc || '');

  //       if (item.name !== undefined) {
  //         payload.append(`list[${index}][name]`, item.name || '');
  //       }

  //       // Handle photos - send existing URL as string or new File
  //       if (item.photo instanceof File) {
  //         payload.append(`photo`, item.photo);
  //       } else if (item.photoUrl) {
  //         // Send existing URL as string
  //         payload.append(`photo`, item.photo);
  //       }
  //     });

  //     const response = await ApiService.post(
  //       'promotion/handlePromotionDetails',
  //       payload,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );

  //     if (response.data.status) {
  //       onSuccess?.();
  //     } else {
  //       setError(response.data.internalMessage || 'Unknown error occurred');
  //     }
  //   } catch (error) {
  //     console.error('Submission error:', error);
  //     setError('Error during submission. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const urlToFile = async (url, filename = 'image.jpg') => {
    const response = await fetch(url);
    const blob = await response.blob();
    const mimeType = blob.type || 'image/jpeg';
    return new File([blob], filename, { type: mimeType });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = new FormData();

      // Add main form data
      payload.append('name', formData.name);
      payload.append('header', formData.header);
      payload.append('shortDescription', formData.shortDescription);
      payload.append('theme', formData.theme);
      payload.append('companyCode', 'WAY4TRACK');
      payload.append('unitCode', 'WAY4');

      if (isEdit && formData.id) {
        payload.append('id', formData.id);
      }

      // Main image
      if (image) {
        payload.append('image', image);
      } else if (existingImage) {
        const file = await urlToFile(existingImage, 'mainImage.jpg');
        payload.append('image', file);
      }

      // Background image
      if (themeBgimage) {
        payload.append('themeBgimage', themeBgimage);
      } else if (existingBgImage) {
        const file = await urlToFile(existingBgImage, 'bgImage.jpg');
        payload.append('themeBgimage', file);
      }

      // Handle list items
      for (let index = 0; index < list.length; index++) {
        const item = list[index];
        payload.append(`list[${index}][desc]`, item.desc || '');

        if (item.name !== undefined) {
          payload.append(`list[${index}][name]`, item.name || '');
        }

        if (item.photo instanceof File) {
          payload.append(`photo`, item.photo);
        } else if (item.photo) {
          const file = await urlToFile(item.photo, `photo-${index}.jpg`);
          payload.append(`photo`, file);
        }
      }

      const response = await ApiService.post(
        'promotion/handlePromotionDetails',
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('API response:', response);
      if (response.status) {
        onSuccess?.();
        navigate('/ceoui');
      } else {
        setError(response.internalMessage || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setError('Error during submission. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter theme name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Header <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="header"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.header}
            onChange={handleChange}
            required
            placeholder="Enter header text"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="shortDescription"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Enter a brief description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme <span className="text-red-500">*</span>
          </label>
          <select
            name="theme"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.theme}
            onChange={handleChange}
            required
            disabled={isEdit}
          >
            <option value="">Select Session</option>
            {sessionThemes.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </div>

        {[
          'Session-2',
          'Session-3',
          'Session-4',
          'Session-5',
          'Session-6',
        ].includes(formData.theme) &&
          formData.theme && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  List Items ({list.length}{' '}
                  {formData.theme === 'Session-4'
                    ? 'dynamic cards'
                    : ['Session-5', 'Session-6'].includes(formData.theme)
                      ? 'text entries'
                      : 'fixed cards'}
                  )
                </h3>
              </div>

              <div className="space-y-4">
                {list.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 relative border border-gray-200"
                  >
                    {['Session-5', 'Session-6'].includes(formData.theme) && (
                      <input
                        type="text"
                        placeholder="Title"
                        className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={item.name || ''}
                        onChange={(e) =>
                          handleListChange(index, 'name', e.target.value)
                        }
                      />
                    )}

                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={item.desc}
                      onChange={(e) =>
                        handleListChange(index, 'desc', e.target.value)
                      }
                    />

                    {['Session-2', 'Session-3', 'Session-4'].includes(
                      formData.theme
                    ) && (
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-center w-full">
                            <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
                              <div className="flex items-center justify-center">
                                <Upload className="h-6 w-6 text-gray-400" />
                                <span className="ml-2 text-sm text-gray-500">
                                  {item.photo || item.photoUrl
                                    ? 'Change image'
                                    : 'Click to upload image'}
                                </span>
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleListFileChange(index, e)}
                              />
                            </label>
                          </div>
                          {(item.photo || item.photoUrl) && (
                            <div className="relative">
                              <img
                                src={item.preview || item.photo || ''}
                                alt="preview"
                                className="w-full h-40 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                                onClick={() => {
                                  const updated = [...list];
                                  updated[index] = {
                                    ...updated[index],
                                    photo: isEdit
                                      ? initialData.list[index].photo
                                      : null, // Restore original if editing
                                    preview: null,
                                  };
                                  setList(updated);
                                }}
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                  </div>
                ))}
              </div>

              {(formData.theme === 'Session-4' ||
                ['Session-5', 'Session-6'].includes(formData.theme)) && (
                  <button
                    type="button"
                    className="w-full py-2 px-4 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-50 flex items-center justify-center"
                    onClick={() =>
                      setList([
                        ...list,
                        formData.theme === 'Session-4'
                          ? {
                            desc: '',
                            photo: null,
                            preview: null,
                            photoUrl: null,
                          }
                          : { name: '', desc: '' },
                      ])
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add More
                  </button>
                )}
            </div>
          )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Main Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">
                    {previewImage ? 'Change image' : 'Upload an image'}
                  </span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>
            {previewImage && (
              <div className="mt-2 relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                  onClick={() => {
                    setImage(null);
                    setPreviewImage(isEdit ? existingImage : null);
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme Background Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">
                    {themeBgPreview ? 'Change background' : 'Upload background'}
                  </span>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleBgFileChange}
                  accept="image/*"
                />
              </label>
            </div>
            {themeBgPreview && (
              <div className="mt-2 relative">
                <img
                  src={themeBgPreview}
                  alt="Background Preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                  onClick={() => {
                    setThemeBgimage(null);
                    setThemeBgPreview(isEdit ? existingBgImage : null);
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {loading ? 'Saving...' : isEdit ? 'Update Theme' : 'Submit Theme'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardForm;
