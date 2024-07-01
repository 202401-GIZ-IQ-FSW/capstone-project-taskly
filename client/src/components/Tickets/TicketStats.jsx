import React from 'react';

const TicketStats = ({ activity, submitted, resolved, supportText }) => (
  <section className="flex flex-col md:flex-row gap-6 px-4 py-6 mx-4 my-6">
    <div className="flex-1 text-center bg-blue-500 text-white rounded-lg shadow-lg p-8">
      <p className="text-lg font-semibold">Ticket activity</p>
      <p className="text-2xl font-bold">{activity}</p>
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
