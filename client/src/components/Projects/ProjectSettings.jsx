// client\src\components\Projects\ProjectSettings.jsx
import React, { useState } from 'react';
import EditProjectModal from '@/components/Projects/EditProjectModal';
import DeleteProjectModal from '@/components/Projects/DeleteProjectModal';
import InviteMemberModal from '@/components/Projects/InviteMemberModal';
const ProjectSettings = ({
  projects,
  setProjects,
  selectedProject,
  setSelectedProject,
  showSettingsDropdown,
  setShowSettingsDropdown,
  setShowCreateProjectModal,
  setError,
}) => {
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [showInviteMemberModal, setShowInviteMemberModal] = useState(false);
  const [newMemberId, setNewMemberId] = useState('');
  const [inviteRole, setInviteRole] = useState('view');

  return (
    <div className="relative">
      <button
        onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
        className="font-extrabold text-2xl"
        title="Project Settings"
        id="settings">
        ...
      </button>
      {showSettingsDropdown && (
        <ul className="absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl">
          <li
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => setShowCreateProjectModal(true)}>
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

      {showEditProjectModal && (
        <EditProjectModal
          selectedProject={selectedProject}
          setIsOpen={setShowEditProjectModal}
          setProjects={setProjects}
        />
      )}
      {showDeleteProjectModal && (
        <DeleteProjectModal
          isOpen={showDeleteProjectModal}
          setIsOpen={setShowDeleteProjectModal}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          setProjects={setProjects}
          setError={setError}
          projects={projects}
        />
      )}
      {showInviteMemberModal && (
        <InviteMemberModal
          isOpen={showInviteMemberModal}
          setIsOpen={setShowInviteMemberModal}
          selectedProject={selectedProject}
          newMemberId={newMemberId}
          setSelectedProject={setSelectedProject}
          setNewMemberId={setNewMemberId}
          inviteRole={inviteRole}
          setInviteRole={setInviteRole}
        />
      )}
    </div>
  );
};

export default ProjectSettings;
