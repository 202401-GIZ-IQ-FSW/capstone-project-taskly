import Link from 'next/link';

const UserLoggedOut = () => (
  <>
    <Link href="/auth/login">
      <button className="text-custom-blue font-bold mx-4">Log In</button>
    </Link>
    <Link href="/auth/register">
      <button className="bg-light-blue text-white hover:bg-custom-blue/80 px-4 py-2 rounded-full">Register</button>
    </Link>
  </>
);

export default UserLoggedOut;
