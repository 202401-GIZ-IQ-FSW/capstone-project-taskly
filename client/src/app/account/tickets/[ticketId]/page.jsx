'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import fetcher from '@/_utils/fetcher';
import AssigneeList from '@/components/AssigneeList/AssigneeList';
import CommentList from '@/components/CommentsList/CommentsList';
import PriorityDropdown from '@/components/Dropdowns/PriorityDropdown';
import ProgressDropdown from '@/components/Dropdowns/ProgressDropdown';
import { useProjects } from '@/context/ProjectsContext/ProjectsContext';
import SuccessAlert from '@/components/Alerts/SuccessAlert';
import WarnAlert from '@/components/Alerts/WarnAlert';

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
        }
      );
      setTicket(updatedTicket);

      // Show success message
      SuccessAlert('Ticket status updated successfully');
    } catch (err) {
      setError(err.message);
      WarnAlert(`Error updating ticket status: ${err.message}`);
    }
  };

  const handlePriorityChange = async (newPriority) => {
    try {
      const updatedTicket = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${ticketId}`,
        {
          method: 'PUT',
          body: JSON.stringify({ priority: newPriority }),
        }
      );
      setTicket(updatedTicket);

      // Show success message
      SuccessAlert('Ticket priority updated successfully');
    } catch (err) {
      setError(err.message);
      WarnAlert(`Error updating ticket priority: ${err.message}`);
    }
  };

  const handleAssignUser = async (assigneeIdOrUsernameOrEmail) => {
    try {
      let bodyData = {};
      if (assigneeIdOrUsernameOrEmail.includes('@')) {
        bodyData.assigneeEmail = assigneeIdOrUsernameOrEmail;
      } else if (isNaN(assigneeIdOrUsernameOrEmail)) {
        bodyData.assigneeUsername = assigneeIdOrUsernameOrEmail;
      } else {
        bodyData.assigneeId = assigneeIdOrUsernameOrEmail;
      }

      const updatedTicket = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${ticketId}/assign`,
        {
          method: 'POST',
          body: JSON.stringify(bodyData),
        }
      );
      setAssignees(updatedTicket.assignees);

      // Show success message
      SuccessAlert('User assigned successfully');
    } catch (err) {
      setError(err.message);
      WarnAlert(`Error assigning user: ${err.message}`);
    }
  };

  const handleUnassignUser = async (assigneeId) => {
    try {
      const updatedTicket = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${ticketId}/unassign`,
        {
          method: 'POST',
          body: JSON.stringify({ assigneeId }),
        }
      );
      setAssignees(updatedTicket.assignees);

      // Show success message
      SuccessAlert('User unassigned successfully');
    } catch (err) {
      setError(err.message);
      WarnAlert(`Error unassigning user: ${err.message}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white flex flex-col md:flex-row">
      <div className="md:w-3/4 md:pr-4">
        <h2 className="text-2xl font-bold mb-2">{ticket?.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{ticket?.description}</p>
        <CommentList
          selectedProject={selectedProject}
          ticketId={ticketId}
          comments={comments}
          setComments={setComments}
        />
      </div>
      <div className="md:w-1/4 md:pl-4 border-t md:border-t-0 md:border-l mt-4 md:mt-0 h-screen">
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