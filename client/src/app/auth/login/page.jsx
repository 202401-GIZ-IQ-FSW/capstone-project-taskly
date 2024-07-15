'use client';
import { useState } from 'react';
import Link from 'next/link';
import fetcher from '@/_utils/fetcher';
import Notification from '@/components/Notification';
import { useUser } from '@/hooks/useUser';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const { handleSetAccessToken, handleSetRefreshToken } = useUser();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="flex flex-col justify-center items-center min-h-screen bg-custom-gray">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white/50 rounded-lg shadow-xl overflow-hidden">
        <div className="flex-1 bg-custom-blue p-8 flex flex-col justify-center items-center text-white">
          <h2 className="text-3xl md:text-4xl font-roboto font-bold mb-2">
            WELCOME BACK!
          </h2>
          <p className="mb-6 text-xl font-dancing">Happy to see you again.</p>
        </div>
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-semibold mb-6 font-roboto text-custom-blue">
            Sign in
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-start">
              <label
                className="text-sm font-normal font-roboto text-custom-blue"
                htmlFor="usernameOrEmail">
                Username or Email
              </label>
              <input
                id="usernameOrEmail"
                type="text"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required
                className="w-full px-3 py-2 rounded font-roboto bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="text-start relative">
              <label
                className="text-sm font-normal font-roboto text-custom-blue"
                htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 rounded bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}>
                <div className="mt-5">
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </button>
            </div>
            <div className="flex items-center justify-between text-sm text-custom-blue">
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
                className="text-light-blue font-roboto underline">
                Forgot your password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-custom-blue text-white font-roboto rounded hover:bg-custom-blue/80 focus:bg-custom-blue">
              Sign In
            </button>
          </form>

          <div className="flex flex-col items-center justify-center mt-6">
            <div className="relative flex items-center w-full mb-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink px-3 text-custom-blue text-sm font-medium leading-6">
                Or Sign In with
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
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

          <p className="mt-4 text-custom-blue">
            Don't have an account?{' '}
            <Link
              href="/auth/register"
              className="text-light-blue underline">
              Sign up now
            </Link>
          </p>
        </div>
      </div>

      <Notification message={notificationMessage} type={notificationType} />
    </div>
  );
}
