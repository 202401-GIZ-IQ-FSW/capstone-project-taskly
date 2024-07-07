'use client';
import EditProfileForm from '@/components/Forms/EditProfileForm';
import ChangePasswordForm from '@/components/Forms/ChangePasswordForm';
import SideNavigation from '@/components/SideNav/SideNavigation';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';

const Settings = () => {
  const { user } = useUser();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [sideNavTitle, setSideNavTitle] = useState('');
  const [sideNavContent, setSideNavContent] = useState(null);

  const toggleSideNav = (title, content) => {
    setSideNavTitle(title);
    setSideNavContent(content);
    setIsSideNavOpen((prev) => !prev);
  };

  const closeSideNav = () => {
    setIsSideNavOpen(false);
  };

  const handleEditProfile = (formData) => {
    // Handle saving edited profile data
    console.log('Saving profile data:', formData);
    // Implement logic to save the data
    setIsSideNavOpen(false); // Close side nav after saving
  };

  const handleChangePassword = (formData) => {
    // Handle changing password
    console.log('Changing password:', formData);
    // Implement logic to change the password
    setIsSideNavOpen(false); // Close side nav after saving
  };

  return (
    <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-10">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <div className="flex flex-col md:flex-row items-start justify-between md:items-center">
            <div>
              <h2 className="text-base md:text-3xl font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            {/* Edit Profile Button */}
            <div className="pt-6 sm:flex justify-end">
              <button
                type="button"
                onClick={() =>
                  toggleSideNav(
                    'Edit Profile',
                    <EditProfileForm user={user} onSubmit={handleEditProfile} />
                  )
                }
                className="text-primary-dark font-semibold hover:text-darker-green">
                Edit Profile
              </button>
            </div>
          </div>

          <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            {/* Full Name */}
            <div className="pt-6 sm:flex">
              <dt className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                Full Name
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                {user?.firstName} {user?.lastName}
              </dd>
            </div>

            {/* Username */}
            <div className="pt-6 sm:flex">
              <dt className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                Username
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                {user?.username}
              </dd>
            </div>

            {/* Email address */}
            <div className="pt-6 sm:flex">
              <dt className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                Email address
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                {user?.email}
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
                    src={user?.profilePicture || ''}
                    alt="Current Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </dd>
            </div>
          </dl>
          <div className="flex flex-col md:flex-row items-start justify-between md:items-center">
            {/* Password */}
            <div className="pt-6 sm:flex">
              <dt className="flex-none pr-6 font-medium text-gray-900 sm:w-64">
                Password
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto text-gray-900">
                ***********
              </dd>
            </div>
            {/* Change Password Button */}
            <div className="pt-6 sm:flex justify-end">
              <button
                type="button"
                onClick={() =>
                  toggleSideNav(
                    'Change Password',
                    <ChangePasswordForm onSubmit={handleChangePassword} />
                  )
                }
                className="text-primary-dark font-semibold hover:text-darker-green">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Side Navigation Component */}
      <SideNavigation
        isOpen={isSideNavOpen}
        onClose={closeSideNav}
        title={sideNavTitle}>
        {sideNavContent}
      </SideNavigation>
    </main>
  );
};

export default Settings;
