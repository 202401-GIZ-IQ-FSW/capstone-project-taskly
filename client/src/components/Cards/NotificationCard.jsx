import React from 'react';
import Link from 'next/link';

const NotificationCard = ({ notification, onClick }) => {
  const ticketLink = `/account/tickets/${notification.ticketId}`;

  return (
    <Link href={ticketLink} className={`block text-gray-800`}>
      <div
        className={`p-4 cursor-pointer w-72 ${
          notification.isRead ? 'bg-gray-100' : 'bg-blue-100/60'
        }`}
        onClick={() => onClick(notification)}
        dangerouslySetInnerHTML={{ __html: notification.message }}>
        {/* {notification?.message} */}
      </div>
    </Link>
  );
};

export default NotificationCard;
