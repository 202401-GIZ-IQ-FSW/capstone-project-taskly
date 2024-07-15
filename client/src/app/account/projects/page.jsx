// client\src\app\account\projects\page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import ProjecstList from '@/components/Projects/ProjecstList';
import ProjectSettings from '@/components/Projects/ProjectSettings';
import TicketManagement from '@/components/Projects/TicketManagement';
import CreateProjectModal from '@/components/Projects/CreateProjectModal';
import fetcher from '@/_utils/fetcher';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetcher('/v1/projects');
        setProjects(Array.isArray(response) ? response : []);
        if (projects && projects.length != 0) {
          window['projectSelect'].value = projects[0]._id;
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProjects();
  }, []);
  useEffect(() => {
    projects ?? (window['projectSelect'].value = projects[0]._id);
    setSelectedProject(projects[0]);
  }, [projects]);
  useEffect(() => {
  }, [selectedProject]);

  const handleClicks = (event) => {
    if (!event.target.id.includes('settings')) {
      setShowSettingsDropdown(false);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4" onClick={handleClicks}>
      <div className="mb-4 flex justify-left items-center">
        <ProjecstList
          selectedProject={selectedProject}
          projects={projects}
          setSelectedProject={setSelectedProject}
        />

        <div className="flex flex-row justify-end w-full">
          {!selectedProject && (
            <button
              className="p-2 bg-green-500 text-white rounded"
              onClick={() => setShowCreateProjectModal(true)}>
              Create Project
            </button>
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
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Project Activity Log</h2>
            {/* <ul>
              {selectedProject.activityLog.map((activity, index) => (
                <li key={index} className="mb-2">
                  {activity}
                </li>
              ))}
            </ul> */}
          </div>
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
