'use client';
import React from 'react';

const TicketSubmission = ({ title, subtitle, submitText, newTicketText }) => (
  <section className="relative flex flex-col md:flex-row text-left p-10 bg-white shadow-lg rounded-lg mx-6 my-4 overflow-hidden">
    <div className="relative flex-1 mb-4 md:mb-0 z-10 p-6 rounded-lg">
      <h1 className="text-white text-3xl font-bold mb-4">{title}</h1>
      <p className="text-white">{subtitle}</p>
      <div className="flex mt-5 gap-4">
        <button
          onClick={() => (window.location.href = '/auth/login')}
          className="border border-gray-800 px-6 py-2 text-gray-800 hover:bg-gray-800 hover:text-white transition rounded">
          {newTicketText}
        </button>
      </div>
    </div>
  </section>
);

export default TicketSubmission;

