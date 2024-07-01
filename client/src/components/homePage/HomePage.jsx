import React from 'react';
import Header from '../components/Header';
import TicketSubmission from '../components/TicketSubmission';
import TicketStats from '../components/TicketStats';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
import { headerLinks, footerLinks, signUpLink } from '@/data/Links';

// Dynamically import the Scene component
const Scene = dynamic(() => import('../components/ThreeScene'), { ssr: false });

const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Full page background */}
      <div className="absolute inset-0 z-0 bg-black">
        <Scene />
      </div>
      
      {/* Overlay content */}
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
