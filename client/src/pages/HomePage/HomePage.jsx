'use client'

import React, { useEffect, useState } from 'react';
import TicketStats from '../../components/Tickets/TicketStats';
import TicketSubmission from '../../components/Tickets/TicketSubmission';
import Notifications from '../../components/Notifications/notification';
import axios from 'axios';

const Home = () => {
  //to store the user's ID
  const [userId, setUserId] = useState(null);
 //  an asynchronous function that fetches the user profile from the backend.
//   The user ID is extracted from the response and stored in the userId state.
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/v1/user/profile');
        const userId = response.data._id;
        setUserId(userId);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!userId) {
    return <div>Loading...</div>; // we can replace it with any loading tool
  }

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
        <h1>Notifications</h1>
        <Notifications userId={userId} />
      </div>
    </>
  );
};

export default Home;
