'use client';
import { useUser } from '@/hooks/useUser';
import Button from '../../components/Button/Button';
import Link from 'next/link';
import { RiTicket2Line } from 'react-icons/ri';

const Hero = () => {
  const { user } = useUser(); // Assuming your useUser hook returns user information

  // Define the URLs for logged in and logged out states
  const newTicketUrl = user ? '/account/dashboard' : '/auth/login';

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56  xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="hidden sm:mt-32 sm:flex lg:mt-16"></div>
            <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
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
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <img
            className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-6/12 self-center"
            src="/test.webp"
            alt="Ticket Management App"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
