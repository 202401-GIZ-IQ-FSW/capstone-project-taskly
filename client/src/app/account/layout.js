'use client';
import Link from 'next/link';

const ProfileLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full flex-col pt-24">
      <div className="mx-auto grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <div className="grid gap-4 text-sm text-muted-foreground">
          <Link
            href="/account/tickets"
            className={`font-semibold text-primary`}>
            Tickets
          </Link>
          <Link
            href="/account"
            className={`font-semibold text-primary`}>
            Profile
          </Link>
          <Link
            href="/account/settings"
            className={`font-semibold text-primary`}>
            Settings
          </Link>
        </div>
        <div className="grid gap-6">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
