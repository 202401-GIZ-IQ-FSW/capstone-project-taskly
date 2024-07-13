import { useState } from 'react';
import fetcher from '@/_utils/fetcher';
import CommentCard from '../Cards/CommentCard';
import Button from '../Button/Button';

const CommentList = ({ selectedProject, ticketId, comments, setComments }) => {
  const [newComment, setNewComment] = useState('');

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
      console.error(err.message);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <CommentCard key={index} comment={comment} />
        ))}
      </div>
      <div className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full border rounded-md p-2"
          placeholder="Add a comment"
          rows="4"
          required></textarea>
        <Button onClick={handleAddComment}>Submit</Button>
      </div>
    </div>
  );
};

export default CommentList;
