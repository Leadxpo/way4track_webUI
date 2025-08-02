import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ApiService, { initialAuthState } from '../services/ApiService';

const NotificationContext = createContext({
  requestCount: 0,
  ticketCount: 0,
  refreshNotifications: () => {},
});

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);

  const fetchNotifications = async () => {
    const notifyStaffId=localStorage.getItem("id")
    try {
      const payload = {
        companyCode: initialAuthState.companyCode,
        unitCode: initialAuthState.unitCode,
        notifyStaffId:notifyStaffId
      };

      const res = await ApiService.post('/notifications/getAllNotifications', payload);
      const data = res.data.notifications;
      if (res.status) {
          setNotifications(res.data.notifications || []);
          
          const requestUnread = data.filter(
              (n) => {
                console.log("rrr :",n)
                return(!n.isRead && n.notificationType === 'Request')}
            );
            const ticketUnread = data.filter(
                (n) => !n.isRead && n.notificationType === 'Ticket'
            );
            console.log("requestUnread :",requestUnread)
            console.log("ticketUnread :",ticketUnread)
  
        setRequestCount(requestUnread.length);
        setTicketCount(ticketUnread.length);
  
      } else {
        setNotifications([]);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      setNotifications([]);
    }
  };


  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ requestCount, ticketCount, refreshNotifications: fetchNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
