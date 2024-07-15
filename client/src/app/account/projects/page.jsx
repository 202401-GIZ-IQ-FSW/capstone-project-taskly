// client\src\app\account\projects\page.jsx
'use client';
import Button from '@/components/Button/Button';
import CreateProjectModal from '@/components/Projects/CreateProjectModal';
import ProjectSettings from '@/components/Projects/ProjectSettings';
import TicketManagement from '@/components/Projects/TicketManagement';
import { useProjects } from '@/context/ProjectsContext/ProjectsContext';
import { useState } from 'react';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const { selectedProject, setSelectedProject } = useProjects();
  const [error, setError] = useState(null);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  const handleClicks = (event) => {
    if (!event.target.id.includes('settings')) {
      setShowSettingsDropdown(false);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 relative" onClick={handleClicks}>
      <div className="mb-4 flex justify-left items-center">
        {/* <ProjecstList
          selectedProject={selectedProject}
          projects={projects}
          setSelectedProject={setSelectedProject}
        /> */}
        <div className="w-full pb-8">
          <h1 className="text-4xl text-custom-blue mb-4">
            {selectedProject?.name}
          </h1>
          <p>{selectedProject?.description}</p>
        </div>
        <div className="flex flex-row justify-end w-full absolute top-0 md:top-16 right-0">
          {!selectedProject && (
            <Button onClick={() => setShowCreateProjectModal(true)}>
              Create Project
            </Button>
          )}
          {selectedProject && (
            <ProjectSettings
              projects={projects}
              setProjects={setProjects}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              showCreateProjectModal={showCreateProjectModal}
              setShowCreateProjectModal={setShowCreateProjectModal}
              showSettingsDropdown={showSettingsDropdown}
              setShowSettingsDropdown={setShowSettingsDropdown}
              setError={setError}
            />
          )}
        </div>
      </div>
      {selectedProject && (
        <div>
          <TicketManagement
            selectedProject={selectedProject}
            setError={setError}
          />
          {/* <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Project Activity Log</h2>
            <ul>
              {selectedProject.activityLog.map((activity, index) => (
                <li key={index} className="mb-2">
                  {activity}
                </li>
              ))}
            </div>
          </DragDropContext>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setTicketModalIsOpen(true)}
              className="p-2 bg-light-blue hover:bg-light-blue/90 text-white rounded">
              Create Ticket
            </button>
          </div>
        </>
      )}

      {ticketModalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
            <h2 className="text-xl font-bold mb-4">
              {selectedTicket ? 'Edit Ticket' : 'Create New Ticket'}
            </h2>
            <input
              type="text"
              placeholder="Title"
              value={''}
              onChange={(e) => setNewTicketTitle(e.target.value)}
              className="p-2 border rounded w-full mb-4"
            />
            <textarea
              placeholder="Description"
              value={''}
              onChange={(e) => setNewTicketDescription(e.target.value)}
              className="p-2 border rounded w-full mb-4"
            />
            <select
              value={1}
              onChange={(e) => setNewTicketPriority(e.target.value)}
              className="p-2 border rounded w-full mb-4">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <input
              type="text"
              placeholder="Assignee"
              value={0}
              onChange={(e) => setNewTicketAssignee(e.target.value)}
              className="p-2 border rounded w-full mb-4"
            />
            <button
              onClick={handleCreateTicket}
              className="p-2 bg-blue-500 text-white rounded mr-2">
              {selectedTicket ? 'Save' : 'Create'}
            </button>
            <button
              onClick={() => setTicketModalIsOpen(false)}
              className="p-2 bg-gray-300 rounded">
              Cancel
            </button>
          </div>
            </ul>
          </div> */}
        </div>
      )}
      {showCreateProjectModal && (
        <CreateProjectModal
          setIsOpen={setShowCreateProjectModal}
          setProjects={setProjects}
          setSelectedProject={setSelectedProject}
        />
      )}
    </div>
  );
};

export default ProjectsPage;
