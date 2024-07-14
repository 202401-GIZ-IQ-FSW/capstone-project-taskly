import React, { useState } from 'react';
import { toast } from 'react-toastify';
import fetcher from './fetcher'; 

const UpdateTicket = ({ ticketId }) => {
  const [status, setStatus] = useState(''); 

  // Function to handle the update of ticket status
  const handleUpdate = async () => {
    try {
      const data = await fetcher(`/api/v1/tickets/${ticketId}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      });

       toast.success('ticket has updated successfully.');
    } catch (error) {
       toast.error(`error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>update ticket status</h2>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value=""> ticket status</option>
        <option value="open">Open</option>
        <option value="in progress">In Progress</option>
        <option value="resolved">Resolved</option>
        <option value="closed">Closed</option>
      </select>
      <button onClick={handleUpdate}></button>
       {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateTicket;
