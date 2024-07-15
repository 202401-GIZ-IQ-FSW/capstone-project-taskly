import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FiChevronDown } from 'react-icons/fi';

const ProjectSelectDropdown = ({
  projects,
  selectedProject,
  onProjectChange,
}) => {
  const handleProjectSelect = (project) => {
    // Create a synthetic event object
    const syntheticEvent = {
      target: {
        value: project._id,
      },
    };
    onProjectChange(syntheticEvent);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex justify-between items-center w-full p-2 border rounded min-w-52">
        <span>
          {selectedProject ? selectedProject.name : 'Select a project'}
        </span>
        <FiChevronDown className="w-5 h-5 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        {projects?.map((project) => (
          <DropdownMenuItem
            key={project._id}
            onClick={() => handleProjectSelect(project)}>
            {project.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectSelectDropdown;
