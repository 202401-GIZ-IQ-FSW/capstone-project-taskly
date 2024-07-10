import Link from 'next/link';

const TicketCard = ({ ticket }) => {
  return (
    <Link key={ticket._id} href={`/account/tickets/${ticket._id}`}>
      <div className="block border rounded shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4">
        <h3 className="text-lg font-semibold mb-2">{ticket.title}</h3>
        <p className="text-gray-600">{ticket.description}</p>
        <div className="mt-2 flex items-center">
          <span
            className={`px-2 py-1 text-sm font-semibold ${
              ticket.priority === 'high'
                ? 'bg-red-200 text-red-800'
                : ticket.priority === 'medium'
                ? 'bg-yellow-200 text-yellow-800'
                : 'bg-blue-200 text-blue-800'
            } rounded-md mr-2`}>
            {ticket.priority}
          </span>
          <span
            className={`px-2 py-1 text-sm font-semibold ${
              ticket.status === 'open'
                ? 'bg-green-200 text-green-800'
                : ticket.status === 'closed'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-yellow-200 text-yellow-800'
            } rounded-md`}>
            {ticket.status}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TicketCard;
