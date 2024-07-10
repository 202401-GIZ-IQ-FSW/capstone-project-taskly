'use client';
import fetcher from '@/_utils/fetcher';
import { useEffect, useState } from 'react';
import { ProjectsContext } from './ProjectsContext';

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      const data = await fetcher('/v1/projects');
      setProjects(data);
      setSelectedProject(data[0] || null); // Default to the first project
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
    // console.log(projects);
    // console.log(selectedProject);
  }, []);

  return (
    <ProjectsContext.Provider
      value={{ projects, selectedProject, setSelectedProject, error }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
