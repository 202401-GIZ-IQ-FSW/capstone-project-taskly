// client\src\app\projects\[projectId]\page.jsx
'use client';
import React, { useEffect, useState } from 'react';
import fetcher from '@/_utils/fetcher';
import Link from 'next/link';
import ProjectDetails from '@/components/Projects/ProjectDetails';

const ProjectDetailsPage = (params) => {
  const id = params.params.projectId;
  const [project, setProject] = useState(null);
  const [tickets, setTickets] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const res = await fetcher(`/v1/projects/${id}`);
        setProject(res);
      } catch (error) {
        console.error('Failed to fetch project details:', error);
      }
    };
    const fetchProjectTickets = async () => {
      try {
        const res = await fetcher(`/v1/projects/${id}/tickets`);
        setTickets(res.tickets);
      } catch (error) {
        console.error('Failed to fetch Tickets', error);
      }
    };

    if (id) {
      fetchProjectDetails();
      fetchProjectTickets();
    }
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-4">
      <ProjectDetails project={project} />
      <ul>
        {(!tickets || tickets.length == 0) && (
          <div className="w-full flex flex-row justify-center">
            <h1 className="font-bold text-3xl">
              there are no tickets for this project
            </h1>
          </div>
        )}
        {tickets && tickets.length > 0 && (<h1 className="font-bold text-3xl">project Tickets</h1>)  }
        {tickets &&
          tickets.map((ticket) => (
            <li key={ticket._id}>
              <Link
                href={`/projects/${project._id}/tickets/${ticket._id}`}
                className="text-blue-600 underline">
                {ticket.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProjectDetailsPage;
