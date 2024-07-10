'use client';
import fetcher from '@/_utils/fetcher';
import { useProjects } from '@/context/ProjectsContext/ProjectsContext';
import { useEffect, useState } from 'react';

const Tickets = () => {
  const { selectedProject } = useProjects();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(selectedProject?._id);

  useEffect(() => {
    if (selectedProject) {
      fetchTickets();
    }
  }, [selectedProject]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await fetcher(`/v1/projects/${selectedProject._id}/tickets`);
      setTickets(data);
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
      <h2 className="text-xl font-bold mb-4">
        Tickets for {selectedProject?.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tickets.length > 0 &&
          tickets?.map((ticket) => (
            <div
              key={ticket._id}
              className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold">{ticket.title}</h3>
              <p className="text-gray-600">{ticket.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tickets;
