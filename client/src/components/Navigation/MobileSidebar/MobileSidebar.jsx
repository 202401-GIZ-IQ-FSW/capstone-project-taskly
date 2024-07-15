'use client';

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { FaTimes, FaCog } from 'react-icons/fa';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarNavigation } from '@/data/sidebarNavigation';
import ProjectSelectDropdown from '@/components/Dropdowns/ProjectSelectDropdown';

const MobileSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  projects,
  selectedProject,
  onProjectChange,
}) => {
  const pathname = usePathname();

  return (
    <Transition show={sidebarOpen}>
      <Dialog className="relative z-50 lg:hidden text-white" onClose={setSidebarOpen}>
        <TransitionChild
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div className="fixed inset-0 flex">
          <TransitionChild
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full">
            <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    // onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <FaTimes
                      className="h-6 w-6 text-white sr-only"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-custom-blue px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="mt-12">
                  <ProjectSelectDropdown
                    projects={projects}
                    selectedProject={selectedProject}
                    onProjectChange={onProjectChange}
                    setSidebarOpen={setSidebarOpen}
                  />
                </div>
                {/* <div className="flex h-16 shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=blacko&shade=600"
                    alt="Your Company"
                  />
                </div> */}
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {sidebarNavigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              onClick={() => setSidebarOpen(!sidebarOpen)}
                              href={item.href}
                              className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 ${
                                pathname === item.href
                                  ? 'bg-gray-50 text-custom-blue'
                                  : 'text-white hover:bg-gray-50 hover:text-custom-blue'
                              }`}>
                              <item.icon
                                className={`h-6 w-6 shrink-0 ${
                                  pathname === item.href
                                    ? 'text-custom-blue'
                                    : 'text-white group-hover:text-custom-blue'
                                }`}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <Link
                        href="/account/settings"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-gray-50 hover:text-custom-blue">
                        <FaCog
                          className="h-6 w-6 shrink-0 text-white group-hover:text-custom-blue"
                          aria-hidden="true"
                        />
                        Settings
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MobileSidebar;
