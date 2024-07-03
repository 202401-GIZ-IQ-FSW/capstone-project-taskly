'use client';
import { useState } from 'react';
import Link from 'next/link';
import fetcher from '@/_utils/fetcher';
import Notification from '@/components/Notification';
import { useUser } from '@/hooks/useUser';
import { FcGoogle } from 'react-icons/fc';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/Robot/Scene/Scene'), {
  ssr: false,
});

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
    <div className="min-h-screen flex gap-2 mx-auto items-center justify-center bg-gradient-to-r from-gray-950 to-gray-800 relative">
      <div>
        <Scene />
      </div>

      <div className="flex max-w-4xl p-10 text-center bg-white bg-opacity-5 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-white">Taskly</h1>
          <p className="mb-10 text-gray-200 font-light text-sm">
            Sign in to manage your support tickets
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-start">
              <label
                className="text-sm font-normal text-white"
                htmlFor="usernameOrEmail">
                Username or Email
              </label>
              <input
                id="usernameOrEmail"
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded bg-white bg-opacity-50 text-gray-200 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="text-start">
              <label
                className="text-sm font-normal text-white"
                htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 rounded bg-white bg-opacity-50 text-gray-200 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-200">
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
                className="text-blue-300 hover:underline">
                Forgot your password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Sign In
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-200">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
          </form>
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

          <p className="mt-4 text-gray-200">
            Don't have account?{' '}
            <Link
              href="/auth/register"
              className="text-blue-300 hover:underline">
              Sign up now
            </Link>
          </p>

          <Notification message={notificationMessage} type={notificationType} />
        </div>
      </div>
    </div>
  );
}
