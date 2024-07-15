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
  const [isOpen, setIsOpen] = useState(false);

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
        await fetcher(`/v1/notifications/${notification._id}`, {
          method: 'PUT',
        });

        setNotifications((prevNotifications) =>
          prevNotifications.map((n) =>
            n._id === notification._id ? { ...n, isRead: true } : n
          )
        );
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }

    setIsOpen(false); // Close the dropdown after handling the click event
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="relative">
        <FaBell className="h-6 w-6" aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute bottom-3 left-3 inline-flex items-center justify-center text-xs font-bold leading-none text-red-100 bg-red-600 h-4 w-4 rounded-full">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-96 overflow-y-auto scrollbar-fade">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification._id}>
              <DropdownMenuItem as="div">
                <NotificationCard
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
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
