'use client';
import Timeline from '@/components/About us/Timeline';
import DeveloperCard from '@/components/About us/DeveloperCard';
import React from 'react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center my-10">
        <h3 className="font-dancing font-medium text-2xl text-light-blue">
          Our story
        </h3>
        <h1 className="font-lato font-semibold text-6xl text-custom-blue">
          About us
        </h1>
      </div>

      <Timeline />

      <div className="mt-20">
        <div className="text-center">
          <h3 className="font-dancing font-medium text-2xl text-light-blue">
            Get to Know
          </h3>
          <h1 className="font-lato font-semibold text-6xl text-custom-blue">
            Our Team
          </h1>
        </div>
        <DeveloperCard />
      </div>
    </div>
  );
};

export default About;
