import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
const Login = ({ handleLoginFlag }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);

  //   try {
  //     const payload = {
  //       staffId: userId,
  //       password: password,
  //       designation: role,
  //       companyCode: initialAuthState.companyCode,
  //       unitCode: initialAuthState.unitCode,
  //     };

  //     const response = await ApiService.post('/login/LoginDetails', payload);

  //     if (response && response.status) {
  //       // Store login details in localStorage
  //       localStorage.setItem('userId', userId);
  //       localStorage.setItem('password', password);
  //       localStorage.setItem('role', role);
  //       localStorage.setItem('companyCode', initialAuthState.companyCode);
  //       localStorage.setItem('unitCode', initialAuthState.unitCode);

  //       await fetchUserPermissions(
  //         userId,
  //         initialAuthState.companyCode,
  //         initialAuthState.unitCode
  //       );

  //       handleLoginFlag();
  //     } else {
  //       setError(response?.internalMessage || 'Invalid login credentials.');
  //     }
  //   } catch (err) {
  //     setError(
  //       err?.response?.data?.internalMessage ||
  //         'Failed to login. Please check your credentials.'
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setLoading(true);

  //   try {
  //     const payload = {
  //       staffId: userId,
  //       password: password,
  //       designation: role,
  //       companyCode: initialAuthState.companyCode,
  //       unitCode: initialAuthState.unitCode,
  //     };

  //     const response = await ApiService.post('/login/LoginDetails', payload);

  //     if (response && response.status) {
  //       // Store login details and user profile info in localStorage
  //       const userProfile = response.data.profile;  // Assuming API returns user profile info
  //       localStorage.setItem('userId', userId);
  //       localStorage.setItem('password', password);
  //       localStorage.setItem('role', role);
  //       localStorage.setItem('userProfile', JSON.stringify(userProfile)); 
  //       localStorage.setItem('branchName', JSON.stringify(branchName)); // Store user profile
  //       // Store user profile

  //       await fetchUserPermissions(
  //         userId,
  //         initialAuthState.companyCode,
  //         initialAuthState.unitCode
  //       );

  //       handleLoginFlag();
  //     } else {
  //       setError(response?.internalMessage || 'Invalid login credentials.');
  //     }
  //   } catch (err) {
  //     setError(
  //       err?.response?.data?.internalMessage ||
  //       'Failed to login. Please check your credentials.'
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        staffId: userId,
        password: password,
        designation: role,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      const response = await ApiService.post('/login/LoginDetails', payload);
      console.log("ramesh login",response )

      if (response && response.data.status) {
        const userProfile = response.data.data[0];

        localStorage.setItem('userId', userId);
        localStorage.setItem('password', password);
        localStorage.setItem('role', role);
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
console.log("=======",userProfile)
        // Fetch branch name separately if needed
        let branchName = userProfile.branchName;

        localStorage.setItem('branchName', branchName);
        localStorage.setItem('branch_id', userProfile.branch_id);
        localStorage.setItem('id', userProfile.id);

        await fetchUserPermissions(
          userId,
          initialAuthState.companyCode,
          initialAuthState.unitCode
        );

        handleLoginFlag();
      } else {
        alert("Entered Correct Login details");
        setError(response?.internalMessage || 'Invalid login credentials.');
      }
    } catch (err) {
      setError(
        err?.response?.data?.internalMessage ||
        'Failed to login. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };


  const fetchUserPermissions = async (userId, companyCode, unitCode) => {
    try {
      const payload = { userId, companyCode, unitCode };
      const response = await ApiService.post(
        '/permissions/getPermissionDetails',
        payload
      );

      if (response && response.status) {
        const permissions = response.data.permissions; // Assuming API returns an object of permissions
        localStorage.setItem('userPermissions', JSON.stringify(permissions));
        console.log('Permissions fetched successfully:', permissions);
      } else {
        console.error('Failed to fetch permissions:', response);
      }
    } catch (err) {
      console.error('Error fetching permissions:', err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 rounded-lg w-96 space-y-12 bg-white shadow-md">
        {/* Form */}
        <img src="logo.png" className="mx-auto" alt="Logo" />
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
              required
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
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
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
              <option value="Branch Manager">Branch Manager</option>
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
// const employeePayroll = async (payslipBody) => {
//   try {
//     const response = ApiService.post(
//       "https://sharontelematics.org/api/PAYROLL/getPayRollStaffDetails",
//       {
//         staffId: staffDetails.staffId,
//         month: payslipBody.payslipMonth,
//         year: payslipBody.year,
//       }
//     );
//     console.log("API Response:", response.data);
//     return response.data; // Return the API response data
//   } catch (error) {
//     console.error("Error fetching payroll data:", error);
//     return null; // Return null or handle errors accordingly
//   }
// };
