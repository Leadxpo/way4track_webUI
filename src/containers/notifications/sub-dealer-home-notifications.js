import React, { useState, useEffect } from 'react';
import ApiService from '../../services/ApiService';
import { initialAuthState } from '../../services/ApiService';

function SubDealerNotifications() {
    const [notifications, setNotifications] = useState([]);
    const [expandedNotification, setExpandedNotification] = useState(null);

    const getAllNotifications = async () => {
        try {
            const payload = {
                companyCode: initialAuthState.companyCode,
                unitCode: initialAuthState.unitCode,
                role: localStorage.getItem('role'),
            };
            if (
                payload.role === 'Sub Dealer'
            ) {
                payload.subDealerId = localStorage.getItem('userId');
            }
            const res = await ApiService.post('/notifications/getAllNotifications', payload);

            if (res.status) {
                setNotifications(res.data.notifications || []);
            } else {
                setNotifications([]);
            }
        } catch (err) {
            console.error('Failed to fetch notifications:', err);
            setNotifications([]);
        }
    };

    useEffect(() => {
        getAllNotifications();
    }, []);

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
                unitCode: initialAuthState.unitCode
            });
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



    // Filter notifications based on selected branch
    return (
        <div className="p-6 w-full max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>

            {/* Branch Selection Dropdown */}


            {/* Mark All as Read Button */}
            <button
                onClick={markAllAsRead}
                className="text-blue-600 font-medium ml-auto mb-4"
            >
                Mark All as Read
            </button>

            {/* Notifications List */}
            <div>
                {notifications.map((notification) => (
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
                                <p className="font-medium">{notification.subDealerId}</p>
                                <p className="font-medium">{notification.subDealerName || 'Unknown Dealer'}</p>
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

export default SubDealerNotifications;