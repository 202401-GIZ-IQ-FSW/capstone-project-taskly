'use client';
import UserLoggedIn from '@/components/UserStatus/UserLoggedIn';
import UserLoggedOut from '@/components/UserStatus/UserLoggedOut';
import { navLinks } from '@/data/Links';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import { useState } from 'react';
import SearchTickets from '../../SearchTicket/SearchTickets';

const Navbar = () => {
  const { user, handleLogout, accesToken } = useUser();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  console.log(user);
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
