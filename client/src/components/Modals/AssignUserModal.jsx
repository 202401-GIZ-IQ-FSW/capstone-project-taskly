import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Button from '../Button/Button';

const AssignUserModal = ({ handleAssignUser, onClose }) => {
  const [assigneeIdOrUsernameOrEmail, setAssigneeIdOrUsernameOrEmail] =
    useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsModalOpen(false); // Also close the modal
      await handleAssignUser(assigneeIdOrUsernameOrEmail);
      onClose(); // Close the modal after successful assignment
    } catch (error) {
      console.error('Error assigning user:', error);
      // Handle error state or display error message
    }
  };

  return (
    <>
      <Dialog open={isModalOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsModalOpen(true)} // Open modal when clicked
            className="mt-4 font-semibold self-start">
            + Assign
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignee" className="text-right">
                Username, or Email
              </Label>
              <Input
                id="assignee"
                value={assigneeIdOrUsernameOrEmail}
                onChange={(e) => setAssigneeIdOrUsernameOrEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Assign</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssignUserModal;
