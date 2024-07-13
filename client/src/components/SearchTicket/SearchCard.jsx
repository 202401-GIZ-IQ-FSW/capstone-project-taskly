import React from 'react';
import Link from 'next/link';

const SearchCard = ({ ticket }) => {
  return (
    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
      <Link href={`/tickets/${ticket._id}`}>
        <a>
          <div className="text-red-500">{ticket.title}</div>
          <div className="text-gray-500">{ticket.description}</div>
        </a>
      </Link>
    </div>
  );
};

export default SearchCard;
