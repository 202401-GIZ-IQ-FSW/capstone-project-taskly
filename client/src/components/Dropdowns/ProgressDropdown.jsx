import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ProgressDropdown = ({ currentStatus, onChangeStatus }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    await onChangeStatus(newStatus);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded">
          Progress: {status} <span className="ml-1">&#x25BE;</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleStatusChange('open')}>
          Open
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('in progress')}>
          In Progress
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('resolved')}>
          Resolved
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange('closed')}>
          Closed
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProgressDropdown;
