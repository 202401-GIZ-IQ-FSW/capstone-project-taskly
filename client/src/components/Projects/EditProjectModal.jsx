// client\src\components\Projects\EditProjectModal.jsx
import React, { useState, useEffect } from 'react';
import fetcher from '@/_utils/fetcher';
import Button from '../Button/Button';

const EditProjectModal = ({ setIsOpen, selectedProject, setProjects }) => {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  useEffect(() => {
    if (selectedProject) {
      setProjectName(selectedProject.name);
      setProjectDescription(selectedProject.description);
    }
  }, [selectedProject]);

  const handleEditProject = async () => {
    try {
      const response = await fetcher(`/v1/projects/${selectedProject._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          name: projectName,
          description: projectDescription,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === selectedProject._id ? response : project
        )
      );
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to edit project:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-4">Edit Project</h2>
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
        <Button
          onClick={handleEditProject}
          className="p-2  rounded">
          Save
        </Button>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 bg-gray-300 rounded ml-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProjectModal;
