'use client'
import { useState } from 'react';
import fetcher from '@/_utils/fetcher';

export default function Register() {
  const [userData, setUserData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetcher('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data));
        window.location.href = '/'; // Redirect to home page
      } else {
        // handle error
        console.error(data.message);
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700">
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
            <label
              htmlFor="firstName"
              className="block text-gray-700">
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
            <label
              htmlFor="lastName"
              className="block text-gray-700">
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
            <label
              htmlFor="email"
              className="block text-gray-700">
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
            <label
              htmlFor="password"
              className="block text-gray-700">
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
          <button
            type="submit"
            className="bg-gray-500 text-white py-2 px-4 rounded-md w-full hover:bg-gray-600">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
