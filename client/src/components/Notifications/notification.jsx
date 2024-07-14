'use client'

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { fetcher } from '../../_utils/fetcher';

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const socket = io('http://localhost:3000'); 

  useEffect(() => {
    // Fetch existing notifications
    const fetchNotifications = async () => {
      try {
        const data = await fetcher('/api/v1/notifications');
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // get triggered when the user connect 
    socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });

    // When a new notification is received, the callback function is executed.
    socket.on('new_notification', (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });

    // Clean up to prevent memory leaking 
    return () => {
      socket.disconnect();
    };
  }, []);

  // A function to mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await fetcher(`/api/v1/notifications/${notificationId}`, {
        method: 'PUT',
      });

      // Map over existing notifications and update 'is_read' field for the matched notifications
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif._id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Rendering the component
  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification._id}
            style={{ backgroundColor: notification.is_read ? 'white' : 'lightgray' }}
            onClick={() => markAsRead(notification._id)}
          >
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
