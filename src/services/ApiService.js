// src/services/ApiService.js

import axios from 'axios';

const ApiService = (() => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000', // Replace with your API base URL
    timeout: 10000, // Request timeout in milliseconds
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor for handling requests
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add Authorization token or other headers if needed
      const token = localStorage.getItem('authToken'); // Adjust according to your authentication method
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor for handling responses
  axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      // Global error handling
      console.error('API error:', error.response || error.message);
      return Promise.reject(error.response || error.message);
    }
  );

  return {
    get: (url, params) => axiosInstance.get(url, { params }),
    post: (url, data) => axiosInstance.post(url, data),
    put: (url, data) => axiosInstance.put(url, data),
    delete: (url) => axiosInstance.delete(url),
  };
})();

export default ApiService;
