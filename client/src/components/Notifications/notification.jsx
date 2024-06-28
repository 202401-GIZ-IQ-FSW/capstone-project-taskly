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



}