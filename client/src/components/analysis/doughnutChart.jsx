'use client';

import fetcher from '@/_utils/fetcher';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [resolvedTickets, setResolvedTickets] = useState([]);
  const [openedTickets, setOpenedTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resolvedResponse = await fetcher('/v1/analytics/resolved-tickets');
      setResolvedTickets(resolvedResponse);

      const openedResponse = await fetcher('/v1/analytics/opened-tickets');
      setOpenedTickets(openedResponse);
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Resolved Tickets', 'Opened Tickets'],
    datasets: [
      {
        label: 'Counts',
        data: [resolvedTickets.length, openedTickets.length],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className="bg-custom-blue text-white py-2 px-4 rounded hover:bg-custom-blue/80 mb-10 cursor-pointer inline-block">Resolved and Opened Tickets</h2>
      <Doughnut data={chartData} />
    </div>
  );
};

export default DoughnutChart;
