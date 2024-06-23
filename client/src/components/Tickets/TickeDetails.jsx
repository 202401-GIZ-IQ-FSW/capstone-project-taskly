// client\src\components\Tickets\TickeDetails.jsx
import React from 'react';

const TickeDetails = ({ ticket }) => {
  return (
    <>
      <p>Project Name: </p>
      <p>Ticket Title: {ticket.title}</p>
      <p>Description: {ticket.description}</p>
      <p>Priority: {ticket.priority}</p>
      <p>status: {ticket.status}</p>
      <p>assignees: {ticket.assignees}</p>
    </>
  );
};

export default TickeDetails;
