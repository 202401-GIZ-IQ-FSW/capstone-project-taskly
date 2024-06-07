import React from 'react';

const TicketSubmission = ({ title, subtitle, submitText, newTicketText }) => (
  <section className="ticket-submission">
    <h1>{title}</h1>
    <p>{subtitle}</p>
    <button>{submitText}</button>
    <button>{newTicketText}</button>
  </section>
);

export default TicketSubmission;
