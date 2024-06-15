import Link from 'next/link';

const UserLoggedIn = ({ user, handleLogout, isDropdownOpen, setDropdownOpen }) => (
  <div className="flex items-center">
    <div className="mr-4">
      <img
        src={user.profilePicture}
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
            Log Out
          </button>
        </div>
      )}
    </div>
  </div>
);

export default UserLoggedIn;
