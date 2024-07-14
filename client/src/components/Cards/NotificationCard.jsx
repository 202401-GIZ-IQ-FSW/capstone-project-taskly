import React from 'react';
import Link from 'next/link';

const NotificationCard = ({ notification, onClick }) => {
  const ticketLink = `/account/tickets/${notification.ticketId}`;
  const formattedDate = new Date(notification.createdAt).toLocaleString(
    'en-US',
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  return (
    <Link href={ticketLink} className="block text-gray-800">
      <div
        className={`p-4 cursor-pointer w-72 ${
          notification.isRead ? 'bg-gray-100' : 'bg-blue-100/60'
        }`}
        onClick={() => onClick(notification)}>
        <div dangerouslySetInnerHTML={{ __html: notification.message }} />
        <div className="text-gray-600 text-sm mt-2">{formattedDate}</div>
      </div>
    </Link>
  );
};

export default NotificationCard;
