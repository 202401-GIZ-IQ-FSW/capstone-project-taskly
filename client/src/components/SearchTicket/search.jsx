import React, { useState } from 'react';
import TicketCard from '../SearchTicket/TicketCard';
import fetcher from '@/_utils/fetcher';

const SearchComponent = () => {
  const [input, setInput] = useState('');
  const [tickets, setTickets] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchData = async (value) => {
    try {
      const response = await fetcher(`/v1/projects/projectId/tickets/search?query=${value}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTickets(data.tickets);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTickets([]);
      setShowDropdown(false);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    if (value.length >= 1) {
      fetchData(value);
    } else {
      setTickets([]);
      setShowDropdown(false);
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
    <div className="sticky top-16 left-0 right-0 bg-white shadow-md p-4">
      <input
        id="search-field"
        type="text"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search tickets..."
        className="block h-full w-full border-0 py-0 pl-3 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm border border-gray-300 rounded-md px-3 py-2"
      />
      {showDropdown && input.length >= 1 && (
        <div className="mt-2 rounded-md bg-white shadow-lg overflow-hidden">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => handleSelectTicket(ticket.id)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              <TicketCard ticket={ticket} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
