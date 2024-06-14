'use client';
import { useState } from 'react';
import fetcher from '@/_utils/fetcher';

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const isEmail = usernameOrEmail.includes('@');
      const key = isEmail ? 'email' : 'username';

      const res = await fetcher('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          [key]: usernameOrEmail,
          password,
        }),
      });

      if (res.user) {
        localStorage.setItem('user', JSON.stringify(res));
        window.location.href = '/'; // Adjust the URL as needed
      } else {
        alert(JSON.stringify(res.message));
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sign In
        </button>
      </form>
    </div>
  );
}
