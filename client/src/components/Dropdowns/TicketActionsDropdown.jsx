import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { FiMoreHorizontal } from 'react-icons/fi';

const TicketActionsDropdown = ({ onEditClick, onDeleteClick }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="inline-flex justify-center w-full p-1">
          <FiMoreHorizontal className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onEditClick}>Edit Ticket</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDeleteClick} className="text-red-600">
          Delete Ticket
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TicketActionsDropdown;
