import TicketStats from '../../components/Tickets/TicketStats';
import Hero from '../../components/Tickets/Hero';

const Home = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <TicketStats
        activity="10K+"
        submitted="100K+"
        resolved="500K+"
        supportText="Get help now"
      />
    </main>
  );
};

export default Home;
