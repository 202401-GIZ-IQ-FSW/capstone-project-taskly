'use client';

import fetcher from '@/_utils/fetcher';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { Chart, LineElement, CategoryScale, LinearScale,PointElement } from 'chart.js';

Chart.register(LineElement, CategoryScale, LinearScale,PointElement );

const ProjectsTimeChart = () => {
  const [projectsData, setProjectsData] = useState(null); // Initialize as null to indicate data loading
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetcher('/v1/analytics/project-active');
        setProjectsData(response);
        setLoading(false); // Set loading to false after data fetch
      } catch (error) {
        console.error('Error fetching project activity data:', error);
        setLoading(false); // Ensure loading state is updated on error
        setError(error.message || 'Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  // Log projectsData to inspect its contents
  console.log('projectsData:', projectsData);

  // Check if projectsData is null or undefined before accessing its properties
  if (!projectsData) {
    return <p>Loading...</p>; // Optionally, show a loading indicator
  }

  // Extract labels and counts from projectsData
  const { labels, counts } = projectsData;

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Projects Created Over Time',
        data: counts,
        fill: false,
        borderColor: '#4CAF50',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2 className="bg-custom-teal text-white py-2 px-4 rounded hover:bg-green-700 cursor-pointer inline-block">Projects Over Time</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ProjectsTimeChart;
