'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchTickets from '../../SearchTicket/SearchTickets';
import { navLinks } from '@/data/Links';
import fetcher from '@/_utils/fetcher'; 

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

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
    try {
      const response = await fetcher('/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      if (response) {
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = 'http://localhost:3000/'; // Adjust the URL as needed
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

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
      <div>
        {user ? (
          <>
            Welcome {user.firstName}
            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white px-4 py-2 rounded mx-4">
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/signin">
              <button className="bg-gray-500 text-white px-4 py-2 rounded mx-4">Sign In</button>
            </Link>
            <Link href="/auth/register">
              <button className="bg-gray-500 text-white px-4 py-2 rounded">Register</button>
            </Link>{' '}
          </>
        )}
      </div>

      {isModalOpen && <SearchTickets onClose={closeModal} />}
    </header>
  );
};

export default Navbar;
