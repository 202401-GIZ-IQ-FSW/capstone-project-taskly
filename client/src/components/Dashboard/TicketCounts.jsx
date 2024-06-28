// client\src\components\Dashboard\TicketCounts.jsx
const TicketCounts = ({ ticketCountsByStatus }) => {
  if (!ticketCountsByStatus || Object.keys(ticketCountsByStatus).length === 0) {
    return <h1>You Don't Have any Tickets assigned to you</h1>;
  }

  return (
    <div className="flex flex-row justify-between">
      <div>open tickets: {ticketCountsByStatus.open || 0}</div>
      <div>in progress tickets: {ticketCountsByStatus['in progress'] || 0}</div>
      <div>resolved tickets: {ticketCountsByStatus.resolved || 0}</div>
      <div>closed tickets: {ticketCountsByStatus.closed || 0}</div>
    </div>
  );
};

export default TicketCounts;
