'use client';
import { useState } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col items-start ml-16 bg-[url('/bg.png')] bg-right ">
      <div className="p-5 px-60 bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Technical Support
        </h1>
        <div className="ml-52">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Join our platform
          </h2>
          <p className="text-gray-600 mb-6">
            Provide your details to get started with support
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="First Last"
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="tech_pro123"
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
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
                Confirm password *
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
              By tapping Submit, you agree to our Terms and Conditions and
              Privacy Policy.
            </p>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
