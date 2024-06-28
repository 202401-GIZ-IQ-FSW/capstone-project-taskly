// client\src\app\auth\login\page.jsx
'use client';
import fetcher from '@/_utils/fetcher';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';
import Notification from '@/components/Notification';

export default function Login() {
  const { handleSetAccessToken, handleSetRefreshToken } = useUser();
  const [usernameOrEmail, setUsernameOrEmail] = useState('a');
  const [password, setPassword] = useState('11111aA@');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');

  const generateRandomNumber = () => {
    return Math.floor(100 + Math.random() * 900); 
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const isEmail = usernameOrEmail.includes('@');
      const key = isEmail ? 'email' : 'username';

      const res = await fetcher('/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          [key]: usernameOrEmail,
          password,
        }),
      });

      if (res.user) {
        handleSetAccessToken(res.accessToken);
        window.dispatchEvent(new Event('storage')); // Trigger storage event
        window.location.href = '/';
      } else {
        setNotificationMessage(`Failed to Login, MSG: ${res.message} <span hidden>${generateRandomNumber()}</span>`);
        setNotificationType('error');
      }
    } catch (error) {
      setNotificationMessage(`Failed to Login, MSG: ${error.message} <span hidden>${generateRandomNumber()}</span>`);
      setNotificationType('error');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full py-20">
      <h1 className="mb-4 text-2xl font-bold">Sign in to your account</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white border shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="usernameOrEmail">
            Username or Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="usernameOrEmail"
            required
            type="text"
            placeholder="Username or Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <input
            className="mr-2 leading-tight"
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
          />
          <label
            className="text-sm"
            htmlFor="rememberMe">
            Keep me signed in
          </label>
        </div>
        <input
          type="submit"
          value="Sign In"
          className="bg-gray-500 text-white py-2 px-4 rounded-md w-full hover:bg-gray-600"
        />
      </form>
      <hr className="w-48"/>
      or
      <button
        onClick={() => {
          window.location.href = 'http://localhost:3001/api/v1/auth/google';
        }}
        className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:bg-gray-100 flex items-center">
        <img src="/ic_google.svg" alt="Google Icon" className="w-5 h-5 mr-2" />
        Sign in with Google
      </button>
      <Notification message={notificationMessage} type={notificationType} />
      </div>
  );
}
