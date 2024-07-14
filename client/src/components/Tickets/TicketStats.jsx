import React from 'react';

const TicketStats = ({ activity, submitted, resolved, supportText }) => (
  <section className="flex justify-evenly gap-6 px-4 py-12 mx-6 flex-wrap mb-14">
    <div className="text-center p-10 bg-[#e9ecef]">
      <p>Ticket activity</p>
      <p>{activity}</p>
    </div>
    <div className="flex-1 text-center bg-green-500 text-white rounded-lg shadow-lg p-8">
      <p className="text-lg font-semibold">Tickets submitted</p>
      <p className="text-2xl font-bold">{submitted}</p>
    </div>
    <div className="flex-1 text-center bg-purple-500 text-white rounded-lg shadow-lg p-8">
      <p className="text-lg font-semibold">Tickets resolved</p>
      <p className="text-2xl font-bold">{resolved}</p>
    </div>
    <div className="flex-1 text-center bg-pink-500 text-white rounded-lg shadow-lg p-8">
      <p className="text-lg font-semibold">{supportText}</p>
    </div>
  </section>
);

export default TicketStats;
