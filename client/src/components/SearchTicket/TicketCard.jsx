function TicketCard({ ticket }) {
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <span>U</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{ticket.title}</h3>
          <p className="text-sm text-gray-500">{ticket.submitted}</p>
          <p className="text-sm text-gray-500">{ticket.status}</p>
          <p className="text-sm text-gray-500">
            Attachments: {ticket.attachments}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm">{ticket.category}</p>
        <p className="text-sm">{ticket.description}</p>
        <div className="flex space-x-2 mt-2">
          {ticket.tags.map((tag) => (
            <span key={tag} className="border px-2 py-1">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="border px-2 py-1">{ticket.priority}</span>
        <button className="border px-4 py-2">View Options</button>
      </div>
    </div>
  );
}

export default TicketCard;
