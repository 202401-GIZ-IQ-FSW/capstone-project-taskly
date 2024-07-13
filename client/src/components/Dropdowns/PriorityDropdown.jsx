import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const PriorityDropdown = ({ currentPriority, onChangePriority }) => {
  const [priority, setPriority] = useState(currentPriority);

  const handlePriorityChange = async (newPriority) => {
    setPriority(newPriority);
    await onChangePriority(newPriority);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded">
          Priority: {priority} <span className="ml-1">&#x25BE;</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handlePriorityChange('low')}>
          Low
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handlePriorityChange('medium')}>
          Medium
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handlePriorityChange('high')}>
          High
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PriorityDropdown;
