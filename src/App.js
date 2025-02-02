import React, { useState } from 'react';
import Sidebar from './containers/sidebar';
import BodyLayout from './containers/bodyLayout';
import Login from './containers/login';

const App = () => {
  const [role, setRole] = useState('ceo'); // You can switch between 'ceo' and 'subdealer'
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('userRole') || false
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to handle sidebar visibility

  const handleLoginFlag = () => {
    setIsLoggedIn(true);
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
            <Sidebar role={role} />
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
