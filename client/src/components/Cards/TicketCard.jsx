import Link from 'next/link';

const TicketCard = ({ ticket }) => {
  return (
    <Link key={ticket._id} href={`/account/tickets/${ticket._id}`}>
      <div className="block border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-4 bg-white">
        <h3 className="text-xl font-semibold mb-2">{ticket.title}</h3>
        <p className="text-gray-600 line-clamp-2">{ticket.description}</p>
        <div className="mt-2 flex items-center space-x-2">
          <span
            className={`px-2 py-1 text-sm font-semibold rounded-md ${
              ticket.priority === 'high'
                ? 'bg-red-200 text-red-800'
                : ticket.priority === 'medium'
                ? 'bg-yellow-200 text-yellow-800'
                : 'bg-blue-200 text-blue-800'
            }`}>
            {ticket.priority}
          </span>
          <span
            className={`px-2 py-1 text-sm font-semibold rounded-md ${
              ticket.status === 'open'
                ? 'bg-green-200 text-green-800'
                : ticket.status === 'in progress'
                ? 'bg-neutral-200     text-yellow-800'
                : ticket.status === 'resolved'
                ? 'bg-blue-200 text-blue-800'
                : 'bg-gray-200 text-gray-800'
            }`}>
            {ticket.status}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TicketCard;
