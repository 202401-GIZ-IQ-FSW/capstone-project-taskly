// client\src\app\contact\page.jsx
'use client';

import { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import fetcher from '@/_utils/fetcher';
import Notification from '@/components/Notification';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  
  const handleSubmit =async(e) => {
    e.preventDefault();
    const res = await fetcher('/v1/contact', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        message
      })
    });
    const generateRandomNumber = () => {
      return Math.floor(100 + Math.random() * 900); 
    };
    if (res.message =='Contact form submitted successfully') {
      setName('');
      setEmail('');
      setMessage(''); 
      setNotificationMessage(` Done <span hidden>${generateRandomNumber()}</span>`);
      setNotificationType('success');
    } else {
      setNotificationMessage(`Failed to Send rewuest, MSG: ${res.message} <span hidden>${generateRandomNumber()}</span>`);
      setNotificationType('error');
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-12 bg-gray-100">
      <div className="flex flex-col md:flex-row items-start md:gap-10 gap-0">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-5xl font-bold mb-4">GET IN TOUCH</h2>
          <p className="mb-4">
            Hey! We are looking forward to start a project with you!
          </p>
          <p className="mb-4 text-gray-600">
            Etiam sit amet convallis erat - class aptent taciti sociosqu ad
            litora torquent per conubia! Maecenas gravida lacus. Lorem etiam sit
            litora torquent per conubia! Maecenas gravida lacus. Lorem etiam sit
            litora torquent per conubia! Maecenas gravida lacus. Lorem etiam sit
            litora torquent per conubia! Maecenas gravida lacus. Lorem etiam sit
            amet convallis erat.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <FaEnvelope className="w-6 h-6" />
            </a>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="md:w-1/2 w-full">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter a valid email address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Enter your message"
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
              rows="4"></textarea>
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              required
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2"
            />
            <label>
              I accept the
              <a href="#" className="text-blue-600">
                Terms of Service
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-gray-600 text-white rounded hover:bg-gray-700">
            Submit
          </button>
        </form>
        <Notification message={notificationMessage} type={notificationType} />

      </div>
    </div>
  );
};

export default ContactForm;
