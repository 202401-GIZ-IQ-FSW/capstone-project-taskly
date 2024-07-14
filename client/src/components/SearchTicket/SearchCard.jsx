import React from 'react';
import Link from 'next/link';

const SearchCard = ({ ticket, clearSearch }) => {
  // Function to get the background color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-gray-900';
      case 'low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  // Function to get the background color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500 text-white';
      case 'closed':
        return 'bg-gray-500 text-white';
      case 'in-progress':
        return 'bg-yellow-500 text-gray-900';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div
      className="border border-gray-400 rounded-lg md:p-2 bg-white sm:py-3 px-2"
      onClick={clearSearch}>
      <Link href={`/account/tickets/${ticket._id}`}>
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900">{ticket.title}</h3>
          <p className="text-gray-600">{ticket.description}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {/* Priority tag */}
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getPriorityColor(
              ticket.priority
            )}`}>
            {ticket.priority}
          </span>
          {/* Status tag */}
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
              ticket.status
            )}`}>
            {ticket.status}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SearchCard;
