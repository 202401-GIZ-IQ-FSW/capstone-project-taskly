import Link from 'next/link';
import React from 'react';
import { MdSupportAgent } from 'react-icons/md';

const TicketStats = ({ activity, submitted, resolved, supportText }) => (
  <div className="flex flex-col items-center my-16">
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-dancing font-bold text-light-blue">
        check it now
      </h1>
      <h1 className="text-4xl font-roboto font-extrabold text-custom-blue">
        Tickets Status
      </h1>
    </div>
    <section className="flex justify-evenly w-full gap-6 px-8 py-12 mx-6 flex-wrap mb-14">
      <div className="flex-1 text-center bg-custom-blue text-white rounded-lg shadow-lg p-8">
        <p className="text-xl font-bold font-roboto">Ticket activity</p>
        <p className="text-lg font-semibold font-lato text-white">{activity}</p>
      </div>
      <div className="flex-1 text-center bg-custom-blue text-white rounded-lg shadow-lg p-8">
        <p className="text-xl font-bold font-roboto">Tickets submitted</p>
        <p className="text-lg font-semibold font-lato text-white">
          {submitted}
        </p>
      </div>
      <div className="flex-1 text-center bg-custom-blue text-white rounded-lg shadow-lg p-8">
        <p className="text-xl font-bold font-roboto">Tickets resolved</p>
        <p className="text-lg font-semibold font-lato text-white">{resolved}</p>
      </div>
      <div className="flex-1 text-center  bg-light-blue text-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center justify-center">
          <MdSupportAgent className="text-4xl " />
          <Link href={'/contact'} className="text-2xl font-bold font-roboto">
            {supportText}
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default TicketStats;
