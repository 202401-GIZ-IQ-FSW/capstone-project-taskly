import React from 'react';
import Newsletter from '../Newsletter';

const TicketStats = ({ activity, submitted, resolved, supportText }) => (
  <>
  <section className="flex justify-evenly gap-6 px-4 py-12 mx-6 flex-wrap mb-14">
    <div className="flex-1 text-center bg-gray-500 text-white rounded-lg shadow-lg p-8">
      <p className='text-xl font-bold font-roboto'>Ticket activity</p>
      <p className="text-2xl font-semibold font-lato text-teal-500">{activity}</p>
    </div>
    <div className="flex-1 text-center bg-gray-500 text-white rounded-lg shadow-lg p-8">
      <p className="text-xl font-bold font-roboto">Tickets submitted</p>
      <p className="text-2xl font-semibold font-lato text-teal-500">{submitted}</p>
    </div>
    <div className="flex-1 text-center bg-gray-500 text-white rounded-lg shadow-lg p-8">
      <p className="text-xl font-bold font-roboto">Tickets resolved</p>
      <p className="text-2xl font-semibold font-lato text-teal-500">{resolved}</p>
    </div>
    <div className="flex-1 text-center bg-teal-500 text-white rounded-lg shadow-lg p-8">
      <p className="text-2xl font-bold font-roboto">{supportText}</p>
    </div>
    
  </section>
  <section>
    <Newsletter/>
  </section>
  </>
);

export default TicketStats;
