'use client';
import { Link } from 'next/link';
import { useState } from 'react';

// this page still needs work
const Profile = () => {
  const [activeNavItem, setActiveNavItem] = useState('general'); // Initial active item

  const handleNavClick = (item) => {
    setActiveNavItem(item);
  };

  const renderContent = () => {
    switch (activeNavItem) {
      case 'general':
        return (
          <div className="grid gap-6">
            {/* Content for General */} <p>General content</p>
          </div>
        );
      case 'home':
        return (
          <div>
            {/* Content for Home */}
            <p>This is the Home content.</p>
          </div>
        );
      case 'tickets':
        return (
          <div>
            {/* Content for Tickets */}
            <p>This is the Tickets content.</p>
          </div>
        );
      case 'profile':
        return (
          <div>
            {/* Content for Profile */}
            <p>This is the Profile content.</p>
          </div>
        );
      case 'settings':
        return (
          <div>
            {/* Content for Settings */}
            <p>This is the Settings content.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Profile</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <div className="grid gap-4 text-sm text-muted-foreground">
            <Link
              href="#"
              className={`font-semibold text-primary ${activeNavItem === 'general' ? 'active' : ''}`}
              onClick={() => handleNavClick('general')}>
              General
            </Link>
            <Link
              href="#"
              className={`font-semibold text-primary ${activeNavItem === 'home' ? 'active' : ''}`}
              onClick={() => handleNavClick('home')}>
              Home
            </Link>
            <Link
              href="#"
              className={`font-semibold text-primary ${activeNavItem === 'tickets' ? 'active' : ''}`}
              onClick={() => handleNavClick('tickets')}>
              Tickets
            </Link>
            <Link
              href="#"
              className={`font-semibold text-primary ${activeNavItem === 'profile' ? 'active' : ''}`}
              onClick={() => handleNavClick('profile')}>
              Profile
            </Link>
            <Link
              href="#"
              className={`font-semibold text-primary ${activeNavItem === 'settings' ? 'active' : ''}`}
              onClick={() => handleNavClick('settings')}>
              Settings
            </Link>
          </div>
          <div className="grid gap-6">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
