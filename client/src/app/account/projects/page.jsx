// client\src\app\account\projects\page.jsx
'use client';
import { useState, useEffect } from 'react';
import fetcher from '@/_utils/fetcher';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
const Projects = () => {
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticketModalIsOpen, setTicketModalIsOpen] = useState(false);
  const [ticketViewModalIsOpen, setTicketViewModalIsOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [showInviteMemberModal, setShowInviteMemberModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDescription, setNewTicketDescription] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState('medium');
  const [newTicketAssignee, setNewTicketAssignee] = useState('');
  const [inviteRole, setInviteRole] = useState('view');
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetcher('/v1/projects');
        setProjects(Array.isArray(data) ? data : []);
        if (projects && projects.length != 0) {
          window['projectSelect'].value = projects[0]._id;
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
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

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    // needs update to handle the order in each column
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

  const openTicketModal = async (ticket) => {
    setSelectedTicket(ticket);
    setNewTicketTitle(ticket.title);
    setNewTicketDescription(ticket.description);
    setNewTicketPriority(ticket.priority);
    setNewTicketAssignee(ticket.assignees[0]);

    try {
      const commentsData = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${ticket._id}/comments`
      );
      setComments(Array.isArray(commentsData) ? commentsData : []);
      // const activityLogData = await fetcher(
      //   `/v1/tickets/${ticket._id}/activity-log`
      // );
      // setActivityLog(Array.isArray(activityLogData) ? activityLogData : []);
    } catch (err) {
      setError(err.message);
    }
    setTicketViewModalIsOpen(true);
  };
  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const data = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${selectedTicket._id}/comments`,
        {
          method: 'POST',
          body: JSON.stringify({ content: newComment }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setComments([...comments, data]);
      setNewComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  const closeTicketModal = () => {
    setSelectedTicket(null);
    setTicketModalIsOpen(false);
  };

  const handleCreateProject = async () => {
    try {
      const data = await fetcher('/v1/projects', {
        method: 'POST',
        body: JSON.stringify({
          name: newProjectName,
          description: newProjectDescription,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setProjects([...projects, data]);
      setShowCreateProjectModal(false);
      setNewProjectName('');
      setNewProjectDescription('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await fetcher(`/v1/projects/${selectedProject._id}`, {
        method: 'DELETE',
      });
      setProjects(
        projects.filter((project) => project._id !== selectedProject._id)
      );
      setSelectedProject(null);
      setShowDeleteProjectModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInviteMember = async () => {
    try {
      const data = await fetcher(
        `/v1/projects/${selectedProject._id}/members`,
        {
          method: 'POST',
          body: JSON.stringify({ email: newMemberEmail, role: inviteRole }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setSelectedProject((prev) => ({
        ...prev,
        editAccess:
          inviteRole === 'edit'
            ? [...prev.editAccess, data.member]
            : prev.editAccess,
        viewAccess:
          inviteRole === 'view'
            ? [...prev.viewAccess, data.member]
            : prev.viewAccess,
      }));
      setNewMemberEmail('');
      setShowInviteMemberModal(false);
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
            assignees: [newTicketAssignee],
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setTickets([...tickets, data]);
      setTicketModalIsOpen(false);
      setNewTicketTitle('');
      setNewTicketDescription('');
      setNewTicketPriority('medium');
      setNewTicketAssignee('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditProject = async () => {
    try {
      await fetcher(`/v1/projects/${selectedProject._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: selectedProject.name,
          description: selectedProject.description,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setShowEditProjectModal(false);
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
      <div className="mb-4 flex justify-left items-center">
        <label htmlFor="projectSelect" className="mr-2 w-auto min-w-32">
          Choose project:
        </label>
        <select
          id="projectSelect"
          value={selectedProject ? selectedProject._id : ''}
          onChange={(e) => {
            const project = projects.find((p) => p._id === e.target.value);
            setSelectedProject(project);
          }}
          className="p-2 border rounded min-w-52">
          <option value="" hidden>
            Select a project
          </option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
        <div className="flex flex-row justify-end w-full ">
          {selectedProject && (
            <div className="relative">
              <button
                onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
                className="font-extrabold text-2xl"
                title="Project Settings">
                ...
              </button>
              {showSettingsDropdown && (
                <ul className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl">
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => setShowEditProjectModal(true)}>
                    Create Project
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => setShowEditProjectModal(true)}>
                    Edit Project
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => setShowDeleteProjectModal(true)}>
                    Delete Project
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => setShowInviteMemberModal(true)}>
                    Invite Members
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedProject && (
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
                        {Capitalize(status)}
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
              onClick={() => setTicketModalIsOpen(true)}
              className="p-2 bg-green-500 text-white rounded">
              Create Ticket
            </button>
          </div>
        </>
      )}

      {ticketModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedTicket ? 'Edit Ticket' : 'Create New Ticket'}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={''}
              onChange={(e) => setNewTicketTitle(e.target.value)}
              className="p-2 border rounded w-full mb-4"
            />
            <textarea
              placeholder="Description"
              value={''}
              onChange={(e) => setNewTicketDescription(e.target.value)}
              className="p-2 border rounded w-full mb-4"
            />
            <select
              value={1}
              onChange={(e) => setNewTicketPriority(e.target.value)}
              className="p-2 border rounded w-full mb-4">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="text"
              placeholder="Assignee"
              value={0}
              onChange={(e) => setNewTicketAssignee(e.target.value)}
              className="p-2 border rounded w-full mb-4"
            />
            <button
              onClick={handleCreateTicket}
              className="p-2 bg-blue-500 text-white rounded mr-2">
              {selectedTicket ? 'Save' : 'Create'}
            </button>
            <button
              onClick={() => setTicketModalIsOpen(false)}
              className="p-2 bg-gray-300 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
      {ticketViewModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedTicket ? selectedTicket.title : 'Create New Ticket'}
            </h2>

            <p className="p-2 border rounded w-full mb-4">
              {selectedTicket.description}
            </p>
            <div className="p-2 border rounded w-full mb-4">
              {selectedTicket.priority}
            </div>
            <p className="p-2 border rounded w-full mb-4">
              {selectedTicket.assignee}
            </p>

            <button
              onClick={() => setTicketViewModalIsOpen(false)}
              className="p-2 bg-gray-300 rounded">
              Cancel
            </button>

            {/* Comments Section */}
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Comments</h3>
              <div className="max-h-48 overflow-y-auto mb-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="p-2 mb-2 bg-gray-100 border rounded">
                    <p>{comment.commentedBy.username}</p>
                    <p>{comment.content}</p>
                    <p className="text-sm text-gray-500">
                      {comment.author} -{' '}
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <textarea
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="p-2 border rounded w-full mb-2"
              />
              <button
                onClick={handleAddComment}
                className="p-2 bg-green-500 text-white rounded">
                Add Comment
              </button>
            </div>

            {/* Activity Log Section */}
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Activity Log</h3>
              <div className="max-h-48 overflow-y-auto">
                {activityLog.map((log) => (
                  <div
                    key={log._id}
                    className="p-2 mb-2 bg-gray-100 border rounded">
                    <p>{log.action}</p>
                    <p className="text-sm text-gray-500">
                      {log.user} - {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateProjectModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Create Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="p-2 border rounded w-full mb-4"
            />
            <textarea
              placeholder="Project Description"
              value={newProjectDescription}
              onChange={(e) => setNewProjectDescription(e.target.value)}
              className="p-2 border rounded w-full mb-4"
            />
            <button
              onClick={handleCreateProject}
              className="p-2 bg-blue-500 text-white rounded mr-2">
              Create
            </button>
            <button
              onClick={() => setShowCreateProjectModal(false)}
              className="p-2 bg-gray-300 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}

      {showEditProjectModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Project</h2>
            <input
              type="text"
              placeholder="Project Name"
              value={selectedProject ? selectedProject.name : ''}
              onChange={(e) =>
                setSelectedProject((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="p-2 border rounded w-full mb-4"
            />
            <textarea
              placeholder="Project Description"
              value={selectedProject ? selectedProject.description : ''}
              onChange={(e) =>
                setSelectedProject((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="p-2 border rounded w-full mb-4"
            />
            <button
              onClick={handleEditProject}
              className="p-2 bg-blue-500 text-white rounded mr-2">
              Save
            </button>
            <button
              onClick={() => setShowEditProjectModal(false)}
              className="p-2 bg-gray-300 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}

      {showDeleteProjectModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Project</h2>
            <p>Are you sure you want to delete this project?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleDeleteProject}
                className="p-2 bg-red-500 text-white rounded mr-2">
                Delete
              </button>
              <button
                onClick={() => setShowDeleteProjectModal(false)}
                className="p-2 bg-gray-300 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showInviteMemberModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Invite New Member</h2>
            <input
              type="email"
              placeholder="Member Email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              className="p-2 border rounded w-full mb-4"
            />
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="p-2 border rounded w-full mb-4">
              <option value="view">View</option>
              <option value="edit">Edit</option>
            </select>
            <button
              onClick={handleInviteMember}
              className="p-2 bg-green-500 text-white rounded mr-2">
              Invite
            </button>
            <button
              onClick={() => setShowInviteMemberModal(false)}
              className="p-2 bg-gray-300 rounded">
              Cancel
            </button>
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Current Members</h3>
              <ul>
                {selectedProject.editAccess.map((member) => (
                  <li
                    key={member._id}
                    className="flex justify-between items-center">
                    <span>{member.email} (Edit)</span>
                    <button
                      onClick={() => handleRemoveMember(member._id)}
                      className="p-1 bg-red-500 text-white rounded">
                      Remove
                    </button>
                  </li>
                ))}
                {selectedProject.viewAccess.map((member) => (
                  <li
                    key={member._id}
                    className="flex justify-between items-center">
                    <span>{member.email} (View)</span>
                    <button
                      onClick={() => handleRemoveMember(member._id)}
                      className="p-1 bg-red-500 text-white rounded">
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {selectedProject && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Activity Log</h2>
          {/* <ul>
            {selectedProject.activityLog.map((activity, index) => (
              <li key={index} className="mb-2">
                {activity}
              </li>
            ))}
          </ul> */}
        </div>
      )}
    </div>
  );
};

export default Projects;
