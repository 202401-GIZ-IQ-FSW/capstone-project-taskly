'use client';

import fetcher from '@/_utils/fetcher';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const TicketPriorityChart = () => {
  const [ticketData, setTicketData] = useState(null); // Initialize as null to indicate data loading
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher('/v1/analytics/tickets-by-priority');
        setTicketData(response);
        setLoading(false); // Set loading to false after data fetch
      } catch (error) {
        console.error('Error fetching ticket priority data:', error);
        setLoading(false); // Ensure loading state is updated on error
        setError(error.message || 'Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  // Log ticketData to inspect its contents
  console.log('ticketData:', ticketData);

  // Check if ticketData is null or undefined before accessing its properties
  if (!ticketData) {
    return <p>Loading...</p>; // Optionally, show a loading indicator
  }

  // Extract labels and counts from ticketData
  const { labels, counts } = ticketData;

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Ticket Counts by Priority',
        data: counts,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className="bg-custom-blue text-white py-2 px-4 rounded hover:bg-custom-blue/80 cursor-pointer inline-block">
        Tickets by Priority
      </h2>      
      <Doughnut data={chartData} />
    </div>
  );
};

export default TicketPriorityChart;
