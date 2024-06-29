'use client';
import Link from 'next/link';
import fetcher from '@/_utils/fetcher';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Modal from 'react-modal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMemberEmail, setNewMemberEmail] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetcher('/v1/projects');
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      console.log(selectedProject)
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

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setModalIsOpen(false);
  };

  const handleAddMember = async () => {
    try {
      const data = await fetcher(
        `/v1/projects/${selectedProject._id}/members`,
        {
          method: 'POST',
          body: JSON.stringify({ email: newMemberEmail }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setSelectedProject((prev) => ({
        ...prev,
        editAccess: data.member.editAccess
          ? [...prev.editAccess, data.member]
          : prev.editAccess,
        viewAccess: data.member.viewAccess
          ? [...prev.viewAccess, data.member]
          : prev.viewAccess,
      }));
      setNewMemberEmail('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await fetcher(`/v1/projects/${selectedProject._id}/members/${memberId}`, {
        method: 'DELETE',
      });
      setSelectedProject((prev) => ({
        ...prev,
        editAccess: prev.editAccess.filter((member) => member._id !== memberId),
        viewAccess: prev.viewAccess.filter((member) => member._id !== memberId),
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const statuses = ['open', 'in progress', 'resolved', 'closed'];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <label htmlFor="projectSelect" className="mr-2">
          Choose project:
        </label>
        <select
          id="projectSelect"
          value={selectedProject ? selectedProject._id : ''}
          onChange={(e) => {
            const project = projects.find((p) => p._id === e.target.value);
            setSelectedProject(project);
          }}
          className="p-2 border rounded">
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProject && (
        <>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-4 gap-4">
              {statuses.map((status) => (
                <Droppable key={status} droppableId={status}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="bg-gray-200 p-4 rounded">
                      <h2 className="font-bold">{status.toUpperCase()}</h2>
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
                                className="bg-white p-2 my-2 rounded shadow-md"
                                onClick={() => openModal(ticket)}>
                                <h3 className="font-semibold">
                                  {ticket.title}
                                </h3>
                                <p className="text-gray-600">
                                  {ticket.description}
                                </p>
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

          <div className="mt-4">
            <h2 className="font-bold">Members</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Editors</h3>
                {selectedProject.editAccess.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between p-2 border rounded">
                    <span>{member.name}</span>
                    <button
                      onClick={() => handleRemoveMember(member._id)}
                      className="text-red-500">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-semibold">Viewers</h3>
                {selectedProject.viewAccess.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between p-2 border rounded">
                    <span>{member.name}</span>
                    <button
                      onClick={() => handleRemoveMember(member._id)}
                      className="text-red-500">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <input
                type="email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="Member email"
                className="p-2 border rounded w-full"
              />
              <button
                onClick={handleAddMember}
                className="mt-2 p-2 bg-blue-500 text-white rounded w-full">
                Invite Member
              </button>
            </div>
          </div>
        </>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Ticket Details">
        {selectedTicket && (
          <div>
            <h2 className="font-bold text-xl">{selectedTicket.title}</h2>
            <p className="mt-2">{selectedTicket.description}</p>
            <button
              onClick={closeModal}
              className="mt-4 p-2 bg-red-500 text-white rounded">
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Projects;
