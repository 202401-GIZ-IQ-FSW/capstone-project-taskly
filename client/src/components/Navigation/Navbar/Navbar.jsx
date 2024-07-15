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
    <header className="shadow-md py-4 lg:px-8 flex justify-between items-center">
      <Link href={'/'} className='font-roboto text-4xl font-extrabold text-custom-blue'>Taskly</Link>
      <nav>
        {filteredLinks.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className="text-custom-blue font-extrabold font-lato  border-b-2 border-transparent hover:border-light-blue hover:text-custom-blue/70 transition duration-300 ease-in-out  px-3 py-2 m-1">
            {link.text}
          </Link>
        ))}
      </nav>
      <div>
        {user ? (
          <UserLoggedIn user={user} handleLogout={handleLogout}/>
        ) : (
          <UserLoggedOut />
        )}
      </div>
    </header>
  );
};

export default Navbar;
