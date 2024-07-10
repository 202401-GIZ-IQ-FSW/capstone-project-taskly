'use client'
import fetcher from '@/_utils/fetcher';
import { useEffect, useState } from 'react';
import { ProjectsContext } from './ProjectsContext';

const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetcher('/v1/projects');
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{ projects, error }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;
