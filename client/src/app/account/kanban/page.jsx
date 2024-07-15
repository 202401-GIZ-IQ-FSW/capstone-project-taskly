'use client';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import fetcher from '@/_utils/fetcher';
import TicketViewModal from '@/components/Projects/TicketViewModal';
import TicketModal from '@/components/Projects/TicketModal';
import { useProjects } from '@/context/ProjectsContext/ProjectsContext';
import Link from 'next/link';
import Button from '@/components/Button/Button';

const TicketsKanban = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { selectedProject } = useProjects();
  const [error, setError] = useState(null);

  const statuses = ['open', 'in progress', 'resolved', 'closed'];

  useEffect(() => {
    if (selectedProject) {
      const fetchTickets = async () => {
        try {
          const data = await fetcher(
            `/v1/projects/${selectedProject._id}/tickets`
          );
          if (data) setTickets(data);
        } catch (err) {
          setError(err.message);
          console.error(err);
        }
      };

      fetchTickets();
    }
  }, [selectedProject]);

  const handleDragEnd = async (result) => {
    const { destination, draggableId } = result;
    setIsDragging(true);
    if (!destination) return;
    const newOrder = destination.index - 0.5;

    try {
      const res = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${draggableId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newStatus: destination.droppableId,
            newOrder,
          }),
        }
      );
      if (res) {
        setTickets(res);
        setIsDragging(false);
      }
    } catch (error) {
      setError('Failed to update ticket order');
    }
  };

  const openTicketModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketViewModal(true);
  };

  return (
    <>
      {isDragging && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-50 flex justify-center items-center z-50">
          <p className="text-lg font-bold">Loading...</p>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-4 gap-4">
          {statuses.map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="p-4 bg-gray-100 rounded shadow">
                  <h3 className="text-lg font-bold mb-4">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </h3>
                  {tickets &&
                    tickets
                      .filter((ticket) => ticket.status === status)
                      .map((ticket, index) => (
                        <Draggable
                          key={ticket._id}
                          draggableId={ticket._id}
                          index={index}>
                          {(provided) => (
                            <Link href={`/account/tickets/${ticket._id}`}>
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-2 mb-2 bg-white rounded shadow cursor-pointer">
                                {ticket.title}
                              </div>
                            </Link>
                          )}
                        </Draggable>
                      ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <div className="mt-4 flex justify-end">
        <Button
          onClick={() => setShowTicketModal(true)}
          className="">
          Create Ticket
        </Button>
      </div>

      <TicketModal
        showTicketModal={showTicketModal}
        setShowTicketModal={setShowTicketModal}
        selectedTicket={selectedTicket}
        tickets={tickets}
        selectedProject={selectedProject}
        setError={setError}
        setTickets={setTickets}
      />
    </>
  );
};

export default TicketsKanban;
