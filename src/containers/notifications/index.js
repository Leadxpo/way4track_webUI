// import React, { useState, useEffect } from 'react';
// import ApiService from '../../services/ApiService';
// import { initialAuthState } from '../../services/ApiService';

// function Notifications() {
//   const [notifications, setNotifications] = useState([]);
//   const [selectedBranch, setSelectedBranch] = useState('All');
//   const [expandedNotification, setExpandedNotification] = useState(null);
//   const [branches, setBranches] = useState([]);

//   const getAllNotifications = async (branchName = 'All') => {
//     try {
//       const payload = {
//         companyCode: initialAuthState.companyCode,
//         unitCode: initialAuthState.unitCode,
//       };

//       if (branchName !== 'All') {
//         payload.branchName = branchName;
//       }

//       const res = await ApiService.post('/notifications/getAllNotifications', payload);

//       if (res.status) {
//         console.log(res.data); // Log the response to inspect its structure
//         console.log(res.data.notifications);
//         // Set branches and notifications
//         setBranches([
//           { branchName: 'All' },
//           ...res.data.result.map((branch) => ({
//             branchName: branch.branchName,
//           })),
//         ]);
//         setNotifications(Array.isArray(res.data.notifications) ? res.data.notifications : []);
//         // Check if notifications is an array
//         // Use `setNotifications` instead of `setAppointments`
//       } else {
//         setBranches([{ branchName: 'All' }]);
//         setNotifications([]);  // Empty the notifications if no data is found
//       }
//     } catch (err) {
//       console.error('Failed to fetch notifications:', err);
//       setNotifications([]);
//       setBranches([{ branchName: 'All' }]);
//     }
//   };
//   useEffect(() => {
//     const markAsRead = async (id) => {
//       try {
//         const response = await ApiService.post('/notifications/markAllAsRead', {
//           id
//         });
//         if (response.status) {
//         } else {
//         }
//       } catch (error) {
//         console.error('Error fetching client details data:', error);
//         alert('Failed to fetch client details data.');
//       }
//     };
//     markAsRead();
//   }, [id]);
//   const handleBranchSelection = (branch) => {
//     setSelectedBranch(branch);
//   };

//   useEffect(() => {
//     getAllNotifications(selectedBranch);
//   }, [selectedBranch]);

//   // Filter notifications based on selected branch
//   const filteredNotifications =
//     selectedBranch === 'All'
//       ? notifications
//       : notifications.filter(
//         (notification) => notification.branchName === selectedBranch
//       );

//   // Mark all notifications as read
//   const markAllAsRead = () => {
//     const updatedNotifications = notifications.map((notification) => ({
//       ...notification,
//       isRead: 1, // Mark as read
//     }));
//     setNotifications(updatedNotifications);
//   };

// // Toggle expand/collapse for a notification and mark as read if expanded
// const toggleExpand = (id) => {
//   setNotifications((prevNotifications) =>
//     prevNotifications.map((notification) =>
//       notification.id === id ? { ...notification, isRead: 1 } : notification
//     )
//   );
//   setExpandedNotification(expandedNotification === id ? null : id);
// };

//   // Get unread count per branch
//   const getUnreadCount = (branch) => {
//     return branch === 'All'
//       ? notifications.filter((notification) => notification.isRead === 0).length
//       : notifications.filter(
//         (notification) => notification.branchName === branch && notification.isRead === 0
//       ).length;
//   };

//   return (
//     <div className="p-6 w-full max-w-4xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Notifications</h2>

//       {/* Branch Selection Dropdown */}
//       <div className="flex gap-4 mb-4">
//         <label htmlFor="branchDropdown" className="font-medium mr-2">
//           Select Branch:
//         </label>
//         <select
//           id="branchDropdown"
//           value={selectedBranch}
//           onChange={(e) => handleBranchSelection(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-md"
//         >
//           {branches.map((branch) => (
//             <option key={branch.branchName} value={branch.branchName}>
//               {branch.branchName}
//             </option>
//           ))}
//         </select>

//         {getUnreadCount(selectedBranch) > 0 && (
//           <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-2 py-1">
//             {getUnreadCount(selectedBranch)}
//           </span>
//         )}
//       </div>
//       {/* Mark All as Read Button */}
//       <button
//         onClick={markAllAsRead}
//         className="text-blue-600 font-medium ml-auto mb-4"
//       >
//         Mark All as Read
//       </button>

