'use client';
import { useState } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    username: 'a',
    firstName: 'a',
    lastName: 'a',
    email: 'a',
    password: '11111aA@',
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (const key in formData) {
      formData.append(key, formData[key]);
    }

    try {
      const res = await fetcher('/v1/auth/register', {
        method: 'POST',
        body: formData,
      });
      if (res) {
        handleSetAccessToken(res.accessToken);
        handleSetRefreshToken(res.refreshToken);
        window.dispatchEvent(new Event('storage')); // Trigger storage event
        window.location.href = '/';
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
    <div className="flex flex-col items-start ml-16 bg-[url('/bg.png')] bg-right">
      <div className="p-5 px-60 bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
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
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password *
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <p className="text-gray-600 text-xs text-left">
            By tapping Submit, you agree to our Terms and Conditions and Privacy
            Policy.
          </p>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
