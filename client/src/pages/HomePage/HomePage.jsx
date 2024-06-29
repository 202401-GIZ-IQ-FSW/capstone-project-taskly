import React from 'react';
import TicketStats from '../../components/Tickets/TicketStats';
import TicketSubmission from '../../components/Tickets/TicketSubmission';

const Home = () => {
  return (
    <>
      <TicketSubmission
        title="Submit your technical issues and queries easily!"
        subtitle="Securely submit and manage support tickets for technical issues"
        submitText="Submit"
        newTicketText="New ticket"
      />
      <TicketStats
        activity="10K+"
        submitted="100K+"
        resolved="500K+"
        supportText="Get help now"
      />
      <div>
        <h1>Home Page</h1>
      </div>
    </>
  );
};

export default Home;
