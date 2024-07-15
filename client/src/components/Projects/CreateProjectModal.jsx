// client\src\components\Projects\CreateProjectModal.jsx
import React, { useState } from 'react';
import fetcher from '@/_utils/fetcher';

const CreateProjectModal = ({ setIsOpen, setProjects, setSelectedProject }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleCreateProject = async () => {
    try {
      const response = await fetcher('/v1/projects', {
        method: 'POST',
        body: JSON.stringify({
          name: projectName,
          description: projectDescription,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setProjects((prevProjects) => [...prevProjects, response]);
      // setSelectedProject(response)
      setIsOpen(false);
      setProjectName('');
      setProjectDescription('');
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Create Project</h2>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="p-2 border rounded w-full mb-4"
        />
        <textarea
          placeholder="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="p-2 border rounded w-full mb-4"
        />
        <button
          onClick={handleCreateProject}
          className="p-2 bg-blue-500 text-white rounded">
          Create
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 bg-gray-300 rounded ml-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateProjectModal;
