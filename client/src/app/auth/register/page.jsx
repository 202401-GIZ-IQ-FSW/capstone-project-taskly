'use client';
import { useState } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import Notification from '@/components/Notification';
import fetcher from '@/_utils/fetcher';
import { useUser } from '@/hooks/useUser';

const Register = () => {
  const { handleSetAccessToken, handleSetRefreshToken } = useUser();
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [formData, setFormData] = useState({
    username: 'a',
    firstName: 'a',
    lastName: 'a',
    email: 'a@email.con',
    password: '11111aA@',
    confirmPassword: '11111aA@',
    profilePicture: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        profilePicture: files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const generateRandomNumber = () => {
    return Math.floor(100 + Math.random() * 900);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const res = await fetcher('/v1/auth/register', {
        method: 'POST',
        body: formDataToSend,
      });
      if (res) {
        handleSetAccessToken(res.accessToken);
        handleSetRefreshToken(res.refreshToken);
        window.dispatchEvent(new Event('storage')); // Trigger storage event
        window.location.href = '/account/dashboard';
      } else {
        setNotificationMessage(
          `Failed to Register, MSG: ${
            res.message
          } <span hidden>${generateRandomNumber()}</span>`
        );
        setNotificationType('error');
      }
    } catch (error) {
      setNotificationMessage(
        `Failed to Register, MSG: ${
          error.message
        } <span hidden>${generateRandomNumber()}</span>`
      );
      setNotificationType('error');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-custom-gray p-10">
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white/50 rounded-lg shadow-xl overflow-hidden">
        <div className="flex-1 bg-custom-blue p-8 flex flex-col justify-center items-center text-white">
          <h2 className="text-3xl md:text-4xl font-roboto font-bold mb-2">
            WELCOME!
          </h2>
          <p className="mb-6 text-xl font-dancing">
            Create your account to get started.
          </p>
        </div>
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-semibold mb-6 font-roboto text-custom-blue">
            Sign Up
          </h2>

          <div className="mt-10">
            <div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-row gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-light-blue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-light-blue"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-light-blue"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-light-blue"
                    required
                  />
                </div>
                <div className="relative mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-light-blue"
                    required
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
                <div className="relative mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                  </label>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-light-blue"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }>
                    <div className="mt-5">
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                  </button>
                </div>
                <p className="text-gray-600 text-xs text-left mb-3">
                  By tapping Sign up, you agree to our Terms and Conditions and
                  Privacy Policy.
                </p>
                <button
                  type="submit"
                  className="w-full py-2 bg-custom-blue text-white font-roboto rounded hover:bg-custom-blue/80 focus:bg-custom-blue">
                  Sign up
                </button>
              </form>
            </div>

            <div className="mt-4 flex flex-col items-center justify-center">
            <div className="relative flex items-center w-full mb-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink px-3 text-custom-blue text-sm font-medium leading-6">
                Or Sign In with
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

              <div>
                <Link
                  href="https://tickets-backend-ahmedesam24.replit.app/api/api/v1/auth/google"
                  className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow hover:bg-gray-100 flex items-center">
                  <FcGoogle className="h-5 w-5" />
                  <span className="text-sm font-semibold leading-6">
                  Sign in with Google
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification message={notificationMessage} type={notificationType} />
    </div>
  );
};

export default Register;
