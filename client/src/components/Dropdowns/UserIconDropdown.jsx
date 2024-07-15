import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserIconDropdown = ({ user, userNavigation }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
          <img
            className="h-8 w-8 rounded-full bg-gray-50"
            src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            alt=""
          />
          <FaChevronDown className="text-gray-400" size={46} />
        </div>
      </DropdownMenuTrigger>
      <div className="mr-2">
        <DropdownMenuContent>
          {userNavigation.map((item, index) => (
            <div key={item.name}>
              <DropdownMenuItem key={item.name}>
                <Link
                  href={item.href}
                  onClick={item.onClick || null}
                  className="">
                  {item.name}
                </Link>
              </DropdownMenuItem>
              {index === userNavigation.length - 1 ? null : (
                <DropdownMenuSeparator />
              )}
            </div>
          ))}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};

export default UserIconDropdown;
