// ProfileLayout.js
'use client';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Transition,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from '@headlessui/react';
import {
  FaBars,
  FaCalendar,
  FaChartPie,
  FaFolder,
  FaHome,
  FaCog,
  FaSearch,
  FaBell,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { MdViewKanban } from 'react-icons/md';

import { useUser } from '@/hooks/useUser';
import MobileSidebar from '@/components/Navigation/MobileSidebar/MobileSidebar';
import { useRouter } from 'next/navigation';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useProjects } from '@/context/ProjectsContext/ProjectsContext';
import ProjectsProvider from '@/context/ProjectsContext/ProjectsProvider';

const ProfileLayout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [selectedProject, setSelectedProject] = useState(null);

  const { handleLogout, user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/account/dashboard', icon: FaHome },
    { name: 'Projects', href: '/account/projects', icon: FaFolder },
    { name: 'Tickets', href: '/account/tickets', icon: FaCalendar },
    { name: 'Kanban', href: '/account/kanban', icon: MdViewKanban },
    { name: 'Analytics', href: '/account/analytics', icon: FaChartPie },
  ];

  const userNavigation = [
    { name: 'Home Page', href: '/' },
    { name: 'Your profile', href: '/account' },
    { name: 'Sign out', href: '/', onClick: handleLogout },
  ];

  const { projects, error } = useProjects();

  return (
    <>
      <div>
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          navigation={navigation}
        />
        <div
          className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col ${
            sidebarCollapsed ? 'lg:w-20' : 'lg:w-72'
          }`}>
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Link href="/">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=black&shade=600"
                  alt="Your Company"
                />
              </Link>
            </div>
            <div className="mt-4">
              <label
                htmlFor="projectSelect"
                className="mr-2 w-auto min-w-32 hidden">
                Choose project:
              </label>
              <select
                id="projectSelect"
                value={selectedProject ? selectedProject._id : ''}
                onChange={(e) => {
                  const project = projects.find(
                    (p) => p._id === e.target.value
                  );
                  setSelectedProject(project);
                }}
                className="p-2 border rounded min-w-52">
                <option value="" hidden>
                  Select a project
                </option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="absolute inset-y-1/2 transform -translate-y-1/2 -right-3 bg-gray-200 hover:bg-gray-300 px-2 py-4 rounded-full shadow-md focus:outline-none flex items-center justify-center">
              <div>
                {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
              </div>
            </button>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                            pathname === item.href
                              ? 'bg-gray-50 text-black'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                          }`}>
                          <item.icon
                            className={`h-6 w-6 shrink-0 ${
                              pathname === item.href
                                ? 'text-black'
                                : 'text-gray-400 group-hover:text-black'
                            }`}
                            aria-hidden="true"
                          />
                          {!sidebarCollapsed && item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <Link
                    href="/account/settings"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-black">
                    <FaCog
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-black"
                      aria-hidden="true"
                    />
                    {!sidebarCollapsed && 'Settings'}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className={`${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <FaBars className="h-6 w-6" aria-hidden="true" />
            </button>

            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

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
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src={user?.avatar}
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true">
                        {user?.name}
                      </span>
                      <FaChevronDown
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </MenuButton>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95">
                    <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {({ active }) => (
                            <Link
                              href={item.href}
                              onClick={item.onClick}
                              className={`block px-4 py-2 text-sm ${
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
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProfileLayout;
