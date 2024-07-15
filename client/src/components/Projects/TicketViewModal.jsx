// client\src\components\Projects\TicketViewModal.jsx
'use client';
import React, { useState, useEffect } from 'react';
import fetcher from '@/_utils/fetcher';

const TicketViewModal = ({
  isOpen,
  setIsOpen,
  selectedTicket,
  selectedProject,
  comments,
  setComments,
  activityLog,
  setActivityLog,
}) => {
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (selectedTicket) {
      const fetchComments = async () => {
        try {
          const response = await fetcher(
            `/v1/projects/${selectedProject._id}/tickets/${selectedTicket._id}/comments`
          );
          setComments(response);
        } catch (error) {
          console.error('Failed to fetch comments:', error);
        }
      };

      const fetchActivityLog = async () => {
        try {
          const response = await fetcher(
            `/v1/tickets/${selectedTicket._id}/activity`
          );
          setActivityLog(response.activityLog);
        } catch (error) {
          console.error('Failed to fetch activity log:', error);
        }
      };

      fetchComments();
      // fetchActivityLog();
    }
  }, [selectedTicket, setComments, setActivityLog]);

  const handleAddComment = async () => {
    try {
      const response = await fetcher(
        `/v1/projects/${selectedProject._id}/tickets/${selectedTicket._id}/comments`,
        {
          method: 'POST',
          body: JSON.stringify({ content: newComment }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setComments((prevComments) => [...prevComments, response]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 max-h-full">
        <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full max-h-full">
          <h2 className="text-xl font-bold mb-4">{selectedTicket.title}</h2>
          <p className="mb-4">{selectedTicket.description}</p>
          <div className="mb-4">
            <h3 className="text-lg font-bold">Comments</h3>
            <ul className="mb-4 overflow-y-scroll max-h-[40vh]">
              {comments.map((comment) => (
                <li key={comment._id} className="border-b py-2">
                  <img
                    src={
                      comment.commentedBy.profilePicture.startsWith('http')
                        ? comment.commentedBy.profilePicture
                        : `http://localhost:3001/${comment.commentedBy.profilePicture}`
                    }
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full inline"
                  />
                  <p className="inline mx-4">{comment.commentedBy.username}</p>
                  <p>{comment.content}</p>
                  <p className="text-sm text-gray-500">
                    {comment.author}
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
            <textarea
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="p-2 border rounded w-full mb-2"
            />
            <button
              onClick={handleAddComment}
              className="p-2 bg-blue-500 text-white rounded">
              Add Comment
            </button>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold">Activity Log</h3>
            <ul>
              {/* {activityLog.map((activity) => (
                <li key={activity._id} className="border-b py-2">{activity.description}</li>
              ))} */}
            </ul>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-gray-300 rounded">
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default TicketViewModal;
