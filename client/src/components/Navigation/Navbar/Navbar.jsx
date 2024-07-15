'use client';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import UserLoggedIn from '@/components/UserStatus/UserLoggedIn';
import UserLoggedOut from '@/components/UserStatus/UserLoggedOut';
import { navLinks } from '@/data/Links';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';

const Navbar = () => {
  const { user, handleLogout } = useUser();
  const filteredLinks = user
    ? navLinks.filter(
        (link) => link.text !== 'Signin' && link.text !== 'Signup'
      )
    : navLinks;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="shadow-md py-4 px-4 lg:px-8 flex justify-between items-center">
      <Link href={'/'} className='font-roboto text-3xl lg:text-4xl font-extrabold text-custom-blue-200'>Taskly</Link>
      <div className="flex items-center justify-center">
        <nav className="hidden lg:flex lg:flex-row items-center justify-center lg:mr-80 md:mr-40">
          {filteredLinks.map((link, index) => (
            <Link
              key={index}
              href={link.url}
              className="text-custom-blue-300 font-extrabold font-lato border-b-2 border-transparent hover:border-light-blue hover:text-custom-blue-200 transition duration-300 ease-in-out px-3 py-2 m-1">
              {link.text}
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          {user ? (
            <UserLoggedIn user={user} handleLogout={handleLogout} />
          ) : (
            <UserLoggedOut />
          )}
        </div>
        <div className="lg:hidden ml-4">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setMenuOpen(false)}>
          <div className="fixed top-0 right-0 w-64 h-full bg-white shadow-md flex flex-col items-center py-4 z-50" onClick={(e) => e.stopPropagation()}>
            <button className="self-end mr-4 mb-4" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <FiX size={24} />
            </button>
            {filteredLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-custom-blue font-extrabold font-lato border-b-2 border-transparent hover:border-light-blue hover:text-custom-blue/70 transition duration-300 ease-in-out px-3 py-2 m-1">
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;