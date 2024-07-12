'use client';
import { useState } from 'react';
import Link from 'next/link';
import fetcher from '@/_utils/fetcher';
import Notification from '@/components/Notification';
import { useUser } from '@/hooks/useUser';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const { handleSetAccessToken, handleSetRefreshToken } = useUser();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');

  const generateRandomNumber = () => {
    return Math.floor(100 + Math.random() * 900);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isEmail = usernameOrEmail.includes('@');
    const key = isEmail ? 'email' : 'username';
    try {
      const res = await fetcher('/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          [key]: usernameOrEmail,
          password,
        }),
      });

      if (res) {
        handleLoginSuccess(res.accessToken, res.refreshToken);
      } else {
        setNotificationMessage(
          `Failed to Login, MSG: ${
            res.message
          } <span hidden>${generateRandomNumber()}</span>`
        );
        setNotificationType('error');
      }
    } catch (error) {
      setNotificationMessage(
        `Failed to Login, MSG: ${
          error.message
        } <span hidden>${generateRandomNumber()}</span>`
      );
      setNotificationType('error');
    }
  };

  const handleLoginSuccess = (accessToken, refreshToken) => {
    handleSetAccessToken(accessToken);
    handleSetRefreshToken(refreshToken);
    window.dispatchEvent(new Event('storage')); // Trigger storage event
    window.location.href = '/account/dashboard'; // Redirect to homepage
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex-1 bg-teal-500 p-8 flex flex-col justify-center items-center text-white rounded-tl-lg rounded-bl-lg md:rounded-bl-none md:rounded-tr-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">WELCOME BACK!</h2>
          <p className="mb-6 text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </p>
        </div>
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6 text-teal-700">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-start">
              <label
                className="text-sm font-normal text-teal-700"
                htmlFor="usernameOrEmail">
                Username or Email
              </label>
              <input
                id="usernameOrEmail"
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="text-start">
              <label
                className="text-sm font-normal text-teal-700"
                htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 rounded bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-teal-700">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="mr-2"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-teal-500 hover:underline">
                Forgot your password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-teal-500 text-white rounded hover:bg-teal-600">
              Sign In
            </button>
          </form>

          <hr className="my-4 border-gray-300 border-t-2 border-solid rounded-full w-1/2 mx-auto" />

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => {
                window.location.href =
                  'http://localhost:3001/api/v1/auth/google';
              }}
              className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:bg-gray-100 flex items-center">
              <FcGoogle className="h-5 w-5 mr-3" />
              Sign in with Google
            </button>
          </div>

          <p className="mt-4 text-teal-700">
            Don't have an account?{' '}
            <Link
              href="/auth/register"
              className="text-teal-500 hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
      </div>

      <Notification message={notificationMessage} type={notificationType} />
    </div>
  );
}
