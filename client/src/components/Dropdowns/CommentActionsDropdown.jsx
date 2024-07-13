import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FiMoreHorizontal } from 'react-icons/fi';

const CommentActionsDropdown = ({ onEditClick, onDeleteClick }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="inline-flex justify-center w-full p-1">
          <FiMoreHorizontal className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onEditClick}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={onDeleteClick}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentActionsDropdown;
