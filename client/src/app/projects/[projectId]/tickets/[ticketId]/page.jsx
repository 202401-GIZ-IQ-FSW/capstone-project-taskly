// client\src\app\projects\[projectId]\tickets\[ticketId]\page.jsx
'use client';
import React, { useEffect, useState } from 'react';
import fetcher from '@/_utils/fetcher';
import TickeDetails from '@/components/Tickets/TickeDetails';

const TickeDetailsPage = (params) => {
  const projectId = params.params.projectId;
  const ticketId = params.params.ticketId;
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTickeDetails = async () => {
      try {
        const res = await fetcher(
          `/v1/projects/${projectId}/tickets/${ticketId}`
        );
        setTicket(res.ticket);
      } catch (error) {
        console.error('Failed to fetch ticket details:', error);
      }
    };

    if (projectId && ticketId) {
      fetchTickeDetails();
    }
  }, [projectId, ticketId]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-4">
      {ticket && (
        <>
          <h1 className="font-bold text-3xl">Ticket Details</h1>
          <TickeDetails ticket={ticket} />
        </>
      )}
    </div>
  );
};

export default TickeDetailsPage;
