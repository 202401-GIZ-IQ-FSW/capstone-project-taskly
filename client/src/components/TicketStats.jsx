import React from 'react';

const TicketStats = ({ activity, submitted, resolved, supportText }) => (
  <section className="ticket-stats">
    <div className="stat">
      <p>Ticket activity</p>
      <p>{activity}</p>
    </div>
    <div className="stat">
      <p>Tickets submitted</p>
      <p>{submitted}</p>
    </div>
    <div className="stat">
      <p>Tickets resolved</p>
      <p>{resolved}</p>
    </div>
    <div className="support">
      <p>{supportText}</p>
    </div>
  </section>
);

export default TicketStats;
