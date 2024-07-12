// client\src\components\Projects\TicketManagement.jsx
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import fetcher from '@/_utils/fetcher';
import TicketViewModal from '@/components/Projects/TicketViewModal';
import TicketModal from '@/components/Projects/TicketModal';

const TicketManagement = ({
  selectedProject,
  setError,
}) => {
  const [tickets, setTickets] = useState([]);
  const [showTicketViewModal, setShowTicketViewModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      // console.log(selectedProject);
      const fetchTickets = async () => {
        try {
          const data = await fetcher(
            `/v1/projects/${selectedProject._id}/tickets`
          );
          setTickets(Array.isArray(data.tickets) ? data.tickets : []);
        } catch (err) {
          setError(err.message);
        }
      };

      fetchTickets();
    }
  }, [selectedProject]);
  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const updatedTickets = [...tickets];
    const [movedTicket] = updatedTickets.splice(source.index, 1);
    movedTicket.status = destination.droppableId;
    updatedTickets.splice(destination.index, 0, movedTicket);
    setTickets(updatedTickets);
  };
  const openTicketModal = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicketViewModal(true);
  };
  const closeTicketModal = () => {
    setSelectedTicket(null);
    setTicketModalIsOpen(false);
  };
  const statuses = ['open', 'in progress', 'resolved', 'closed'];

  return (
    <>
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
                            {ticket.title}
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
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setShowTicketModal(true)}
          className="p-2 bg-green-500 text-white rounded">
          Create Ticket
        </button>
      </div>
      <TicketViewModal
        isOpen={showTicketViewModal}
        setIsOpen={setShowTicketViewModal}
        selectedTicket={selectedTicket}
        selectedProject={selectedProject}
        comments={comments}
        setComments={setComments}
        activityLog={activityLog}
        setActivityLog={setActivityLog}
      /><TicketModal
      showTicketModal={showTicketModal}
      setShowTicketModal={setShowTicketModal}
      selectedTicket={selectedTicket}setError={setError}
    />
    </>
  );
};

export default TicketManagement;
