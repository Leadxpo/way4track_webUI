// src/services/ApiService.js

import axios from 'axios';

export const initialAuthState = {
  userId: 4,
  userName: 'admin',
  companyCode: 'WAY4TRACK',
  unitCode: 'WAY4',
};

const ApiService = (() => {
  const axiosInstance = axios.create({
    baseURL:
      process.env.REACT_APP_API_BASE_URL || 'https://sharontelematics.org/api/', // Replace with your API base URL
    timeout: 10000, // Request timeout in milliseconds
  });

  // Interceptor for handling requests
  axiosInstance.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data'; // Set for FormData
    } else {
      config.headers['Content-Type'] = 'application/json'; // Default
    }
    return config;
  });

  // Interceptor for handling responses
  axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      console.error(
        'API error:',
        error.response ? error.response.data : error.message
      );
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
