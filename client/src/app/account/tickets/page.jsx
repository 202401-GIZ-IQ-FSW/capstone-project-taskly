import React from 'react';

const ProfileTickets = () => {
  return (
    <div>
      <TicketSearch />
    </div>
  );
};

export default ProfileTickets;

import TicketCard from '@/components/SearchTicket/TicketCard';
import TicketFilters from '@/components/SearchTicket/TicketFilters';

const tickets = [
  {
    title: 'Ticket #12345',
    submitted: 'Submitted 2 hours ago',
    status: 'Waiting for',
    attachments: '3 files',
    category: 'Technical Issue',
    description: 'Please assist with login error',
    tags: ['Urgent', 'High Priority'],
    priority: 'Urgent',
  },
  {
    title: 'Ticket #54321',
    submitted: 'Submitted 5 hours ago',
    status: 'In progress',
    attachments: '1 file',
    category: 'Billing Inquiry',
    description: 'Payment clarification needed',
    tags: ['Normal'],
    priority: 'Normal',
  },
  {
    title: 'Support Ticket Pro',
    submitted: '',
    status: '',
    attachments: '',
    category: '',
    description:
      'Submit your technical problem here\n24/7 assistance available\nDedicated support team\nFast response time guaranteed',
    tags: ['Search', 'Submit New'],
    priority: 'Top-rated',
  },
  {
    title: 'Ticket Wizard',
    submitted: '',
    status: '',
    attachments: '',
    category: '',
    description:
      'User-friendly ticket creation tool\nUser-friendly\nAutomated ticket\nCustomizable ticket fields\nReal-time ticket updates',
    tags: ['Knowledge Base'],
    priority: 'Efficient ticket',
  },
];

function TicketSearch() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 p-4 space-x-4">
        <aside className="w-1/4 p-4 border rounded-md">
          <h2 className="text-lg font-semibold">Your Tickets</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="ticket-id" className="block">
                Ticket ID
              </label>
              <input
                id="ticket-id"
                className="border w-full p-2"
                placeholder="Enter Ticket ID"
              />
            </div>
            <div>
              <label htmlFor="issue-description" className="block">
                Issue Description
              </label>
              <textarea
                id="issue-description"
                className="border w-full p-2"
                placeholder="Describe Your Issue"></textarea>
            </div>
            <div>
              <label htmlFor="category" className="block">
                Category
              </label>
              <select id="category" className="border w-full p-2">
                <option value="" disabled selected>
                  Select Category
                </option>
                <option value="billing">Billing</option>
                <option value="technical">Technical</option>
              </select>
            </div>
            <div>
              <label htmlFor="attachments" className="block">
                Attachments
              </label>
              <input
                id="attachments"
                type="file"
                className="border w-full p-2"
              />
            </div>
            <button className="border px-4 py-2">Create Ticket</button>
          </div>
          <TicketFilters />
        </aside>
        <section className="flex-1 p-4 border rounded-md">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              20 results found for: Your search criteria
            </h2>
            <button className="border px-4 py-2">Filter by Priority</button>
          </div>
          <div className="space-y-4 mt-4">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.title} ticket={ticket} />
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button className="border px-4 py-2">1</button>
            <button className="border px-4 py-2">2</button>
            <button className="border px-4 py-2">3</button>
            <button className="border px-4 py-2">4</button>
            <button className="border px-4 py-2">5</button>
          </div>
        </section>
      </main>
    </div>
  );
}
