import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import NotificationCard from '../Cards/NotificationCard';

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend
    const fetchNotifications = async () => {
      const response = await fetch('/api/v1/notifications');
      const data = await response.json();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      // Mark the notification as read in the backend
      await fetch(`/api/v1/notifications/${notification.id}/read`, {
        method: 'POST',
      });

      // Update the local state to reflect the change
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FaBell className="h-6 w-6" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} as="div">
              <NotificationCard
                notification={notification}
                onClick={handleNotificationClick}
              />
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem as="div">
            <div className="p-4 text-gray-500">No notifications</div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
