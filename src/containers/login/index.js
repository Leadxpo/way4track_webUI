import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';

const Login = ({ handleLoginFlag }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    handleLoginFlag();
    // setError('');
    // setLoading(true);

    // try {
    //   const payload = {
    //     staffId: userId,
    //     password: password,
    //     designation: role,
    //   };

    //   const response = await ApiService.post('/login/LoginDetails', payload);

    //   if (response) {
    //     localStorage.setItem('userRole', role);

    //     handleLoginFlag();
    //     navigate('/home');
    //   } else {
    //     setError('Invalid login credentials');
    //   }
    // } catch (err) {
    //   setError(
    //     err?.data?.message || 'Failed to login. Please check your credentials.'
    //   );
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 rounded-lg w-96 space-y-12 bg-white shadow-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/way4tracklogo.png" alt="Logo" className="h-16" />
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Form */}
        <form className="space-y-8" onSubmit={handleLogin}>
          {/* User ID Input */}
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              Registered ID
            </label>
            <input
              type="text"
              id="userId"
              placeholder="Enter your ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              //required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
              //required
            />
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border rounded-md bg-gray-200 focus:outline-none"
              //required
            >
              <option value="">Select Role</option>
              <option value="CEO">CEO</option>
              <option value="HR">HR</option>
              <option value="Accountant">Accountant</option>
              <option value="Operator">Operator</option>
              <option value="Warehouse Manager">Warehouse Manager</option>
              <option value="Sub Dealer">Sub Dealer</option>
              <option value="Technician">Technician</option>
              <option value="Sales Man">Sales Man</option>
              <option value="Call Center">Call Center</option>
            </select>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md transition duration-200 disabled:bg-green-400"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
