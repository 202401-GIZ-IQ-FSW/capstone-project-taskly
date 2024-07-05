// client\src\components\Navigation\Navbar\Navbar.jsx
'use client';
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
  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href={'/'}>Tickets</Link>
      <nav>
        {filteredLinks.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="mr-4 text-gray-700 hover:text-gray-900">
            {link.text}
          </Link>
        ))}
      </nav>
      <div>
        {user ? (
          <UserLoggedIn user={user} handleLogout={handleLogout} />
        ) : (
          <UserLoggedOut />
        )}
      </div>
    </header>
  );
};

export default Navbar;
