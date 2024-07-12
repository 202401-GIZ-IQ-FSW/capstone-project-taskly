import React from 'react';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react';
import { FaBars, FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import SearchComponent from '../SearchTicket/search';

const Topbar = ({ user, setSidebarOpen, userNavigation }) => {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}>
        <span className="sr-only">Open sidebar</span>
        <FaBars className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <FaSearch
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search..."
            type="search"
            name="search"
          />
        </form>
        <SearchComponent />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">View notifications</span>
            <FaBell className="h-6 w-6" aria-hidden="true" />
          </button>
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
            aria-hidden="true"
          />
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-x-2 text-sm font-semibold leading-6 text-gray-900">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=80&q=80"
                alt=""
              />
              <span aria-hidden="true">
                {user?.firstName} {user?.lastName}
              </span>
              <FaChevronDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </MenuButton>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    {({ active }) => (
                      <Link
                        href={item.href}
                        onClick={item.onClick || null}
                        className={`block px-4 py-2 text-sm text-gray-700 ${
                          active ? 'bg-gray-100' : ''
                        }`}>
                        {item.name}
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
