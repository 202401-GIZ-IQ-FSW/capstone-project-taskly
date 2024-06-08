import React from 'react';
import Header from '../header/Header';
import TicketSubmission from '../tickets/TicketSubmission';
import TicketStats from '../tickets/TicketStats';
import Footer from '../footer/Footer';

const Home = () => {
  const headerLinks = [
    { text: 'Home', url: '/' },
    { text: 'Search tickets', url: '/search-tickets' },
    { text: 'Create', url: '#' },
    { text: 'Notifications', url: '#' },
  ];

  const footerLinks = [
    { text: 'Submit a Ticket', url: '#' },
    { text: 'Track Ticket', url: '#' },
    { text: 'Receive', url: '#' },
    { text: 'Troubleshooting', url: '#' },
    { text: 'Contact Support', url: '#' },
  ];

  return (
    <div>
      <Header links={headerLinks} signInText="Sign In" />
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
      <Footer 
        companyName="TicketMaster" 
        footerText="Your ultimate ticket support solution!" 
        links={footerLinks}
      />
    </div>
  );
};

export default Home;
