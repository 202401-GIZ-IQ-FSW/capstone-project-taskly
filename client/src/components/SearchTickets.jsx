'use client';

import React from 'react';

const SearchTickets = ({
  ticketId,
  submitter,
  status,
  categories,
  dateSubmitted,
  lastUpdated,
  priorityLevels,
  options,
  onSearch
}) => (
  <section className="search-tickets">
    <h2>Search Tickets</h2>
    <div>
      <label>Ticket ID</label>
      <input type="range" min="0" max="100" value={ticketId} readOnly />
    </div>
    <div>
      <label>Submitter</label>
      <input type="text" value={submitter} readOnly />
    </div>
    <div>
      <label>Status</label>
      <input type="text" value={status} readOnly />
    </div>
    <div className="categories">
      {categories.map((category, index) => (
        <button key={index}>{category}</button>
      ))}
    </div>
    <div>
      <label>Date submitted</label>
      <input type="date" value={dateSubmitted} readOnly />
    </div>
    <div>
      <label>Last updated</label>
      <input type="date" value={lastUpdated} readOnly />
    </div>
    <div className="priority-levels">
      {priorityLevels.map((level, index) => (
        <div key={index}>
          <input type="radio" id={level} name="priority" />
          <label htmlFor={level}>{level}</label>
        </div>
      ))}
    </div>
    <div className="options">
      {options.map((option, index) => (
        <div key={index}>
          <input type="checkbox" id={option} />
          <label htmlFor={option}>{option}</label>
        </div>
      ))}
    </div>
    <button onClick={onSearch}>Search</button>
  </section>
);

export default SearchTickets;
