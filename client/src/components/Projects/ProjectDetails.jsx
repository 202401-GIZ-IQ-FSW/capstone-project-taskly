// client\src\components\Projects\ProjectDetails.jsx
import React from 'react';

const ProjectDetails = ({ project }) => {
  return (
    <>
      <h1  className='font-bold text-3xl'>Project Details</h1>
      <p>Name: {project.name}</p>
      <p>Description: {project.description}</p>
    </>
  );
};

export default ProjectDetails;
