import React from 'react';
import Link from 'next/link';

const NotificationCard = ({ notification, onClick }) => {
  const ticketLink = `/account/tickets/${notification.ticketId}`;

  return (
    <Link
      href={ticketLink}
      className={`block text-gray-800 hover:text-blue-600`}>
      <div
        className={`p-4 cursor-pointer w-72 ${
          notification.isRead ? 'bg-white' : 'bg-gray-100'
        }`}
        onClick={() => onClick(notification)}>
        {notification?.message}
      </div>
    </Link>
  );
};

export default NotificationCard;
