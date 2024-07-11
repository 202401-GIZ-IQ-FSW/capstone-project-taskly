'use client';

import fetcher from '@/_utils/fetcher';
import { useProjects } from '@/context/ProjectsContext/ProjectsContext';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

const TicketDetail = ({ params }) => {
  const { ticketId } = params;
  const { selectedProject } = useProjects();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
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

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;

    try {
      const data = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${ticketId}/comments`,
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

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setTicket({ ...ticket, status: newStatus });
  };

  const handleAssignUser = async () => {
    // Handle assign user logic here
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white flex">
      <div className="w-2/3 pr-4">
        <h2 className="text-2xl font-bold mb-2">{ticket.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{ticket.description}</p>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div key={index} className="border p-2 rounded-md bg-gray-50">
                <p className="text-gray-800">{comment.content}</p>
                <p className="text-gray-500 text-sm">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border rounded-md p-2"
              placeholder="Add a comment"
              rows="4"></textarea>
            <button
              onClick={handleAddComment}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/3 pl-4 border-l">
        <div className="flex flex-col items-start">
          <label className="font-semibold mb-2">Progress</label>
          <select
            value={ticket.status}
            onChange={handleStatusChange}
            className="mb-4 px-2 py-1 border rounded-md">
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
          <div className="mb-2">
            <label className="font-semibold">Assigned</label>
            <div className="flex items-center mt-2">
              {assignees.map((user, index) => (
                <Image
                  key={index}
                  src={user.avatar || '/default-avatar.png'}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full mr-2"
                />
              ))}
              <button
                onClick={handleAssignUser}
                className="text-blue-500 font-semibold">
                + Assign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
