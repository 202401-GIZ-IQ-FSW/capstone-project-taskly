'use client'


import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const Notifications = ({ userId }) => {

    // intiliaze state and socket io
  const [notifications, setNotifications] = useState([]);
  const socket = io('http://localhost:3000'); 

  useEffect(() => {
    // Fetch existing notifications
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('/api/v1/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    // get triggered when the user connect 
    socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });
    //When a new notification is received, the callback function is executed.
    socket.on('new_notification', (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    });

    // Clean up for prevent memory leaking 
    return () => {
      socket.disconnect();
    };
  }, []);
 
  // a function to mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`/api/v1/notifications/${notificationId}`);
      // mapping over existing notifications and update 'is_read' field for the matched notifications
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif._id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // rendering the component
  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        //Maps over the notifications state to create a list item for each notification.
        {notifications.map((notification) => (
          <li
            key={notification._id}
            //Conditionally sets the background color of the list item based on whether the notification has been read.
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