'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchTickets from '../../SearchTicket/SearchTickets';
import { navLinks } from '@/data/Links';

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user'));
    if (storedData) {
      setUser(storedData.user);
      setAccessToken(storedData.accessToken);
    }
  }, []);

  const handleLogout = async () => {
    const response = await fetch('http://localhost:3001/api/v1/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: 'include',
    });

    if (response.ok) {
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = 'http://localhost:3000/';
    } else {
      console.error('Logout failed');
    }
  };

  const UserLoggedIn = () => (
    <div className="flex items-center">
      <div className="mr-4">
        <img
          src={user.profilePicture} // Assuming user has an avatar field
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
          {user.firstName} <span className="ml-1">&#x25BE;</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
            <Link
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              href="/profile">
              Profile
            </Link>
            <Link
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              href="/settings">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const UserLoggedOut = () => (
    <>
      <Link href="/auth/signin">
        <button className="bg-gray-500 text-white px-4 py-2 rounded mx-4">Sign In</button>
      </Link>
      <Link href="/auth/register">
        <button className="bg-gray-500 text-white px-4 py-2 rounded">Register</button>
      </Link>
    </>
  );

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div>Tickets</div>
      <nav>
        {navLinks.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="mr-4 text-gray-700 hover:text-gray-900">
            {link.text}
          </Link>
        ))}
        <button onClick={openModal}>Search tickets</button>
      </nav>
      <div>{user ? <UserLoggedIn /> : <UserLoggedOut />}</div>

      {isModalOpen && <SearchTickets onClose={closeModal} />}
    </header>
  );
};

export default Navbar;
