'use client';

import React from 'react';
import SearchTickets from '../components/searchTicket/SearchTickets';

const SearchTicketsPage = () => {
  const handleSearch = () => {
    alert("Search clicked");
  };

  return (
    <div>
      <SearchTickets
        ticketId={50}
        submitter="JohnDoe"
        status="Open"
        categories={['Technical', 'General Inquiry', 'Bug Report']}
        dateSubmitted="2024-06-06"
        lastUpdated="2024-06-06"
        priorityLevels={['Urgent', 'Normal']}
        options={['Add Attachment', 'Add Note', 'Assign to']}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default SearchTicketsPage;
