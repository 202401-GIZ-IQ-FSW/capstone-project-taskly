// client\src\app\tickets\all\page.jsx
'use client';
// import React, { useEffect, useState } from 'react';
// import fetcher from '@/_utils/fetcher';

// const AllTickets = () => {
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     const fetchTickets = async () => {
//       try {
//         const res = await fetcher('/v1/tickets');
//         setTickets(res);  
//       } catch (error) {
//         console.error('Failed to fetch tickets:', error);
//       }
//     };

//     // fetchTickets();
//   }, []);

//   return (
//     <div className="m-4">
//       <h1 className="mb-4">All Tickets</h1>
//       <ul>
//         {tickets.map((ticket) => (
//           <li key={ticket._id}>{ticket.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AllTickets;