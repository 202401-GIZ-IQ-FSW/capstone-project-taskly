'use client';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';
import { RiTicket2Line } from 'react-icons/ri';

const Temp = () => {
  const { user } = useUser(); // Assuming your useUser hook returns user information

  // Define the URLs for logged in and logged out states
  const newTicketUrl = user ? '/account/dashboard' : '/auth/login';

  return (
    <section className="flex flex-row text-left p-10 bg-[#e9ecef] mx-6 mb-4">
      <div className="flex-1">
        <h1 className="text-black text-4xl font-bold mb-4">
          Submit your technical issues and queries easily!
        </h1>
        <p className="font-normal">
          Securely submit and manage support tickets for technical issues
        </p>
        <div className="flex flex-row mt-5 gap-4">
          <Link
            href={newTicketUrl}
            className="border border-black px-6 py-2 flex items-center gap-4">
            New ticket
          </Link>
        </div>
      </div>
      <div className="flex-1">{/** Placeholder for icon component */}</div>
    </section>
  );
};

export default Temp;

const Icon = () => {
  return (
    <svg
      fill="#000000"
      width="18"
      height="18"
      viewBox="0 0 512 512"
      id="_31_Task"
      data-name="31 Task"
      xmlns="http://www.w3.org/2000/svg">
      <path
        id="Path_40"
        data-name="Path 40"
        d="M325.719,127.625,229.094,231.25l-44.282-47.469L144,227.562l86.781,92.344L367.938,172.875Z"
        fillRule="evenodd"
      />
      <path
        id="Path_41"
        data-name="Path 41"
        d="M480,0H32A31.981,31.981,0,0,0,0,32V480a31.981,31.981,0,0,0,32,32H480a31.981,31.981,0,0,0,32-32V32A31.981,31.981,0,0,0,480,0ZM448,352H352v96H160V352H64V64H448Z"
        fillRule="evenodd"
      />
    </svg>
  );
};
