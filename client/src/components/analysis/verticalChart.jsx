'use client';

import fetcher from '@/_utils/fetcher';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VerticalChart = () => {
  const [allTickets, setAllTickets] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ticketsResponse = await fetcher('/v1/analytics/all-tickets');
      setAllTickets(ticketsResponse);

      const usersResponse = await fetcher('/v1/analytics/all-users');
      setAllUsers(usersResponse);

      const projectsResponse = await fetcher('/v1/analytics/all-projects');
      setAllProjects(projectsResponse);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: ['All Tickets', 'All Users', 'All Projects'],
    datasets: [
      {
        label: 'Counts',
        data: [allTickets.length, allUsers.length, allProjects.length],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <h2>All Projects, Users, and Tickets</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default VerticalChart;
