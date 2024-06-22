// client\src\components\Notification.jsx
import React, { useEffect, useState } from 'react';

const Notification = ({ message, type, duration }) => {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    type == 'error' && !duration ? (duration = 5000) : (duration = 20000);
    if (message) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 100);

      const timer = setTimeout(() => {
        setAnimate(false);
        setTimeout(() => {
          setVisible(false);
        }, 500);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!visible) return null;

  return (
    <div
      className={`p-4 border-dashed min-w-52 w-auto fixed right-[-8000px] bottom-12 rounded-l-lg transition-all duration-500 ${
        type === 'success' ? 'bg-green-300' : 'bg-red-300'
      } ${animate ? 'right-[0]' : 'right-[-8000px]'}`}
      dangerouslySetInnerHTML={{ __html: message }}
    />
  );
};

export default Notification;
