import Link from 'next/link';

const UserLoggedOut = () => (
  <>
    <Link href="/auth/login">
      <button className="bg-gray-500 text-white px-4 py-2 rounded mx-4">Log In</button>
    </Link>
    <Link href="/auth/register">
      <button className="bg-gray-500 text-white px-4 py-2 rounded">Register</button>
    </Link>
  </>
);

export default UserLoggedOut;
