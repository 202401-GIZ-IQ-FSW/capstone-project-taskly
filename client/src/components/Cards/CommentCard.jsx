import React, { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import Button from '../Button/Button';
import CommentActionsDropdown from '../Dropdowns/CommentActionsDropdown';

const CommentCard = ({ comment, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { user } = useUser();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedContent(comment.content);
  };

  const handleSaveClick = () => {
    onEdit(comment._id, editedContent);
    setIsEditing(false);
  };

  return (
    <div className="flex space-x-2 items-start mb-4">
      <img
        src={
          comment.commentedBy.profilePicture ||
          '/public/uploads/default/avatar.jpg'
        }
        alt="Avatar"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex-1 bg-gray-100 rounded-md p-2">
        <div className="flex items-center mb-1">
          <span className="font-semibold">{comment.commentedBy.username}</span>
          <span className="text-xs text-gray-500 ml-2">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
          {user._id === comment.commentedBy._id && (
            <CommentActionsDropdown
              onEditClick={handleEditClick}
              onDeleteClick={() => onDelete(comment._id)}
            />
          )}
        </div>
        {isEditing ? (
          <div>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full border rounded-md p-2"
              rows="4"
              required></textarea>
            <div className="flex justify-end space-x-2 mt-2">
              <Button onClick={handleCancelClick}>Cancel</Button>
              <Button onClick={handleSaveClick}>Save</Button>
            </div>
          </div>
        ) : (
          <p className="text-gray-800">{comment.content}</p>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
