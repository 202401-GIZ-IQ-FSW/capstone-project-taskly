import Image from 'next/image';
import AssignUserModal from '../Modals/AssignUserModal';

const AssigneeList = ({ assignees, handleUnassignUser, handleAssignUser }) => {
  return (
    <div className="mb-2">
      <label className="font-semibold">Assigned</label>
      <div className="flex flex-col items-center mt-2">
        {assignees.map((user, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Image
              src={user.avatar || '/default-avatar.png'}
              alt={user.name || ''}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span>{user.username}</span>
            <button
              onClick={() => handleUnassignUser(user._id)}
              className="text-red-500">
              Unassign
            </button>
          </div>
        ))}
        <AssignUserModal handleAssignUser={handleAssignUser} />
      </div>
    </div>
  );
};

export default AssigneeList;
