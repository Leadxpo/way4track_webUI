import React, { useEffect, useState } from 'react';
import {
  FaHome,
  FaBox,
  FaFileAlt,
  FaClipboardList,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
  FaUsers,
  FaPager,
  FaNewspaper,
  FaCalculator,
  FaBook,
  FaScroll,
  FaMoneyBill,
  FaReceipt,
  FaBriefcase,
} from 'react-icons/fa';
import {
  FaArrowRightFromBracket,
  FaFileWaveform,
  FaHand,
  FaMagnifyingGlassChart,
  FaMapLocation,
  FaMapLocationDot,
  FaPersonDigging,
  FaTableCellsLarge,
  FaTicket,
} from 'react-icons/fa6';
import { useNavigate, useNavigation } from 'react-router';
import { menuOptions } from '../../common/constants';
// Menu options for each role

const Sidebar = ({ role, handleLogoutFlag }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Home');
  // Get menu items based on role
  const items = menuOptions || [];

  useEffect(() => {
    if (role === 'CEO') {
      localStorage.setItem('role', 'CEO');
    } else {
      localStorage.setItem('role', role);
      localStorage.setItem('webUI', 'false');
    }
  }, [role]);

  const roleFromStorage = localStorage.getItem('role') || '';
  const webUI = localStorage.getItem('webUI') === 'true';

  const ceoWebUIMenu = [
    {
      name: 'Homeone',
      icon: <img src="./home.png" />,
      route: '/homeone',
    },
    {
      name: 'Productsone',
      icon: <img src="./products.png" />,
      route: '/productsone',
    },
    {
      name: 'Reportsone',
      icon: <img src="./reports.png" />,
      route: '/reportsone',
    },
    {
      name: 'Clientsone',
      icon: <img src="./clients.png" />,
      route: '/clientsone',
    },
    // You can add more WebUI-specific items here
  ];

  useEffect(() => {
    switch (localStorage.getItem('role')) {
      case 'CEO':
        navigate('/home');
        break;
      case 'Tele Calling Associate':
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
      case 'Sub Dealer':
        navigate('/sub-dealer-home');
        break;
      case 'Sales Man':
        navigate('/salesman-home');
        break;
      case 'Branch Manager':
        navigate('/branch-manager-home');
        break;
      case 'Backend Support':
        navigate('/backend-support-home');
        break;
      case 'HR':
        navigate('/hr-home');
        break;
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.clear();
      handleLogoutFlag();
      navigate('/login');
    }
  };

  const handleClick = (item) => {
    navigate(item.route);
    setSelectedOption(item.name);
  };

  return (
    <div className="min-h-screen overflow-y-auto w-full bg-zinc-900 text-white flex flex-col justify-between overscroll-contain scrollbar-hide">
      <div>
        <div className="ml-4">
          <img src=".//logo.png" alt="Company Logo" className="h-24 w-44" />
        </div>
        <div className="px-4 py-6 space-y-4">
          {items.map((item, index) => (
            item &&
            <div
              key={index}
              className={`flex items-center h-14 space-y-2 space-x-3 text-white-300 hover:bg-neutral-700 hover:text-white hover:rounded-[8px] ${item.name === selectedOption ? 'bg-neutral-700 rounded-[8px]' : ''}`}
              onClick={() => handleClick(item)}
            >
              <span className="ml-4 mr-4 flex items-center justify-center text-2xl leading-none">
                {item.icon}
              </span>
              {item.name}
            </div>
          ))}
        </div>

      </div>
      <div className="px-4 py-6">
        <button
          className="w-full h-full p-4 flex items-center space-x-3 bg-red-600 text-white-300 hover:cursor-pointer rounded-[10px]"
          onClick={handleLogout}
        >
          <span className="mr-3 text-2xl">
            <FaArrowRightFromBracket />
          </span>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
