'use client';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useProjects } from '@/context/ProjectsContext/ProjectsContext';
import fetcher from '@/_utils/fetcher';

const KanbanBoard = () => {
  const { selectedProject } = useProjects();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      fetchProjectTickets();
    }
  }, [selectedProject]);

  const fetchProjectTickets = async () => {
    setLoading(true);
    try {
      const data = await fetcher(`/v1/projects/${selectedProject._id}/tickets`);
      setTickets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const statuses = ['open', 'in progress', 'resolved', 'closed'];

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    // Create a copy of tickets array to modify
    const updatedTickets = [...tickets];

    // Remove the dragged ticket from its original position
    const [movedTicket] = updatedTickets.splice(source.index, 1);

    // Update the status of the moved ticket to the destination column
    movedTicket.status = destination.droppableId;

    // Insert the moved ticket into the new position
    updatedTickets.splice(destination.index, 0, movedTicket);

    // Update state with the modified tickets array
    setTickets(updatedTickets);

    // Update ticket status in the backend
    try {
      await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${draggableId}`,
        {
          method: 'PUT',
          body: JSON.stringify({ status: destination.droppableId }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-4">
        {statuses.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-4 bg-gray-100 rounded shadow">
                <h3 className="text-lg font-bold mb-4">{capitalize(status)}</h3>
                {tickets
                  .filter((ticket) => ticket.status === status)
                  .map((ticket, index) => (
                    <Draggable
                      key={ticket._id}
                      draggableId={ticket._id}
                      index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-2 mb-2 bg-white rounded shadow cursor-pointer"
                          onClick={() => openTicketModal(ticket)}>
                          <h4 className="text-lg font-semibold">
                            {ticket.title}
                          </h4>
                          <p className="text-gray-600">{ticket.description}</p>
                        </div>
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
  );
};

export default KanbanBoard;
