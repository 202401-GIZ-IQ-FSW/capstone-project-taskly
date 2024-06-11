import React from 'react';
import Header from '../header/Header';
import TicketSubmission from '../tickets/TicketSubmission';
import TicketStats from '../tickets/TicketStats';
import Footer from '../footer/Footer';
import { headerLinks, footerLinks } from '@/data/Links';

const Home = () => {
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
