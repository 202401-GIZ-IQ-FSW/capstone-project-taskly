'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchTickets from '../../SearchTicket/SearchTickets';
import { navLinks } from '@/data/Links';
import UserLoggedIn from '@/components/UserStatus/UserLoggedIn';
import UserLoggedOut from '@/components/UserStatus/UserLoggedOut';

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

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href={'/'}>Tickets</Link>
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
          <UserLoggedIn
            user={user}
            handleLogout={handleLogout}
            isDropdownOpen={isDropdownOpen}
            setDropdownOpen={setDropdownOpen}
          />
        ) : (
          <UserLoggedOut />
        )}
      </div>

      {isModalOpen && <SearchTickets onClose={closeModal} />}
    </header>
  );
};

export default Navbar;
