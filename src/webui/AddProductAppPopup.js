// components/AddProductAppPopup.jsx
import React, { useState } from 'react';

const AddProductAppPopup = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [points, setPoints] = useState([{ title: '', desc: '' }]);

  const handleAddPoint = () => {
    setPoints([...points, { title: '', desc: '' }]);
  };

  const handlePointChange = (index, field, value) => {
    const updated = [...points];
    updated[index][field] = value;
    setPoints(updated);
  };

  const handleImageChange = (file) => {
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : '');
  };

  const handleSubmit = () => {
    onSave({ name, shortDescription, image, imagePreview, points });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl relative">
        <h2 className="text-xl font-semibold mb-4">Add New Product App</h2>

        <label className="block text-sm mb-1">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <label className="block text-sm mb-1">Short Description</label>
        <textarea
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <label className="block text-sm mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e.target.files[0])}
          className="mb-2"
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="h-24 mb-3 rounded" />
        )}

        <label className="block text-sm font-medium mb-1">Points</label>
        {points.map((point, i) => (
          <div key={i} className="mb-2">
            <input
              value={point.title}
              onChange={(e) => handlePointChange(i, 'title', e.target.value)}
              placeholder="Title"
              className="w-full p-1 mb-1 border rounded"
            />
            <input
              value={point.desc}
              onChange={(e) => handlePointChange(i, 'desc', e.target.value)}
              placeholder="Description"
              className="w-full p-1 border rounded"
            />
          </div>
        ))}
        <button onClick={handleAddPoint} className="text-blue-500 text-sm mb-4">
          + Add Point
        </button>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductAppPopup;
