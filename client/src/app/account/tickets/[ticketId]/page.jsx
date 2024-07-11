'use client';
import fetcher from '@/_utils/fetcher';
import AssigneeList from '@/components/AssigneeList/AssigneeList';
import CommentList from '@/components/CommentsList/CommentsList';
import PriorityDropdown from '@/components/Dropdowns/PriorityDropdown';
import ProgressDropdown from '@/components/Dropdowns/ProgressDropdown';
import { useProjects } from '@/context/ProjectsContext/ProjectsContext';
import { useEffect, useState } from 'react';

const TicketDetail = ({ params }) => {
  const { ticketId } = params;
  const { selectedProject } = useProjects();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    if (ticketId && selectedProject) {
      fetchTicket();
    }
  }, [ticketId, selectedProject]);

  const fetchTicket = async () => {
    setLoading(true);
    try {
      const data = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${ticketId}`
      );
      setTicket(data);
      fetchComments();
      setAssignees(data.assignees || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const data = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${ticketId}/comments`
      );
      setComments(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const updatedTicket = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${ticketId}`,
        {
          method: 'PUT',
          body: JSON.stringify({ status: newStatus }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setTicket(updatedTicket);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePriorityChange = async (newPriority) => {
    try {
      const updatedTicket = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${ticketId}`,
        {
          method: 'PUT',
          body: JSON.stringify({ priority: newPriority }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setTicket(updatedTicket);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAssignUser = async (assigneeId) => {
    try {
      const updatedTicket = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${ticketId}/assign`,
        {
          method: 'POST',
          body: JSON.stringify({ assigneeId }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setAssignees(updatedTicket.assignees);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUnassignUser = async (assigneeId) => {
    try {
      const updatedTicket = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${ticketId}/unassign`,
        {
          method: 'POST',
          body: JSON.stringify({ assigneeId }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setAssignees(updatedTicket.assignees);
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

  return (
    <div className="p-4 bg-white flex">
      <div className="w-3/4 pr-4">
        <h2 className="text-2xl font-bold mb-2">{ticket.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{ticket.description}</p>
        <CommentList
          selectedProject={selectedProject}
          ticketId={ticketId}
          comments={comments}
          setComments={setComments}
        />
      </div>
      <div className="w-1/4 pl-4 border-l h-screen">
        <div className="flex flex-col items-start gap-7">
          <ProgressDropdown
            currentStatus={ticket.status}
            onChangeStatus={handleStatusChange}
          />
          <PriorityDropdown
            currentPriority={ticket.priority}
            onChangePriority={handlePriorityChange}
          />
          <AssigneeList
            assignees={assignees}
            handleUnassignUser={handleUnassignUser}
            handleAssignUser={handleAssignUser}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
