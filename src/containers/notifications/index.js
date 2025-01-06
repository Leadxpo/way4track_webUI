import React, { useState } from 'react';

// Sample JSON data with profile images and descriptions
const notificationsData = [
  {
    id: 1,
    user: 'Ralph Edwards',
    message: 'Wants to Edit Tetri sly Design System',
    time: '5 min ago',
    city: 'Visakhapatnam',
    read: false,
    // profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    description:
      'Detailed description of the action Ralph Edwards wants to perform on the Tetri sly Design System.',
  },
  {
    id: 2,
    user: 'Ralph Edwards',
    message: 'Wants to Edit Tetri sly Design System',
    time: '10 min ago',
    city: 'Hyderabad',
    read: false,
    profileImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    description:
      'Ralph Edwards requests edits to improve user experience on the Tetri sly Design System.',
  },
  {
    id: 3,
    user: 'Ralph Edwards',
    message: 'Wants to Edit Tetri sly Design System',
    time: '24 min ago',
    city: 'Kakinada',
    read: false,
    // profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    description:
      'Ralph Edwards needs to make urgent changes to the Tetri sly Design System.',
  },
  {
    id: 4,
    user: 'Ralph Edwards',
    message: 'Wants to Edit Tetri sly Design System',
    time: '33 min ago',
    city: 'Visakhapatnam',
    read: false,
    type: "re/ti/te",
    // profileImage: 'https://randomuser.me/api/portraits/men/4.jpg',
    description:
      'Changes requested by Ralph Edwards are related to design enhancements on the Tetri sly Design System.',
  },
  {
    id: 5,
    user: 'Ralph Edwards',
    message: 'Wants to Edit Tetri sly Design System',
    time: '1 hr ago',
    city: 'Kakinada',
    read: false,
    // profileImage: 'https://randomuser.me/api/portraits/men/5.jpg',
    description:
      'Ralph Edwards aims to update the style and usability of the Tetri sly Design System.',
  },
];

const cities = ['All', 'Visakhapatnam', 'Hyderabad', 'Vijayawada', 'Kakinada'];

function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedCity, setSelectedCity] = useState('All');
  const [expandedNotification, setExpandedNotification] = useState(null);

  // Filter notifications based on selected city
  const filteredNotifications =
    selectedCity === 'All'
      ? notifications
      : notifications.filter(
        (notification) => notification.city === selectedCity
      );

  // Mark all notifications as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updatedNotifications);
  };

  // Toggle expand/collapse for a notification and mark as read if expanded
  const toggleExpand = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setExpandedNotification(expandedNotification === id ? null : id);
  };

  // Get unread count per city
  const getUnreadCount = (city) => {
    return city === 'All'
      ? notifications.filter((notification) => !notification.read).length
      : notifications.filter(
        (notification) => notification.city === city && !notification.read
      ).length;
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-4 py-2 font-medium ${selectedCity === city ? 'text-blue-500' : 'text-gray-700'}`}
          >
            {city}
            {getUnreadCount(city) > 0 && (
              <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-2 py-1">
                {getUnreadCount(city)}
              </span>
            )}
          </button>
        ))}
        <button
          onClick={markAllAsRead}
          className="text-blue-600 font-medium ml-auto"
        >
          Mark All as Read
        </button>
      </div>

      {/* Notifications List */}
      <div>
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => toggleExpand(notification.id)}
            className="bg-white shadow-md rounded-lg p-4 mb-3 flex items-start cursor-pointer transition-all duration-300"
          >
            {/* Profile Image */}
            {/* <img
              // src={notification.profileImage}
              alt={notification.user}
              className="w-14 h-14 rounded-full mr-3"
            /> */}
            <div className="flex-1">
              <p className="font-medium">
                {notification.user} {notification.message}
              </p>
              <p className="text-sm text-gray-500">{notification.time}</p>
              {expandedNotification === notification.id && (
                <div className="mt-3">
                  <p className="text-gray-600">{notification.description}</p>
                  <div className="flex gap-4 mt-2">
                    <button className="bg-green-500 text-white px-4 py-1 rounded">
                      Allow
                    </button>
                    <button className="bg-red-500 text-white px-4 py-1 rounded">
                      Deny
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Unread Notification Badge */}
            {!notification.read && (
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
