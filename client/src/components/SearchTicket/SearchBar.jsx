import React, { useState } from 'react';
import TicketCard from './TicketCard';
import fetcher from '@/_utils/fetcher';
import { FaSearch } from 'react-icons/fa';
import { useProjects } from '@/context/ProjectsContext/ProjectsContext';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [tickets, setTickets] = useState([]);
  const { selectedProject } = useProjects();

  const fetchData = async (value) => {
    try {
      const response = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/search?q=${value}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTickets(data.tickets);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTickets([]);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    if (value.length >= 1) {
      fetchData(value);
    } else {
      setTickets([]);
    }
  };

  const handleSelectTicket = (ticketId) => {
    // Redirect to ticket page
    window.location.href = `/tickets/${ticketId}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData(input);
    }
  };

  return (
    <>
      <form className="relative flex flex-1" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <FaSearch
          className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
          aria-hidden="true"
        />
        <input
          id="search-field"
          className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
          placeholder="Search..."
          type="search"
          name="search"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </form>
      {tickets.length > 0 && (
        <div className="mt-2 rounded-md bg-white shadow-lg overflow-hidden">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => handleSelectTicket(ticket.id)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100">
              <TicketCard ticket={ticket} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
