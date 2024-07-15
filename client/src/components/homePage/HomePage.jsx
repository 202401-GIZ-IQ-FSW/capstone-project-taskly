import React from 'react';
import Header from '../header/Header';
import TicketSubmission from '../components/TicketSubmission';
import TicketStats from '../components/TicketStats';
import Footer from '../components/Footer';
import { headerLinks, footerLinks, signUpLink } from '@/data/Links';

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Header links={headerLinks} authentication={signUpLink} />
        <main className="container mx-auto py-12">
          <TicketSubmission 
            title="Submit your technical issues and queries easily!"
            subtitle="Securely submit and manage support tickets for technical issues"
            newTicketText="New ticket"
          />
          <TicketStats 
            activity="10K+" 
            submitted="100K+" 
            resolved="500K+" 
            supportText="Get help now"
          />
        </main>
        <Footer footerLinks={footerLinks} />
      </div>
    </div>
  );
};

export default Home;
