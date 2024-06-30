'use client';
import SideNavigation from '@/components/SideNav/SideNavigation';
import { useState } from 'react';

const Settings = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen((prev) => !prev);
  };
  return (
    <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-10">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base md:text-3xl font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            {/* First Name */}
            <div className="pt-6 sm:flex">
              <dt className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                First name
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                Tom Cook
                <button
                  type="button"
                  onClick={toggleSideNav}
                  className="font-semibold text-darker-green hover:text-primary-dark">
                  Update
                </button>
              </dd>
            </div>

            {/* Last Name */}
            <div className="pt-6 sm:flex">
              <dt className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                Last Name
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                Tom Cook
                <button
                  type="button"
                  onClick={toggleSideNav}
                  className="font-semibold text-darker-green hover:text-primary-dark">
                  Update
                </button>
              </dd>
            </div>

            {/* Profile Picture */}
            <div className="pt-6 sm:flex">
              <dt className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                Profile Picture
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={''}
                    alt="Current Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={toggleSideNav}
                  className="font-semibold text-darker-green hover:text-primary-dark">
                  Update
                </button>
              </dd>
            </div>

            {/* Username */}
            <div className="pt-6 sm:flex">
              <dt className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                Username
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                Tom Cook
                <button
                  type="button"
                  onClick={toggleSideNav}
                  className="font-semibold text-darker-green hover:text-primary-dark">
                  Update
                </button>
              </dd>
            </div>

            {/* Email address */}
            <div className="pt-6 sm:flex">
              <dt className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                Email address
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                tom.cook@example.com
                <button
                  type="button"
                  onClick={toggleSideNav}
                  className="font-semibold text-darker-green hover:text-primary-dark">
                  Update
                </button>
              </dd>
            </div>

            {/* Password */}
            <div className="pt-6 sm:flex">
              <dt className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                Password
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                ***********
                <button
                  type="button"
                  onClick={toggleSideNav}
                  className="font-semibold text-darker-green hover:text-primary-dark">
                  Update
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      {/* Side Navigation Component */}
      <SideNavigation
        isOpen={isSideNavOpen}
        onClose={() => setIsSideNavOpen(false)}>
        {/* Content for Side Navigation */}
        <h3 className="text-lg font-semibold text-gray-900">
          Update Profile Picture
        </h3>
        <div className="p-4">
          {/* Placeholder for form or content to update profile picture */}
          <p>Form or content to update profile picture...</p>
        </div>
      </SideNavigation>
    </main>
  );
};

export default Settings;
