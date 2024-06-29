// client\src\components\UserStatus\UserLoggedIn.jsx
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
const backendUrl = process.env.NEXT_PUBLIC_DEV_API;// need to be change
const UserLoggedIn = ({ user, handleLogout }) => (
  <div className="flex items-center">
    <div className="mr-4">
      <img
        src={user.profilePicture.startsWith('http') ? user.profilePicture : `http://localhost:3001/${user.profilePicture}`}
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />
    </div>
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {/* <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded"> */}
            {user.firstName} <span className="ml-1">&#x25BE;</span>
          {/* </button> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/account/dashboard">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/account">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/account/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button onClick={handleLogout}>Log Out</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
);

export default UserLoggedIn;
