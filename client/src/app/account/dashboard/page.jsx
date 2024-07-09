// client\src\app\account\dashboard\page.jsx
'use client';
import { useState, useEffect } from 'react';
import fetcher from '@/_utils/fetcher';
import ProjectList from '@/components/Dashboard/ProjectList';
import TicketCounts from '@/components/Dashboard/TicketCounts';

function Dashboard() {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetcher('/v1/dashboard');
        setData(data || []);
        // console.log(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col justify-center items-left h-full">
      <ProjectList title="Projects You Own" projects={data.ownedProjects} />
      <ProjectList
        title="Projects You have ViewOnly access to"
        projects={data.projectsCanView}
      />
      <ProjectList
        title="Projects You have Edit role on it"
        projects={data.projectsCanEdite}
      />
      <ProjectList
        title="Projects invited to Edit"
        projects={data.projectsEditInvited}
      />
      <ProjectList
        title="Projects invited to View Only"
        projects={data.projectsViewInvited}
      />
      <hr className="w-full" />
      <h1 className="font-extrabold">Your Tickets</h1>
      <TicketCounts ticketCountsByStatus={data.ticketCountsByStatus} />
    </div>
  );
}

export default Dashboard;
