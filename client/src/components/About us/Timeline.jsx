import React from 'react';
import { IoRocketOutline, IoServer } from 'react-icons/io5';
import { FaReact } from 'react-icons/fa';
import { GoMilestone } from 'react-icons/go';
import { FaCrosshairs } from 'react-icons/fa';

const Timeline = () => {
  return (
    <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
      <li>
        <div className="timeline-middle text-custome-tail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="timeline-start mb-10 md:text-end">
          <time className="font-dancing text-lg text-custome-tail italic">
            January
          </time>
          <div className="text-lg font-black text-custom-black">
            <div className="flex items-center font-robot justify-end">
              Re:Coded BootCamp Kick-off
              <IoRocketOutline className="ml-2 text-custome-tail" />
            </div>
          </div>
          <p className="font-lato text-end">
            When we began this journey as individuals in the Re:Coded fullstack
            bootcamp, we each brought unique skills and perspectives. Our
            primary objective is to deliver high-quality solutions efficiently,
            fostering innovation and collaboration to meet and exceed user
            expectations.
          </p>
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div className="timeline-middle text-custome-tail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="timeline-end mb-10">
          <time className="font-dancing text-lg text-custome-tail italic">
            January-March
          </time>
          <div className="text-lg font-black text-custom-black">
            <div className="flex items-center font-robot justify-start">
              Front-end phase
              <FaReact className="ml-2 text-custome-tail" />
            </div>
          </div>
          <div className="text-lg font-black"></div>
          During which we learned to work with HTML, CSS, JavaScript, Next.js,
          Tailwind CSS, REST APIs, and more, resulting in a movie website
          capstone project.
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div className="timeline-middle text-custome-tail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="timeline-start mb-10 md:text-end">
          <time className="font-dancing text-lg text-custome-tail italic">
            April-June
          </time>
          <div className="text-lg font-black text-custom-black">
            <div className="flex items-center font-robot justify-end">
              Back-end phase
              <IoServer className="ml-2 text-custome-tail" />
            </div>
          </div>
          During which we learned to work with Express.js, SQL & NoSQL
          databases, MongoDB, Authentication and more. This resulted in an
          e-commerce website capstone project.
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div className="timeline-middle text-custome-tail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="timeline-end mb-10">
          <time className="font-dancing text-lg text-custome-tail italic">
            June-July
          </time>
          <div className="text-lg font-black text-custom-black">
            <div className="flex items-center font-robot justify-start">
              Capstone Project
              <GoMilestone className="ml-2 text-custome-tail" />
            </div>
          </div>
          in our final phase, working on our graduation capstone project: a
          ticket management website. As a team, our goal is to create a
          user-friendly platform that streamlines the submission, assignment,
          tracking, and resolution of software-related tickets.
        </div>
        <hr />
      </li>
      <li>
        <hr />
        <div className="timeline-middle text-custome-tail">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="timeline-start mb-10 md:text-end">
          <time className="font-dancing text-lg text-custome-tail italic">
            June-July
          </time>
          <div className="text-lg font-black text-custom-black">
            <div className="flex items-center font-robot justify-end">
              Our Mission
              <FaCrosshairs className="ml-2 text-custome-tail" />
            </div>
          </div>
          Our mission is to create an advanced Ticket Management System that
          enables users to easily submit detailed tickets, helps admins assign
          tasks to the appropriate developers, provides real-time tracking of
          ticket statuses, facilitates seamless communication via a built-in
          messaging system, allows users to prioritize urgent issues, and offers
          valuable insights through an analytics dashboard showcasing ticket
          trends, response times, and resolution rates.
        </div>
      </li>
    </ul>
  );
};

export default Timeline;
