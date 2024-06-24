// client\src\app\auth\register\page.jsx
'use client';
import fetcher from '@/_utils/fetcher';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';
import Notification from '@/components/Notification';

export default function Register() {
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const { handleSetAccessToken, handleSetRefreshToken } = useUser();
  const [userData, setUserData] = useState({
    username: 'a',
    firstName: 'a',
    lastName: 'a',
    email: 'a',
    password: '11111aA@',
    profilePicture: null,
  });
  const generateRandomNumber = () => {
    return Math.floor(100 + Math.random() * 900); // Generates a random number 
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setUserData((prevUserData) => ({...prevUserData, profilePicture: files[0]}));
    } else {
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const key in userData) {formData.append(key, userData[key]);}

    try {
      const res = await fetcher('/v1/auth/register', {
        method: 'POST',
        body: formData,
      });
      if (res.user) {
        handleSetAccessToken(res.accessToken);
        handleSetRefreshToken(res.refreshToken);
        window.dispatchEvent(new Event('storage')); // Trigger storage event
        window.location.href = '/';
      } else {
        setNotificationMessage(`Failed to Register, MSG: ${res.message} <span hidden>${generateRandomNumber()}</span>`);
        setNotificationType('error');
      }
    } catch (error) {
      setNotificationMessage(`Failed to Register, MSG: ${error.message} <span hidden>${generateRandomNumber()}</span>`);
      setNotificationType('error');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="First Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Last Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profilePicture" className="block text-gray-700">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleChange}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-500 text-white py-2 px-4 rounded-md w-full hover:bg-gray-600">
            Register
          </button>
        </form>
        <Notification message={notificationMessage} type={notificationType} />
      </div>
    </div>
  );
}
