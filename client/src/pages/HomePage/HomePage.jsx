import React from 'react';
import TicketStats from '../../components/Tickets/TicketStats';
import Hero from '../../components/Tickets/Hero';
import Newsletter from '@/components/Newsletter';
import UserReviewCard from '@/components/UserReviewCard';
import Services from '@/components/Services';
import Map from '@/components/Map';

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <TicketStats
        activity={10}
        submitted={15}
        resolved={44}
        supportText="Get help now"
      />
       <Services/>
      <UserReviewCard/>
      <Newsletter />
      <Map/>
      
    </main>
  );
};

export default Home;
