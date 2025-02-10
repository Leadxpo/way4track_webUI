import React, { useState } from 'react';
import Sidebar from './containers/sidebar';
import BodyLayout from './containers/bodyLayout';
import Login from './containers/login';
import { useNavigate } from 'react-router';

const App = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('role') || 'CEO'); // You can switch between 'ceo' and 'subdealer'
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('role') || false
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to handle sidebar visibility

  const handleLoginFlag = () => {
    setRole(localStorage.getItem('role'));
    switch (localStorage.getItem('role')) {
      case 'CEO':
        navigate('/home');
        break;
      case 'Call Center':
        navigate('/customer-care-home');
        break;
      case 'Accountant':
        navigate('/home');
        break;
      case 'Technician':
        navigate('/technician-home');
        break;
      case 'Warehouse Manager':
        navigate('/warehouse-manager-home');
        break;
      case 'sub dealer':
        navigate('/sub-dealer-home');
        break;
    }
    setIsLoggedIn(true);
  };

  const handleLogoutFlag = () => {
    setIsLoggedIn(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <Login handleLoginFlag={handleLoginFlag} />
        </div>
      ) : (
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div
            className={`bg-gray-800 text-white transition-transform transform z-50 ${
              isSidebarOpen
                ? 'fixed top-0 left-0 h-full translate-x-0'
                : 'fixed top-0 left-0 h-full -translate-x-full'
            } md:static md:translate-x-0 md:h-auto md:min-h-full `}
          >
            {/* Close button for mobile */}
            <button
              className="block md:hidden p-4 text-right text-white"
              onClick={toggleSidebar}
            >
              ✕
            </button>
            <Sidebar role={role} handleLogoutFlag={handleLogoutFlag} />
          </div>

          {/* Main Content */}
          <div className="flex-1 h-auto min-h-full w-full md:w-3/4 bg-white">
            {/* Mobile Menu Button */}
            <button
              className="fixed top-4 left-4 p-2 rounded bg-blue-500 text-white z-50 md:hidden"
              onClick={toggleSidebar}
            >
              ☰
            </button>
            <BodyLayout>{/* The rest of your app content */}</BodyLayout>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
