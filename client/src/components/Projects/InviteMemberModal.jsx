// client\src\components\Projects\InviteMemberModal.jsx
import React, { useState, useEffect } from 'react';
import fetcher from '@/_utils/fetcher';
import Notification from '@/components/Notification';

const InviteMemberModal = ({
  isOpen,
  setIsOpen,
  selectedProject,
  setSelectedProject,
  setError,
}) => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [newMemberId, setNewMemberId] = useState('');
  const [inviteRole, setInviteRole] = useState('view');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetcher(
          `/v1/admin/users?invite=1&id=${selectedProject._id}`
        );
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsers();
  }, []);
  const generateRandomNumber = () => {
    return Math.floor(100 + Math.random() * 900); // Generates a random number
  };
  const handleInviteMember = async (MemberId, Role) => {
    try {
      const res = await fetcher(`/v1/admin/invite?id=${selectedProject._id}`, {
        method: 'POST',
        body: JSON.stringify({
          id: MemberId ?? newMemberId,
          role: Role ?? inviteRole,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.message == 'Invite updated successfully') {
        setNotificationMessage(
          `${res.message} <span hidden>${generateRandomNumber()}</span>`
        );
        setNotificationType('success');
      } else {
        setNotificationMessage(
          `${res.error} <span hidden>${generateRandomNumber()}</span>`
        );
        setNotificationType('error');
      }
    } catch (error) {
      console.error('Failed to invite member:', error);
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Invite New Member</h2>
        <select
          value={newMemberId}
          onChange={(e) => setNewMemberId(e.target.value)}
          className="p-2 border rounded w-full mb-4">
          <option value="" disabled>
            Select Member
          </option>
          {users.map((user) => (
            <option key={'id' + user._id} value={user._id}>
              {user.firstName} {user.lastName} ({user.email})
            </option>
          ))}
        </select>
        <select
          value={inviteRole}
          onChange={(e) => setInviteRole(e.target.value)}
          className="p-2 border rounded w-full mb-4">
          <option value="view">View</option>
          <option value="edit">Edit</option>
        </select>
        <button
          onClick={() => handleInviteMember(newMemberId, inviteRole)}
          className="p-2 bg-green-500 text-white rounded mr-2">
          Invite
        </button>

        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">Current Members</h3>
          <ul>
            <li className="flex justify-between items-center m-1">
              <span>
                {selectedProject ? selectedProject.ownerId.username : ''}
                (Owner)
              </span>
            </li>
            {selectedProject &&
              selectedProject.editAccess.map((member) => (
                <li
                  key={member._id}
                  className="flex justify-between items-center m-1">
                  <span>{member.username} (Edit)</span>
                  <button
                    onClick={() => handleInviteMember(member._id, 'edit')}
                    className="p-1 bg-red-500 text-white rounded">
                    Remove
                  </button>
                </li>
              ))}
            {selectedProject &&
              selectedProject.viewAccess.map((member) => (
                <li
                  key={member._id}
                  className="flex justify-between items-center m-1">
                  <span>{member.username} (View)</span>
                  <button
                    onClick={() => handleInviteMember(member._id, 'view')}
                    className="p-1 bg-red-500 text-white rounded">
                    Remove
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold mb-2">invited Members</h3>
          <ul>
            {selectedProject &&
              selectedProject.editorsInvited.map((member) => (
                <li
                  key={member._id}
                  className="flex justify-between items-center m-1">
                  <span>{member.username} (Edit)</span>
                  <button
                    onClick={() => handleInviteMember(member._id, 'edit')}
                    className="p-1 bg-red-500 text-white rounded">
                    Cancel Invite
                  </button>
                </li>
              ))}
            {selectedProject &&
              selectedProject.viewersInvited.map((member) => (
                <li
                  key={member._id}
                  className="flex justify-between items-center m-1">
                  <span>{member.username} (View)</span>
                  <button
                    onClick={() => handleInviteMember(member._id, 'view')}
                    className="p-1 bg-red-500 text-white rounded">
                    Cancel Invite
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <br />
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 bg-gray-300 rounded">
          Cancel
        </button>
      </div>
      <Notification message={notificationMessage} type={notificationType} />
    </div>
  );
};

export default InviteMemberModal;
