import { createContext, useContext } from 'react';

export const ProjectsContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjecrsProvider');
  }
  return context;
};
