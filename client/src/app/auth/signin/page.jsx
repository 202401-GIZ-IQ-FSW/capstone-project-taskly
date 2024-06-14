'use client';
import fetcher from '@/_utils/fetcher';
import { useState } from 'react';

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetcher('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (res.user) {
        localStorage.setItem('user', JSON.stringify(res));
        window.location.href = '/'; // Adjust the URL as needed
      } else {
        // handle error
        alert(JSON.stringify(res.message));
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed');
    }
  };

  return (
    <>
      <div className="m-4 flex flex-col justify-center h-full items-center">
        <h1 className="mb-4">Sign in to your account</h1>
        <form
          onSubmit={handleSubmit}
          className="mx-auto bg-white border py-4 rounded">
          <div className="mb-3">
            <label>Username</label>
            <div>
              <input
                type="text"
                id="username"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3">
            <label>Password</label>
            <div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form-check my-5">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
            />
            <label>Keep me signed in</label>
          </div>
          <button
            type="submit"
            className="w-100">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