//       {/* Notifications List */}
//       <div>
//         {filteredNotifications.map((notification) => (
//           <div
//             key={notification.id}
//             onClick={() => toggleExpand(notification.id)}
//             className="bg-white shadow-md rounded-lg p-4 mb-3 flex items-start cursor-pointer transition-all duration-300"
//           >
//             <div className="flex-1">
//               <p className="font-medium">
//                 {notification.user} {notification.notificationType}
//               </p>
//               <p className="text-sm text-gray-500">{notification.createdAt}</p>
//               {expandedNotification === notification.id && (
//                 <div className="mt-3">
//                   <p className="text-gray-600">{notification.message}</p>
//                   <div className="flex gap-4 mt-2">
//                     <button className="bg-green-500 text-white px-4 py-1 rounded">
//                       Allow
//                     </button>
//                     <button className="bg-red-500 text-white px-4 py-1 rounded">
//                       Deny
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Unread Notification Badge */}
//             {!notification.isRead && (
//               <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
//                 {notification.id}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Notifications;

import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [branches, setBranches] = useState([]);

  const getAllNotifications = async (branchName = 'All') => {
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
      };

      if (branchName !== 'All') {
        payload.branchName = branchName;
      }

      const res = await ApiService.post('/notifications/getAllNotifications', payload);

      if (res.status) {
        setBranches([
          { branchName: 'All' },
          ...res.data.result.map((branch) => ({
            branchName: branch.branchName,
          })),
        ]);
        setNotifications(res.data.notifications || []);
      } else {
        setBranches([{ branchName: 'All' }]);
        setNotifications([]);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setNotifications([]);
      setBranches([{ branchName: 'All' }]);
    }
  };

  useEffect(() => {
    getAllNotifications(selectedBranch);
  }, [selectedBranch]);

  // Mark single notification as read
  const markAsRead = async (id) => {
    try {
      const response = await ApiService.post('/notifications/markAllAsRead', {
        ids: [id], // Send an array with one id for single mark as read
        isRead: true,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode
      });
      if (response.status) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === id ? { ...notification, isRead: 1 } : notification
          )
        );
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
  // Toggle expand/collapse for a notification and mark as read if expanded
  const toggleExpand = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: 1 } : notification
      )
    );
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const ids = notifications.map((notification) => notification.id);
      const response = await ApiService.post('/notifications/markAllAsRead', {
        ids, // Send an array of all ids
        isRead: true,
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode      });
      if (response.status) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) => ({
            ...notification,
            isRead: 1,
          }))
        );
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const handleBranchSelection = (branch) => {
    setSelectedBranch(branch);
  };

  // Filter notifications based on selected branch
  const filteredNotifications =
    selectedBranch === 'All'
      ? notifications
      : notifications.filter(
        (notification) => notification.branchName === selectedBranch
      );

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      {/* Branch Selection Dropdown */}
      <div className="flex gap-4 mb-4">
        <label htmlFor="branchDropdown" className="font-medium mr-2">
          Select Branch:
        </label>
        <select
          id="branchDropdown"
          value={selectedBranch}
          onChange={(e) => handleBranchSelection(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          {branches.map((branch) => (
            <option key={branch.branchName} value={branch.branchName}>
              {branch.branchName}
            </option>
          ))}
        </select>
      </div>

      {/* Mark All as Read Button */}
      <button
        onClick={markAllAsRead}
        className="text-blue-600 font-medium ml-auto mb-4"
      >
        Mark All as Read
      </button>

      {/* Notifications List */}
      <div>
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className="bg-white shadow-md rounded-lg p-4 mb-3 flex items-start cursor-pointer transition-all duration-300"
          >
            <div
              key={notification.id}
              onClick={() => toggleExpand(notification.id)}
              className="bg-white shadow-md rounded-lg p-4 mb-3 flex items-start cursor-pointer transition-all duration-300"
            >
              <div className="flex-1">
                <p className="font-medium">{notification.user}</p>
                <p className="text-sm text-gray-500">{notification.createdAt}</p>
                {expandedNotification === notification.id && (
                  <div className="mt-3">
                    <p className="text-gray-600">{notification.message}</p>
                  </div>
                )}
              </div>
            </div>
            {/* Unread Notification Badge */}
            {!notification.isRead && (
              <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                {notification.id}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;
