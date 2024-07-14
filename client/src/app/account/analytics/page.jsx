import React from 'react';
import DoughnutChart from '@/components/analysis/doughnutChart';
import VerticalChart from '@/components/analysis/verticalChart';
import ProjectsTimeChart from '@/components/analysis/ProjectsTimeChart';
import TicketPriorityChart from '@/components/analysis/TicketPriorityChart';

const Analytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <div className="w-full p-2">
        <VerticalChart />
      </div>
      <div className="w-full p-2">
        <DoughnutChart />
      </div>
      <div className="col-span-full">
        <hr className="border-2 border-gray-300 my-4" />
      </div>
      <div className="w-full p-2">
        <ProjectsTimeChart />
      </div>
      <div className="w-full p-2">
        <TicketPriorityChart />
      </div>
    </div>
  );
};

export default Analytics;
