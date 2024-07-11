const CommentCard = ({ comment }) => {
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
        </div>
        <p className="text-gray-800">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
