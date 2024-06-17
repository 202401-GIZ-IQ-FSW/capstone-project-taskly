import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserLoggedIn = ({ user, handleLogout }) => (
  <div className="flex items-center">
    <div className="mr-4">
      <img
        src={user.profilePicture}
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />
    </div>
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
            {user.firstName} <span className="ml-1">&#x25BE;</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings">Settings</Link>
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