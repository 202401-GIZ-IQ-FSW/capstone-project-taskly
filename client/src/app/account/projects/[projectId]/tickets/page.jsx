'use client';
import fetcher from '@/_utils/fetcher';
import { useEffect, useState } from 'react';

const ProjectTickets = ({ params }) => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  const { projectId } = params;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await fetcher(`/v1/projects/:${projectId}/tickets`);
        setTickets(data.tickets || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTickets();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tickets.length === 0 ? (
        <div className="text-center">You don't have any tickets.</div>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-white shadow-md rounded-md p-4">
            <h3 className="text-lg font-semibold">{ticket.title || ''}</h3>
            <p className="text-gray-600">{ticket.description || ''}</p>
            <div className="flex justify-between mt-2">
              <span className="text-sm font-medium">{ticket.status}</span>
              <span className="text-sm font-medium">{ticket.priority}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectTickets;
