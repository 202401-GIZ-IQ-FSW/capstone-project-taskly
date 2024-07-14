const NotificationCard = ({ notification, onClick }) => {
  return (
    <div
      className={`p-4 cursor-pointer ${
        notification.isRead ? 'bg-white' : 'bg-gray-100'
      }`}
      onClick={() => onClick(notification)}>
      {notification.content}
    </div>
  );
};

export default NotificationCard;
