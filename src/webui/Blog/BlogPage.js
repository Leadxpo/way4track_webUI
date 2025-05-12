import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ApiService, { initialAuthState } from '../../services/ApiService';

const BlogPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [blogName, setBlogName] = useState('');
  const [productName, setProductName] = useState('');
  const [webProductId, setWebProductId] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [existingPdf, setExistingPdf] = useState(null);

  const fetchBlogs = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      const res = await ApiService.post('/blog/getBlogDetails', payload);
      setBlogs(
        res.data.map((b) => ({
          ...b,
          blogImage: b.image, // for UI rendering
        }))
      );
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      const res = await ApiService.post(
        '/website-product/getWebsiteProductDropdown',
        payload
      );
      setProducts(res.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', blogName);
    formData.append('webProductId', webProductId);
    formData.append('webProductName', productName);
    formData.append('companyCode', initialAuthState.companyCode);
    formData.append('unitCode', initialAuthState.unitCode);
    if (editId) formData.append('id', editId);
    if (blogImage) formData.append('photo', blogImage);
    if (pdfFile) formData.append('pdf', pdfFile);

    try {
      await ApiService.post('/blog/handleBlogDetails', formData);
      fetchBlogs();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ApiService.post(
        '/blog/deleteBlogDetails',
        { id },
        {
          headers: {
            companyCode: initialAuthState.companyCode,
            unitCode: initialAuthState.unitCode,
          },
        }
      );
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const resetForm = () => {
    setBlogName('');
    setProductName('');
    setWebProductId('');
    setBlogImage(null);
    setPdfFile(null);
    setEditId(null);
    setExistingImage(null);
    setExistingPdf(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          ADD BLOG
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              className="absolute top-2 right-4 text-xl font-bold"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              ×
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {editId ? 'EDIT' : 'ADD'} BLOG
            </h2>

            <label className="block mb-2">Blog Name:</label>
            <input
              type="text"
              className="w-full border px-3 py-2 mb-4 rounded"
              placeholder="Enter blog name"
              value={blogName}
              onChange={(e) => setBlogName(e.target.value)}
            />

            <label className="block mb-2">Product Name:</label>
            <select
              className="w-full border px-3 py-2 mb-4 rounded"
              value={webProductId}
              onChange={(e) => {
                const selectedId = e.target.value;
                const selectedProduct = products.find(
                  (p) => p.id.toString() === selectedId
                );
                if (selectedProduct) {
                  setWebProductId(selectedProduct.id);
                  setProductName(selectedProduct.name);
                }
              }}
            >
              <option value="">Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <label className="block mb-2">Upload Image:</label>
            {existingImage && !blogImage && (
              <img
                src={existingImage}
                alt="Existing"
                className="h-16 w-16 object-cover mb-2 rounded"
              />
            )}
            <input
              type="file"
              accept="image/*"
              className="w-full mb-4"
              onChange={(e) => setBlogImage(e.target.files[0])}
            />

            <label className="block mb-2">Upload PDF:</label>
            {existingPdf && !pdfFile && (
              <a
                href={existingPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline block mb-2"
              >
                View existing PDF
              </a>
            )}
            <input
              type="file"
              accept="application/pdf"
              className="w-full mb-4"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />

            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <table className="w-full border mt-6 text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">S.No</th>
            <th className="border px-4 py-2">Blog Name</th>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Blog Image</th>
            <th className="border px-4 py-2">PDF</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog.id}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{blog.title}</td>
              <td className="border px-4 py-2">{blog.webProductName}</td>
              <td className="border px-4 py-2">
                {blog.blogImage && (
                  <img
                    src={blog.blogImage}
                    alt="Blog"
                    className="h-12 w-12 mx-auto object-cover rounded"
                  />
                )}
              </td>
              <td className="border px-4 py-2">
                {blog.pdfFile && (
                  <a
                    href={blog.pdfFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View PDF
                  </a>
                )}
              </td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    setBlogName(blog.title);
                    setProductName(blog.webProductName);
                    const product = products.find(
                      (p) => p.name === blog.webProductName
                    );
                    setWebProductId(product ? product.id : '');
                    setEditId(blog.id);
                    setExistingImage(blog.image || null);
                    setExistingPdf(blog.pdfFile || null);
                    setShowModal(true);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => {
                    const confirmDelete = window.confirm(
                      'Are you sure you want to delete this blog?'
                    );
                    if (confirmDelete) {
                      handleDelete(blog.id);
                    }
                  }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {blogs.length === 0 && (
            <tr>
              <td colSpan="6" className="py-4 text-gray-500">
                No blogs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogPage;
