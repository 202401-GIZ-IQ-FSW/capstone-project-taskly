// client\src\components\Projects\TicketModal.jsx
'use client';
import React, { useState } from 'react';
import fetcher from '@/_utils/fetcher';

const TicketModal = ({
  showTicketModal,
  setShowTicketModal,
  selectedTicket,
  setError,
  selectedProject,
  setTickets,
  tickets,
}) => {
  const [newTicketTitle, setNewTicketTitle] = useState(
    selectedTicket ? selectedTicket.title : ''
  );
  const [newTicketDescription, setNewTicketDescription] = useState(
    selectedTicket ? selectedTicket.description : ''
  );
  const [newTicketPriority, setNewTicketPriority] = useState(
    selectedTicket ? selectedTicket.priority : 'medium'
  );

  const handleCreateTicket = async () => {
    try {
      const data = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets`,
        {
          method: 'POST',
          body: JSON.stringify({
            title: newTicketTitle,
            description: newTicketDescription,
            priority: newTicketPriority,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setTickets([...tickets, data.ticket]);
      setShowTicketModal(false);
      setNewTicketTitle('');
      setNewTicketDescription('');
      setNewTicketPriority('medium');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = () => {
    handleCreateTicket({
      title: newTicketTitle,
      description: newTicketDescription,
      priority: newTicketPriority,
    });

    setShowTicketModal(false);
  };

  return (
    showTicketModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
          <h2 className="text-xl font-bold mb-4">
            {selectedTicket ? 'Edit Ticket' : 'Create New Ticket'}
          </h2>
          <input
            type="text"
            placeholder="Title"
            value={newTicketTitle}
            onChange={(e) => setNewTicketTitle(e.target.value)}
            className="p-2 border rounded w-full mb-4"
          />
          <textarea
            placeholder="Description"
            value={newTicketDescription}
            onChange={(e) => setNewTicketDescription(e.target.value)}
            className="p-2 border rounded w-full mb-4"
          />
          <select
            value={newTicketPriority}
            onChange={(e) => setNewTicketPriority(e.target.value)}
            className="p-2 border rounded w-full mb-4">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-500 text-white rounded mr-2">
            {selectedTicket ? 'Save' : 'Create'}
          </button>
          <button
            onClick={() => setShowTicketModal(false)}
            className="p-2 bg-gray-300 rounded">
            Cancel
          </button>
        </div>
      </div>
    )
  );
};

export default TicketModal;
