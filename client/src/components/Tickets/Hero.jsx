'use client';
import { useUser } from '@/hooks/useUser';
import Button from '../../components/Button/Button';
import Link from 'next/link';

const Hero = () => {
  const { user } = useUser();

  // Define the URLs for logged in and logged out states
  const newTicketUrl = user ? '/account/dashboard' : '/auth/login';

  return (
    <div className="relative bg-white lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row lg:gap-x-8 justify-between items-center">
        <div className="px-6 py-12 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="hidden sm:mt-32 sm:flex lg:mt-16"></div>
            <h1 className="text-4xl font-bold tracking-tight text-custom-black sm:mt-10 sm:text-6xl">
              Submit your technical issues and queries easily!
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Securely submit and manage support tickets for technical issues
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link href={newTicketUrl}>
                <Button>New ticket</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="relative max-w-sm sm:max-w-lg mx-auto xl:max-w-2xl">
          <img
            className="aspect-[3/2] w-full bg-gray-50 object-cover self-center mb-16"
            src="/assets/task-hero.png"
            alt="Ticket Management App"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
