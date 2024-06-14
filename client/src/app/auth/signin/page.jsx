'use client';
import { useState } from 'react';

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3001/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data));
      window.location.href = 'http://localhost:3000/';
    } else {
      // handle error
      alert(JSON.stringify(data.message));
    }
  };
  return (
    <>
      <div className="m-4 flex flex-col justify-center h-full items-center">
        <h1 className="mb-4">Sign in to your account</h1>
        <form
          onSubmit={handleSubmit}
          className="mx-auto bg-white border py-4 rounded">
          <div className=" mb-3">
            <label>Username</label>
            <div className="">
              <input
                type="text"
                className=""
                id="username"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className=" mb-3">
            <label>Password</label>
            <div className="">
              <input
                type="password"
                className=""
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
              className=""
              id="rememberMe"
              name="rememberMe"
            />
            <label className="">Keep me signed in</label>
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
