// client\src\components\Projects\DeleteProjectModal.jsx
import React, { useState, useEffect } from 'react';
import fetcher from '@/_utils/fetcher';

const EditProjectModal = ({
  isOpen,
  setIsOpen,
  selectedProject,
  setProjects,
  setSelectedProject,
  setError,
  projects,
}) => {
  const handleDeleteProject = async () => {
    console.log(selectedProject)
    try {
      await fetcher(`/v1/projects/${selectedProject._id}`, {
        method: 'DELETE',
      });
      setProjects(
        projects.filter((project) => project._id !== selectedProject._id)
      );
      setSelectedProject(null);
      setIsOpen(false);
    } catch (err) {
      setError(err.message);
      console.log(err)
    }
  };
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-bold mb-4">Delete Project</h2>
          <p>Are you sure you want to delete this project?</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleDeleteProject}
              className="p-2 bg-red-500 text-white rounded mr-2">
              Delete
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 bg-gray-300 rounded">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditProjectModal;
