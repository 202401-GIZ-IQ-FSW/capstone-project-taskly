import React from 'react';

const TicketStats = ({ activity, submitted, resolved, supportText }) => (
  <section className="flex justify-evenly gap-6 px-4 py-6 mx-6 flex-wrap">
    <div className="text-center p-10 bg-[#e9ecef]">
      <p>Ticket activity</p>
      <p>{activity}</p>
    </div>
    <div className="text-center p-10 bg-[#e9ecef]">
      <p>Tickets submitted</p>
      <p>{submitted}</p>
    </div>
    <div className="text-center p-10 bg-[#e9ecef]">
      <p>Tickets resolved</p>
      <p>{resolved}</p>
    </div>
    <div className="text-center p-10 bg-[#e9ecef]">
      <p>{supportText}</p>
    </div>
  </section>
);

export default TicketStats;
