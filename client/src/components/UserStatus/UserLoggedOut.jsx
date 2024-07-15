import Link from 'next/link';

const UserLoggedOut = () => (
  <>
    <Link href="/auth/login">
      <button className="text-custom-blue font-bold mx-2 lg:mx-4">
        Log In
      </button>
    </Link>
    <Link href="/auth/register">
      <button className="hover:bg-custom-blue/70 text-white bg-custom-blue/80 px-4 py-2 rounded-full mx-2 lg:mx-4">
        Register
      </button>
    </Link>
  </>
);

export default UserLoggedOut;