'use client'
import fetcher from '@/_utils/fetcher';
import { useProjects } from '@/context/ProjectsContext/ProjectsContext';
import { useEffect, useState } from 'react';

const TicketDetail = ({ params }) => {
  const { ticketId } = params;
  const { selectedProject } = useProjects();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ticketId && selectedProject) {
      fetchTicket();
    }
  }, [ticketId, selectedProject]);

  const fetchTicket = async () => {
    setLoading(true);
    try {
      const data = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${ticketId}`
      );
      setTicket(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{ticket.title}</h2>
      <p className="text-gray-600">{ticket.description}</p>
      <div className="mt-4 flex items-center">
        <span
          className={`px-2 py-1 text-sm font-semibold ${
            ticket.priority === 'high'
              ? 'bg-red-200 text-red-800'
              : ticket.priority === 'medium'
              ? 'bg-yellow-200 text-yellow-800'
              : 'bg-blue-200 text-blue-800'
          } rounded-md mr-2`}>
          {ticket.priority}
        </span>
        <span
          className={`px-2 py-1 text-sm font-semibold ${
            ticket.status === 'open'
              ? 'bg-green-200 text-green-800'
              : ticket.status === 'closed'
              ? 'bg-gray-200 text-gray-800'
              : 'bg-yellow-200 text-yellow-800'
          } rounded-md`}>
          {ticket.status}
        </span>
      </div>
    </div>
  );
};

export default TicketDetail;
