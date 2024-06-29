'use client';
import Link from 'next/link';
import { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-10 text-center">
      <h1 className="text-4xl font-bold mb-2">Log in</h1>
      <p className="mb-10 text-gray-500 font-light text-sm">
        Sign in to manage your support tickets
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-start">
          <label className="text-sm font-normal">
            Enter your email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="text-start">
          <label className="text-sm font-normal">Enter your password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 hover:bg-blue-600">
          Submit
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      </form>
      <div className="flex justify-center space-x-4 mt-6">
        <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">
          G
        </button>
        <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">
          f
        </button>
        <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">
          t
        </button>
      </div>

      <p className="mt-4 text-gray-600">
        New user?
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign up now
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
