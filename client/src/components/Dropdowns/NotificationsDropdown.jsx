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
import fetcher from '@/_utils/fetcher';

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await fetcher('/v1/notifications');
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await fetcher(`/v1/notifications/${notification._id}/read`, {
          method: 'PUT',
        });

        setNotifications((prevNotifications) =>
          prevNotifications.map((n) =>
            n.id === notification.id ? { ...n, isRead: true } : n
          )
        );
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
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
            <>
              <DropdownMenuItem key={notification.id} as="div">
                <NotificationCard
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
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
